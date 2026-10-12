import React from 'react';
import { brands } from '../data/summitData';

export default function BrandsAttending() {
  return (
    <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 sm:mb-8">
          Represented by Trading Desks, Mining Houses & Major Financial Institutions
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {brands.map((brand, idx) => (
            <div 
              key={idx} 
              className="min-w-0 bg-[#121526]/50 rounded-xl px-3 py-4 sm:p-5 border border-white/5 flex flex-col items-center justify-center text-center hover:bg-[#181d33] hover:border-white/20 transition-all"
            >
              <span className="max-w-full font-heading font-black text-base min-[400px]:text-lg sm:text-xl text-slate-200 tracking-wide mb-1 break-words">{brand.name}</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">{brand.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
