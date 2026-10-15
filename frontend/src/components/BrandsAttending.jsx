import React from 'react';
import { Building2 } from 'lucide-react';

export const brands2025 = [
  { name: "Maersk", category: "Global Shipping & Logistics", logo: "/brands-2025/f8420-maersk.png" },
  { name: "Johannesburg Stock Exchange", category: "Financial Exchanges & Derivatives", logo: "/brands-2025/d55d6-jse-logo-edited.jpg" },
  { name: "Brand South Africa", category: "Sovereign Trade Promotion", logo: "/brands-2025/66b7a-brandsa-logo.jpg" },
  { name: "Yellow Door Energy", category: "Commercial Clean Power", logo: "/brands-2025/8a798-yellow-door-energy-logo.png" },
  { name: "African Energy Chamber", category: "Energy Policy & Trade", logo: "/brands-2025/e8553-african-energy-chamber-logo-png.png" },
  { name: "Metal Line Africa", category: "Physical Metals & Bulk Freight", logo: "/brands-2025/5cf0e-metal-line-africa-logo-1.jpeg" },
  { name: "CopperCore", category: "Strategic Copper Processing", logo: "/brands-2025/bcf4e-coppercore-logo.png" },
  { name: "Africa GreenCo", category: "Renewable Power Offtake", logo: "/brands-2025/aa3e5-africa_greenco_logo.png" },
  { name: "GMEX Group", category: "Exchange Infrastructure & AI", logo: "/brands-2025/5fdd2-gmex-logo.png" },
  { name: "SAOGA", category: "Oil, Gas & Energy Alliance", logo: "/brands-2025/fbb1f-saoga.png" },
  { name: "DTIC", category: "Department of Trade & Industry", logo: "/brands-2025/fa9c1-dtic.jpg" },
  { name: "Mineral Technologies", category: "Mineral Beneficiation & Tech", logo: "/brands-2025/e9488-mineral-technologies.webp" },
  { name: "Minexx", category: "Mineral Supply Chain Traceability", logo: "/brands-2025/fab01-minexx.webp" },
  { name: "Agbiz", category: "Agricultural Business Chamber", logo: "/brands-2025/f5eba-agbiz.jpeg" },
  { name: "Digby Wells", category: "Environmental & Mining Advisory", logo: "/brands-2025/4e42d-digby-wells-logo.jpeg" },
  { name: "CRU Group", category: "Commodity Intelligence & Analysis", logo: "/brands-2025/6d790-cru_logo.jpg" },
  { name: "Tradepedia", category: "Trade Learning & Settlement", logo: "/brands-2025/758d0-tradepedia-logo.png" },
  { name: "IOA", category: "In On Africa Research", logo: "/brands-2025/3c078-ioa-logo-2017.png" },
  { name: "Luno", category: "Digital Asset Settlement", logo: "/brands-2025/3fe6b-luno-logos.png" },
  { name: "Invest Cape Town", category: "Municipal & Port Investment", logo: "/brands-2025/d8e42-cape-town-logo.png" },
  { name: "Pangea Risk", category: "Sovereign & Geopolitical Risk", logo: "/brands-2025/d9d2b-pangea-risk_logo_on-the-move.jpg" },
  { name: "Mining Review", category: "Industry Media & Publishing", logo: "/brands-2025/d53e4-mining-review-png.png" },
  { name: "AWIMSA", category: "Mining Industry Association", logo: "/brands-2025/eb450-awimsa.png" },
  { name: "Universal Coal", category: "Resource Extraction & Mining", logo: "/brands-2025/b38c3-universal_coal_plc_logo.jpeg" }
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
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight mb-3">
            Brands & Institutions Present in 2025
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Represented by global trade leaders, sovereign ministries, shipping conglomerates, and mining majors who gathered at our inaugural summit.
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
