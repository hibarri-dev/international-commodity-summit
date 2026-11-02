import React from 'react';
import { Building2 } from 'lucide-react';

export const brands2025 = [
  { name: "Honeywell", category: "Industrial Technology", logo: "/brands-2025/honeywell.png" },
  { name: "S&P Global", category: "Commodity Insights", logo: "/brands-2025/sp-global.png" },
  { name: "Microsoft", category: "Technology", logo: "/brands-2025/microsoft.png" },
  { name: "McKinsey & Company", category: "Management Consulting", logo: "/brands-2025/mckinsey.png" },
  { name: "Aon", category: "Risk & Insurance", logo: "/brands-2025/aon.jpg" },
  { name: "Maersk", category: "Shipping & Logistics", logo: "/brands-2025/f8420-maersk.png" },
  { name: "Control Risks", category: "Risk Consulting", logo: "/brands-2025/control-risks.png" },
  { name: "WeWork", category: "Workspace", logo: "/brands-2025/wework.png" },
  { name: "CRU Group", category: "Commodity Intelligence", logo: "/brands-2025/6d790-cru_logo.jpg" },
  { name: "Moore Global", category: "Accounting & Advisory", logo: "/brands-2025/moore-global.png" },
  { name: "IBC Solar", category: "Solar Energy", logo: "/brands-2025/ibc-solar.webp" },
  { name: "Jindal Africa", category: "Steel & Mining", logo: "/brands-2025/jindal-africa.png" },
  { name: "Johannesburg Stock Exchange", category: "Exchange", logo: "/brands-2025/d55d6-jse-logo-edited.jpg" },
  { name: "Rand Merchant Bank", category: "Banking", logo: "/brands-2025/rmb.png" },
  { name: "FNB", category: "Banking", logo: "/brands-2025/fnb.png" },
  { name: "Rainbow Rare Earths", category: "Rare Earths", logo: "/brands-2025/rainbow-rare-earths.png" },
  { name: "Pensana", category: "Rare Earths", logo: "/brands-2025/pensana.png" },
  { name: "Renergen", category: "Gas & Helium", logo: "/brands-2025/renergen.png" },
  { name: "Fraser Alexander", category: "Mining Services", logo: "/brands-2025/fraser-alexander.jpg" },
  { name: "Mineral Technologies", category: "Mineral Processing", logo: "/brands-2025/e9488-mineral-technologies.webp" },
  { name: "Energy Capital & Power", category: "Energy Investment", logo: "/brands-2025/energy-capital-power.png" },
  { name: "BRICS Business Council", category: "Trade Council", logo: "/brands-2025/brics-business-council.jpeg" },
  { name: "Canada Africa Chamber of Commerce", category: "Trade Chamber", logo: "/brands-2025/canada-africa-chamber.jpeg" },
  { name: "GMEX Group", category: "Exchange Technology", logo: "/brands-2025/5fdd2-gmex-logo.png" },
  { name: "ecosystem.Ai", category: "Artificial Intelligence", logo: "/brands-2025/ecosystem-ai.jpg" },
  { name: "Luno", category: "Digital Assets", logo: "/brands-2025/3fe6b-luno-logos.png" },
  { name: "Metal Line Africa", category: "Metals & Logistics", logo: "/brands-2025/5cf0e-metal-line-africa-logo-1.jpeg" },
  { name: "Brand South Africa", category: "Trade Promotion", logo: "/brands-2025/66b7a-brandsa-logo.jpg" },
  { name: "DTIC", category: "Trade & Industry", logo: "/brands-2025/fa9c1-dtic.jpg" },
  { name: "NERSA", category: "Energy Regulator", logo: "/brands-2025/nersa.jpg" },
  { name: "ECIC", category: "Export Credit Insurance", logo: "/brands-2025/ecic.png" },
  { name: "Mintek", category: "Minerals Research", logo: "/brands-2025/mintek.png" },
  { name: "SACCI", category: "Chamber of Commerce", logo: "/brands-2025/sacci.jpg" },
  { name: "African Energy Chamber", category: "Energy Policy", logo: "/brands-2025/e8553-african-energy-chamber-logo-png.png" },
  { name: "Africa Energy Indaba", category: "Energy Forum", logo: "/brands-2025/africa-energy-indaba.jpg" },
  { name: "SAOGA", category: "Oil & Gas Association", logo: "/brands-2025/fbb1f-saoga.png" },
  { name: "Maritime Business Chamber", category: "Maritime", logo: "/brands-2025/maritime-business-chamber.png" },
  { name: "CopperCore", category: "Copper", logo: "/brands-2025/bcf4e-coppercore-logo.png" },
  { name: "Universal Coal", category: "Mining", logo: "/brands-2025/b38c3-universal_coal_plc_logo.jpeg" },
  { name: "Homeland Mining", category: "Mining", logo: "/brands-2025/homeland-mining.png" },
  { name: "MAB Mining & Construction", category: "Mining & Construction", logo: "/brands-2025/mab-mining.jpg" },
  { name: "Minexx", category: "Mineral Traceability", logo: "/brands-2025/fab01-minexx.webp" },
  { name: "Digby Wells", category: "Environmental Advisory", logo: "/brands-2025/4e42d-digby-wells-logo.jpeg" },
  { name: "Yellow Door Energy", category: "Solar Energy", logo: "/brands-2025/8a798-yellow-door-energy-logo.png" },
  { name: "Solar MD", category: "Energy Storage", logo: "/brands-2025/solar-md.png" },
  { name: "Africa GreenCo", category: "Renewable Energy", logo: "/brands-2025/aa3e5-africa_greenco_logo.png" },
  { name: "Agbiz", category: "Agricultural Business", logo: "/brands-2025/f5eba-agbiz.jpeg" },
  { name: "Commodity Trading Club", category: "Trading Network", logo: "/brands-2025/commodity-trading-club.jpeg" },
  { name: "Pangea Risk", category: "Geopolitical Risk", logo: "/brands-2025/d9d2b-pangea-risk_logo_on-the-move.jpg" },
  { name: "IOA", category: "Research", logo: "/brands-2025/3c078-ioa-logo-2017.png" },
  { name: "Tradepedia", category: "Trading Education", logo: "/brands-2025/758d0-tradepedia-logo.png" },
  { name: "Jenzy", category: "Technology", logo: "/brands-2025/jenzy.png" },
  { name: "Invest Cape Town", category: "Investment Promotion", logo: "/brands-2025/d8e42-cape-town-logo.png" },
  { name: "AWIMSA", category: "Mining Association", logo: "/brands-2025/eb450-awimsa.png" },
  { name: "Mining Review", category: "Media", logo: "/brands-2025/d53e4-mining-review-png.png" }
];

