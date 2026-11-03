import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowRight, Calendar, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Coffee,
  Flame, FlaskConical, Landmark, Layers, MapPin, MessageSquare, Ship, Shirt, ShoppingBasket, Sparkles, Users, Wheat, X,
} from 'lucide-react';
import galleryJson from '../data/gallery2025.json';
import { useTrafficTracker } from '../hooks/useTrafficTracker';

/* =====================================================================
   EDITABLE CONTENT
   All homepage text and data lives here. Edit freely.
   Navbar.jsx repeats the dates/venue and sponsor email - update it too.
   ===================================================================== */

const EVENT = {
  dates: '15 - 17 November 2027',
  venue: 'Meadowlands Exhibition Center',
  location: 'New York, USA',
  sponsorEmail: 'vp@internationalcommoditysummit.com',
  registrationEmail: 'registration@internationalcommoditysummit.com',
};

const SPONSOR_HREF = `mailto:${EVENT.sponsorEmail}?subject=${encodeURIComponent('Sponsorship enquiry - International Commodity Summit')}`;

const HERO = {
  eyebrow: 'The Landmark Gathering',
  titleAccent: 'INTERNATIONAL',
  titleEnd: 'COMMODITY SUMMIT',
  intro: 'Join mining giants, oil & gas leaders, rare earth smelters, shipping companies, and institutional commodity financiers in New York.',
};

const SECTORS = [
  { icon: Wheat, title: 'Agricultural Commodities', description: 'Grain, softs, oilseeds, fertilizers, and global supply resilience strategies.' },
  { icon: Layers, title: 'Critical Minerals & Metals', description: 'Copper, lithium, nickel, rare earth elements, mining and industrial manufacturing metals.' },
  { icon: Flame, title: 'Energy & Renewables', description: 'Crude, LNG, bio-fuels, clean hydrogen, carbon credits, and energy transition.' },
  { icon: FlaskConical, title: 'Chemicals & Hydrocarbons', description: 'Petrochemicals, polymers, basic & specialty chemicals, industrial reagents, and downstream hydrocarbon derivatives.' },
  { icon: Landmark, title: 'Finance', description: 'Private equity, venture capital, structured trade finance, credit instruments, derivatives, FX hedging, and digital settlements.' },
  { icon: Ship, title: 'Maritime & Logistics', description: 'Dry bulk, container shipping, port infrastructure, transport & customs clearance.' },
  { icon: Shirt, title: 'Bulk Textiles Trade', description: 'Cottons, yards, fabrics, sheets and textile industry inputs.' },
  { icon: ShoppingBasket, title: 'Food Commodities', description: 'Fast moving bulk consumables and food inputs.' },
];

