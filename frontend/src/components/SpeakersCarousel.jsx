import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { speakers } from '../data/summitData';

export default function SpeakersCarousel() {
  const [speakerIndex, setSpeakerIndex] = useState(0);

  const nextSpeaker = () => {
    setSpeakerIndex((prev) => (prev + 1) % speakers.length);
  };
  const prevSpeaker = () => {
    setSpeakerIndex((prev) => (prev - 1 + speakers.length) % speakers.length);
  };

  return (
    <section id="speakers" className="relative z-10 py-24 bg-[#0a0c16] border-t border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#e01377] mb-3">Distinguished Faculty</h2>
            <h3 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Featured Keynotes & Panelists
            </h3>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button 
              onClick={prevSpeaker} 
              className="w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Previous speaker"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSpeaker} 
              className="w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Next speaker"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((offset) => {
            const item = speakers[(speakerIndex + offset) % speakers.length];
            return (
              <div 
                key={item.id} 
                className="bg-[#121526] rounded-2xl overflow-hidden border border-white/10 hover:border-[#7a2fd6]/50 transition-all flex flex-col group"
              >
                <div className="relative h-72 w-full overflow-hidden bg-slate-900">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121526] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-[#7a2fd6]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.track}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading font-black text-2xl text-white mb-1">{item.name}</h4>
                    <p className="text-sm font-semibold text-[#1863dc] mb-1">{item.title}</p>
                    <p className="text-xs text-slate-400 mb-4">{item.organization}</p>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 italic">
                      "{item.topic}"
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {speakers.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setSpeakerIndex(i)} 
              className={`h-2 rounded-full transition-all cursor-pointer ${speakerIndex === i ? 'w-8 bg-gradient-to-r from-[#1863dc] to-[#e01377]' : 'w-2 bg-white/20'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
