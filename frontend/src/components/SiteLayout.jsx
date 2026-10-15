import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/** Public-site chrome: navbar + footer on every page, plus hash/scroll handling for in-app navigation. */
export default function SiteLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Sections render after navigation from another route, so wait a frame before looking them up.
    const id = decodeURIComponent(hash.slice(1));
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#F40260] selection:text-white">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
