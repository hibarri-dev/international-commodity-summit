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

export const speakers = [
  {
    id: 1,
    name: "Ashor Sarupen",
    title: "Deputy Minister of Finance & Resource Strategy",
    organization: "Global Trade Commission",
    topic: "Fiscal Policies and Sovereign Mineral Security in 2028",
    image: "/images/a5eb3-ashorsarupen.cdd-nquz_zynjfd-3.avif",
    track: "Keynote"
  },
  {
    id: 2,
    name: "Victor Matfield",
    title: "Global Head of Strategic Sourcing",
    organization: "Continental Commodities",
    topic: "Supply Chain Volatility & Forward Hedging Paradigms",
    image: "/images/e23f4-victormatfield.cg06koid_r5hws-1.avif",
    track: "Supply Chain"
  },
  {
    id: 3,
    name: "Prashant Goyal",
    title: "Chief Investment Officer",
    organization: "Apex Mineral Capital",
    topic: "The Future of Battery Metals & Greenfield Capex",
    image: "/images/f1a99-pashantgoyal.cza3tonb_z82khj.avif",
    track: "Metals"
  },
  {
    id: 4,
    name: "Rutendo Shumba",
    title: "Managing Director of Energy Transition",
    organization: "Global Petro & Renewables",
    topic: "Decarbonizing Heavy Maritime Freight by 2030",
    image: "/images/1bc86-rutendo.c2s8r4zl_z1dfl59-1-1.avif",
    track: "Energy"
  },
  {
    id: 5,
    name: "Sephela Maketethema",
    title: "Head of Agricultural Trade Intelligence",
    organization: "Pan-Atlantic Grain Alliance",
    topic: "Food Security: Geopolitical Friction & Trade Flow Diversions",
    image: "/images/89e21-sephelamaketethema.dykm5kqw_1cfasa.avif",
    track: "Agriculture"
  },
  {
    id: 6,
    name: "Mthoxulu Cele",
    title: "Director of Digital Trade & Settlement",
    organization: "Commodity Ledger Systems",
    topic: "Blockchain-backed Letters of Credit & Instant Cross-Border Clearing",
    image: "/images/6e752-mthoxulu.d8mbuht3_z26swlh.avif",
    track: "Trade Finance"
  }
];

export const agendaSchedule = [
  {
    day: "Day 1",
    date: "Nov 15, 2027",
    focus: "Global Macro Outlook, Geopolitics & Energy Security",
    sessions: [
      {
        time: "08:30 - 09:30 AM",
        title: "Registration, Executive Breakfast & Exhibition Opening",
        location: "Grand Concourse & Expo Hall",
        type: "Networking"
      },
      {
        time: "09:30 - 10:45 AM",
        title: "Ministerial Keynote: The Reordering of Global Commodity Corridors",
        speaker: "Ashor Sarupen & Global Panelists",
        location: "Plenary Hall A",
        type: "Keynote"
      },
      {
        time: "11:15 - 12:45 PM",
        title: "Energy Transition vs. Hydrocarbon Reality: Balancing Supply",
        speaker: "Rutendo Shumba, Vitol & TotalEnergies Reps",
        location: "Energy Stage",
        type: "Panel"
      },
      {
        time: "02:00 - 03:30 PM",
        title: "Critical Minerals: Solving Bottlenecks for the Green Grid",
        speaker: "Prashant Goyal & Mining Majors",
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
        title: "Global Grain & Softs Outlook: Climate Resilience in Agriculture",
        speaker: "Sephela Maketethema, Cargill & ADM Directors",
        location: "Plenary Hall A",
        type: "Keynote"
      },
      {
        time: "10:45 - 12:15 PM",
        title: "The Liquidity Crunch: Modern Trade Finance & Basel Compliance",
        speaker: "Mthoxulu Cele & Global Bankers",
        location: "Finance Forum",
        type: "Panel"
      },
      {
        time: "01:45 - 03:15 PM",
        title: "Maritime Freight Volatility: Port Congestion and Clean Fuels",
        speaker: "Victor Matfield & Logistics Leaders",
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
        speaker: "Hedge Fund CIOs & Tech Founders",
        location: "Innovation Hub",
        type: "Tech Showcase"
      },
      {
        time: "11:30 - 01:00 PM",
        title: "The 2028 Forecast: Price Arbitrage & Currency Swaps",
        speaker: "Executive Consensus Board",
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
