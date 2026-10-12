import React from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#06070c] border-t border-white/10 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
        <div className="flex items-center gap-3">
          <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377] flex items-center justify-center">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <span className="font-heading font-bold text-white block">INTERNATIONAL COMMODITY SUMMIT 2027</span>
            <span className="text-[11px] text-slate-400">Meadowlands Exhibition Center • New York</span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link to="/#about" className="py-1 hover:text-slate-300">About</Link>
          <Link to="/#speakers" className="py-1 hover:text-slate-300">Speakers</Link>
          <Link to="/#agenda" className="py-1 hover:text-slate-300">Agenda</Link>
          <Link to="/#tickets" className="py-1 hover:text-slate-300">Passes</Link>
          <Link to="/posts" className="py-1 hover:text-slate-300">News</Link>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="w-full sm:w-auto">Hibarri Portfolio Event</span>
        </nav>

        <div>© {YEAR} International Commodity Summit. All rights reserved.</div>
      </div>
    </footer>
  );
}
