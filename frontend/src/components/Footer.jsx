import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Award } from 'lucide-react';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative z-10 bg-slate-50 border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 text-xs text-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
        <div className="flex flex-col items-center lg:items-start gap-2">
          <Link to="/" aria-label="International Commodity Summit 2027">
            <img
              src="/logo/logo-full-black.png"
              alt="International Commodity Summit 2027"
              className="h-10 w-auto"
            />
          </Link>
          <span className="text-[11px] text-slate-600 font-medium">Geneva, Switzerland • 15–17 November 2027</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 font-medium text-xs text-black">
          <Link to="/#about" className="py-1.5 px-1 text-black hover:text-[#005EFF] transition-colors">About</Link>
          <Link to="/#industries" className="py-1.5 px-1 text-black hover:text-[#005EFF] transition-colors">Sectors</Link>
          <Link to="/speakers" className="py-1.5 px-1 text-black hover:text-[#005EFF] transition-colors">Speakers</Link>
          <Link to="/sponsor" className="py-1.5 px-2 text-[#005EFF] font-bold hover:text-[#F40260] transition-colors flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Sponsor</span>
          </Link>
          <Link to="/#brands-2025" className="py-1.5 px-1 text-black hover:text-[#005EFF] transition-colors">2025 Brands</Link>
          <Link to="/#gallery-2025" className="py-1.5 px-1 text-black hover:text-[#005EFF] transition-colors">Gallery</Link>
          <Link to="/#agenda" className="py-1.5 px-1 text-black hover:text-[#005EFF] transition-colors">Agenda</Link>
          <Link to="/#app" className="py-1.5 px-1 text-black hover:text-[#005EFF] transition-colors">Event App</Link>
          <Link to="/#tickets" className="py-1.5 px-1 text-black hover:text-[#005EFF] transition-colors">Passes</Link>
          <Link to="/posts" className="py-1.5 px-1 text-black hover:text-[#005EFF] transition-colors">News</Link>
        </nav>

        <div className="flex flex-col items-center lg:items-end gap-1.5 text-black">
          <div className="text-black">© {YEAR} International Commodity Summit. All rights reserved.</div>
          <div className="font-semibold text-black flex items-center gap-1.5 text-xs">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-[#F40260] text-[#F40260] inline-block shrink-0" aria-label="love" />
            <span>by</span>
            <a 
              href="https://hibarri.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-black hover:underline font-bold"
            >
              Hibarri
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
