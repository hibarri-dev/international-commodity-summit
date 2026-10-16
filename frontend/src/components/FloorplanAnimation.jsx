import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Users, 
  Tv, 
  Play, 
  Pause 
} from 'lucide-react';

const ZONES = [
  {
    id: 'stage',
    name: 'Main Keynote Stage',
    badge: 'Plenary Auditorium',
    capacity: '1,200 Seats',
    currentSession: 'US Energy Dominance & The Transatlantic LNG Bridge',
    color: '#005EFF',
    description: 'High-definition 4K LED broadcast stage hosting ministerial keynotes, plenary panels, and summit ceremonies.'
  },
  {
    id: 'expo-a',
    name: 'Energy & Metals Expo Pavilion',
    badge: 'Hall A • 48 Booths',
    capacity: '800 Delegates',
    currentSession: 'Live Technology Demonstrations & B2B Matchmaking',
    color: '#F40260',
    description: 'Showcasing LNG terminal operators, critical mineral producers, mining automation tech, and greenfield developers.'
  },
  {
    id: 'expo-b',
    name: 'Agri & Logistics Trade Floor',
    badge: 'Hall B • 40 Booths',
    capacity: '650 Delegates',
    currentSession: 'Global Supply Chain & Freight Solutions Showcase',
    color: '#005EFF',
    description: 'Agribusiness syndicates, dry bulk freight carriers, digital supply chain tracking, and export corridor operators.'
  },
  {
    id: 'lounge',
    name: 'Executive VIP & Networking Lounge',
    badge: 'Private Concierge',
    capacity: '250 Leaders',
    currentSession: '1-on-1 Bilateral Dealmaking & Barista Station',
    color: '#8b5cf6',
    description: 'Reserved executive sanctuary for C-level delegates and sovereign officials with private soundproof meeting suites.'
  },
  {
    id: 'foyer',
    name: 'Welcome Foyer & Registration',
    badge: 'East Entrance',
    capacity: '500 Delegates/hr',
    currentSession: 'Fast-Track NFC Badge Pickup & Summit Concierge',
    color: '#0ea5e9',
    description: 'Registration terminals, attendee information desks, digital interactive wayfinding totems, and coat check.'
  }
];

