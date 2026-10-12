import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, ExternalLink, Menu, X } from 'lucide-react';
import { eventDetails } from '../data/summitData';

const NAV_LINKS = [
  { label: 'Overview', to: '/#about' },
  { label: 'Industries', to: '/#industries' },
  { label: 'Speakers', to: '/#speakers' },
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
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
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
      <div className="relative z-50 bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377] text-white py-2 px-4 text-xs md:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 bg-white/20 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
              New York 2027
            </span>
            <span className="truncate">
              <span className="hidden sm:inline">{eventDetails.venue} • </span>
              {eventDetails.dates}
            </span>
          </div>
          <Link
            to="/#tickets"
            className="hidden md:inline-flex shrink-0 items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-90"
          >
            Registration Live — Passes from $1,270
          </Link>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#090a12]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#1863dc] via-[#7a2fd6] to-[#e01377] flex items-center justify-center shadow-lg shadow-[#7a2fd6]/30 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-white block leading-tight">
                INTERNATIONAL
              </span>
              <span className="font-heading font-semibold text-[10px] sm:text-xs text-transparent bg-clip-text bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377] tracking-wider uppercase block whitespace-nowrap">
                Commodity Summit '27
              </span>
            </div>
          </Link>

          {/* Desktop Nav — needs ~1000px for logo + links + CTAs, so it starts at lg */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors hover:text-white ${isActive(link.to) ? 'text-white' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://internationalcommoditysummit.com"
              target="_blank"
              rel="noreferrer"
              className="hidden xl:flex text-xs uppercase tracking-wider text-slate-300 hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 transition-all"
            >
              <span>Legacy WP</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <Link
              to="/#tickets"
              className="px-5 py-2.5 rounded-full font-heading font-bold text-sm text-white bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377] shadow-lg shadow-[#7a2fd6]/25 hover:shadow-[#e01377]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get Tickets
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden shrink-0 -mr-2 p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu — fills the screen below the header and locks page scroll */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden absolute inset-x-0 top-full h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)] overflow-y-auto bg-[#0b0d18] border-t border-white/10"
          >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3.5 border-b border-white/5 font-heading font-bold text-lg transition-colors ${
                    isActive(link.to) ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/#tickets"
                onClick={() => setMenuOpen(false)}
                className="mt-6 w-full text-center py-3.5 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377]"
              >
                Get Tickets — from $1,270
              </Link>
              <a
                href="https://internationalcommoditysummit.com"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider text-slate-400 hover:text-white"
              >
                Legacy WP site <ExternalLink className="w-3 h-3" />
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
