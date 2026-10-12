import React from 'react';
import { Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#06070c] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377] flex items-center justify-center">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-heading font-bold text-white block">INTERNATIONAL COMMODITY SUMMIT 2027</span>
            <span className="text-[11px] text-slate-400">Meadowlands Exhibition Center • New York</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a href="#about" className="hover:text-slate-300">About</a>
          <a href="#speakers" className="hover:text-slate-300">Speakers</a>
          <a href="#agenda" className="hover:text-slate-300">Agenda</a>
          <a href="#tickets" className="hover:text-slate-300">Passes</a>
          <span className="text-slate-600">|</span>
          <span>Hibarri Portfolio Event</span>
        </div>

        <div>
          © {new Date().getFullYear()} International Commodity Summit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
