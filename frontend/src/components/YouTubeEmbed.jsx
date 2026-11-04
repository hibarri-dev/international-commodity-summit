import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { trackEvent } from '../hooks/useTrafficTracker';

const MILESTONES = [25, 50, 75, 100];
let apiPromise = null;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve(window.YT);
      };
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

/**
 * Click-to-load YouTube player: shows a thumbnail until clicked (no third-party load on page view),
 * then reports play / pause / progress milestones / seconds watched to the visitor tracker.
 */
export default function YouTubeEmbed({ videoId, title }) {
  const [active, setActive] = useState(false);
  const mountRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    let player;
    let poll;
    let playingSince = null;
    let watchedMs = 0;
    const reached = new Set();
    let cancelled = false;

    const stopClock = () => {
      if (playingSince !== null) {
        watchedMs += Date.now() - playingSince;
        playingSince = null;
      }
    };
    const reportWatched = () => {
      stopClock();
      const seconds = Math.round(watchedMs / 1000);
      watchedMs = 0;
      if (seconds > 0) trackEvent({ type: 'video', label: 'watch', videoId, value: seconds });
    };
    const checkProgress = () => {
      const duration = player?.getDuration?.() || 0;
      if (!duration) return;
      const percent = ((player.getCurrentTime?.() || 0) / duration) * 100;
      for (const m of MILESTONES) {
        if (percent >= m - 0.5 && !reached.has(m)) {
          reached.add(m);
          trackEvent({ type: 'video', label: `progress_${m}`, videoId });
        }
      }
    };

    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountRef.current) return;
      player = new YT.Player(mountRef.current, {
        videoId,
        host: 'https://www.youtube-nocookie.com',
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onStateChange: ({ data }) => {
            if (data === YT.PlayerState.PLAYING) {
              playingSince = Date.now();
              trackEvent({ type: 'video', label: 'play', videoId });
              clearInterval(poll);
              poll = setInterval(checkProgress, 1000);
            } else if (data === YT.PlayerState.PAUSED) {
              clearInterval(poll);
              trackEvent({ type: 'video', label: 'pause', videoId, value: Math.round(player.getCurrentTime?.() || 0) });
              reportWatched();
            } else if (data === YT.PlayerState.ENDED) {
              clearInterval(poll);
              checkProgress();
              if (!reached.has(100)) {
                reached.add(100);
                trackEvent({ type: 'video', label: 'progress_100', videoId });
              }
              reportWatched();
            }
          },
        },
      });
    });

    const onHide = () => document.visibilityState === 'hidden' && reportWatched();
    document.addEventListener('visibilitychange', onHide);
    return () => {
      cancelled = true;
      clearInterval(poll);
      reportWatched();
      document.removeEventListener('visibilitychange', onHide);
      player?.destroy?.();
    };
  }, [active, videoId]);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-lg">
      {active ? (
        <div ref={mountRef} className="absolute inset-0 w-full h-full [&>iframe]:w-full [&>iframe]:h-full" title={title} />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          data-track={`video-start:${videoId}`}
          className="group absolute inset-0 w-full h-full cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white shadow-xl group-hover:scale-105 transition-transform">
              <Play className="h-7 w-7 sm:h-9 sm:w-9 ml-1" fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
