import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Camera, ChevronDown, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import galleryPhotos from '../data/gallery2025.json';

const INITIAL_VISIBLE = 12;

const categories = [
  { id: 'all', label: 'All Photos' },
  { id: 'conference', label: 'Conference' },
  { id: 'gala', label: 'VIP Gala' },
  { id: 'moments', label: 'More Moments' },
];

const categoryLabels = {
  conference: 'Conference',
  gala: 'VIP Gala',
  moments: 'Summit Moments',
};

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
      className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-sm flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="2025 Summit photo viewer"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 text-white/80 text-xs sm:text-sm font-semibold">
        <span>
          {index + 1} / {photos.length}
          <span className="ml-3 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] uppercase tracking-wider">
            {categoryLabels[photo.category]}
          </span>
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
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
          className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-[#005EFF] text-white transition-colors"
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
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-[#F40260] text-white transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>,
    document.body
  );
}

export default function Gallery2025() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const counts = useMemo(
    () =>
      galleryPhotos.reduce(
        (acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }),
        { all: galleryPhotos.length }
      ),
    []
  );

  const filtered = useMemo(
    () => (activeCategory === 'all' ? galleryPhotos : galleryPhotos.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <section
      id="gallery-2025"
      className="relative z-10 py-16 sm:py-24 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 text-[#F40260] border border-pink-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            2025 Photo Library
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight mb-4">
            Highlights from the 2025 Summit
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Look back at the inaugural edition of the International Commodity Summit, setting the benchmark for our upcoming 2027 New York edition.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {categories
            .filter((c) => counts[c.id])
            .map((c) => {
              const active = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(c.id);
                    setShowAll(false);
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#005EFF]/50 hover:text-[#005EFF]'
                  }`}
                >
                  {c.label}
                  <span className={`ml-2 text-[11px] ${active ? 'text-white/70' : 'text-slate-400'}`}>{counts[c.id]}</span>
                </button>
              );
            })}
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
          {visible.map((photo, idx) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group relative block w-full mb-3 sm:mb-4 break-inside-avoid overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100 border border-slate-200 shadow-xs hover:shadow-lg hover:border-[#005EFF]/40 transition-all"
              aria-label={`Open photo ${idx + 1}: ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-slate-900">
                  {categoryLabels[photo.category]}
                </span>
                <Maximize2 className="w-4 h-4 text-white" />
              </span>
            </button>
          ))}
        </div>

        {filtered.length > INITIAL_VISIBLE && (
          <div className="mt-8 sm:mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#005EFF] hover:bg-[#004ad1] text-white text-sm font-bold shadow-md transition-colors"
            >
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
