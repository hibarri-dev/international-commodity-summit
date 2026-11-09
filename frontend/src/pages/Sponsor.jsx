import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  Send,
  Building2,
  Globe,
  Mail,
  Phone,
  User,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Lock,
} from 'lucide-react';
import Seo from '../components/Seo';
import { publicApi } from '../lib/api';

// Inventory of available & sold sponsorship items.
// Pricing preview is withheld until delegate submits their work email.
const SPONSORSHIP_OPPORTUNITIES = [
  { item: 'Flagship Double Story VVIP Island', category: 'Premier Exhibition', badge: 'Exclusive' },
  { item: 'International Island (15 x 15 ft)', category: 'High-Impact Booth', badge: 'High Visibility' },
  { item: 'Gala Evening Sponsor', category: 'Evening Hospitality', badge: 'Premier Tier' },
  { item: 'Keynotes Main Stage', category: 'Plenary Branding', badge: 'Executive' },
  { item: 'VIP Lounge', category: 'Executive Hospitality', badge: 'VIP Access' },
  { item: 'Stage Sponsorship', category: 'Conference Branding', badge: 'Branded' },
  { item: 'Conference Bags', category: 'Delegate Merchandising', badge: 'High Impact' },
  { item: 'Entrance & Welcome Booths', category: 'Arrival Branding', badge: 'High Traffic' },
  { item: 'Cocktail Event or Workshop', category: 'Networking Activation', badge: 'Custom Session' },
  { item: 'Drinks Prelude', category: 'Opening Reception', badge: 'Networking' },
  { item: 'Media Articles Feature', category: 'Editorial Coverage', badge: 'Global Reach' },
  { item: 'Event App & Official Emails', category: 'Digital Channels', badge: 'Omnichannel' },
  { item: 'Pens & Notebooks', category: 'Delegate Materials', badge: 'Branded' },
  { item: 'Coffee Station', category: 'Networking Hub', badge: 'High Traffic' },
  { item: 'Breakaway Room', category: 'Private Meetings', badge: 'Meeting Hub' },
  { item: 'Panel Discussions', category: 'Thought Leadership', badge: 'High Engagement' },
  { item: 'Water Cups', category: 'Continuous Reach', badge: 'Accessible' },
  { item: 'Lanyards', category: 'Delegate Wear', sold: true },
  { item: 'Badges', category: 'Registration', sold: true },
  { item: 'Breakfast', category: 'Morning Hospitality', sold: true },
  { item: 'Paparazzi', category: 'Media Activation', sold: true },
];

