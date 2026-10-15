import React from 'react';
import { CheckCircle2, Ticket } from 'lucide-react';
import { tickets } from '../data/summitData';

export default function Tickets({ onSelectTicket }) {
  return (
    <section id="tickets" className="relative z-10 py-16 sm:py-24 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#005EFF] border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Ticket className="w-3.5 h-3.5" />
            Official Conference Registration
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight mb-4">
            Select Your Summit Pass
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Official conference passes for delegates, institutional investors, trading desks, and executive delegations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {tickets.map((t) => (
            <div 
              key={t.id} 
              className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-9 flex flex-col justify-between transition-all ${
                t.popular 
                  ? 'bg-gradient-to-b from-blue-50/40 via-white to-pink-50/30 border-2 border-[#005EFF] shadow-xl shadow-[#005EFF]/10' 
                  : 'bg-white border border-slate-200 shadow-xs hover:shadow-md'
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3.5 right-6 sm:right-8 bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white text-[10px] sm:text-xs font-heading font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                  {t.badge}
                </span>
              )}

              <div>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 mb-2">{t.name}</h3>
                <p className="text-xs text-slate-600 mb-5 min-h-[32px] sm:min-h-[36px] leading-relaxed">{t.description}</p>
                
                <div className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-100">
                  <div className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight">
                    {t.priceFormatted}
                  </div>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-semibold">Per delegate • All 3 days inclusive • New York</span>
                </div>

                <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {t.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-[#005EFF] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onSelectTicket(t)}
                className={`w-full py-3.5 sm:py-4 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[48px] flex items-center justify-center ${
                  t.popular 
                    ? 'bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white shadow-md hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center text-xs text-slate-500 leading-relaxed max-w-xl mx-auto">
          Need group delegation bookings (3+ passes) or sovereign official registration assistance? Contact{' '}
          <a
            href="mailto:registration@internationalcommoditysummit.com"
            className="text-[#005EFF] font-bold underline underline-offset-2 hover:text-[#F40260] break-all"
          >
            registration@internationalcommoditysummit.com
          </a>
        </div>
      </div>
    </section>
  );
}
