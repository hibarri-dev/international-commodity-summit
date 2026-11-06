import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MoreVertical,
  X,
  Award,
  UserRound,
  Sparkles,
  Layers,
  Image,
  Smartphone,
  Mic,
  Calendar,
  Ticket,
  ChevronRight,
  Globe2,
} from 'lucide-react';
import { useAttendeeAuth } from '../context/AttendeeAuthContext';

const NAV_LINKS = [
  { label: 'Speakers', to: '/speakers', icon: Mic, desc: 'Global industry keynotes & panels' },
  { label: 'Agenda', to: '/#agenda', icon: Calendar, desc: '3-day full summit schedule' },
  { label: 'Tickets & Passes', to: '/#tickets', icon: Ticket, desc: 'All Access, VIP & Delegate passes' },
];

const EXPLORE_LINKS = [
  { label: 'Sectors & Industries', to: '/#industries', icon: Layers, desc: 'Mining, Energy, Ag, Metals & Finance' },
  { label: '2025 Highlights', to: '/#brands-2025', icon: Sparkles, desc: 'Previous summit stats & partners' },
  { label: 'Photo Gallery', to: '/#gallery-2025', icon: Image, desc: 'Moments from Geneva summits' },
  { label: 'Official Event App', to: '/#app', icon: Smartphone, desc: 'AI-powered networking app' },
];

export default function Navbar() {
  const { attendee } = useAttendeeAuth();
  const account = attendee ? { to: '/account', label: 'My Account' } : { to: '/login', label: 'Login' };
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { pathname, hash } = useLocation();
  const [currentRoute, setCurrentRoute] = useState(pathname + hash);

  // Close menu on route change
  if (currentRoute !== pathname + hash) {
    setCurrentRoute(pathname + hash);
    setMenuOpen(false);
  }

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard escape & lock scroll only on mobile drawer
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
        
        {/* Summit Logo */}
        <Link
          to="/"
          className="flex items-center shrink-0 min-w-0 transition-transform hover:scale-[1.01]"
          aria-label="International Commodity Summit 2027 - Home"
        >
          <img
            src="/logo/logo-full-white.png"
            alt="International Commodity Summit 2027"
            className="h-9 min-[380px]:h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Right Action Bar (Simplified - navigation items accessed via ┆ dots) */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 relative">
          
          {/* Sponsor CTA Button */}
          <Link
            to="/sponsor"
            className={`inline-flex text-xs uppercase tracking-wider font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all items-center gap-1.5 shadow-xs ${
              pathname === '/sponsor'
                ? 'bg-white text-[#F40260] shadow-md font-extrabold ring-2 ring-white/60'
                : 'text-white bg-white/15 hover:bg-white/25 border border-white/25 active:scale-95'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Sponsor</span>
          </Link>

          {/* Attendee Portal / Account Button */}
          <Link
            to={account.to}
            className="inline-flex text-xs uppercase tracking-wider font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white text-[#005EFF] hover:bg-white/95 shadow-sm transition-all items-center gap-1.5 active:scale-95"
          >
            <UserRound className="w-3.5 h-3.5 shrink-0" />
            <span>{account.label}</span>
          </Link>

          {/* ┆ Dots Menu Button (Simplified computer navigation & mobile menu) */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`p-2 sm:p-2.5 rounded-xl text-white transition-all min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center cursor-pointer active:scale-95 ${
              menuOpen
                ? 'bg-white text-[#005EFF] shadow-lg ring-2 ring-white/80'
                : 'bg-white/15 hover:bg-white/25 border border-white/25'
            }`}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu (all summit links)'}
            aria-expanded={menuOpen}
            aria-controls="summit-nav-dropdown"
            title="Navigation Menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <MoreVertical className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>

          {/* Executive Floating Dropdown Menu for Desktop (lg+) */}
          {menuOpen && (
            <div
              id="summit-nav-dropdown"
              ref={menuRef}
              className="hidden lg:block absolute right-0 top-full mt-3 w-84 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-100 p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-100 px-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Summit Navigation</span>
                <span className="text-[10px] lowercase text-slate-400 font-normal">geneva 2027</span>
              </div>

              {/* Primary Program Links */}
              <div className="space-y-1">
                {NAV_LINKS.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-xl transition-all group ${
                        active ? 'bg-blue-50 text-[#005EFF]' : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            active
                              ? 'bg-[#005EFF] text-white shadow-xs'
                              : 'bg-slate-100 text-[#005EFF] group-hover:bg-[#005EFF] group-hover:text-white'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold leading-tight group-hover:text-[#005EFF] transition-colors">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">{item.desc}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#005EFF] transition-colors" />
                    </Link>
                  );
                })}
              </div>

              {/* Explore Summit Section */}
              <div className="mt-3 pt-2.5 border-t border-slate-100">
                <div className="px-2 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Explore Highlights
                </div>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {EXPLORE_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#005EFF] transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#005EFF] shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Fast Action Footer inside Dropdown */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                <Link
                  to="/sponsor"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#005EFF]/10 via-[#F40260]/10 to-transparent hover:from-[#005EFF]/20 hover:via-[#F40260]/20 transition-all border border-[#005EFF]/20 group"
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#F40260]" />
                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#F40260]">
                      Sponsorship Packages
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#005EFF] bg-white px-2 py-0.5 rounded-md shadow-2xs">
                    View list
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation (< lg screens) */}
      {menuOpen && (
        <div
          id="summit-mobile-menu"
          className="lg:hidden absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain bg-white text-slate-900 border-t border-slate-200 p-5 sm:p-6 pb-20 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <nav className="max-w-md mx-auto flex flex-col gap-1">
            <div className="px-3 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Event Program
            </div>

            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 px-4 rounded-xl font-bold text-sm min-h-[44px] flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-blue-50 text-[#005EFF] font-black'
                      : 'text-slate-800 hover:bg-slate-100 hover:text-[#005EFF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#005EFF]" />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}

            <div className="pt-3 pb-1 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Explore Summit
            </div>

            {EXPLORE_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-3"
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
