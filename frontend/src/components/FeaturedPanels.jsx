import React from 'react';
import { Flame, Layers, Wheat, Cpu, Ship, Clock, ArrowUpRight, Sparkles } from 'lucide-react';

export const featuredPanels = [
  {
    id: "panel-energy",
    title: "US Energy Dominance & The Transatlantic LNG Bridge",
    track: "Energy & LNG",
    badgeColor: "bg-blue-100 text-[#005EFF]",
    icon: Flame,
    format: "Plenary Executive Panel",
    duration: "75 Minutes",
    day: "Day 1 • 11:15 AM",
    room: "Grand Plenary Hall",
    description: "Analyzing Gulf Coast liquefaction terminal expansions, European baseline energy commitments, pipeline midstream constraints, and price arbitrage between Henry Hub and TTF.",
    keyTakeaways: [
      "Gulf Coast export capacity scaling through 2030",
      "Long-term transatlantic offtake contract structures",
      "Midstream pipeline permitting & debottlenecking",
      "Methane intensity monitoring & low-carbon LNG premiums"
    ]
  },
  {
    id: "panel-minerals",
    title: "Critical Minerals & Defense Supply Chain Independence",
    track: "Critical Minerals & Defense",
    badgeColor: "bg-pink-100 text-[#F40260]",
    icon: Layers,
    format: "Policy & Sovereign Investment Panel",
    duration: "75 Minutes",
    day: "Day 1 • 02:00 PM",
    room: "Metals & Mining Auditorium",
    description: "Addressing North American refining bottlenecks for rare earths, lithium, copper, and cobalt under Defense Production Act authorities and Inflation Reduction Act domestic sourcing mandates.",
    keyTakeaways: [
      "Allied supply-chain friend-shoring with Canada & Australia",
      "Strategic national defense mineral stockpile reserves",
      "Downstream processing & cathode active material (CAM) plants",
      "Private equity & sovereign debt financing for greenfield mines"
    ]
  },
  {
    id: "panel-agri",
    title: "US Agricultural Corridors & Global Food Security",
    track: "Agriculture & Food Security",
    badgeColor: "bg-emerald-100 text-emerald-700",
    icon: Wheat,
    format: "Strategic Roundtable",
    duration: "60 Minutes",
    day: "Day 2 • 09:30 AM",
    room: "Agri-Trade Concourse",
    description: "Examining Mississippi River barge draught risks, Class-I railroad network velocity, grain and soy export dynamics, and hedging volatility across Chicago Board of Trade futures.",
    keyTakeaways: [
      "Midwest agricultural logistics & export corridor investments",
      "Feedstock competition between renewable diesel and food supply",
      "Global fertilizer supply lines & ammonia trade shifts",
      "Algorithmic weather modeling & basis risk hedging"
    ]
  },
  {
    id: "panel-trading",
    title: "Algorithmic Commodity Trading, AI & Financial Hedging",
    track: "FinTech & Quantitative Markets",
    badgeColor: "bg-purple-100 text-purple-700",
    icon: Cpu,
    format: "Quantitative Deep-Dive",
    duration: "60 Minutes",
    day: "Day 2 • 01:45 PM",
    room: "FinTech & Risk Theater",
    description: "How quantitative funds, physical commodity merchants, and corporate treasuries deploy satellite imagery telemetry, vessel tracking AI, and automated liquidity algorithms.",
    keyTakeaways: [
      "Satellite radar & optical tracking of global stockpiles",
      "High-frequency algorithmic execution on CME & ICE",
      "Alternative trade finance vehicles & private credit syndicates",
      "Cross-commodity spread strategies & volatility surface shifts"
    ]
  },
  {
    id: "panel-logistics",
    title: "Maritime Logistics, Port Automation & Intermodal Freight",
    track: "Freight & Infrastructure",
    badgeColor: "bg-cyan-100 text-cyan-800",
    icon: Ship,
    format: "Logistics Masterclass",
    duration: "60 Minutes",
    day: "Day 3 • 10:00 AM",
    room: "Supply Chain Pavilion",
    description: "Evaluating East Coast and Gulf port crane electrification, Panama Canal transit predictability, rail-to-ship intermodal transfers, and IMO dual-fuel vessel transition economics.",
    keyTakeaways: [
      "Intermodal dwell time reduction at North American ports",
      "Panama Canal drought hedging and route diversion strategies",
      "Dual-fuel container & bulk carrier capital deployment",
      "Next-generation digital bills of lading & customs clearing"
    ]
  },
  {
    id: "panel-clean-industry",
    title: "Industrial Decarbonization & Clean Hydrogen Corridors",
    track: "Clean Energy & Carbon",
    badgeColor: "bg-amber-100 text-amber-800",
    icon: Sparkles,
    format: "Executive Strategy Panel",
    duration: "60 Minutes",
    day: "Day 3 • 11:30 AM",
    room: "Grand Plenary Hall",
    description: "Assessing clean hydrogen production hubs, carbon capture and storage (CCS) clusters in the Gulf Coast, and verifiable low-carbon commodity premiums.",
    keyTakeaways: [
      "Clean hydrogen production tax credit qualification models",
      "Class VI well permitting and deep geological CO₂ sequestration",
      "Green steel and low-carbon cement commercial offtake contracts",
      "Voluntary carbon removals vs. regulated compliance allowances"
    ]
  }
];

export default function FeaturedPanels() {
  return (
    <section id="panels" className="relative z-10 py-16 sm:py-24 bg-slate-50 border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#005EFF] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Executive Debates & Keynote Dialogues
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight mb-4">
            Featured Plenary Panels
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            High-level policy, trading, and supply chain debates uniting physical producers, C-suite executives, and institutional investors on the main stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {featuredPanels.map((panel) => {
            return (
              <div
                key={panel.id}
                className="group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs hover:shadow-lg hover:border-[#005EFF]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-5">
                    <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold ${panel.badgeColor}`}>
                      {panel.track}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {panel.duration}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900 mb-2.5 sm:mb-3 group-hover:text-[#005EFF] transition-colors leading-snug">
                    {panel.title}
                  </h3>

                  <div className="text-xs font-semibold text-slate-500 mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-slate-700">{panel.day}</span>
                    <span className="hidden min-[400px]:inline">•</span>
                    <span className="text-[#005EFF]">{panel.room}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {panel.description}
                  </p>

                  <div className="border-t border-slate-100 pt-4 mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                      Core Topics Discussed:
                    </h4>
                    <ul className="space-y-1.5">
                      {panel.keyTakeaways.slice(0, 3).map((takeaway, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F40260] mt-1.5 shrink-0" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{panel.format}</span>
                  <a
                    href="#agenda"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#005EFF] group-hover:text-[#F40260] transition-colors"
                  >
                    <span>Full Schedule</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center bg-white rounded-2xl p-6 border border-slate-200 shadow-sm max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-slate-800 mb-1">
            Interested in participating as a panel moderator or industry panelist?
          </p>
          <p className="text-xs text-slate-500 mb-4">
            Corporate delegations and industry leaders can enquire for remaining session allocations.
          </p>
          <a
            href="#sponsorship"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] shadow-sm hover:shadow-md transition-all"
          >
            <span>Explore Panel & Sponsorship Allotments</span>
          </a>
        </div>
      </div>
    </section>
  );
}