// Logo files live in public/brands-2025. Order = display order.
const BRANDS_2025 = [
  { name: 'Honeywell', logo: '/brands-2025/honeywell.png' },
  { name: 'S&P Global', logo: '/brands-2025/sp-global.png' },
  { name: 'Microsoft', logo: '/brands-2025/microsoft.png' },
  { name: 'McKinsey & Company', logo: '/brands-2025/mckinsey.png' },
  { name: 'Aon', logo: '/brands-2025/aon.jpg' },
  { name: 'Maersk', logo: '/brands-2025/f8420-maersk.png' },
  { name: 'Control Risks', logo: '/brands-2025/control-risks.png' },
  { name: 'WeWork', logo: '/brands-2025/wework.png' },
  { name: 'CRU Group', logo: '/brands-2025/6d790-cru_logo.jpg' },
  { name: 'Moore Global', logo: '/brands-2025/moore-global.png' },
  { name: 'Morae', logo: '/brands-2025/morae.png' },
  { name: 'IBC Solar', logo: '/brands-2025/ibc-solar.webp' },
  { name: 'Jindal Africa', logo: '/brands-2025/jindal-africa.png' },
  { name: 'Johannesburg Stock Exchange', logo: '/brands-2025/d55d6-jse-logo-edited.jpg' },
  { name: 'Rand Merchant Bank', logo: '/brands-2025/rmb.png' },
  { name: 'FNB', logo: '/brands-2025/fnb.png' },
  { name: 'Orion Minerals', logo: '/brands-2025/orion-minerals.jpg' },
  { name: 'Rainbow Rare Earths', logo: '/brands-2025/rainbow-rare-earths.png' },
  { name: 'Pensana', logo: '/brands-2025/pensana.png' },
  { name: 'Renergen', logo: '/brands-2025/renergen.png' },
  { name: 'Fraser Alexander', logo: '/brands-2025/fraser-alexander.jpg' },
  { name: 'Mineral Technologies', logo: '/brands-2025/e9488-mineral-technologies.webp' },
  { name: 'Energy Capital & Power', logo: '/brands-2025/energy-capital-power.png' },
  { name: 'Launch Africa Ventures', logo: '/brands-2025/launch-africa.jpg' },
  { name: 'Kessner Capital Management', logo: '/brands-2025/kessner-capital.jpg' },
  { name: 'BRICS Business Council', logo: '/brands-2025/brics-business-council.jpeg' },
  { name: 'Canada Africa Chamber of Commerce', logo: '/brands-2025/canada-africa-chamber.jpeg' },
  { name: 'GMEX Group', logo: '/brands-2025/5fdd2-gmex-logo.png' },
  { name: 'ecosystem.Ai', logo: '/brands-2025/ecosystem-ai.jpg' },
  { name: 'RippleNami', logo: '/brands-2025/ripplenami.jpg' },
  { name: 'Solink', logo: '/brands-2025/solink.jpg' },
  { name: 'BankerX', logo: '/brands-2025/bankerx.png' },
  { name: 'Luno', logo: '/brands-2025/3fe6b-luno-logos.png' },
  { name: 'Metal Line Africa', logo: '/brands-2025/5cf0e-metal-line-africa-logo-1.jpeg' },
  { name: 'Brand South Africa', logo: '/brands-2025/66b7a-brandsa-logo.jpg' },
  { name: 'DTIC', logo: '/brands-2025/fa9c1-dtic.jpg' },
  { name: 'NERSA', logo: '/brands-2025/nersa.jpg' },
  { name: 'ECIC', logo: '/brands-2025/ecic.png' },
  { name: 'Mintek', logo: '/brands-2025/mintek.png' },
  { name: 'SACCI', logo: '/brands-2025/sacci.jpg' },
  { name: 'African Energy Chamber', logo: '/brands-2025/e8553-african-energy-chamber-logo-png.png' },
  { name: 'Africa Energy Indaba', logo: '/brands-2025/africa-energy-indaba.jpg' },
  { name: 'SAOGA', logo: '/brands-2025/fbb1f-saoga.png' },
  { name: 'Maritime Business Chamber', logo: '/brands-2025/maritime-business-chamber.png' },
  { name: 'ISEAM', logo: '/brands-2025/iseam.jpg' },
  { name: 'CopperCore', logo: '/brands-2025/bcf4e-coppercore-logo.png' },
  { name: 'Universal Coal', logo: '/brands-2025/b38c3-universal_coal_plc_logo.jpeg' },
  { name: 'Homeland Mining', logo: '/brands-2025/homeland-mining.png' },
  { name: 'MAB Mining & Construction', logo: '/brands-2025/mab-mining.jpg' },
  { name: 'Minexx', logo: '/brands-2025/fab01-minexx.webp' },
  { name: 'Digby Wells', logo: '/brands-2025/4e42d-digby-wells-logo.jpeg' },
  { name: 'SustainGroup', logo: '/brands-2025/sustain-group.jpg' },
  { name: 'Yellow Door Energy', logo: '/brands-2025/8a798-yellow-door-energy-logo.png' },
  { name: 'Solar MD', logo: '/brands-2025/solar-md.png' },
  { name: 'Africa GreenCo', logo: '/brands-2025/aa3e5-africa_greenco_logo.png' },
  { name: 'Zero13', logo: '/brands-2025/zero13.jpg' },
  { name: 'Agbiz', logo: '/brands-2025/f5eba-agbiz.jpeg' },
  { name: 'Agrisa Commodities', logo: '/brands-2025/agrisa-commodities.jpg' },
  { name: 'Commodity Trading Club', logo: '/brands-2025/commodity-trading-club.jpeg' },
  { name: 'Pangea Risk', logo: '/brands-2025/d9d2b-pangea-risk_logo_on-the-move.jpg' },
  { name: 'Progroup Tax Rescue Solutions', logo: '/brands-2025/progroup.jpg' },
  { name: 'IOA', logo: '/brands-2025/3c078-ioa-logo-2017.png' },
  { name: 'Tradepedia', logo: '/brands-2025/758d0-tradepedia-logo.png' },
  { name: 'Jenzy', logo: '/brands-2025/jenzy.png' },
  { name: 'Invest Cape Town', logo: '/brands-2025/d8e42-cape-town-logo.png' },
  { name: 'AWIMSA', logo: '/brands-2025/eb450-awimsa.png' },
  { name: 'Newskoop', logo: '/brands-2025/newskoop.jpg' },
];

const MEDIA_PARTNERS_2025 = [
  { name: 'Mail & Guardian', logo: '/media-2025/mail-guardian.png' },
  { name: 'Mining Weekly', logo: '/media-2025/mining-weekly.png' },
  { name: 'Engineering News', logo: '/media-2025/engineering-news.png' },
  { name: 'Miningmx', logo: '/media-2025/miningmx.png' },
  { name: 'Mining Review Africa', logo: '/media-2025/mining-review-africa.png' },
  { name: 'The Business Year', logo: '/media-2025/the-business-year.png' },
  { name: 'International Business Magazine', logo: '/media-2025/international-business-magazine.png' },
  { name: 'Business Focus Magazine', logo: '/media-2025/business-focus-magazine.webp' },
  { name: 'African Leadership Magazine', logo: '/media-2025/african-leadership-magazine.png' },
  { name: 'The Nation', logo: '/media-2025/the-nation.png' },
  { name: 'African Mining Market', logo: '/media-2025/african-mining-market.webp' },
  { name: 'Mining Business Africa', logo: '/media-2025/mining-business-africa.png' },
  { name: 'Sub-Sahara Mining & Industrial Journal', logo: '/media-2025/sub-sahara-mining-journal.png' },
  { name: 'Africa Mining & Engineering Review', logo: '/media-2025/africa-mining-engineering-review.png' },
  { name: 'Engineering & Mining Africa Magazine', logo: '/media-2025/ema-magazine.png' },
  { name: 'Mining CSI', logo: '/media-2025/mining-csi.png' },
  { name: 'Construct Africa', logo: '/media-2025/construct-africa.png' },
  { name: 'Farmers Review Africa', logo: '/media-2025/farmers-review-africa.png' },
  { name: 'The Green Agenda', logo: '/media-2025/green-agenda.png' },
  { name: 'Global Africa Network', logo: '/media-2025/global-africa-network.png' },
  { name: 'Tribe Business Magazine', logo: '/media-2025/tribe-business-magazine.png' },
  { name: 'Africa Rising TV', logo: '/media-2025/africa-rising-tv.png' },
  { name: 'Media Xpose', logo: '/media-2025/media-xpose.png' },
  { name: 'Project CBNews', logo: '/media-2025/project-cbnews.png' },
  { name: 'INX Prime', logo: '/media-2025/inx-prime.png' },
  { name: 'Jaina', logo: '/media-2025/jaina.png' },
  { name: 'Matiere News', logo: '/media-2025/matiere-news.png' },
  { name: 'First Africa Guide', logo: '/media-2025/first-africa-guide.png' },
  { name: 'Cape Town', logo: '/media-2025/cape-town.png' },
  { name: 'Conference Alerts', logo: '/media-2025/conference-alerts.png' },
];

