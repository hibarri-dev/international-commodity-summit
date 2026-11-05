import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ATTENDEE_TOKEN_KEY, attendeeApi } from '../lib/api';


export const DEFAULT_COMPANY_CATEGORIES = [
  'Agricultural Commodities',
  'Chemicals',
  'Commodity Trading',
  'Energy',
  'Food and FMCG',
  'Finance, Investment and Insurance',
  'Logistics, Shipping and Supply Chain',
  'Mining, Metals and Minerals',
  'Textiles',
  'Machinery & Equipment',
  'Services & Consulting',
  'Other',
];

export const DEFAULT_ENERGY_SUBCATEGORIES = [
  'Green Energy',
  'Upstream Oil & Gas',
  'Downstream Oil & Gas',
  'Nuclear',
];

const AttendeeAuthContext = createContext(null);

export function AttendeeAuthProvider({ children }) {
  const [attendee, setAttendee] = useState(null);
  const [options, setOptions] = useState({ companyCategories: DEFAULT_COMPANY_CATEGORIES, energySubcategories: DEFAULT_ENERGY_SUBCATEGORIES });
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem(ATTENDEE_TOKEN_KEY)));

  const refresh = useCallback(async () => {
    try {
      const res = await attendeeApi.getMe();
      setAttendee(res.data.attendee);
      setOptions(res.data.options?.companyCategories?.length ? res.data.options : { companyCategories: DEFAULT_COMPANY_CATEGORIES, energySubcategories: DEFAULT_ENERGY_SUBCATEGORIES });
      return res.data.attendee;
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem(ATTENDEE_TOKEN_KEY);
        setAttendee(null);
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem(ATTENDEE_TOKEN_KEY)) refresh();
  }, [refresh]);

  /** Called with the { token, attendee } returned by login / redeem / set-password / reset-password. */
  const startSession = useCallback(
    ({ token, attendee: next }) => {
      if (token) localStorage.setItem(ATTENDEE_TOKEN_KEY, token);
      setAttendee(next);
      refresh();
    },
    [refresh]
  );

  const login = useCallback(
    async (email, password) => {
      const res = await attendeeApi.login(email, password);
      startSession(res.data);
      return res.data.attendee;
    },
    [startSession]
  );

  const logout = useCallback(async () => {
    try {
      await attendeeApi.logout();
    } catch {
      // Clearing local state is what matters.
    }
    localStorage.removeItem(ATTENDEE_TOKEN_KEY);
    setAttendee(null);
  }, []);

  const value = useMemo(
    () => ({ attendee, setAttendee, options, loading, login, logout, startSession, refresh }),
    [attendee, options, loading, login, logout, startSession, refresh]
  );

  return <AttendeeAuthContext.Provider value={value}>{children}</AttendeeAuthContext.Provider>;
}

export function useAttendeeAuth() {
  const ctx = useContext(AttendeeAuthContext);
  if (!ctx) throw new Error('useAttendeeAuth must be used inside AttendeeAuthProvider');
  return ctx;
}
