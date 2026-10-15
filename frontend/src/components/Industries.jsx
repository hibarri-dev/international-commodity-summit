import React from 'react';
import { Wheat, Layers, Flame, Landmark, Ship, Cpu, ArrowRight } from 'lucide-react';
import { industries } from '../data/summitData';

export default function Industries() {
  const getIcon = (id) => {
    switch (id) {
      case 'agri': return <Wheat className="w-6 h-6 text-[#005EFF]" />;
      case 'metals': return <Layers className="w-6 h-6 text-[#F40260]" />;
      case 'energy': return <Flame className="w-6 h-6 text-[#005EFF]" />;
      case 'finance': return <Landmark className="w-6 h-6 text-[#F40260]" />;
      case 'logistics': return <Ship className="w-6 h-6 text-[#005EFF]" />;
      case 'tech': return <Cpu className="w-6 h-6 text-[#F40260]" />;
      default: return <Layers className="w-6 h-6 text-[#005EFF]" />;
    }
  };

  return (
    <section id="industries" className="relative z-10 py-16 sm:py-24 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#005EFF] mb-3">Sectors in Focus</h2>
          <h3 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight mb-4">
            Critical Commodity Sectors
          </h3>
          <p className="text-slate-600 text-base sm:text-lg">
            Covering the entire physical macro lifecycle of critical resources, strategic supply corridors, and international commercial exchange.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <div 
              key={ind.id} 
              className="group relative bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#005EFF]/50 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-pink-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {getIcon(ind.id)}
                </div>
                <h4 className="font-heading font-bold text-xl text-slate-900 mb-2">{ind.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{ind.description}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-slate-700">{ind.metrics}</span>
                <span className="text-[#005EFF] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Track <ArrowRight className="w-3 h-3 text-[#F40260]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
