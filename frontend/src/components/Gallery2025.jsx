import React from 'react';
import { Camera, ArrowRight } from 'lucide-react';

const galleryPhotos = [
  {
    image: "/images-2025/f5766-gala-with-people.jpg",
    title: "Gala Dinner & Dealmaking",
    caption: "C-suite executives and sovereign delegations celebrating bilateral partnership signings.",
    tag: "Networking & Gala"
  },
  {
    image: "/images-2025/f499a-gala-ics-cropped.png",
    title: "Inaugural Plenary Keynotes",
    caption: "High-level ministerial policy dialogues and resource sovereignty debates.",
    tag: "Plenary Stage"
  },
  {
    image: "/images-2025/dcc7a-workshops.jpg",
    title: "Technical Masterclasses",
    caption: "In-depth interactive workshops on trade financing, hedging, and AI in trading.",
    tag: "Workshops"
  },
  {
    image: "/images-2025/b5987-pexels-photo-2017747.jpeg",
    title: "1-on-1 Bilateral Meetings",
    caption: "Pre-scheduled executive meetings connecting mining concessions with institutional capital.",
    tag: "Dealmaking Suites"
  },
  {
    image: "/images-2025/2aede-metal-line-branded-trucks.jpeg",
    title: "Logistics & Freight Pavilions",
    caption: "Live demonstrations of heavy freight transportation, bulk haulage, and corridor tracking.",
    tag: "Exhibition Floor"
  },
  {
    image: "/images-2025/25341-whatsapp-image-2025-05-27-at-2.06.44-pm.jpeg",
    title: "Trade Floor Interactions",
    caption: "Delegates connecting across 80+ turnkey exhibition booths representing critical sectors.",
    tag: "Summit Exhibition"
  }
];

export default function Gallery2025() {
  return (
    <section className="relative z-10 py-16 sm:py-24 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 text-[#F40260] border border-pink-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            2025 Event Highlights
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight mb-4">
            Highlights from the 2025 Summit
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Look back at the inaugural edition of the International Commodity Summit, setting the benchmark for our upcoming 2027 New York edition.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {galleryPhotos.map((item, idx) => (
            <div
              key={idx}
              className="group bg-slate-50 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg hover:border-[#005EFF]/40 transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-xs">
                  {item.tag}
                </span>
              </div>
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 mb-1.5 group-hover:text-[#005EFF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span>2025 Summit Archive</span>
                  <span className="text-[#005EFF] flex items-center gap-1 font-bold">
                    View Archive <ArrowRight className="w-3 h-3 text-[#F40260]" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
