import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

function getOrSetId(key) {
  let val = localStorage.getItem(key);
  if (!val) {
    val = 'ics_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now();
    localStorage.setItem(key, val);
  }
  return val;
}

export function useTrafficTracker() {
  const location = useLocation();

  useEffect(() => {
    const visitorId = getOrSetId('ics_vid');
    let sessionId = sessionStorage.getItem('ics_sid');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 12);
      sessionStorage.setItem('ics_sid', sessionId);
    }

    const payload = {
      sessionId,
      visitorId,
      path: location.pathname + location.hash,
      referrer: document.referrer || '',
      userAgent: navigator.userAgent,
      activeSec: 5,
    };

    // Send beacon or fetch track
    try {
      fetch(`${BACKEND_URL}/api/summit/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Silently ignore if backend is temporarily unreachable
      });
    } catch {
      // ignore
    }
  }, [location.pathname, location.hash]);
}