const STATS_2025 = [
  { value: '1,850+', label: '2025 Attendees' },
  { value: '45+', label: 'Nations Represented' },
  { value: '$4.2B', label: 'Bilateral Deals' },
  { value: '120+', label: 'Exhibiting Partners' },
];

// Shown first in the gallery (and in the hero strip), in this order.
const FEATURED_PHOTOS = [
  '7bc02-wp-17637900209495994189476571695870.jpg',
  '566a5-wp-17637904075647702539036577233290.jpg',
  'd383b-wp-17637901454336146864034827261993.jpg',
  '2842b-wp-176379014549465442208699520604.jpg',
  'ce8f3-wp-17637901951722917787626026548535.jpg',
  'da9db-wp-17637904076493074705758272051544.jpg',
  'f5f98-wp-17637900209826259536930944734945.jpg',
  '439bf-wp-17637901952836134482399585890026.jpg',
  '894c2-wp-17637900213294726933698974211921.jpg',
  '9e989-wp-17637900210123441585350486601030.jpg',
  'ed359-wp-17637900219774145567855726030607.jpg',
  'a265b-wp-17637904078788973578557944850290.jpg',
];

const AGENDA = [
  {
    day: 'Day 1',
    date: 'Nov 15, 2027',
    sessions: [
      { time: '8:00 – 9:00 AM', title: 'Coffee & Breakfast Networking', type: 'break' },
      { time: '9:00 – 10:00 AM', title: 'Rare Earths, Critical Minerals & Commodities of the Future', track: 'Mining & Metals', type: 'session' },
      { time: '10:00 – 11:00 AM', title: 'AI, Humanoid Robots and their Impact on the Mining & Metals Sector', track: 'Mining & Metals', type: 'session' },
      { time: '11:00 AM – 12:00 PM', title: 'Green Steel, Cement, Glass & Buildings – Can We Build Truly Smart Cities?', track: 'Mining & Metals', type: 'session' },
      { time: '12:00 – 1:00 PM', title: 'Lunch', type: 'break' },
      { time: '1:00 – 2:00 PM', title: 'Defence Tech Mining & Metals Requirements, Critical Minerals & Chemicals', track: 'Mining & Metals', type: 'session' },
      { time: '2:00 – 3:00 PM', title: 'Nuclear Power, Hydrogen, Oil & Gas, Solar, Wind and Competitors vs the Grid', track: 'Energy', type: 'session' },
      { time: '3:00 – 5:00 PM', title: 'Networking Sessions', type: 'break' },
      { time: '6:00 PM – 12:00 AM', title: 'VIP Gala Evening (VIPs Only)', type: 'vip' },
    ],
  },
  {
    day: 'Day 2',
    date: 'Nov 16, 2027',
    sessions: [
      { time: '8:00 – 9:00 AM', title: 'Coffee & Breakfast Networking', type: 'break' },
      { time: '9:00 – 10:00 AM', title: 'Greener Energy Investments – What is the Future of Power?', track: 'Energy', type: 'session' },
      { time: '10:00 – 11:00 AM', title: 'Upstream Oil & Gas – How Much is Left to Drill and is Oil Going Out of Fashion?', track: 'Energy', type: 'session' },
      { time: '11:00 AM – 12:00 PM', title: 'Geopolitical Oil & Gas Bottlenecks, Permian Basin & Strait of Hormuz – Is Infrastructure Still Worth the Investment?', track: 'Energy', type: 'session' },
      { time: '12:00 – 1:00 PM', title: 'Lunch', type: 'break' },
      { time: '1:00 – 2:00 PM', title: 'Investment in Commodity Businesses – What Investors are Optimistic About Investing in at the Moment', track: 'Finance', type: 'session' },
      { time: '2:00 – 3:00 PM', title: 'Banking, Trade Finance, Credit & Insurance in the Commodity Sectors', track: 'Finance', type: 'session' },
    ],
  },
  {
    day: 'Day 3',
    date: 'Nov 17, 2027',
    sessions: [
      { time: '8:00 – 9:00 AM', title: 'Coffee & Breakfast Networking', type: 'break' },
      { time: '9:00 – 10:00 AM', title: 'Machinery, Automation & Infrastructure Requirements for the Next 100 Years of Supply Chain', track: 'Logistics', type: 'session' },
      { time: '10:00 – 11:00 AM', title: 'Solving the Largest Maritime & Air Freight Logistics Problems in the World Right Now', track: 'Logistics', type: 'session' },
      { time: '11:00 AM – 12:00 PM', title: "Food, Farming & Pharmaceutical Chemical Commodities and How They'll Change by 2090", track: 'Chemicals', type: 'session' },
      { time: '12:00 – 1:00 PM', title: 'Lunch', type: 'break' },
      { time: '1:00 – 2:00 PM', title: "How We'll Guarantee Organic Food Security, Whether GMOs, Pesticides & Chemicals Should Stay, and What Rising Veganism & Vegetarian Diet Shifts Mean for Agriculture", track: 'Agricultural Commodities', type: 'session' },
      { time: '2:00 – 3:00 PM', title: 'Combatting Food Imports & Delivering from the National Food Basket to America', track: 'Food & FMCG', type: 'session' },
    ],
  },
];

