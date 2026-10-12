import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { agendaSchedule } from '../data/summitData';

export default function Agenda() {
  const [activeDay, setActiveDay] = useState("Day 1");
  const currentAgenda = agendaSchedule.find((a) => a.day === activeDay) || agendaSchedule[0];

  return (
    <section id="agenda" className="relative z-10 py-16 sm:py-24 bg-[#0e111d] border-t border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#1863dc] mb-3">Schedule of Events</h2>
          <h3 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Comprehensive 3-Day Summit Agenda
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">
            Nov 15 - 17, 2027 • Meadowlands Exhibition Center, New York
          </p>
        </div>

        {/* Day Switcher */}
        <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-center sm:gap-3 mb-6 sm:mb-10">
          {agendaSchedule.map((day) => (
            <button 
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              aria-pressed={activeDay === day.day}
              className={`px-2 sm:px-6 py-3 rounded-xl font-heading font-bold text-sm transition-all cursor-pointer ${
                activeDay === day.day 
                  ? 'bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377] text-white shadow-lg shadow-[#7a2fd6]/25' 
                  : 'bg-[#121526] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <span>{day.day}</span>
              <span className="block text-[11px] font-normal opacity-80">{day.date}</span>
            </button>
          ))}
        </div>

        {/* Theme Banner */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-6 text-center text-sm font-semibold text-slate-300">
          Theme Focus: <span className="text-[#e01377]">{currentAgenda.focus}</span>
        </div>

        {/* Session Timeline */}
        <div className="space-y-4">
          {currentAgenda.sessions.map((sess, idx) => (
            <div 
              key={idx} 
              className="bg-[#121526] rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-[#7a2fd6]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-semibold mb-2">
                  <span className="flex items-center gap-1 text-[#1863dc]">
                    <Clock className="w-3.5 h-3.5" />
                    {sess.time}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium">
                    {sess.type}
                  </span>
                  <span className="text-slate-400">
                    • {sess.location}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-lg text-white mb-1">{sess.title}</h4>
                {sess.speaker && (
                  <p className="text-xs text-slate-400 font-medium">
                    Featured: <span className="text-slate-300">{sess.speaker}</span>
                  </p>
                )}
              </div>
              <a 
                href="#tickets"
                className="self-start sm:self-center shrink-0 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                Reserve Seat
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
