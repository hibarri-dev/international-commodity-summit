export const eventDetails = {
  name: "International Commodity Summit",
  edition: "2027",
  tagline: "Connecting Global Markets, Energy, Metals & Agriculture",
  dates: "15 - 17 November 2027",
  venue: "Meadowlands Exhibition Center",
  location: "New York, USA",
  stats: [
    { label: "Global Attendees", value: "3,500+" },
    { label: "Executive Speakers", value: "85+" },
    { label: "Participating Nations", value: "60+" },
    { label: "Trading Volume Represented", value: "$120B+" }
  ]
};

export const industries = [
  {
    id: "agri",
    title: "Agricultural Commodities",
    description: "Grain, softs, oilseeds, fertilizers, and global supply resilience strategies.",
    metrics: "450+ Agribusiness Traders",
    icon: "Wheat"
  },
  {
    id: "metals",
    title: "Critical Minerals & Metals",
    description: "Copper, lithium, nickel, rare earth elements, and industrial manufacturing metals.",
    metrics: "600+ Mining & Metal Majors",
    icon: "Pickaxe"
  },
  {
    id: "energy",
    title: "Energy & Renewables",
    description: "Crude, LNG, bio-fuels, clean hydrogen, carbon credits, and energy transition.",
    metrics: "800+ Energy Corporations",
    icon: "Flame"
  },
  {
    id: "finance",
    title: "Trade Finance & Hedging",
    description: "Structured trade finance, derivatives, FX hedging, and digital settlements.",
    metrics: "350+ Global Financial Institutions",
    icon: "Landmark"
  },
  {
    id: "logistics",
    title: "Maritime & Global Logistics",
    description: "Dry bulk, container shipping, port infrastructure, and real-time tracking.",
    metrics: "280+ Freight & Port Operators",
    icon: "Ship"
  },
  {
    id: "tech",
    title: "AI & Commodity Intelligence",
    description: "Satellite imagery forecasting, algorithmic arbitrage, and real-time trade flows.",
    metrics: "180+ Data & Tech Providers",
    icon: "Cpu"
  }
];

export const brands = [
  { name: "Glencore", category: "Mining & Trading" },
  { name: "Trafigura", category: "Physical Commodities" },
  { name: "Cargill", category: "Agri-Enterprise" },
  { name: "Vitol", category: "Energy Trading" },
  { name: "ADM", category: "Global Agriculture" },
  { name: "BHP", category: "Resources" },
  { name: "Bunge", category: "Agribusiness" },
  { name: "Rio Tinto", category: "Mining" },
  { name: "TotalEnergies", category: "Energy Transition" },
  { name: "Mercuria", category: "Energy & Commodities" }
];

export const speakers = [];

export const agendaSchedule = [
  {
    day: "Day 1",
    date: "Nov 15, 2027",
    focus: "Global Macro Outlook, Energy Security & Critical Minerals",
    sessions: [
      {
        time: "08:30 - 09:30 AM",
        title: "Registration, Executive Breakfast & Exhibition Floor Opening",
        location: "Grand Concourse & Expo Hall",
        type: "Networking"
      },
      {
        time: "09:30 - 10:45 AM",
        title: "Ministerial Keynote: The Reordering of Global Commodity Corridors",
        speaker: "Executive Plenary Panel & Trade Commissioners",
        location: "Plenary Hall A",
        type: "Keynote"
      },
      {
        time: "11:15 - 12:45 PM",
        title: "US Energy Dominance & The Transatlantic LNG Bridge",
        speaker: "US LNG Operators, European Utilities & Pipeline Executives",
        location: "Energy Stage",
        type: "Panel"
      },
      {
        time: "02:00 - 03:30 PM",
        title: "Critical Minerals & Defense Supply Chain Independence",
        speaker: "North American Mining Majors & Defense Procurement Leaders",
        location: "Metals Arena",
        type: "Interactive Workshop"
      },
      {
        time: "05:00 - 07:30 PM",
        title: "VIP Welcome Drinks & Hibarri Networking Reception",
        location: "Skyline Lounge",
        type: "Social & VIP"
      }
    ]
  },
  {
    day: "Day 2",
    date: "Nov 16, 2027",
    focus: "Agriculture, Supply Chain Tech & Trade Financing",
    sessions: [
      {
        time: "09:00 - 10:15 AM",
        title: "US Agricultural Corridors & Global Food Security",
        speaker: "Midwest Agribusiness Syndicates & Port Authorities",
        location: "Plenary Hall A",
        type: "Keynote"
      },
      {
        time: "10:45 - 12:15 PM",
        title: "The Liquidity Crunch: Modern Trade Finance & Digital Settlement",
        speaker: "Wall Street & International Commodity Bankers",
        location: "Finance Forum",
        type: "Panel"
      },
      {
        time: "01:45 - 03:15 PM",
        title: "Maritime Freight Volatility: Port Congestion & Clean Dual-Fuels",
        speaker: "Global Carriers, Rail Operators & Intermodal Executives",
        location: "Logistics Stage",
        type: "Deep Dive"
      },
      {
        time: "04:00 - 05:30 PM",
        title: "Dealmakers Speed Networking: 1-on-1 Bilateral Meetings",
        location: "Executive Meeting Suites",
        type: "Deal-Making"
      }
    ]
  },
  {
    day: "Day 3",
    date: "Nov 17, 2027",
    focus: "Trading Technologies, Derivatives & Future Outlook",
    sessions: [
      {
        time: "09:30 - 11:00 AM",
        title: "Algorithmic Commodity Trading: Satellite AI & Real-time Flow Signals",
        speaker: "Quantitative Hedge Fund CIOs & Tech Pioneers",
        location: "Innovation Hub",
        type: "Tech Showcase"
      },
      {
        time: "11:30 - 01:00 PM",
        title: "The 2028 Forecast: Price Arbitrage & Currency Swaps",
        speaker: "Executive Consensus Board & Global Chief Economists",
        location: "Plenary Hall A",
        type: "Closing Panel"
      },
      {
        time: "01:00 - 02:30 PM",
        title: "Closing Ceremonies, Summit Gala & Partner Awards",
        location: "Grand Ballroom",
        type: "Gala Luncheon"
      }
    ]
  }
];

export const tickets = [
  {
    id: "all-access",
    name: "All Access Pass",
    badge: "Most Popular",
    price: 1270,
    priceFormatted: "$1,270",
    description: "Full access to the 3-day conference, technical tracks, exhibition floor, and standard networking areas.",
    features: [
      "Access to all 3 Summit days (Nov 15-17)",
      "Access to all 6 Industry Stream sessions",
      "Full Expo floor entry & product demonstrations",
      "Official Summit mobile networking app with messaging",
      "Lunch, coffee breaks & standard networking receptions",
      "Post-event session recordings and slide decks"
    ],
    cta: "Purchase All Access",
    popular: true
  },
  {
    id: "vip",
    name: "VIP Executive Pass",
    badge: "Executive Tier",
    price: 1970,
    priceFormatted: "$1,970",
    description: "Exclusive access tailored for C-suite leaders, government officials, and institutional commodity investors.",
    features: [
      "Everything included in All Access Pass",
      "Dedicated Fast-Track VIP Registration & Concierge",
      "Exclusive access to the VIP Executive Lounge",
      "Invitation to the Ministerial Welcome Dinner (Nov 15)",
      "Reserved front-row seating across all Plenary sessions",
      "Direct 1-on-1 Bilateral Meeting Booking System",
      "Complimentary ticket transfers up to 48 hours before"
    ],
    cta: "Purchase VIP Pass",
    popular: false
  }
];