const TICKETS = [
  {
    id: 'all-access',
    name: 'All Access Pass',
    badge: 'Most Popular',
    price: '$1,270',
    description: 'Full access to the 3-day conference, technical tracks, exhibition floor, and standard networking areas.',
    features: [
      'Access to all 3 Summit days (Nov 15-17)',
      'Access to every sector session across all 3 days',
      'Full Expo floor entry & product demonstrations',
      'Lunch, coffee breaks & standard networking receptions',
      'Post-event session recordings and slide decks',
    ],
    cta: 'Purchase All Access',
    popular: true,
  },
  {
    id: 'vip',
    name: 'VIP Executive Pass',
    badge: 'Executive Tier',
    price: '$1,970',
    description: 'Exclusive access tailored for C-suite leaders, government officials, and institutional commodity investors.',
    features: [
      'Everything included in All Access Pass',
      'Dedicated Fast-Track VIP Registration & Concierge',
      'Exclusive access to the VIP Executive Lounge',
      'Invitation to the VIP Gala Evening (Nov 15)',
      'Reserved front-row seating across all sessions',
      'Direct 1-on-1 Bilateral Meeting Booking System',
      'Complimentary ticket transfers up to 48 hours before',
    ],
    cta: 'Purchase VIP Pass',
    popular: false,
  },
];

/* =====================================================================
   SHARED BUILDING BLOCKS
   ===================================================================== */

const featuredRank = new Map(FEATURED_PHOTOS.map((file, i) => [file, i]));
const GALLERY_PHOTOS = galleryJson
  .map((photo, i) => ({ photo, i, rank: featuredRank.get(photo.src.split('/').pop()) ?? Infinity }))
  .sort((a, b) => a.rank - b.rank || a.i - b.i)
  .map(({ photo }) => photo);

const PHOTO_CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'conference', label: 'Conference' },
  { id: 'gala', label: 'VIP Gala' },
  { id: 'moments', label: 'More Moments' },
];

const CATEGORY_LABELS = { conference: 'Conference', gala: 'VIP Gala', moments: 'Summit Moments' };

const INITIAL_PHOTOS = 12;

const sectionClass = 'relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200';
const primaryButton =
  'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] hover:opacity-90 transition-opacity min-h-[48px]';
const secondaryButton =
  'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold text-slate-900 bg-white border border-slate-300 hover:border-slate-900 transition-colors min-h-[48px]';

function SectionHeader({ eyebrow, title, intro, children }) {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#005EFF] mb-3">{eyebrow}</p>}
      <h2 className="font-heading font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight">{title}</h2>
      {intro && <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed text-center">{intro}</p>}
      {children && <div className="mt-6 flex justify-center">{children}</div>}
    </div>
  );
}

/* =====================================================================
   SECTIONS
   ===================================================================== */

