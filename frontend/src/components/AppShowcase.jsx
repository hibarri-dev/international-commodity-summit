import React, { useState } from 'react';
import { 
  Calendar, 
  MessageSquare, 
  QrCode, 
  Radio, 
  Users, 
  CheckCircle2, 
  Bell, 
  Compass, 
  Download,
  Sparkles
} from 'lucide-react';

export default function AppShowcase() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handlePreRegister = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section id="app" className="relative z-10 py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Feature Details (7 cols) */}
          <div className="lg:col-span-7">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#F40260] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#F40260]" />
              Official Delegate Experience Platform
            </div>

            <h2 className="font-heading font-black text-2xl min-[360px]:text-3xl min-[480px]:text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.12] sm:leading-[1.08] mb-4">
              THE SUMMIT APP:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005EFF] to-[#F40260] block sm:inline">
                “All Access on 28 October 2026”
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg mb-8 leading-relaxed">
              Your real-time digital command center for the International Commodity Summit in New York. 
              Confirmed delegates receive complete early access on <strong>October 28, 2026</strong> to pre-book 1-on-1 bilateral deal rooms, customize plenary schedules, and connect with 3,500+ participants before setting foot in the Meadowlands Exhibition Center.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-[#005EFF]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005EFF] flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-slate-900 text-base mb-1">
                  Interactive 3D Floorplan & GPS
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Turn-by-turn guidance to 88+ exhibition booths, plenary stages, VIP meeting rooms, and coffee stations.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-[#F40260]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#F40260] flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-slate-900 text-base mb-1">
                  AI Bilateral Dealmaker
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Filter attendees by physical commodity (Energy, Metals, Agri, Finance) and book dedicated 20-min bilateral tables.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-[#005EFF]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005EFF] flex items-center justify-center mb-3">
                  <QrCode className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-slate-900 text-base mb-1">
                  Digital Fast-Track NFC Badge
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Seamless touchless check-in at Meadowlands East Entrance. Zero queuing, instant lanyard issuance.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-[#F40260]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#F40260] flex items-center justify-center mb-3">
                  <Bell className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-slate-900 text-base mb-1">
                  Live Keynote Q&A & Alerts
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submit live questions to plenary panelists and receive push notifications 10 minutes before sessions start.
                </p>
              </div>
            </div>

            {/* Email pre-notification capture */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#F40260]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Pre-Register for App Access Link
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Be notified the instant download links go live on October 28, 2026.
              </p>
              {subscribed ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>You're registered! Your VIP invitation and download credentials will arrive on October 28, 2026.</span>
                </div>
              ) : (
                <form onSubmit={handlePreRegister} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter delegate corporate email..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-sm focus:outline-none focus:border-[#005EFF]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] shadow-sm hover:opacity-95 transition-opacity cursor-pointer shrink-0 min-h-[44px]"
                  >
                    Notify Me Oct 28
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Phone Mockup (5 cols) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-[280px] min-[360px]:max-w-[310px] min-[400px]:max-w-[340px]">
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#005EFF]/20 to-[#F40260]/20 rounded-[48px] blur-2xl pointer-events-none" />

              {/* Realistic Mobile Device Frame */}
              <div className="relative bg-slate-900 rounded-[40px] sm:rounded-[44px] p-3 sm:p-3.5 shadow-2xl border-4 border-slate-700">
                {/* Speaker notch / dynamic island */}
                <div className="absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 sm:h-5 bg-black rounded-full z-20 flex items-center justify-end pr-2">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-800" />
                </div>

                {/* Inner Screen */}
                <div className="bg-slate-950 rounded-[30px] sm:rounded-[34px] overflow-hidden text-white pt-7 sm:pt-8 pb-4 px-3.5 sm:px-4 flex flex-col justify-between min-h-[500px]">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-[11px] text-white/60 mb-3 px-2">
                    <span className="font-semibold">09:41</span>
                    <span className="font-bold tracking-widest text-[#F40260]">5G • 100%</span>
                  </div>

                  {/* App Header */}
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                    <div>
                      <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
                        Official Event App
                      </div>
                      <div className="font-heading font-black text-sm tracking-tight text-white">
                        ICS New York 2027
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#005EFF] to-[#F40260] flex items-center justify-center text-xs font-bold">
                      ICS
                    </div>
                  </div>

                  {/* Banner: All Access Date */}
                  <div className="bg-gradient-to-r from-[#005EFF] to-[#F40260] rounded-2xl p-3 mb-3 shadow-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="bg-white/25 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                        Launch Date
                      </span>
                      <span className="text-[10px] text-white/90 font-bold">Confirmed</span>
                    </div>
                    <div className="font-heading font-black text-sm text-white leading-tight">
                      ALL ACCESS ON 28 OCTOBER 2026
                    </div>
                    <div className="text-[10px] text-white/80 mt-0.5">
                      18 Days of Pre-Event Networking
                    </div>
                  </div>

                  {/* Mock NFC Digital Badge Card */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-[#005EFF]" />
                        <span className="text-[11px] font-bold text-white">Digital Pass</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                        NFC Active
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-300">
                      Clayton Vance • Mercuria Energy
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Tier: All Access Executive Pass
                    </div>
                  </div>

                  {/* Today's Up Next Panel */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 mb-3">
                    <div className="text-[9px] font-bold uppercase text-[#005EFF] mb-1">
                      Up Next on Main Stage:
                    </div>
                    <div className="font-heading font-bold text-xs text-white leading-snug mb-1">
                      US Energy Dominance & LNG Corridor
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span>11:15 AM • Plenary Hall</span>
                      <span className="text-pink-400 font-bold">120 in audience</span>
                    </div>
                  </div>

                  {/* App Bottom Navigation Bar */}
                  <div className="bg-white/10 rounded-2xl p-2 flex items-center justify-around text-white/70">
                    <div className="flex flex-col items-center text-[#005EFF]">
                      <Calendar className="w-4 h-4" />
                      <span className="text-[8px] font-bold mt-0.5">Agenda</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Compass className="w-4 h-4" />
                      <span className="text-[8px] font-medium mt-0.5">Floorplan</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Users className="w-4 h-4" />
                      <span className="text-[8px] font-medium mt-0.5">Matches</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-[8px] font-medium mt-0.5">Messages</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtitle Badge below phone */}
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Download className="w-3.5 h-3.5 text-[#005EFF]" />
                  Available on iOS & Android • Oct 28, 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
