import React, { useState } from 'react';
import { Clock, CalendarDays, Coffee, Sparkles } from 'lucide-react';
import { agendaSchedule } from '../data/summitData';

export default function Agenda() {
  const [activeDay, setActiveDay] = useState("Day 1");
  const currentAgenda = agendaSchedule.find((a) => a.day === activeDay) || agendaSchedule[0];
  const dayTracks = [...new Set(currentAgenda.sessions.map((s) => s.track).filter(Boolean))];

  return (
    <section id="agenda" className="relative z-10 py-16 sm:py-24 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#005EFF] border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3">
            <CalendarDays className="w-3.5 h-3.5" />
            3-Day Executive Program
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight mb-4">
            Official Summit Agenda
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Nov 15 - 17, 2027 • Meadowlands Exhibition Center, New York
          </p>
        </div>

        {/* Day Switcher */}
        <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-center sm:gap-4 mb-6 sm:mb-10">
          {agendaSchedule.map((day) => (
            <button 
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              aria-pressed={activeDay === day.day}
              className={`px-2 min-[380px]:px-3 sm:px-7 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-heading font-black text-xs sm:text-sm transition-all cursor-pointer min-h-[44px] ${
                activeDay === day.day 
                  ? 'bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white shadow-md' 
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{day.day}</span>
              <span className="block text-[10px] min-[380px]:text-[11px] font-normal opacity-90">{day.date}</span>
            </button>
          ))}
        </div>

        {/* Theme Banner */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50/70 via-slate-50 to-pink-50/70 border border-slate-200 mb-6 sm:mb-8 text-center text-xs sm:text-sm font-semibold text-slate-700 shadow-xs">
          Day Focus: <span className="text-[#005EFF] font-bold block sm:inline mt-0.5 sm:mt-0">{dayTracks.join(' · ')}</span>
        </div>

        {/* Session Timeline */}
        <div className="space-y-3 sm:space-y-4">
          {currentAgenda.sessions.map((sess, idx) => {
            if (sess.type === 'break') {
              return (
                <div
                  key={idx}
                  className="rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 bg-slate-50 border border-dashed border-slate-200 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm"
                >
                  <span className="flex items-center gap-1 text-slate-500 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    {sess.time}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Coffee className="w-3.5 h-3.5 text-slate-400" />
                    {sess.title}
                  </span>
                </div>
              );
            }

            const isVip = sess.type === 'vip';
            return (
              <div
                key={idx}
                className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 border shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${
                  isVip
                    ? 'bg-gradient-to-r from-blue-50/70 to-pink-50/70 border-[#F40260]/30 hover:border-[#F40260]/50'
                    : 'bg-white border-slate-200 hover:border-[#005EFF]/40'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold mb-2">
                    <span className="flex items-center gap-1 text-[#005EFF] font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      {sess.time}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
                      isVip ? 'bg-[#F40260] text-white' : 'bg-blue-50 text-[#005EFF] border border-blue-100'
                    }`}>
                      {isVip ? (
                        <span className="inline-flex items-center gap-1"><Sparkles className="w-3 h-3" />VIP</span>
                      ) : sess.track}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900">{sess.title}</h4>
                </div>
                <a
                  href="#tickets"
                  className="w-full sm:w-auto text-center shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors min-h-[38px] flex items-center justify-center"
                >
                  {isVip ? 'Get VIP Pass' : 'Reserve Seat'}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
