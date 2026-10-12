import React from 'react';
import { Wheat, Layers, Flame, Landmark, Ship, Cpu, ArrowRight } from 'lucide-react';
import { industries } from '../data/summitData';

export default function Industries() {
  const getIcon = (id) => {
    switch (id) {
      case 'agri': return <Wheat className="w-6 h-6 text-[#7a2fd6]" />;
      case 'metals': return <Layers className="w-6 h-6 text-[#1863dc]" />;
      case 'energy': return <Flame className="w-6 h-6 text-[#e01377]" />;
      case 'finance': return <Landmark className="w-6 h-6 text-[#1863dc]" />;
      case 'logistics': return <Ship className="w-6 h-6 text-[#7a2fd6]" />;
      case 'tech': return <Cpu className="w-6 h-6 text-[#e01377]" />;
      default: return <Layers className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section id="industries" className="relative z-10 py-16 sm:py-20 bg-[#0e111d]/90 border-y border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#7a2fd6] mb-3">Sectors in Focus</h2>
          <h3 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Industries Joining the Summit
          </h3>
          <p className="text-slate-400 text-base sm:text-lg">
            Covering the entire macro lifecycle of critical resources, supply channels, and international commercial exchange.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {industries.map((ind) => (
            <div 
              key={ind.id} 
              className="group relative bg-[#131627] rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-[#7a2fd6]/50 transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1863dc]/20 via-[#7a2fd6]/20 to-[#e01377]/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {getIcon(ind.id)}
              </div>
              <h4 className="font-heading font-bold text-xl text-white mb-2">{ind.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{ind.description}</p>
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-slate-300">{ind.metrics}</span>
                <span className="text-[#e01377] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Track <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
