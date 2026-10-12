import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { tickets } from '../data/summitData';

export default function Tickets({ onSelectTicket }) {
  return (
    <section id="tickets" className="relative z-10 py-16 sm:py-24 bg-[#090a12] border-t border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#7a2fd6] mb-3">Registration & Pricing</h2>
          <h3 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Select Your Summit Pass
          </h3>
          <p className="text-slate-400 text-base sm:text-lg">
            Official conference passes for delegates, institutional investors, and C-level executive delegations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tickets.map((t) => (
            <div 
              key={t.id} 
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                t.popular 
                  ? 'bg-[#121526] border-2 border-[#7a2fd6] shadow-2xl shadow-[#7a2fd6]/20' 
                  : 'bg-[#101322] border border-white/10 hover:border-white/20'
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3.5 right-6 sm:right-8 bg-gradient-to-r from-[#1863dc] to-[#e01377] text-white text-xs font-heading font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  {t.badge}
                </span>
              )}

              <div>
                <h4 className="font-heading font-black text-2xl text-white mb-2">{t.name}</h4>
                <p className="text-xs text-slate-400 mb-6 min-h-[36px]">{t.description}</p>
                
                <div className="mb-8">
                  <div className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">
                    {t.priceFormatted}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Per delegate • All 3 days inclusive</span>
                </div>

                <div className="space-y-3 mb-8">
                  {t.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#1863dc] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onSelectTicket(t)}
                className={`w-full py-4 rounded-xl font-heading font-black text-sm uppercase tracking-wider transition-all cursor-pointer ${
                  t.popular 
                    ? 'bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377] text-white shadow-lg shadow-[#7a2fd6]/30 hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-white/10 hover:bg-white/15 text-white'
                }`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center text-xs text-slate-400 leading-relaxed">
          Need group bookings (3+ delegates) or sovereign delegation assistance? Contact{' '}
          <a
            href="mailto:registration@internationalcommoditysummit.com"
            className="text-white font-medium underline-offset-2 hover:underline break-all"
          >
            registration@internationalcommoditysummit.com
          </a>
        </div>
      </div>
    </section>
  );
}
