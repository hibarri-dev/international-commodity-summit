export const eventDetails = {
  name: "International Commodity Summit",
  edition: "2027",
  tagline: "Connecting Global Markets, Energy, Metals & Agriculture",
  dates: "15 - 17 November 2027",
  venue: "Meadowlands Exhibition Center",
  location: "New York, USA",
  stats: [
    { label: "International Attendees", value: "3,500+" },
    { label: "Executive Speakers", value: "85+" },
    { label: "Participating Countries", value: "40+" },
    { label: "Capital Present", value: "$120B+" }
  ]
};

export const industries = [
  {
    id: "agri",
    title: "Agricultural Commodities",
    description: "Grain, softs, oilseeds, fertilizers, and global supply resilience strategies.",
    icon: "Wheat"
  },
  {
    id: "metals",
    title: "Critical Minerals & Metals",
    description: "Copper, lithium, nickel, rare earth elements, mining and industrial manufacturing metals.",
    icon: "Pickaxe"
  },
  {
    id: "energy",
    title: "Energy & Renewables",
    description: "Crude, LNG, bio-fuels, clean hydrogen, carbon credits, and energy transition.",
    icon: "Flame"
  },
  {
    id: "finance",
    title: "Finance",
    description: "Private equity, venture capital, structured trade finance, credit instruments, derivatives, FX hedging, and digital settlements.",
    icon: "Landmark"
  },
  {
    id: "logistics",
    title: "Maritime & Logistics",
    description: "Dry bulk, container shipping, port infrastructure, transport & customs clearance.",
    icon: "Ship"
  },
  {
    id: "textiles",
    title: "Bulk Textiles Trade",
    description: "Cottons, yards, fabrics, sheets and textile industry inputs.",
    icon: "Cpu"
  },
  {
    id: "FMCG",
    title: "Food Commodities",
    description: "Fast moving bulk consumables and food inputs.",
    icon: "Cpu"
  }
];

export const speakers = [];

export const agendaSchedule = [
  {
    day: "Day 1",
    date: "Nov 15, 2027",
    sessions: [
      { time: "8:00 – 9:00 AM", title: "Coffee & Breakfast Networking", type: "break" },
      { time: "9:00 – 10:00 AM", title: "Rare Earths, Critical Minerals & Commodities of the Future", track: "Mining & Metals", type: "session" },
      { time: "10:00 – 11:00 AM", title: "AI, Humanoid Robots and their Impact on the Mining & Metals Sector", track: "Mining & Metals", type: "session" },
      { time: "11:00 AM – 12:00 PM", title: "Green Steel, Cement, Glass & Buildings – Can We Build Truly Smart Cities?", track: "Mining & Metals", type: "session" },
      { time: "12:00 – 1:00 PM", title: "Lunch", type: "break" },
      { time: "1:00 – 2:00 PM", title: "Defence Tech Mining & Metals Requirements, Critical Minerals & Chemicals", track: "Mining & Metals", type: "session" },
      { time: "2:00 – 3:00 PM", title: "Nuclear Power, Hydrogen, Oil & Gas, Solar, Wind and Competitors vs the Grid", track: "Energy", type: "session" },
      { time: "3:00 – 5:00 PM", title: "Networking Sessions", type: "break" },
      { time: "6:00 PM – 12:00 AM", title: "VIP Gala Evening (VIPs Only)", type: "vip" }
    ]
  },
  {
    day: "Day 2",
    date: "Nov 16, 2027",
    sessions: [
      { time: "8:00 – 9:00 AM", title: "Coffee & Breakfast Networking", type: "break" },
      { time: "9:00 – 10:00 AM", title: "Greener Energy Investments – What is the Future of Power?", track: "Energy", type: "session" },
      { time: "10:00 – 11:00 AM", title: "Upstream Oil & Gas – How Much is Left to Drill and is Oil Going Out of Fashion?", track: "Energy", type: "session" },
      { time: "11:00 AM – 12:00 PM", title: "Geopolitical Oil & Gas Bottlenecks, Permian Basin & Strait of Hormuz – Is Infrastructure Still Worth the Investment?", track: "Energy", type: "session" },
      { time: "12:00 – 1:00 PM", title: "Lunch", type: "break" },
      { time: "1:00 – 2:00 PM", title: "Investment in Commodity Businesses – What Investors are Optimistic About Investing in at the Moment", track: "Finance", type: "session" },
      { time: "2:00 – 3:00 PM", title: "Banking, Trade Finance, Credit & Insurance in the Commodity Sectors", track: "Finance", type: "session" }
    ]
  },
  {
    day: "Day 3",
    date: "Nov 17, 2027",
    sessions: [
      { time: "8:00 – 9:00 AM", title: "Coffee & Breakfast Networking", type: "break" },
      { time: "9:00 – 10:00 AM", title: "Machinery, Automation & Infrastructure Requirements for the Next 100 Years of Supply Chain", track: "Logistics", type: "session" },
      { time: "10:00 – 11:00 AM", title: "Solving the Largest Maritime & Air Freight Logistics Problems in the World Right Now", track: "Logistics", type: "session" },
      { time: "11:00 AM – 12:00 PM", title: "Food, Farming & Pharmaceutical Chemical Commodities and How They'll Change by 2090", track: "Chemicals", type: "session" },
      { time: "12:00 – 1:00 PM", title: "Lunch", type: "break" },
      { time: "1:00 – 2:00 PM", title: "How We'll Guarantee Organic Food Security, Whether GMOs, Pesticides & Chemicals Should Stay, and What Rising Veganism & Vegetarian Diet Shifts Mean for Agriculture", track: "Agricultural Commodities", type: "session" },
      { time: "2:00 – 3:00 PM", title: "Combatting Food Imports & Delivering from the National Food Basket to America", track: "Food & FMCG", type: "session" }
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
      "Access to every sector session across all 3 days",
      "Full Expo floor entry & product demonstrations",
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
      "Invitation to the VIP Gala Evening (Nov 15)",
      "Reserved front-row seating across all sessions",
      "Direct 1-on-1 Bilateral Meeting Booking System",
      "Complimentary ticket transfers up to 48 hours before"
    ],
    cta: "Purchase VIP Pass",
    popular: false
  }
];
