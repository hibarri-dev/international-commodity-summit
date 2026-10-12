import React from 'react';
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { eventDetails } from '../data/summitData';

export default function Hero() {
  return (
    <section id="about" className="relative z-10 pt-12 pb-16 sm:pt-16 sm:pb-24 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 max-w-full px-4 py-1.5 rounded-2xl sm:rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 sm:mb-8">
          <Sparkles className="w-4 h-4 shrink-0 text-[#e01377]" />
          <span className="text-[11px] sm:text-sm font-semibold tracking-wide text-slate-200">
            The Premier Gathering of Global Physical Commodity Leaders
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-heading font-black text-[2rem] leading-[1.1] min-[400px]:text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white max-w-5xl mx-auto sm:leading-[1.08] mb-5 sm:mb-6 break-words">
          WHERE GLOBAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377]">COMMODITIES</span> SHAPE THE NEXT DECADE.
        </h1>

        <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg lg:text-xl font-normal mb-8 sm:mb-10 leading-relaxed">
          Join 3,500+ energy giants, agricultural syndicates, critical mineral miners, and top trade financiers at the landmark summit in New York.
        </p>

        {/* Event Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 text-sm font-medium text-slate-300 mb-10 sm:mb-12">
          <div className="flex items-center gap-2 bg-[#121526]/80 px-4 py-2 rounded-xl border border-white/10">
            <Calendar className="w-4 h-4 shrink-0 text-[#7a2fd6]" />
            <span>{eventDetails.dates}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#121526]/80 px-4 py-2 rounded-xl border border-white/10 text-left">
            <MapPin className="w-4 h-4 shrink-0 text-[#e01377]" />
            <span>{eventDetails.venue}, {eventDetails.location}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-20">
          <a 
            href="#tickets"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-black text-base text-white bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377] shadow-xl shadow-[#7a2fd6]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Secure Passes — From $1,270</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="#agenda"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-bold text-base text-slate-200 bg-white/5 border border-white/15 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <span>Explore 3-Day Agenda</span>
          </a>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
          {eventDetails.stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-[#121526]/70 backdrop-blur-md rounded-2xl px-3 py-5 sm:p-6 border border-white/10 hover:border-[#7a2fd6]/40 transition-all text-center"
            >
              <div className="font-heading font-black text-2xl min-[400px]:text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#1863dc] mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
