import React from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative z-10 bg-slate-50 border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
        <div className="flex items-center gap-3">
          <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-r from-[#005EFF] to-[#F40260] flex items-center justify-center shadow-md">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <span className="font-heading font-black text-slate-900 block tracking-tight text-sm">
              INTERNATIONAL COMMODITY SUMMIT 2027
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Meadowlands Exhibition Center • New York</span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 font-medium text-xs">
          <Link to="/#about" className="py-1.5 px-1 hover:text-[#005EFF] transition-colors">About</Link>
          <Link to="/#panels" className="py-1.5 px-1 hover:text-[#005EFF] transition-colors">Panels</Link>
          <Link to="/#floorplan" className="py-1.5 px-1 hover:text-[#005EFF] transition-colors">Floorplan</Link>
          <Link to="/#brands-2025" className="py-1.5 px-1 hover:text-[#005EFF] transition-colors">2025 Brands</Link>
          <Link to="/#app" className="py-1.5 px-1 hover:text-[#005EFF] transition-colors">Official App</Link>
          <Link to="/#sponsorship" className="py-1.5 px-1 hover:text-[#005EFF] transition-colors">Sponsorship</Link>
          <Link to="/#agenda" className="py-1.5 px-1 hover:text-[#005EFF] transition-colors">Agenda</Link>
          <Link to="/#tickets" className="py-1.5 px-1 hover:text-[#005EFF] transition-colors">Passes</Link>
          <Link to="/posts" className="py-1.5 px-1 hover:text-[#005EFF] transition-colors">News</Link>
        </nav>

        <div className="flex flex-col items-center lg:items-end gap-1.5">
          <div className="text-slate-500">© {YEAR} International Commodity Summit. All rights reserved.</div>
          <div className="font-semibold text-slate-700 flex items-center gap-1.5 text-xs">
            <span>Made with</span>
            <span className="text-[#F40260] font-bold inline-flex items-center">
              &lt;3
            </span>
            <span>by</span>
            <a 
              href="https://hibarri.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#005EFF] hover:underline font-bold"
            >
              Hibarri
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
