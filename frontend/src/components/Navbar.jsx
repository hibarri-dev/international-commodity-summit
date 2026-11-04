import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Award, UserRound } from 'lucide-react';
import { useAttendeeAuth } from '../context/AttendeeAuthContext';

const SPONSOR_HREF = `mailto:vp@internationalcommoditysummit.com?subject=${encodeURIComponent('Sponsorship enquiry - International Commodity Summit')}`;

const NAV_LINKS = [
  { label: 'Sectors', to: '/#industries' },
  { label: 'Speakers', to: '/speakers' },
  { label: '2025 Highlights', to: '/#brands-2025' },
  { label: 'Gallery', to: '/#gallery-2025' },
  { label: 'Agenda', to: '/#agenda' },
  { label: 'Event App', to: '/#app' },
  { label: 'Tickets', to: '/#tickets' },
];

export default function Navbar() {
  const { attendee } = useAttendeeAuth();
  const account = attendee ? { to: '/account', label: 'My Account' } : { to: '/login', label: 'Login' };
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

  const isActive = (to) => (to === '/speakers' ? pathname.startsWith('/speakers') : to === '/posts' ? pathname.startsWith('/post') : pathname === '/' && hash === to.slice(1));

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white shadow-lg shadow-[#005EFF]/15 border-b border-white/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center min-w-0" aria-label="International Commodity Summit 2027 - Home">
          <img
            src="/logo/logo-full-white.png"
            alt="International Commodity Summit 2027"
            className="h-9 min-[380px]:h-10 sm:h-12 w-auto"
          />
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
          <a
            href={SPONSOR_HREF}
            className="hidden lg:inline-flex text-xs uppercase tracking-wider text-white font-bold px-3 py-2 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 transition-all items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Sponsor</span>
          </a>
          <Link
            to={account.to}
            className="hidden sm:inline-flex text-xs uppercase tracking-wider font-bold px-3 py-2 rounded-lg bg-white text-[#005EFF] hover:bg-white/90 transition-all items-center gap-1.5"
          >
            <UserRound className="w-3.5 h-3.5" />
            <span>{account.label}</span>
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
          className="xl:hidden absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain bg-white text-slate-900 border-t border-slate-200 p-5 sm:p-6 pb-20 shadow-2xl"
        >
          <nav className="max-w-md mx-auto flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`py-3 px-4 rounded-xl font-heading font-bold text-base min-h-[48px] flex items-center transition-colors ${
                  isActive(link.to) 
                    ? 'bg-slate-100 text-[#005EFF] font-black' 
                    : 'text-slate-900 hover:bg-slate-100 hover:text-[#005EFF] active:bg-slate-200'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-200 flex flex-col gap-2.5">
              <Link
                to={account.to}
                onClick={() => setMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-bold text-[#005EFF] bg-white hover:bg-slate-50 border border-[#005EFF]/40 text-sm"
              >
                <UserRound className="w-4 h-4" /> {account.label}
              </Link>
              <a
                href={SPONSOR_HREF}
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-heading font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-sm active:scale-[0.99] transition-all"
              >
                Become a Sponsor
              </a>
              <a
                href="/#tickets"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] hover:shadow-lg hover:shadow-[#005EFF]/25 text-sm active:scale-[0.99] transition-all block"
              >
                Buy Tickets
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