export default function FloorplanAnimation() {
  const [activeZone, setActiveZone] = useState(ZONES[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [attendeeCount, setAttendeeCount] = useState(1420);

  // Subtle attendee live ticker simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAttendeeCount((prev) => prev + (Math.random() > 0.45 ? 1 : -1));
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="floorplan" className="relative z-10 py-16 sm:py-24 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#005EFF] border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            Interactive Venue Simulation
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight mb-4">
            Conference Floorplan & Live Stage
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Meadowlands Exhibition Center • Experience our world-class layout featuring the 1,200-seat Plenary Stage, two trade pavilions, and executive networking suites.
          </p>
        </div>

        {/* Control Bar & Live Stats */}
        <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-200 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 shadow-xs transition-colors cursor-pointer min-h-[36px]"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#F40260]" /> Pause Motion
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#005EFF]" /> Resume Motion
                </>
              )}
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold min-h-[36px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Simulated Floor: {attendeeCount.toLocaleString()}</span>
            </div>
          </div>

          {/* Zone Selector Pills - smooth swipeable on mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
            {ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap text-xs shrink-0 min-h-[34px] ${
                  activeZone.id === zone.id
                    ? 'bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white shadow-xs font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {zone.name.split(' ')[0]} {zone.name.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>

        {/* Main Floorplan Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* SVG Floorplan Canvas (8 Cols) */}
          <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-3 sm:p-6 shadow-xl border border-slate-800 relative overflow-hidden">
            {/* Ambient Lighting Gradient */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#005EFF]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#F40260]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between text-white/70 text-xs font-semibold pb-3 mb-2 border-b border-white/10">
              <span className="flex items-center gap-2 text-[11px] sm:text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#005EFF] shrink-0" />
                Meadowlands Exhibition Floorplan
              </span>
              <span className="text-white/50 text-[11px] hidden sm:inline">Tap any zone to inspect</span>
              <span className="sm:hidden text-[10px] text-white/60 bg-white/10 px-2 py-0.5 rounded-full">Swipe floor ↔</span>
            </div>

            {/* Scrollable on small screens so text & booths never compress */}
            <div className="overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
              <div className="relative min-w-[620px] sm:min-w-full aspect-[16/10]">
              <svg
                viewBox="0 0 900 580"
                className="w-full h-full select-none font-sans"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))', fontFamily: "var(--font-sans)" }}
              >
                <defs>
                  {/* Stage Lighting Gradients */}
                  <linearGradient id="stageGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#005EFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#F40260" stopOpacity="0.4" />
                  </linearGradient>

                  <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#005EFF" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#F40260" />
                  </linearGradient>

                  {/* Wall pattern */}
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  </pattern>

                  {/* Pulse animations for attendees */}
                  <style>{`
                    @keyframes walkPath1 {
                      0% { transform: translate(70px, 480px); }
                      25% { transform: translate(250px, 480px); }
                      50% { transform: translate(250px, 320px); }
                      75% { transform: translate(450px, 320px); }
                      100% { transform: translate(70px, 480px); }
                    }
                    @keyframes walkPath2 {
                      0% { transform: translate(250px, 480px); }
                      30% { transform: translate(250px, 200px); }
                      60% { transform: translate(160px, 200px); }
                      85% { transform: translate(160px, 120px); }
                      100% { transform: translate(250px, 480px); }
                    }
                    @keyframes walkPath3 {
                      0% { transform: translate(500px, 480px); }
                      35% { transform: translate(500px, 260px); }
                      65% { transform: translate(720px, 260px); }
                      85% { transform: translate(720px, 160px); }
                      100% { transform: translate(500px, 480px); }
                    }
                    @keyframes walkPath4 {
                      0% { transform: translate(320px, 140px); }
                      50% { transform: translate(580px, 140px); }
                      100% { transform: translate(320px, 140px); }
                    }
                    @keyframes walkPath5 {
                      0% { transform: translate(650px, 360px); }
                      40% { transform: translate(800px, 360px); }
                      70% { transform: translate(800px, 480px); }
                      100% { transform: translate(650px, 360px); }
                    }
                    @keyframes stageBeam {
                      0% { opacity: 0.3; transform: scaleX(0.95); }
                      50% { opacity: 0.7; transform: scaleX(1.05); }
                      100% { opacity: 0.3; transform: scaleX(0.95); }
                    }
                    text {
                      font-family: var(--font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
                    }
                    .font-heading,
                    .font-spartan,
                    text[font-weight="bold"],
                    text[font-weight="semibold"] {
                      font-family: var(--font-spartan, 'League Spartan', -apple-system, BlinkMacSystemFont, sans-serif);
                    }
                    .walk-1 { animation: walkPath1 18s ease-in-out infinite; }
                    .walk-2 { animation: walkPath2 22s ease-in-out infinite; }
                    .walk-3 { animation: walkPath3 20s ease-in-out infinite; }
                    .walk-4 { animation: walkPath4 16s ease-in-out infinite; }
                    .walk-5 { animation: walkPath5 24s ease-in-out infinite; }
                    .stage-beam { animation: stageBeam 4s ease-in-out infinite alternate; transform-origin: center top; }
                  `}</style>
                </defs>

                {/* Grid Floor */}
                <rect width="900" height="580" fill="url(#grid)" />
                <rect x="20" y="20" width="860" height="540" rx="16" fill="#0f1424" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

                {/* ========================================================
                    1. MAIN KEYNOTE STAGE AREA (TOP LEFT / CENTER)
                ======================================================== */}
                <g 
                  onClick={() => setActiveZone(ZONES[0])}
                  className="cursor-pointer transition-opacity hover:opacity-95"
                >
                  {/* Stage Boundary */}
                  <rect 
                    x="40" 
                    y="40" 
                    width="440" 
                    height="230" 
                    rx="12" 
                    fill={activeZone.id === 'stage' ? '#182245' : '#131b36'} 
                    stroke={activeZone.id === 'stage' ? '#005EFF' : 'rgba(0,94,255,0.4)'} 
                    strokeWidth={activeZone.id === 'stage' ? '2.5' : '1.5'} 
                  />

                  {/* Stage Lighting Beams */}
                  <polygon 
                    points="260,65 140,150 380,150" 
                    fill="url(#stageGlow)" 
                    className="stage-beam"
                  />

                  {/* The Stage Platform */}
                  <rect x="150" y="55" width="220" height="42" rx="8" fill="#1e294b" stroke="#005EFF" strokeWidth="2" />
                  
                  {/* Digital LED Screen on Stage */}
                  <rect x="175" y="60" width="170" height="12" rx="3" fill="url(#screenGradient)" />
                  <text x="260" y="70" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                    ICS '27 KEYNOTE PLENARY
                  </text>

                  {/* Speaker on Podium */}
                  <circle cx="260" cy="85" r="5" fill="#F40260" />
                  <circle cx="260" cy="85" r="9" fill="none" stroke="#F40260" strokeWidth="1" opacity="0.8" />
                  <rect x="257" y="90" width="6" height="4" fill="#ffffff" />
                  
                  <text x="260" y="105" fill="#93c5fd" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Keynote Speaker Podium
                  </text>

                  {/* Seated Audience Rows */}
                  {[125, 150, 175, 200, 225].map((y, rowIdx) => (
                    <g key={rowIdx}>
                      {/* Left Block */}
                      <rect x="70" y={y} width="140" height="14" rx="3" fill="#1e2746" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                      {/* Left Seats dots */}
                      {[85, 105, 125, 145, 165, 185].map((x, seatIdx) => (
                        <circle key={seatIdx} cx={x} cy={y + 7} r="2.5" fill={seatIdx % 2 === 0 ? '#60a5fa' : '#f43f5e'} opacity="0.75" />
                      ))}

                      {/* Right Block */}
                      <rect x="310" y={y} width="140" height="14" rx="3" fill="#1e2746" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                      {/* Right Seats dots */}
                      {[325, 345, 365, 385, 405, 425].map((x, seatIdx) => (
                        <circle key={seatIdx} cx={x} cy={y + 7} r="2.5" fill={seatIdx % 2 === 0 ? '#f43f5e' : '#60a5fa'} opacity="0.75" />
                      ))}
                    </g>
                  ))}

                  {/* Stage Label */}
                  <rect x="55" y="48" width="105" height="20" rx="4" fill="#005EFF" />
                  <text x="107" y="62" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    MAIN STAGE (1,200)
                  </text>
                </g>

                {/* ========================================================
                    2. VIP & NETWORKING LOUNGE (TOP RIGHT)
                ======================================================== */}
                <g 
                  onClick={() => setActiveZone(ZONES[3])}
                  className="cursor-pointer transition-opacity hover:opacity-95"
                >
                  <rect 
                    x="510" 
                    y="40" 
                    width="350" 
                    height="190" 
                    rx="12" 
                    fill={activeZone.id === 'lounge' ? '#271d42' : '#1d1733'} 
                    stroke={activeZone.id === 'lounge' ? '#8b5cf6' : 'rgba(139,92,246,0.4)'} 
                    strokeWidth={activeZone.id === 'lounge' ? '2.5' : '1.5'} 
                  />

                  <rect x="525" y="48" width="140" height="20" rx="4" fill="#8b5cf6" />
                  <text x="595" y="62" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    VIP EXECUTIVE LOUNGE
                  </text>

                  {/* Coffee Bar Station */}
                  <rect x="530" y="80" width="120" height="30" rx="6" fill="#2d2250" stroke="#a78bfa" strokeWidth="1" />
                  <text x="590" y="98" fill="#e9d5ff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    ☕ Barista & Beverage Bar
                  </text>

                  {/* Private Meeting Pods */}
                  <rect x="670" y="80" width="80" height="40" rx="6" fill="#241b3d" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <text x="710" y="103" fill="#c4b5fd" fontSize="8" textAnchor="middle">Bilateral Suite 1</text>

                  <rect x="765" y="80" width="80" height="40" rx="6" fill="#241b3d" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <text x="805" y="103" fill="#c4b5fd" fontSize="8" textAnchor="middle">Bilateral Suite 2</text>

                  {/* Lounge Sofas / Networking Circles */}
                  {[
                    { cx: 580, cy: 155 },
                    { cx: 680, cy: 155 },
                    { cx: 780, cy: 155 }
                  ].map((circle, i) => (
                    <g key={i}>
                      <circle cx={circle.cx} cy={circle.cy} r="22" fill="#2d2250" stroke="rgba(167,139,250,0.4)" strokeWidth="1" strokeDasharray="3,3" />
                      <circle cx={circle.cx} cy={circle.cy} r="8" fill="#a78bfa" />
                      {/* Delegates around table */}
                      {[0, 90, 180, 270].map((deg, di) => {
                        const rad = (deg * Math.PI) / 180;
                        const px = circle.cx + 17 * Math.cos(rad);
                        const py = circle.cy + 17 * Math.sin(rad);
                        return <circle key={di} cx={px} cy={py} r="3" fill="#f43f5e" />;
                      })}
                    </g>
                  ))}
                </g>

                {/* ========================================================
                    3. TRADE EXPO HALL A - ENERGY & METALS (BOTTOM LEFT)
                ======================================================== */}
                <g 
                  onClick={() => setActiveZone(ZONES[1])}
                  className="cursor-pointer transition-opacity hover:opacity-95"
                >
                  <rect 
                    x="40" 
                    y="295" 
                    width="440" 
                    height="180" 
                    rx="12" 
                    fill={activeZone.id === 'expo-a' ? '#2e1428' : '#1f101d'} 
                    stroke={activeZone.id === 'expo-a' ? '#F40260' : 'rgba(244,2,96,0.4)'} 
                    strokeWidth={activeZone.id === 'expo-a' ? '2.5' : '1.5'} 
                  />

                  <rect x="55" y="305" width="160" height="20" rx="4" fill="#F40260" />
                  <text x="135" y="319" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    EXPO HALL A • ENERGY & METALS
                  </text>

                  {/* Exhibition Booths (2 Rows) */}
                  {[
                    { id: 'A1', name: 'Vitol / LNG', x: 60, y: 340, w: 90 },
                    { id: 'A2', name: 'Glencore', x: 165, y: 340, w: 85 },
                    { id: 'A3', name: 'Rio Tinto', x: 265, y: 340, w: 90 },
                    { id: 'A4', name: 'BHP Metals', x: 370, y: 340, w: 95 },
                    
                    { id: 'A5', name: 'Maersk Hub', x: 60, y: 405, w: 90 },
                    { id: 'A6', name: 'Moore Global', x: 165, y: 405, w: 85 },
                    { id: 'A7', name: 'Yellow Door', x: 265, y: 405, w: 90 },
                    { id: 'A8', name: 'JSE Trading', x: 370, y: 405, w: 95 }
                  ].map((booth) => (
                    <g key={booth.id}>
                      <rect 
                        x={booth.x} 
                        y={booth.y} 
                        width={booth.w} 
                        height="45" 
                        rx="6" 
                        fill="#38152c" 
                        stroke="rgba(244,2,96,0.3)" 
                        strokeWidth="1" 
                      />
                      <rect x={booth.x + 4} y={booth.y + 4} width="18" height="12" rx="2" fill="#F40260" />
                      <text x={booth.x + 13} y={booth.y + 13} fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                        {booth.id}
                      </text>
                      <text x={booth.x + booth.w / 2 + 5} y={booth.y + 26} fill="#fed7e2" fontSize="8" fontWeight="bold" textAnchor="middle">
                        {booth.name}
                      </text>
                    </g>
                  ))}
                </g>

                {/* ========================================================
                    4. TRADE EXPO HALL B - AGRI & LOGISTICS (BOTTOM RIGHT)
                ======================================================== */}
                <g 
                  onClick={() => setActiveZone(ZONES[2])}
                  className="cursor-pointer transition-opacity hover:opacity-95"
                >
                  <rect 
                    x="510" 
                    y="255" 
                    width="350" 
                    height="220" 
                    rx="12" 
                    fill={activeZone.id === 'expo-b' ? '#12253f' : '#0e1d33'} 
                    stroke={activeZone.id === 'expo-b' ? '#005EFF' : 'rgba(0,94,255,0.4)'} 
                    strokeWidth={activeZone.id === 'expo-b' ? '2.5' : '1.5'} 
                  />

                  <rect x="525" y="265" width="165" height="20" rx="4" fill="#005EFF" />
                  <text x="607" y="279" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    EXPO HALL B • AGRI & LOGISTICS
                  </text>

                  {/* Booths in Hall B */}
                  {[
                    { id: 'B1', name: 'Cargill Grain', x: 530, y: 300, w: 90 },
                    { id: 'B2', name: 'ADM Softs', x: 635, y: 300, w: 95 },
                    { id: 'B3', name: 'Bunge Global', x: 745, y: 300, w: 95 },

                    { id: 'B4', name: 'CME Group', x: 530, y: 360, w: 90 },
                    { id: 'B5', name: 'FinTech Alley', x: 635, y: 360, w: 95 },
                    { id: 'B6', name: 'Port Corridors', x: 745, y: 360, w: 95 },

                    { id: 'B7', name: 'AI Forecasts', x: 530, y: 420, w: 90 },
                    { id: 'B8', name: 'Trade Finance', x: 635, y: 420, w: 95 },
                    { id: 'B9', name: 'Freight Hub', x: 745, y: 420, w: 95 }
                  ].map((booth) => (
                    <g key={booth.id}>
                      <rect 
                        x={booth.x} 
                        y={booth.y} 
                        width={booth.w} 
                        height="44" 
                        rx="6" 
                        fill="#173155" 
                        stroke="rgba(0,94,255,0.3)" 
                        strokeWidth="1" 
                      />
                      <rect x={booth.x + 4} y={booth.y + 4} width="18" height="12" rx="2" fill="#005EFF" />
                      <text x={booth.x + 13} y={booth.y + 13} fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                        {booth.id}
                      </text>
                      <text x={booth.x + booth.w / 2 + 5} y={booth.y + 26} fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                        {booth.name}
                      </text>
                    </g>
                  ))}
                </g>

                {/* ========================================================
                    5. WELCOME FOYER & REGISTRATION (BOTTOM BAR)
                ======================================================== */}
                <g 
                  onClick={() => setActiveZone(ZONES[4])}
                  className="cursor-pointer transition-opacity hover:opacity-95"
                >
                  <rect 
                    x="40" 
                    y="495" 
                    width="820" 
                    height="50" 
                    rx="10" 
                    fill={activeZone.id === 'foyer' ? '#172738' : '#111e2c'} 
                    stroke={activeZone.id === 'foyer' ? '#0ea5e9' : 'rgba(14,165,233,0.3)'} 
                    strokeWidth={activeZone.id === 'foyer' ? '2' : '1'} 
                  />

                  <rect x="55" y="508" width="130" height="24" rx="4" fill="#0284c7" />
                  <text x="120" y="524" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    MAIN ENTRANCE & REGISTRATION
                  </text>

                  {/* Turnstiles */}
                  {[220, 260, 300, 340, 520, 560, 600, 640].map((tx, idx) => (
                    <rect key={idx} x={tx} y="514" width="18" height="12" rx="2" fill="#38bdf8" opacity="0.6" />
                  ))}

                  <text x="430" y="525" fill="#bae6fd" fontSize="9" textAnchor="middle" fontWeight="semibold">
                    ⚡ Fast-Track NFC Check-in Desks (48 Terminals)
                  </text>
                  <text x="760" y="525" fill="#94a3b8" fontSize="8" textAnchor="middle">
                    Coat Check & Information →
                  </text>
                </g>

                {/* ========================================================
                    6. ANIMATED ATTENDEES (PEOPLE WALKING)
                ======================================================== */}
                {isPlaying && (
                  <g id="animated-people" className="pointer-events-none">
                    {/* Path 1: Foyer to Hall A to Stage */}
                    <g className="walk-1">
                      <circle cx="0" cy="0" r="4.5" fill="#005EFF" />
                      <circle cx="0" cy="0" r="8" fill="none" stroke="#005EFF" strokeWidth="1" opacity="0.5" />
                    </g>
                    <g className="walk-1" style={{ animationDelay: '-6s' }}>
                      <circle cx="10" cy="5" r="4.5" fill="#F40260" />
                    </g>
                    <g className="walk-1" style={{ animationDelay: '-12s' }}>
                      <circle cx="-8" cy="-6" r="4" fill="#38bdf8" />
                    </g>

                    {/* Path 2: Foyer to Stage Aisle */}
                    <g className="walk-2">
                      <circle cx="0" cy="0" r="5" fill="#F40260" />
                      <circle cx="0" cy="0" r="9" fill="none" stroke="#F40260" strokeWidth="1" opacity="0.4" />
                    </g>
                    <g className="walk-2" style={{ animationDelay: '-8s' }}>
                      <circle cx="8" cy="-5" r="4" fill="#60a5fa" />
                    </g>
                    <g className="walk-2" style={{ animationDelay: '-15s' }}>
                      <circle cx="-6" cy="7" r="4.5" fill="#a78bfa" />
                    </g>

                    {/* Path 3: Hall B to VIP Lounge */}
                    <g className="walk-3">
                      <circle cx="0" cy="0" r="5" fill="#a855f7" />
                      <circle cx="0" cy="0" r="9" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.5" />
                    </g>
                    <g className="walk-3" style={{ animationDelay: '-7s' }}>
                      <circle cx="8" cy="4" r="4" fill="#005EFF" />
                    </g>
                    <g className="walk-3" style={{ animationDelay: '-14s' }}>
                      <circle cx="-5" cy="-8" r="4.5" fill="#f43f5e" />
                    </g>

                    {/* Path 4: Cross Aisle between Hall A and Hall B */}
                    <g className="walk-4">
                      <circle cx="0" cy="0" r="4.5" fill="#0ea5e9" />
                    </g>
                    <g className="walk-4" style={{ animationDelay: '-5s' }}>
                      <circle cx="6" cy="6" r="4" fill="#ec4899" />
                    </g>

                    {/* Path 5: Hall B Promenade */}
                    <g className="walk-5">
                      <circle cx="0" cy="0" r="4" fill="#38bdf8" />
                    </g>
                    <g className="walk-5" style={{ animationDelay: '-10s' }}>
                      <circle cx="-7" cy="5" r="4.5" fill="#005EFF" />
                    </g>
                  </g>
                )}
              </svg>
            </div>
            </div>

            {/* Legend Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#005EFF]" /> Main Stage
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F40260]" /> Expo Booths
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" /> VIP Lounge
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" /> Attendees Moving
                </span>
              </div>
              <span className="text-white/50 text-[11px]">88 Exhibition Booths • 100,000 sq ft</span>
            </div>
          </div>

          {/* Zone Detail Inspector Card (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-[#005EFF]">
                  {activeZone.badge}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  {activeZone.capacity}
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl text-slate-900 mb-2">
                {activeZone.name}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {activeZone.description}
              </p>

              {/* Current Activity Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                  <Tv className="w-3.5 h-3.5 text-[#005EFF]" />
                  Active Programming / Feature:
                </div>
                <div className="font-heading font-bold text-sm text-slate-800">
                  {activeZone.currentSession}
                </div>
              </div>

              {/* Zone Highlights */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Zone Specifications:
                </div>
                <div className="text-xs text-slate-600 flex items-center justify-between py-1 border-b border-slate-100">
                  <span>Audio/Visual Setup:</span>
                  <span className="font-semibold text-slate-800">4K LED Broadcast & Dolby Audio</span>
                </div>
                <div className="text-xs text-slate-600 flex items-center justify-between py-1 border-b border-slate-100">
                  <span>WiFi / Connectivity:</span>
                  <span className="font-semibold text-slate-800">Dedicated 10Gbps Fiber Mesh</span>
                </div>
                <div className="text-xs text-slate-600 flex items-center justify-between py-1 border-b border-slate-100">
                  <span>Accessible Access:</span>
                  <span className="font-semibold text-slate-800">ADA Compliant Ramps & Elevators</span>
                </div>
                <div className="text-xs text-slate-600 flex items-center justify-between py-1">
                  <span>Meeting Room Booking:</span>
                  <span className="font-semibold text-[#005EFF]">Via Official App</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href="#sponsorship"
                className="w-full text-center py-3 rounded-xl font-heading font-bold text-xs text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] shadow-sm hover:shadow-md transition-all"
              >
                Book Booth or Stage Sponsorship
              </a>
              <a
                href="#tickets"
                className="w-full text-center py-2.5 rounded-xl font-heading font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Register Delegate Pass
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
