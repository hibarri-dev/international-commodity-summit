import React from 'react';
import { Calendar, MapPin, ArrowRight, Sparkles, Globe2 } from 'lucide-react';
import { eventDetails } from '../data/summitData';

export default function Hero() {
  return (
    <section id="about" className="relative z-10 pt-10 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 max-w-full px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 border border-blue-200 text-[#005EFF] mb-6 sm:mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#F40260]" />
          <span className="text-[11px] min-[360px]:text-xs sm:text-sm font-bold tracking-wide">
            The Landmark Gathering of Global Physical Commodity Leaders
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-heading font-black text-2xl min-[360px]:text-3xl min-[480px]:text-4xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900 max-w-5xl mx-auto leading-[1.12] sm:leading-[1.08] mb-5 sm:mb-6 break-words">
          WHERE GLOBAL{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005EFF] to-[#F40260]">
            COMMODITIES
          </span>{' '}
          SHAPE THE NEXT DECADE.
        </h1>

        <p className="max-w-3xl mx-auto text-slate-600 text-sm sm:text-lg lg:text-xl font-normal mb-8 sm:mb-10 leading-relaxed px-2">
          Join 3,500+ energy giants, agricultural syndicates, critical mineral miners, logistics leaders, and institutional commodity financiers at the Meadowlands Exhibition Center in New York.
        </p>

        {/* Event Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-6 text-xs sm:text-sm font-semibold text-slate-700 mb-8 sm:mb-12">
          <div className="flex items-center gap-2 bg-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-slate-200 shadow-xs">
            <Calendar className="w-4 h-4 shrink-0 text-[#005EFF]" />
            <span>{eventDetails.dates}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-slate-200 shadow-xs text-left">
            <MapPin className="w-4 h-4 shrink-0 text-[#F40260]" />
            <span>{eventDetails.venue}, {eventDetails.location}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-slate-200 shadow-xs">
            <Globe2 className="w-4 h-4 shrink-0 text-[#005EFF]" />
            <span>60+ Nations Represented</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-18 max-w-xl sm:max-w-none mx-auto">
          <a 
            href="#tickets"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-heading font-black text-sm sm:text-base text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] shadow-lg shadow-[#005EFF]/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[48px]"
          >
            <span>Secure Passes — From $1,270</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="#floorplan"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-heading font-bold text-sm sm:text-base text-slate-800 bg-white border border-slate-300 shadow-xs hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-2 min-h-[48px]"
          >
            <span>View Floorplan & Stage</span>
          </a>
          <a 
            href="#sponsorship"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-heading font-bold text-sm sm:text-base text-[#005EFF] bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all flex items-center justify-center gap-2 min-h-[48px]"
          >
            <span>Sponsorship Packages</span>
          </a>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
          {eventDetails.stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#005EFF]/40 transition-all text-center flex flex-col justify-center"
            >
              <div className="font-heading font-black text-2xl min-[360px]:text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#005EFF] to-[#F40260] mb-1">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-sm text-slate-600 font-semibold leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
