import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  Search,
  ArrowLeft,
  Calendar,
  Sparkles,
  Building2,
  Mail,
  CheckCircle2,
  Filter,
  UserCheck,
} from 'lucide-react';
import { SPEAKERS, SPEAKER_CATEGORIES } from '../data/speakersData';
import { useTrafficTracker } from '../hooks/useTrafficTracker';

const SPEAKER_EMAIL = 'speakers@internationalcommoditysummit.com';
const SPEAKER_MAILTO = `mailto:${SPEAKER_EMAIL}?subject=${encodeURIComponent(
  'Speaker Application - International Commodity Summit'
)}`;

export default function Speakers() {
  useTrafficTracker();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSpeakers = useMemo(() => {
    return SPEAKERS.filter((speaker) => {
      const matchesCategory =
        activeCategory === 'All' || speaker.category === activeCategory;
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        speaker.name.toLowerCase().includes(query) ||
        speaker.company.toLowerCase().includes(query) ||
        speaker.role.toLowerCase().includes(query) ||
        speaker.slot.toLowerCase().includes(query) ||
        speaker.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      {/* Top Breadcrumb & Hero */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 py-1 text-xs font-semibold text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Summit Home
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F40260]" />
              <span>Confirmed Faculty & Session Leaders</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Summit Speakers & Presenters
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Find out who's speaking and presenting at the International Commodity Summit.
              Meet global industry leaders, sovereign ministers, C-suite executives, and institutional commodity experts.
            </p>

            {/* Quick Action Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white/90 border border-white/15">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                {SPEAKERS.length} Confirmed Faculty Members
              </span>
              <a
                href="#apply-to-speak"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white font-semibold hover:opacity-95 transition-opacity"
              >
                <Mic className="w-4 h-4" />
                Apply to Speak
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search speaker, company, or speaking slot..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005EFF]/40 focus:border-[#005EFF] bg-white transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold px-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="text-xs sm:text-sm font-semibold text-slate-500 shrink-0 self-center md:self-auto">
            Showing <span className="text-slate-900 font-bold">{filteredSpeakers.length}</span> of {SPEAKERS.length} speakers
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="max-w-6xl mx-auto mt-3 overflow-x-auto pb-1 flex items-center gap-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {SPEAKER_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Speakers Grid (WordPress-inspired with attractive speaking slot cards) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredSpeakers.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <Mic className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-heading font-bold text-xl text-slate-800">No speakers found</h3>
              <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
                No speakers matched your search criteria. Try a different query or select "All" categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
                className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {filteredSpeakers.map((speaker, index) => {
                // Gradient styles matching WordPress original:
                // Blue gradient: from rgb(0,106,255) to rgb(155,81,224)
                // Pink gradient: from rgb(246,0,98) to rgb(155,81,224)
                const isPink = speaker.gradient === 'pink' || (speaker.gradient !== 'blue' && index % 2 === 1);
                const bgGradientClass = isPink
                  ? 'bg-gradient-to-br from-[#F40260] via-[#D00070] to-[#7B2CBF]'
                  : 'bg-gradient-to-br from-[#005EFF] via-[#3B4CCA] to-[#7B2CBF]';

                return (
                  <div
                    key={speaker.id}
                    className={`rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row text-white ${bgGradientClass} border border-white/20`}
                  >
                    {/* Content Section (Left on desktop) */}
                    <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between order-2 sm:order-1">
                      <div>
                        {/* Speaker Category Pill */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs mb-3">
                          <span>{speaker.category}</span>
                        </div>

                        {/* Speaker Name */}
                        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                          {speaker.name}
                        </h2>

                        {/* Speaker Role & Company */}
                        <div className="mt-1.5 flex items-start gap-1.5 text-sm sm:text-base text-white/95 font-medium leading-snug">
                          <Building2 className="w-4 h-4 shrink-0 mt-1 text-white/70" />
                          <div>
                            <span className="font-bold">{speaker.role}</span>
                            {speaker.company && (
                              <span className="block text-xs sm:text-sm text-white/85 font-medium mt-0.5">
                                {speaker.company}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Attractive Card-Type Speaking Slot */}
                      <div className="mt-6 bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/25 shadow-inner">
                        <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/15">
                          <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                            <Mic className="w-3.5 h-3.5 shrink-0" />
                            <span>Speaking Slot</span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white">
                            {speaker.slotType || 'Session'}
                          </span>
                        </div>

                        {/* Topic Title */}
                        <p className="font-heading font-bold text-sm sm:text-base text-white leading-snug break-words">
                          {speaker.slot}
                        </p>

                        <div className="mt-2.5 flex items-center gap-2 text-[11px] text-white/80 font-medium">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-white/70" /> Plenary & Executive Track
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Speaker Image Section (Right on desktop) */}
                    <div className="sm:w-44 md:w-48 lg:w-44 xl:w-52 shrink-0 relative bg-black/20 order-1 sm:order-2 overflow-hidden flex items-center justify-center">
                      <div className="w-full h-56 sm:h-full relative min-h-[220px]">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-top sm:object-center transform hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            // fallback avatar if image fails to load
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/logo/logo-icon-white.png';
                            e.currentTarget.className = 'w-20 h-20 m-auto opacity-75 object-contain';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:hidden" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* "Apply to Become a Speaker" Section (Matching original WordPress CTA) */}
      <section id="apply-to-speak" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#005EFF]/10 text-[#005EFF] mb-4">
            <Mic className="w-3.5 h-3.5" /> Call for 2027 Keynote & Panel Faculty
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Apply to Become a Speaker
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Are you leading a transformative project in critical minerals, energy transition, agricultural logistics, or commodity finance? Present your insights to over 450+ global decisionmakers.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-10">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#005EFF] mb-2" />
              <h4 className="font-heading font-bold text-slate-900 text-sm">Keynote Addresses</h4>
              <p className="text-xs text-slate-600 mt-1">20-minute standalone vision presentations on main plenary stage.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#F40260] mb-2" />
              <h4 className="font-heading font-bold text-slate-900 text-sm">Sector Panels</h4>
              <p className="text-xs text-slate-600 mt-1">45-minute moderated debates across metals, energy, and agri tracks.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-[#7B2CBF] mb-2" />
              <h4 className="font-heading font-bold text-slate-900 text-sm">Executive Masterclasses</h4>
              <p className="text-xs text-slate-600 mt-1">Intimate boardroom workshops for institutional delegators.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={SPEAKER_MAILTO}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] hover:opacity-95 shadow-lg shadow-[#005EFF]/20 transition-all w-full sm:w-auto"
            >
              <Mail className="w-5 h-5" />
              Submit Speaking Proposal
            </a>
            <Link
              to="/#tickets"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors w-full sm:w-auto"
            >
              Register as Attendee
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Speaking proposals are reviewed on a rolling basis by the Summit Steering Committee. Contact:{' '}
            <a href={`mailto:${SPEAKER_EMAIL}`} className="text-[#005EFF] underline hover:text-[#F40260]">
              {SPEAKER_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
