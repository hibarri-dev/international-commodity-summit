import React from 'react';
import { Layers, ExternalLink, Menu, X } from 'lucide-react';
import { eventDetails } from '../data/summitData';

export default function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <>
      {/* VENUE BADGE BAR */}
      <div className="relative z-50 bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377] text-white py-2 px-4 text-xs md:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase">New York 2027</span>
            <span>{eventDetails.venue} • {eventDetails.dates}</span>
          </div>
          <a href="#tickets" className="hidden sm:inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-90">
            Registration Live — Passes from $1,270
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#090a12]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1863dc] via-[#7a2fd6] to-[#e01377] flex items-center justify-center shadow-lg shadow-[#7a2fd6]/30 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-heading font-black text-xl tracking-tight text-white block leading-tight">
                INTERNATIONAL
              </span>
              <span className="font-heading font-semibold text-xs text-transparent bg-clip-text bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377] tracking-wider uppercase block">
                Commodity Summit '27
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-white transition-colors">Overview</a>
            <a href="#industries" className="hover:text-white transition-colors">Industries</a>
            <a href="#speakers" className="hover:text-white transition-colors">Speakers</a>
            <a href="#agenda" className="hover:text-white transition-colors">Agenda</a>
            <a href="#tickets" className="hover:text-white transition-colors">Tickets</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://internationalcommoditysummit.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs uppercase tracking-wider text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 transition-all"
            >
              <span>Legacy WP</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <a 
              href="#tickets"
              className="px-5 py-2.5 rounded-full font-heading font-bold text-sm text-white bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377] shadow-lg shadow-[#7a2fd6]/25 hover:shadow-[#e01377]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get Tickets
            </a>
          </div>

          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0e111d] border-b border-white/10 px-6 py-5 flex flex-col gap-4 text-base font-medium">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7a2fd6]">Overview</a>
            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7a2fd6]">Industries</a>
            <a href="#speakers" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7a2fd6]">Speakers</a>
            <a href="#agenda" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7a2fd6]">Agenda</a>
            <a href="#tickets" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#7a2fd6]">Tickets</a>
            <a 
              href="#tickets" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377]"
            >
              Get Tickets ($1,270 / $1,970)
            </a>
          </div>
        )}
      </header>
    </>
  );
}