export default function Sponsor() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    hp: '', // Honeypot field for bot protection
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setError('');
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please provide your full name and work email address.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await publicApi.submitSponsorEnquiry(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Could not submit your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#005EFF] focus:border-[#005EFF] transition-all bg-white text-slate-800 placeholder:text-slate-400';
  const labelClass = 'block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5';

  return (
    <>
      <Seo
        title="Sponsor the International Commodity Summit 2027 | Geneva"
        description="Partner with the world's leading commodity conference in Geneva. Request real-time sponsorship opportunities and official package pricing."
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#005EFF]/40 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,94,255,0.18),transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase mb-5 text-white/90">
            <Award className="w-4 h-4 text-[#F40260]" />
            <span>Geneva 2027 • Official Sponsorship</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Elevate Your Brand on the{' '}
            <span className="bg-gradient-to-r from-[#005EFF] via-[#F40260] to-amber-300 bg-clip-text text-transparent">
              Global Commodity Stage
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Position your organization in front of 3,000+ senior trade executives, institutional investors, commodity
            producers, and global policymakers in Geneva, Switzerland.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-10">
            {submitted ? (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Sponsorship Pricing Dispatched!</h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{form.name}</strong>. The complete itemized list of
                  available sponsorship opportunities and official pricing has been released to:
                  <span className="block mt-2 font-mono text-sm font-semibold text-[#005EFF] bg-blue-50 py-1.5 px-3 rounded-md">
                    {form.email}
                  </span>
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 max-w-md mx-auto text-left leading-relaxed">
                  <strong>Please note:</strong> Sponsorship packages sell on a first-come, first-served basis. Simply reply
                  directly to the email you received from{' '}
                  <code className="font-semibold text-amber-900">info@internationalcommoditysummit.com</code> with your
                  final decision and our creative team will share custom mockups of the sponsored items featuring your brand.
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', company: '', website: '', hp: '' });
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                  <Link
                    to="/"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#005EFF] to-[#F40260] text-white hover:opacity-95 transition-opacity"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005EFF] uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> Instant Pricing Release
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Request Official Sponsorship Packages</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Enter your details below to immediately unlock the complete itemized pricing breakdown and sponsorship schedule sent directly to your email in real-time.
                  </p>
                </div>

                {error && (
                  <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field for anti-spam */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="hp"
                      value={form.hp}
                      onChange={handleChange('hp')}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sp-name" className={labelClass}>
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="sp-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange('name')}
                          placeholder="e.g. John Doe"
                          className={`${inputClass} pl-9`}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="sp-email" className={labelClass}>
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          id="sp-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange('email')}
                          placeholder="name@company.com"
                          className={`${inputClass} pl-9`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sp-phone" className={labelClass}>
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          id="sp-phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange('phone')}
                          placeholder="+41 22 000 0000"
                          className={`${inputClass} pl-9`}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="sp-company" className={labelClass}>
                        Company Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <input
                          id="sp-company"
                          type="text"
                          value={form.company}
                          onChange={handleChange('company')}
                          placeholder="e.g. Global Commodities Ltd"
                          className={`${inputClass} pl-9`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="sp-website" className={labelClass}>
                      Company Website
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Globe className="w-4 h-4" />
                      </div>
                      <input
                        id="sp-website"
                        type="url"
                        value={form.website}
                        onChange={handleChange('website')}
                        placeholder="https://company.com"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-[#005EFF] via-[#0047C2] to-[#F40260] hover:opacity-95 shadow-lg shadow-[#005EFF]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {submitting ? (
                        <>Releasing Pricing Schedule...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Release Sponsorship Pricing via Email</span>
                        </>
                      )}
                    </button>
                    <p className="mt-2 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Instant real-time delivery from info@internationalcommoditysummit.com
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Opportunities Inventory (Prices withheld until email submission) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Opportunities Snapshot Card */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#005EFF]" />
                  <span>Sponsorship Inventory</span>
                </h3>
                <span className="text-xs font-semibold text-slate-500">2027 Opportunities</span>
              </div>

              {/* Notice that prices release after email */}
              <div className="mb-4 p-3 rounded-xl bg-blue-50/70 border border-[#005EFF]/20 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#005EFF] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Tier Pricing Protected:</strong>
                  Official pricing schedules and package mockups release immediately to your inbox after entering your email.
                </div>
              </div>

              {/* Items list with no prices shown */}
              <div className="max-h-[380px] overflow-y-auto pr-1 space-y-2">
                {SPONSORSHIP_OPPORTUNITIES.map((item) => (
                  <div
                    key={item.item}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-colors ${
                      item.sold
                        ? 'border-slate-100 bg-slate-50/60 text-slate-400'
                        : 'border-slate-200 hover:border-[#005EFF]/40 hover:bg-blue-50/30 text-slate-800'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className={`font-semibold truncate ${item.sold ? 'line-through text-slate-400' : ''}`}>
                        {item.item}
                      </div>
                      <span className="text-[10px] text-slate-500 font-normal">
                        {item.category}
                        {item.badge && !item.sold && ` • ${item.badge}`}
                      </span>
                    </div>
                    <div className="shrink-0">
                      {item.sold ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-600 uppercase font-semibold">
                          Sold
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#005EFF] bg-blue-50 px-2 py-0.5 rounded border border-[#005EFF]/20">
                          <Lock className="w-2.5 h-2.5" />
                          <span>Sent via email</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Sponsor Card */}
            <div className="bg-gradient-to-br from-[#005EFF] to-[#003db3] rounded-2xl p-6 text-white shadow-md">
              <h4 className="font-bold text-base mb-3">Why Sponsor ICS 2027?</h4>
              <ul className="space-y-2.5 text-xs text-white/90">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-300" />
                  <span><strong>Global C-Suite Access:</strong> Direct networking with decision-makers controlling multibillion-dollar commodity trades.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-300" />
                  <span><strong>High-Impact Branding:</strong> Prominent digital, print, and experiential brand placement across keynote halls and VIP lounges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-300" />
                  <span><strong>Custom Activations:</strong> Bespoke meeting spaces, VIP dining, and private boardroom hospitality.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