function HeroSection() {
  const strip = GALLERY_PHOTOS.slice(0, 3);
  return (
    <section id="about" className="relative pt-14 sm:pt-20 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <p className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#005EFF] mb-6">
          <Sparkles className="w-4 h-4 text-[#F40260]" />
          {HERO.eyebrow}
        </p>

        <h1 className="font-black text-4xl min-[400px]:text-5xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900 leading-[1.05] max-w-5xl mx-auto text-center break-words">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005EFF] to-[#F40260]">{HERO.titleAccent}</span>{' '}
          {HERO.titleEnd}
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-slate-600 text-base sm:text-xl leading-relaxed text-center">{HERO.intro}</p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm font-medium text-slate-700">
          <span className="inline-flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#005EFF]" />
            {EVENT.dates}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F40260]" />
            {EVENT.venue}, {EVENT.location}
          </span>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#agenda" className={primaryButton}>
            View the Agenda
          </a>
          <a href={SPONSOR_HREF} className={secondaryButton}>Sponsor</a>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 w-full">
          {strip.map((photo, idx) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className={`w-full aspect-[4/3] object-cover rounded-lg bg-slate-100 ${idx > 0 ? 'hidden md:block' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorsSection() {
  return (
    <section id="industries" className={sectionClass}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Sectors Attending"
          title="WHO'S ATTENDING"
          intro="The entire list of macro economic commodity sector participants."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {SECTORS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="border-t border-slate-200 pt-6 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50/80 flex items-center justify-center mb-4 text-[#005EFF]">
                <Icon className="w-6 h-6 text-[#005EFF]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2 text-center">{title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed text-center">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandsSection() {
  return (
    <section id="brands-2025" className={`${sectionClass} bg-slate-50`}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Proven Global Track Record"
          title="Brands & Institutions Present in 2025"
          intro="Multinationals, banks, miners, energy producers and trade bodies who joined us at the 2025 summit. Think 10 times bigger this year!"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 border-l border-t border-slate-200">
          {BRANDS_2025.map((brand) => (
            <div
              key={brand.name}
              title={brand.name}
              className="h-20 sm:h-24 bg-white border-r border-b border-slate-200 flex items-center justify-center p-3 sm:p-4"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                loading="lazy"
                className="max-h-10 sm:max-h-12 max-w-full w-auto h-auto object-contain"
              />
            </div>
          ))}
        </div>

        <h3 className="mt-14 mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#005EFF] text-center">Media Partners</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 border-l border-t border-slate-200">
          {MEDIA_PARTNERS_2025.map((partner) => (
            <div
              key={partner.name}
              title={partner.name}
              className="h-16 sm:h-20 bg-white border-r border-b border-slate-200 flex items-center justify-center p-2.5 sm:p-3"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                loading="lazy"
                className="max-h-8 sm:max-h-10 max-w-full w-auto h-auto object-contain"
              />
            </div>
          ))}
        </div>

        <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 border-t border-slate-200 pt-8 text-center">
          {STATS_2025.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</dt>
              <dd className="mt-1 font-heading font-bold text-3xl text-slate-900">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Lightbox({ photos, index, onClose, onNavigate }) {
  const photo = photos[index];
  const step = useCallback(
    (delta) => onNavigate((i) => (i + delta + photos.length) % photos.length),
    [photos.length, onNavigate]
  );
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, prev, next]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-slate-950/95 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="2025 Summit photo viewer"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 text-white/80 text-xs sm:text-sm font-semibold">
        <span>
          {index + 1} / {photos.length}
          <span className="ml-3 text-[10px] uppercase tracking-wider text-white/60">{CATEGORY_LABELS[photo.category]}</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-md hover:bg-white/10 text-white transition-colors"
          aria-label="Close gallery"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center px-2 sm:px-16 pb-6 min-h-0">
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="max-h-full max-w-full w-auto h-auto object-contain rounded-md"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>,
    document.body
  );
}

function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const counts = useMemo(
    () =>
      GALLERY_PHOTOS.reduce(
        (acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }),
        { all: GALLERY_PHOTOS.length }
      ),
    []
  );

  const filtered = useMemo(
    () => (activeCategory === 'all' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_PHOTOS);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <section id="gallery-2025" className={sectionClass}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="2025 Photo Library"
          title="Highlights from the 2025 Summit"
          intro="Look back at the inaugural edition of the International Commodity Summit, setting the benchmark for our upcoming 2027 New York edition."
        />

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-b border-slate-200 mb-8">
          {PHOTO_CATEGORIES.filter((c) => counts[c.id]).map((c) => {
            const active = activeCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveCategory(c.id);
                  setShowAll(false);
                }}
                className={`-mb-px pb-3 border-b-2 text-sm font-semibold transition-colors cursor-pointer ${
                  active ? 'border-[#005EFF] text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {c.label}
                <span className="ml-1.5 text-xs text-slate-400">{counts[c.id]}</span>
              </button>
            );
          })}
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {visible.map((photo, idx) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="block w-full mb-3 break-inside-avoid overflow-hidden rounded-md bg-slate-100 hover:opacity-90 transition-opacity cursor-pointer"
              aria-label={`Open photo ${idx + 1}: ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="w-full h-auto"
              />
            </button>
          ))}
        </div>

        {filtered.length > INITIAL_PHOTOS && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setShowAll((v) => !v)} className={`${secondaryButton} cursor-pointer`}>
              {showAll ? 'Show fewer photos' : `View all ${filtered.length} photos`}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox photos={filtered} index={lightboxIndex} onClose={closeLightbox} onNavigate={setLightboxIndex} />
      )}
    </section>
  );
}

function AgendaSection() {
  const [activeDay, setActiveDay] = useState(AGENDA[0].day);
  const current = AGENDA.find((d) => d.day === activeDay) || AGENDA[0];

  return (
    <section id="agenda" className={sectionClass}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Program at a Glance"
          title="Official Summit Agenda"
          intro={`Nov 15 - 17, 2027 • ${EVENT.venue}, New York`}
        />

        <div className="flex justify-center gap-6 sm:gap-10 border-b border-slate-200" role="tablist">
          {AGENDA.map((d) => {
            const active = d.day === activeDay;
            return (
              <button
                key={d.day}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveDay(d.day)}
                className={`-mb-px pb-3 border-b-2 text-center transition-colors cursor-pointer ${
                  active ? 'border-[#005EFF] text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <span className="block text-base sm:text-lg font-bold">{d.day}</span>
                <span className="block text-xs font-medium">{d.date}</span>
              </button>
            );
          })}
        </div>

        <ol className="divide-y divide-slate-200 border-b border-slate-200">
          {current.sessions.map((s) => {
            if (s.type === 'break') {
              return (
                <li key={s.time} className="grid sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 py-4 text-sm text-slate-500">
                  <span className="font-medium">{s.time}</span>
                  <span className="inline-flex items-center gap-2">
                    <Coffee className="w-4 h-4" />
                    {s.title}
                  </span>
                </li>
              );
            }
            const isVip = s.type === 'vip';
            return (
              <li key={s.time} className="grid sm:grid-cols-[200px_1fr_auto] gap-2 sm:gap-6 py-6 sm:items-center">
                <span className={`text-sm font-semibold ${isVip ? 'text-[#F40260]' : 'text-[#005EFF]'}`}>{s.time}</span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 leading-snug">{s.title}</h3>
                <span
                  className={`justify-self-start sm:justify-self-end inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                    isVip ? 'bg-[#F40260] text-white' : 'bg-blue-50 text-[#005EFF]'
                  }`}
                >
                  {isVip && <Sparkles className="w-3 h-3" />}
                  {isVip ? 'VIP Only' : s.track}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex justify-center">
          <a href="#tickets" className={primaryButton}>
            Get your pass
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function AppSection() {
  const [activeAppTab, setActiveAppTab] = useState('meetings');

  return (
    <section id="app" className={`${sectionClass} bg-slate-50 overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Delegate Digital Command Center"
          title="Event App"
          intro="Releases 14 days ahead of the event so you can target & connect with relevant decisionmakers!"
        />

        {/* Super Clean Interactive Mockup Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-12">
          {/* Top Header / App Shell */}
          <div className="bg-slate-900 text-white px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#005EFF] to-[#F40260] flex items-center justify-center font-black text-xs text-white shadow-sm">
                ICS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm tracking-tight text-white">ICS New York 2027</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                    Pre-Summit Live Access
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Meadowlands Exhibition Center • 15 - 17 Nov 2027</p>
              </div>
            </div>

            {/* App Tab Switcher */}
            <div className="flex items-center bg-slate-800/90 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveAppTab('meetings')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeAppTab === 'meetings'
                    ? 'bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Bilateral Meetings (4)
              </button>
              <button
                type="button"
                onClick={() => setActiveAppTab('calendar')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeAppTab === 'calendar'
                    ? 'bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                My Calendar
              </button>
              <button
                type="button"
                onClick={() => setActiveAppTab('network')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeAppTab === 'network'
                    ? 'bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Decisionmakers (3,500+)
              </button>
            </div>
          </div>

          {/* Tab 1: Confirmed Bilateral Meetings */}
          {activeAppTab === 'meetings' && (
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900">Confirmed 1-on-1 Bilateral Deal Rooms</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Pre-arranged 20-minute private executive meetings for Day 1 & Day 2.</p>
                </div>
                <span className="self-start sm:self-center text-xs font-semibold text-[#005EFF] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                  4 Confirmed Bilateral Meetings
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Meeting 1: Honeywell */}
                <div className="border border-slate-200/90 rounded-xl p-4 sm:p-5 bg-white hover:border-[#005EFF]/40 transition-colors shadow-xs">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-24 bg-slate-50 rounded-lg p-1.5 border border-slate-100 flex items-center justify-center">
                        <img src="/brands-2025/honeywell.png" alt="Honeywell" className="max-h-6 max-w-full object-contain" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-slate-900">Honeywell International</div>
                        <div className="text-xs text-slate-500">VP Procurement & Industrial Materials</div>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Confirmed
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 bg-slate-50/80 rounded-lg p-2.5 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Nov 15 • 10:30 – 10:50 AM</span>
                    <span className="text-[#005EFF] font-medium">Bilateral Table B-04 (VIP Lounge)</span>
                  </div>
                </div>

                {/* Meeting 2: S&P Global */}
                <div className="border border-slate-200/90 rounded-xl p-4 sm:p-5 bg-white hover:border-[#005EFF]/40 transition-colors shadow-xs">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-24 bg-slate-50 rounded-lg p-1.5 border border-slate-100 flex items-center justify-center">
                        <img src="/brands-2025/sp-global.png" alt="S&P Global" className="max-h-6 max-w-full object-contain" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-slate-900">S&P Global Commodity Insights</div>
                        <div className="text-xs text-slate-500">Global Head of Energy & Metals Pricing</div>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Confirmed
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 bg-slate-50/80 rounded-lg p-2.5 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Nov 15 • 01:15 – 01:35 PM</span>
                    <span className="text-[#005EFF] font-medium">Bilateral Suite C-01 (Mezzanine)</span>
                  </div>
                </div>

                {/* Meeting 3: McKinsey & Company */}
                <div className="border border-slate-200/90 rounded-xl p-4 sm:p-5 bg-white hover:border-[#005EFF]/40 transition-colors shadow-xs">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-24 bg-slate-50 rounded-lg p-1.5 border border-slate-100 flex items-center justify-center">
                        <img src="/brands-2025/mckinsey.png" alt="McKinsey & Company" className="max-h-6 max-w-full object-contain" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-slate-900">McKinsey & Company</div>
                        <div className="text-xs text-slate-500">Partner, Global Energy & Materials Practice</div>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Confirmed
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 bg-slate-50/80 rounded-lg p-2.5 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Nov 16 • 09:30 – 09:50 AM</span>
                    <span className="text-[#005EFF] font-medium">Boardroom A (Executive Hall)</span>
                  </div>
                </div>

                {/* Meeting 4: Maersk */}
                <div className="border border-slate-200/90 rounded-xl p-4 sm:p-5 bg-white hover:border-[#005EFF]/40 transition-colors shadow-xs">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-24 bg-slate-50 rounded-lg p-1.5 border border-slate-100 flex items-center justify-center">
                        <img src="/brands-2025/f8420-maersk.png" alt="Maersk" className="max-h-6 max-w-full object-contain" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-slate-900">A.P. Moller - Maersk</div>
                        <div className="text-xs text-slate-500">Director of Global Commodity Freight</div>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Confirmed
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 bg-slate-50/80 rounded-lg p-2.5 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Nov 16 • 02:15 – 02:35 PM</span>
                    <span className="text-[#005EFF] font-medium">Bilateral Table D-12 (Logistics Hub)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Summit Calendar */}
          {activeAppTab === 'calendar' && (
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900">Personalized Delegate Itinerary</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Synchronized with official plenary sessions and reserved bilateral meetings.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-slate-700">Nov 15 (Day 1)</span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold text-slate-400">Nov 16 (Day 2)</span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold text-slate-400">Nov 17 (Day 3)</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#005EFF] w-24">08:00 – 09:00 AM</span>
                    <div>
                      <div className="font-heading font-bold text-sm text-slate-900">Coffee & Breakfast Networking Reception</div>
                      <div className="text-xs text-slate-500">Exhibition Floor Networking Hub</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded self-start sm:self-center">Networking</span>
                </div>

                <div className="border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50/40">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#005EFF] w-24">09:00 – 10:00 AM</span>
                    <div>
                      <div className="font-heading font-bold text-sm text-slate-900">Rare Earths, Critical Minerals & Commodities of the Future</div>
                      <div className="text-xs text-slate-500">Plenary Stage A • Keynote Session</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#005EFF] bg-blue-100/70 px-2.5 py-1 rounded self-start sm:self-center">Keynote Plenary</span>
                </div>

                <div className="border border-pink-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-pink-50/30">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#F40260] w-24">10:30 – 10:50 AM</span>
                    <div>
                      <div className="font-heading font-bold text-sm text-slate-900">1-on-1 Bilateral Meeting: Honeywell International</div>
                      <div className="text-xs text-slate-500">VIP Deal Room B-04 • Subject: Critical Reagents & Hydrocarbons</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#F40260] bg-pink-100/70 px-2.5 py-1 rounded self-start sm:self-center">Private Bilateral</span>
                </div>

                <div className="border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#005EFF] w-24">01:00 – 02:00 PM</span>
                    <div>
                      <div className="font-heading font-bold text-sm text-slate-900">Defence Tech Mining & Metals Requirements & Chemicals</div>
                      <div className="text-xs text-slate-500">Track Hall 2 • Strategic Supply Chains</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded self-start sm:self-center">Track Session</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Decisionmaker Directory */}
          {activeAppTab === 'network' && (
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900">Verified Decisionmakers & Delegates</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Filter by macro sector and initiate bilateral introductions directly.</p>
                </div>
                <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span>Directory:</span>
                  <span className="text-slate-900 font-semibold">3,500+ Registered Executives</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Executive 1: Honeywell */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#005EFF] bg-blue-50 px-2 py-0.5 rounded">Chemicals & Tech</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active on Platform" />
                    </div>
                    <div className="font-heading font-bold text-sm text-slate-900">David Vance</div>
                    <div className="text-xs text-slate-600 font-medium">VP Global Supply Chain</div>
                    <div className="text-[11px] text-slate-400 mt-1">Honeywell International</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">New York Delegation</span>
                    <span className="text-xs font-semibold text-[#005EFF] hover:underline cursor-pointer">Request 1-on-1</span>
                  </div>
                </div>

                {/* Executive 2: Rand Merchant Bank */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#005EFF] bg-blue-50 px-2 py-0.5 rounded">Structured Finance</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active on Platform" />
                    </div>
                    <div className="font-heading font-bold text-sm text-slate-900">Sipho Khumalo</div>
                    <div className="text-xs text-slate-600 font-medium">Head of Commodity Derivatives</div>
                    <div className="text-[11px] text-slate-400 mt-1">Rand Merchant Bank (RMB)</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Johannesburg / NY</span>
                    <span className="text-xs font-semibold text-[#005EFF] hover:underline cursor-pointer">Request 1-on-1</span>
                  </div>
                </div>

                {/* Executive 3: Microsoft */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#005EFF] bg-blue-50 px-2 py-0.5 rounded">Energy Transition</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active on Platform" />
                    </div>
                    <div className="font-heading font-bold text-sm text-slate-900">Elena Rostova</div>
                    <div className="text-xs text-slate-600 font-medium">Director of Clean Power Infrastructure</div>
                    <div className="text-[11px] text-slate-400 mt-1">Microsoft Energy & Datacenters</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Global Infrastructure</span>
                    <span className="text-xs font-semibold text-[#005EFF] hover:underline cursor-pointer">Request 1-on-1</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4 Clean Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#005EFF] mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900 mb-2">Bilateral Dealmaker</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Filter by physical commodity (Energy, Metals, Agri, Chemicals, Finance) and reserve 20-min bilateral tables.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-[#F40260] mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900 mb-2">Live Summit Calendar</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Personalize your 3-day plenary schedule with instant calendar exports to Apple, Google, and Outlook.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#005EFF] mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900 mb-2">Decisionmaker Messaging</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Direct in-app messaging with verified C-suite leaders, mining heads, energy producers, and institutional desks.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-[#F40260] mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900 mb-2">NFC Fast-Track Pass</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Zero-wait touchless NFC badge issuance at the Meadowlands East Entrance for immediate summit access.
            </p>
          </div>
        </div>

        {/* Centered Bottom CTA */}
        <div className="mt-10 text-center flex flex-col items-center">
          <p className="text-xs sm:text-sm text-slate-500 mb-4 max-w-xl text-center">
            All Access Pass and VIP Executive Passholders automatically receive login activation 14 days before summit kickoff.
          </p>
          <a href="#tickets" className={primaryButton}>
            Explore Summit Passes
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function TicketsSection({ onSelectTicket }) {
  return (
    <section id="tickets" className={`${sectionClass} bg-slate-50`}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Official Conference Registration"
          title="Select Your Summit Pass"
          intro="Official conference passes for delegates, institutional investors, trading desks, and executive delegations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {TICKETS.map((t) => (
            <div
              key={t.id}
              className={`bg-white rounded-lg p-6 sm:p-8 flex flex-col ${
                t.popular ? 'border-2 border-[#005EFF]' : 'border border-slate-200'
              }`}
            >
              <div className="text-center pb-6 border-b border-slate-200">
                <p className={`text-xs font-semibold uppercase tracking-wider ${t.popular ? 'text-[#005EFF]' : 'text-slate-500'}`}>
                  {t.badge}
                </p>
                <h3 className="mt-2 font-heading font-bold text-2xl text-slate-900">{t.name}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">{t.description}</p>

                <div className="mt-6">
                  <span className="font-heading font-bold text-4xl sm:text-5xl text-slate-900 tracking-tight">{t.price}</span>
                  <span className="block mt-1 text-xs text-slate-500">Per delegate • All 3 days inclusive • New York</span>
                </div>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {t.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-[#005EFF] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onSelectTicket(t)}
                className={`mt-8 w-full cursor-pointer ${
                  t.popular
                    ? primaryButton
                    : 'inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors min-h-[48px]'
                }`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-slate-500 max-w-2xl mx-auto text-center">
          Need group delegation bookings (3+ passes) or sovereign official registration assistance? Contact{' '}
          <a
            href={`mailto:${EVENT.registrationEmail}`}
            className="text-[#005EFF] font-semibold underline underline-offset-2 hover:text-[#F40260] break-all"
          >
            {EVENT.registrationEmail}
          </a>
        </p>
      </div>
    </section>
  );
}

function SignupSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 text-center">
          Stay Updated on Agenda & Speaker Additions
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 text-center max-w-xl">
          Receive the official summit prospectus, delegate list updates, and room block codes for the {EVENT.venue}.
        </p>

        <div className="mt-6 w-full max-w-lg">
          {submitted ? (
            <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 py-3 px-4 rounded-md border border-emerald-200 w-full text-center">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Thank you! The Summit Prospectus & Registration kit has been sent.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <input
                type="email"
                required
                placeholder="Enter corporate email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 px-4 py-3 rounded-md bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#005EFF]"
              />
              <button type="submit" className={`${primaryButton} cursor-pointer shrink-0`}>
                Join the List
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const inputClass =
  'w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#005EFF]';

function TicketModal({ ticket, onClose }) {
  useEffect(() => {
    if (!ticket) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [ticket, onClose]);

  if (!ticket) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration reserved for ${ticket.name}! Confirmation details have been emailed.`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 flex items-center justify-center p-3 sm:p-4 overscroll-contain"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-lg max-w-md w-full p-6 sm:p-8 relative max-h-[92dvh] overflow-y-auto overscroll-contain my-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-slate-400 hover:text-slate-600 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-xs font-semibold uppercase tracking-wider text-[#F40260]">Confirm Delegate Pass</p>
        <h2 id="ticket-modal-title" className="font-heading font-bold text-2xl text-slate-900 mt-1 mb-1 pr-8">{ticket.name}</h2>
        <p className="font-heading font-bold text-3xl text-slate-900">{ticket.price}</p>
        <p className="mt-2 mb-6 text-xs text-slate-500">{EVENT.venue}, New York • {EVENT.dates}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ticket-name" className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input id="ticket-name" required type="text" autoComplete="name" placeholder="e.g. Clayton Vance" className={inputClass} />
          </div>
          <div>
            <label htmlFor="ticket-email" className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email</label>
            <input id="ticket-email" required type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" className={inputClass} />
          </div>
          <div>
            <label htmlFor="ticket-company" className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
            <input id="ticket-company" required type="text" autoComplete="organization" placeholder="e.g. Global Commodities Ltd" className={inputClass} />
          </div>
          <button type="submit" className={`${primaryButton} w-full mt-4 cursor-pointer`}>
            Proceed to Registration ({ticket.price})
          </button>
        </form>
      </div>
    </div>
  );
}

/* =====================================================================
   PAGE
   ===================================================================== */

export default function Home() {
  useTrafficTracker();
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <>
      <main className="relative bg-white">
        <HeroSection />
        <SectorsSection />
        <BrandsSection />
        <GallerySection />
        <AgendaSection />
        <AppSection />
        <TicketsSection onSelectTicket={setSelectedTicket} />
        <SignupSection />
      </main>

      <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </>
  );
}
