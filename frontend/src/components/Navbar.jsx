import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Award, UserRound, ChevronDown, Sparkles, Layers, Image, Smartphone } from 'lucide-react';
import { useAttendeeAuth } from '../context/AttendeeAuthContext';

const PRIMARY_LINKS = [
  { label: 'Speakers', to: '/speakers' },
  { label: 'Agenda', to: '/#agenda' },
  { label: 'Tickets', to: '/#tickets' },
];

const EXPLORE_LINKS = [
  { label: 'Sectors & Industries', to: '/#industries', icon: Layers, desc: 'Key commodity sectors represented' },
  { label: '2025 Highlights', to: '/#brands-2025', icon: Sparkles, desc: 'Previous summit stats & partners' },
  { label: 'Photo Gallery', to: '/#gallery-2025', icon: Image, desc: 'Moments from Geneva summits' },
  { label: 'Event App', to: '/#app', icon: Smartphone, desc: 'AI-powered networking app' },
];

export default function Navbar() {
  const { attendee } = useAttendeeAuth();
  const account = attendee ? { to: '/account', label: 'My Account' } : { to: '/login', label: 'Login' };
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const exploreRef = useRef(null);
  const { pathname, hash } = useLocation();
  const [menuLocation, setMenuLocation] = useState(pathname + hash);

  // Close menus on navigation
  if (menuLocation !== pathname + hash) {
    setMenuLocation(pathname + hash);
    setMenuOpen(false);
    setExploreOpen(false);
  }

  // Handle click outside explore dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setExploreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const isActive = (to) =>
    to === '/speakers'
      ? pathname.startsWith('/speakers')
      : to === '/sponsor'
      ? pathname.startsWith('/sponsor')
      : pathname === '/' && hash === to.slice(1);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white shadow-lg shadow-[#005EFF]/15 border-b border-white/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0 min-w-0" aria-label="International Commodity Summit 2027 - Home">
          <img
            src="/logo/logo-full-white.png"
            alt="International Commodity Summit 2027"
            className="h-9 min-[380px]:h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Simplified Desktop Nav Links (lg+) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-white/95">
          {PRIMARY_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-all py-1.5 hover:text-white hover:opacity-100 ${
                isActive(link.to)
                  ? 'text-white underline underline-offset-8 decoration-2 font-bold'
                  : 'text-white/90 opacity-90'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Clean Explore Dropdown */}
          <div className="relative" ref={exploreRef}>
            <button
              type="button"
              onClick={() => setExploreOpen((open) => !open)}
              className="flex items-center gap-1.5 py-1.5 text-white/90 hover:text-white hover:opacity-100 transition-all font-semibold focus:outline-none cursor-pointer"
              aria-expanded={exploreOpen}
            >
              <span>Explore</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
            </button>

            {exploreOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-white text-slate-800 shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {EXPLORE_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setExploreOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#005EFF] flex items-center justify-center shrink-0 group-hover:bg-[#005EFF] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#005EFF] transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">{item.desc}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/sponsor"
            className={`hidden sm:inline-flex text-xs uppercase tracking-wider font-bold px-3.5 py-2 rounded-lg transition-all items-center gap-1.5 ${
              pathname === '/sponsor'
                ? 'bg-white text-[#F40260] shadow-md'
                : 'text-white bg-white/15 hover:bg-white/25 border border-white/25'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Sponsor</span>
          </Link>

          <Link
            to={account.to}
            className="hidden min-[420px]:inline-flex text-xs uppercase tracking-wider font-bold px-3.5 py-2 rounded-lg bg-white text-[#005EFF] hover:bg-white/95 shadow-sm transition-all items-center gap-1.5"
          >
            <UserRound className="w-3.5 h-3.5" />
            <span>{account.label}</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden shrink-0 p-2 sm:p-2.5 rounded-xl text-white hover:bg-white/15 active:bg-white/25 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors cursor-pointer"
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
          className="lg:hidden absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain bg-white text-slate-900 border-t border-slate-200 p-5 sm:p-6 pb-20 shadow-2xl"
        >
          <nav className="max-w-md mx-auto flex flex-col gap-1">
            {PRIMARY_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`py-2.5 px-4 rounded-xl font-bold text-sm min-h-[44px] flex items-center transition-colors ${
                  isActive(link.to)
                    ? 'bg-blue-50 text-[#005EFF] font-black'
                    : 'text-slate-800 hover:bg-slate-100 hover:text-[#005EFF]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 pb-1 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Explore Summit
            </div>

            {EXPLORE_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="py-2 px-4 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2.5"
              >
                <item.icon className="w-4 h-4 text-[#005EFF]" />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="pt-4 mt-3 border-t border-slate-200 flex flex-col gap-2.5">
              <Link
                to="/sponsor"
                onClick={() => setMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] text-sm shadow-md"
              >
                <Award className="w-4 h-4" /> Become a Sponsor
              </Link>
              <Link
                to={account.to}
                onClick={() => setMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[#005EFF] bg-white hover:bg-slate-50 border border-[#005EFF]/40 text-sm"
              >
                <UserRound className="w-4 h-4" /> {account.label}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