export default function BrandsAttending() {
  return (
    <section id="brands-2025" className="relative z-10 py-16 sm:py-20 bg-slate-50 border-b border-slate-200 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#005EFF] text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            Proven Global Track Record
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl text-slate-900 tracking-tight mb-3">
            Brands & Institutions Present in 2025
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Global corporations, banks, miners, energy producers and trade bodies who joined us at the 2025 summit.
          </p>
        </div>

        {/* Responsive Brand Logo Cards Grid */}
        <div className="grid grid-cols-2 min-[440px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {brands2025.map((brand, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#005EFF]/40 transition-all flex flex-col items-center justify-between text-center min-h-[108px] sm:min-h-[120px]"
            >
              <div className="h-12 sm:h-14 w-full flex items-center justify-center p-1 mb-1.5 sm:mb-2">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  loading="lazy"
                  className="max-h-9 sm:max-h-12 max-w-[95px] sm:max-w-[110px] w-auto h-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="w-full pt-1 border-t border-slate-100">
                <div className="font-heading font-bold text-[11px] sm:text-xs text-slate-900 truncate" title={brand.name}>
                  {brand.name}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 truncate" title={brand.category}>
                  {brand.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2025 Legacy Stats Bar */}
        <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-heading font-black text-xl min-[400px]:text-2xl text-[#005EFF]">1,850+</div>
            <div className="text-[11px] sm:text-xs text-slate-500 font-semibold">2025 Attendees</div>
          </div>
          <div>
            <div className="font-heading font-black text-xl min-[400px]:text-2xl text-[#F40260]">45+</div>
            <div className="text-[11px] sm:text-xs text-slate-500 font-semibold">Nations Represented</div>
          </div>
          <div>
            <div className="font-heading font-black text-xl min-[400px]:text-2xl text-[#005EFF]">$4.2B</div>
            <div className="text-[11px] sm:text-xs text-slate-500 font-semibold">Bilateral Deals</div>
          </div>
          <div>
            <div className="font-heading font-black text-xl min-[400px]:text-2xl text-[#F40260]">120+</div>
            <div className="text-[11px] sm:text-xs text-slate-500 font-semibold">Exhibiting Partners</div>
          </div>
        </div>
      </div>
    </section>
  );
}
