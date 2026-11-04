import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { publicApi } from '../lib/api';

const HEARTBEAT_MS = 15_000;
const FLUSH_MS = 10_000;
const IDLE_AFTER_MS = 60_000;
const MIN_SECTION_SEC = 1;

function randomId(prefix) {
  return `${prefix}${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
}

function getVisitorId() {
  let id = localStorage.getItem('ics_vid');
  if (!id) {
    id = randomId('ics_');
    localStorage.setItem('ics_vid', id);
  }
  return id;
}

function getSessionId() {
  let id = sessionStorage.getItem('ics_sid');
  if (!id) {
    id = randomId('sess_');
    sessionStorage.setItem('ics_sid', id);
  }
  return id;
}

const state = {
  started: false,
  path: '/',
  queue: [],
  activeMs: 0,
  lastTick: 0,
  lastInteraction: 0,
  observer: null,
  observed: new WeakSet(),
  // section id -> ms timestamp when it became visible
  visibleSince: new Map(),
};

const send = publicApi.beacon;

function ids() {
  return { sessionId: getSessionId(), visitorId: getVisitorId() };
}

export function trackEvent(event) {
  state.queue.push({ path: state.path, ts: Date.now(), ...event });
  if (state.queue.length >= 40) flushEvents();
}

function flushEvents(options) {
  if (!state.queue.length) return;
  const events = state.queue.splice(0, 50);
  send('events', { ...ids(), events }, options);
  if (state.queue.length) flushEvents(options);
}

function isActiveNow() {
  return document.visibilityState === 'visible' && Date.now() - state.lastInteraction < IDLE_AFTER_MS;
}

function tickActiveTime() {
  const now = Date.now();
  if (state.lastTick && isActiveNow()) state.activeMs += Math.min(now - state.lastTick, HEARTBEAT_MS * 2);
  state.lastTick = now;
}

function sendHeartbeat(options) {
  tickActiveTime();
  const activeSec = Math.round(state.activeMs / 1000);
  if (activeSec < 1) return;
  state.activeMs -= activeSec * 1000;
  send('track', { ...ids(), kind: 'heartbeat', path: state.path, activeSec }, options);
}

function closeSection(id, now = Date.now()) {
  const since = state.visibleSince.get(id);
  if (since === undefined) return;
  state.visibleSince.delete(id);
  const seconds = Math.round((now - since) / 1000);
  if (seconds >= MIN_SECTION_SEC) trackEvent({ type: 'section_view', section: id, value: seconds });
}

function closeAllSections() {
  const now = Date.now();
  for (const id of [...state.visibleSince.keys()]) closeSection(id, now);
}

function isMostlyVisible(entry) {
  if (!entry.isIntersecting) return false;
  return entry.intersectionRatio >= 0.5 || entry.intersectionRect.height >= window.innerHeight * 0.5;
}

function observeSections() {
  if (!state.observer) return;
  document.querySelectorAll('section[id]').forEach((el) => {
    if (state.observed.has(el)) return;
    state.observed.add(el);
    state.observer.observe(el);
  });
}

function labelFor(el) {
  const explicit = el.getAttribute('data-track') || el.getAttribute('aria-label');
  if (explicit) return explicit;
  const text = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
  if (text) return text.slice(0, 80);
  return el.getAttribute('href') || el.getAttribute('title') || el.tagName.toLowerCase();
}

function onClick(e) {
  state.lastInteraction = Date.now();
  const target = e.target instanceof Element ? e.target : null;
  if (!target) return;
  const interactive = target.closest('a, button, [data-track], input[type="submit"], summary, select');
  const doc = document.documentElement;
  trackEvent({
    type: 'click',
    label: interactive ? labelFor(interactive) : '',
    section: target.closest('section[id]')?.id || '',
    x: (e.pageX / Math.max(doc.scrollWidth, 1)) * 100,
    y: (e.pageY / Math.max(doc.scrollHeight, 1)) * 100,
  });
}

function onVisibilityChange() {
  if (document.visibilityState === 'hidden') {
    // Hidden tabs are not "watching" anything; close timers and ship what we have.
    closeAllSections();
    sendHeartbeat({ unloading: true });
    flushEvents({ unloading: true });
  } else {
    state.lastTick = Date.now();
    state.lastInteraction = Date.now();
    // Re-observing fires a fresh entry for every section, restarting timers for those on screen.
    document.querySelectorAll('section[id]').forEach((el) => {
      state.observer?.unobserve(el);
      state.observer?.observe(el);
    });
  }
}

function startTracker() {
  if (state.started || typeof window === 'undefined') return;
  state.started = true;
  state.lastTick = Date.now();
  state.lastInteraction = Date.now();

  const markInteraction = () => {
    state.lastInteraction = Date.now();
  };
  ['scroll', 'mousemove', 'keydown', 'touchstart'].forEach((type) =>
    window.addEventListener(type, markInteraction, { passive: true })
  );
  document.addEventListener('click', onClick, { capture: true, passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('pagehide', () => {
    closeAllSections();
    sendHeartbeat({ unloading: true });
    flushEvents({ unloading: true });
  });

  if ('IntersectionObserver' in window) {
    state.observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        for (const entry of entries) {
          const id = entry.target.id;
          if (isMostlyVisible(entry) && document.visibilityState === 'visible') {
            if (!state.visibleSince.has(id)) state.visibleSince.set(id, now);
          } else {
            closeSection(id, now);
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75] }
    );
    // Sections render after data loads, so pick up new ones as they appear.
    new MutationObserver(() => observeSections()).observe(document.body, { childList: true, subtree: true });
  }

  setInterval(() => sendHeartbeat(), HEARTBEAT_MS);
  setInterval(() => flushEvents(), FLUSH_MS);
}

function readUtm() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
  };
}

// Password links carry a secret token in the path; it must never reach analytics.
// Query strings (Stripe session ids, registration ids) are never sent; only the path is tracked.
function safePath(pathname) {
  return pathname.replace(/^\/(set-password|reset-password)\/.+$/, '/$1/:token');
}

/** Mount once (in the site layout): records page views, visible time, clicks, and section dwell time. */
export function useTrafficTracker() {
  const pathname = safePath(useLocation().pathname);

  useEffect(() => {
    startTracker();
    if (state.path !== pathname) {
      closeAllSections();
      sendHeartbeat();
    }
    state.path = pathname;
    send('track', {
      ...ids(),
      kind: 'view',
      path: pathname,
      referrer: document.referrer || '',
      userAgent: navigator.userAgent,
      ...readUtm(),
    });
    const frame = requestAnimationFrame(observeSections);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
}
