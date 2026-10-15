import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, Menu, X, Award } from 'lucide-react';
import { eventDetails } from '../data/summitData';

const NAV_LINKS = [
  { label: 'Overview', to: '/#about' },
  { label: 'Panels', to: '/#panels' },
  { label: 'Floorplan', to: '/#floorplan' },
  { label: '2025 Highlights', to: '/#brands-2025' },
  { label: 'App', to: '/#app' },
  { label: 'Sponsorship', to: '/#sponsorship' },
  { label: 'Agenda', to: '/#agenda' },
  { label: 'Tickets', to: '/#tickets' },
  { label: 'News', to: '/posts' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const [menuLocation, setMenuLocation] = useState(pathname + hash);

  // Close the menu on any navigation, including browser back/forward.
  if (menuLocation !== pathname + hash) {
    setMenuLocation(pathname + hash);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 1280 && setMenuOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const isActive = (to) => (to === '/posts' ? pathname.startsWith('/post') : pathname === '/' && hash === to.slice(1));

  return (
    <>
      {/* VENUE BADGE BAR */}
      <div className="relative z-50 bg-[#0047cc] text-white py-1.5 px-4 text-xs font-medium border-b border-white/15">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
              New York 2027
            </span>
            <span className="truncate text-white/95 text-xs">
              <span className="hidden sm:inline">{eventDetails.venue} • </span>
              {eventDetails.dates}
            </span>
          </div>
          <Link
            to="/#tickets"
            className="hidden md:inline-flex shrink-0 items-center gap-1.5 font-bold text-white underline underline-offset-2 hover:text-white/90 transition-colors"
          >
            Registration Open — Official Passes from $1,270
          </Link>
        </div>
      </div>

      {/* MAIN TOP NAV - GRADIENT #005EFF to #F40260 */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white shadow-lg shadow-[#005EFF]/15 border-b border-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="shrink-0 w-8 h-8 min-[380px]:w-9 min-[380px]:h-9 sm:w-11 sm:h-11 rounded-xl bg-white text-[#005EFF] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform font-black">
              <Layers className="w-4 h-4 min-[380px]:w-5 min-[380px]:h-5 sm:w-6 sm:h-6 text-[#005EFF]" />
            </div>
            <div className="min-w-0">
              <span className="font-heading font-black text-sm min-[380px]:text-base sm:text-xl tracking-tight text-white block leading-tight truncate">
                INTERNATIONAL
              </span>
              <span className="font-heading font-bold text-[9px] min-[380px]:text-[10px] sm:text-xs text-white/90 tracking-wider uppercase block whitespace-nowrap">
                Commodity Summit '27
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (xl+) */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-semibold text-white/90">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors hover:text-white hover:underline underline-offset-4 py-1.5 ${
                  isActive(link.to) ? 'text-white underline font-bold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/#sponsorship"
              className="hidden lg:inline-flex text-xs uppercase tracking-wider text-white font-bold px-3 py-2 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 transition-all items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Sponsor</span>
            </Link>
            
            {/* Quick action button visible on all viewports */}
            <Link
              to="/#tickets"
              className="px-3 min-[380px]:px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-heading font-black text-xs sm:text-sm text-[#005EFF] bg-white hover:bg-slate-50 shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all whitespace-nowrap"
            >
              Get Tickets
            </Link>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="xl:hidden shrink-0 p-2 sm:p-2.5 rounded-xl text-white hover:bg-white/15 active:bg-white/25 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors cursor-pointer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="xl:hidden absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain bg-gradient-to-b from-[#005EFF] via-[#4d0080] to-[#F40260] text-white border-t border-white/20 p-5 sm:p-6 pb-20 shadow-2xl"
          >
            <nav className="max-w-md mx-auto flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 px-4 rounded-xl font-heading font-bold text-base min-h-[48px] flex items-center transition-colors ${
                    isActive(link.to) 
                      ? 'bg-white/25 text-white font-black' 
                      : 'text-white/95 hover:bg-white/10 active:bg-white/20'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-5 mt-2 border-t border-white/20 flex flex-col gap-3">
                <Link
                  to="/#sponsorship"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-3.5 rounded-xl font-heading font-bold text-white bg-white/20 border border-white/30 hover:bg-white/30 text-sm active:scale-[0.99] transition-all"
                >
                  Sponsorship Packages
                </Link>
                <Link
                  to="/#tickets"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-4 rounded-xl font-heading font-black text-[#005EFF] bg-white shadow-xl text-sm active:scale-[0.99] transition-all"
                >
                  Get Tickets — from $1,270
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

