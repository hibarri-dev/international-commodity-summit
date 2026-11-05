import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  ImagePlus,
  LogOut,
  Plus,
  Ticket,
  Trash2,
  Upload,
  ShieldCheck,
  Sparkles,
  MapPin,
  Calendar,
  ExternalLink,
  QrCode,
  User,
  Briefcase,
  Layers,
  Globe,
  Phone,
  Mail,
  FileText,
} from 'lucide-react';
import Seo from '../components/Seo';
import { FormError, authButtonClass, authInputClass, authLabelClass } from '../components/AuthCard';
import { useAttendeeAuth } from '../context/AttendeeAuthContext';
import { attendeeApi } from '../lib/api';

const ACCESS_LABELS = {
  ticket: 'Delegate',
  media_partner: 'Media Partner',
  association: 'Association',
};

function profileForm(a) {
  return {
    fullName: a.fullName || '',
    jobTitle: a.jobTitle || '',
    company: a.company || '',
    companyCategory: a.companyCategory || '',
    energySubcategory: a.energySubcategory || '',
    website: a.website || '',
    country: a.country || '',
    bio: a.bio || '',
    phones: a.phones?.length ? a.phones : [''],
    emails: a.emails?.length ? a.emails : [''],
  };
}

function ListField({ label, type, values, onChange, placeholder, max = 5 }) {
  return (
    <div>
      <span className={authLabelClass}>{label}</span>
      <div className="space-y-2">
        {values.map((value, i) => (
          <div key={i} className="flex gap-2">
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(values.map((v, j) => (j === i ? e.target.value : v)))}
              placeholder={placeholder}
              aria-label={`${label} ${i + 1}`}
              className={authInputClass}
            />
            {values.length > 1 && (
              <button
                type="button"
                onClick={() => onChange(values.filter((_, j) => j !== i))}
                className="shrink-0 p-2.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                aria-label={`Remove ${label.toLowerCase()} ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
      {values.length < max && (
        <button
          type="button"
          onClick={() => onChange([...values, ''])}
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#005EFF] hover:underline"
        >
          <Plus className="w-3.5 h-3.5" /> Add another
        </button>
      )}
    </div>
  );
}

function ImageUpload({ kind, label, hint, url, onUpdated, className = '', imgClass = 'object-cover' }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const upload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setError('Image must be 8 MB or smaller.');
      return;
    }
    try {
      setBusy(true);
      setError('');
      const res = await attendeeApi.uploadImage(kind, file);
      onUpdated(res.data.attendee);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    try {
      setBusy(true);
      const res = await attendeeApi.removeImage(kind);
      onUpdated(res.data.attendee);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className={authLabelClass}>{label}</span>
      <div className={`relative overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 ${className}`}>
        {url ? (
          <img src={url} alt={label} className={`w-full h-full ${imgClass}`} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            <ImagePlus className="w-6 h-6" />
          </div>
        )}
        {busy && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-xs font-semibold text-slate-700">
            Uploading...
          </div>
        )}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#005EFF] hover:underline">
          <Upload className="w-3.5 h-3.5" /> {url ? 'Replace' : 'Upload'}
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={upload} disabled={busy} />
        </label>
        {url && (
          <button type="button" onClick={remove} disabled={busy} className="text-xs font-semibold text-red-600 hover:underline">
            Remove
          </button>
        )}
      </div>
      {hint && <p className="mt-1 text-[11px] text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}

function AccountForm({ attendee, options, onSaved }) {
  const [form, setForm] = useState(() => profileForm(attendee));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const set = (field) => (e) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const setList = (field) => (values) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [field]: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.companyCategory === 'Energy' && !form.energySubcategory) {
      setError('Please choose your energy type.');
      return;
    }
    try {
      setSaving(true);
      setError('');
      const res = await attendeeApi.updateMe({
        ...form,
        phones: form.phones.map((p) => p.trim()).filter(Boolean),
        emails: form.emails.map((m) => m.trim()).filter(Boolean),
      });
      onSaved(res.data.attendee);
      setForm(profileForm(res.data.attendee));
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const categories = options?.companyCategories?.length ? options.companyCategories : [];
  const energySubcats = options?.energySubcategories?.length ? options.energySubcategories : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormError>{error}</FormError>

      {/* Section 1: Delegate Identity */}
      <div>
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-4 text-xs font-bold uppercase tracking-wider text-[#005EFF]">
          <User className="w-4 h-4" /> Personal Information
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="acc-name" className={authLabelClass}>
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="acc-name"
              required
              value={form.fullName}
              onChange={set('fullName')}
              autoComplete="name"
              placeholder="e.g. John Doe"
              className={authInputClass}
            />
          </div>
          <div>
            <label htmlFor="acc-title" className={authLabelClass}>
              Job Title
            </label>
            <input
              id="acc-title"
              value={form.jobTitle}
              onChange={set('jobTitle')}
              autoComplete="organization-title"
              placeholder="e.g. Managing Director"
              className={authInputClass}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Company & Industry Classification */}
      <div>
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-4 text-xs font-bold uppercase tracking-wider text-[#005EFF]">
          <Building2 className="w-4 h-4" /> Company & Industry Sector
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="acc-company" className={authLabelClass}>
              Company Name
            </label>
            <input
              id="acc-company"
              value={form.company}
              onChange={set('company')}
              autoComplete="organization"
              placeholder="e.g. Glencore, Trafigura, etc."
              className={authInputClass}
            />
          </div>

          <div>
            <label htmlFor="acc-category" className={authLabelClass}>
              Company Category <span className="text-slate-400 font-normal">(Sector)</span>
            </label>
            <select
              id="acc-category"
              value={form.companyCategory}
              onChange={(e) => {
                setSaved(false);
                setForm((prev) => ({
                  ...prev,
                  companyCategory: e.target.value,
                  energySubcategory: e.target.value === 'Energy' ? prev.energySubcategory : '',
                }));
              }}
              className={`${authInputClass} cursor-pointer`}
            >
              <option value="">Choose your sector category...</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {form.companyCategory === 'Energy' && (
            <div className="sm:col-span-2 bg-blue-50/60 border border-blue-200/80 rounded-xl p-4">
              <span className="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-2">
                Energy Subcategory *
              </span>
              <div className="flex flex-wrap gap-2">
                {energySubcats.map((sub) => (
                  <label
                    key={sub}
                    className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all shadow-sm ${
                      form.energySubcategory === sub
                        ? 'border-[#005EFF] bg-[#005EFF] text-white shadow-[#005EFF]/20'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="energySubcategory"
                      value={sub}
                      checked={form.energySubcategory === sub}
                      onChange={set('energySubcategory')}
                      className="sr-only"
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="acc-website" className={authLabelClass}>
              Company Website
            </label>
            <input
              id="acc-website"
              value={form.website}
              onChange={set('website')}
              placeholder="https://company.com"
              autoComplete="url"
              className={authInputClass}
            />
          </div>

          <div>
            <label htmlFor="acc-country" className={authLabelClass}>
              Country / Headquarters
            </label>
            <input
              id="acc-country"
              value={form.country}
              onChange={set('country')}
              autoComplete="country-name"
              placeholder="e.g. Switzerland, UAE, USA"
              className={authInputClass}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Contact Channels */}
      <div>
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-4 text-xs font-bold uppercase tracking-wider text-[#005EFF]">
          <Phone className="w-4 h-4" /> Direct Contact Channels
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ListField label="Direct Phone Numbers" type="tel" values={form.phones} onChange={setList('phones')} placeholder="+41 22 000 0000" />
          <ListField label="Secondary Work Emails" type="email" values={form.emails} onChange={setList('emails')} placeholder="assistant@company.com" />
        </div>
      </div>

      {/* Section 4: Bio / Company Description */}
      <div>
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-4 text-xs font-bold uppercase tracking-wider text-[#005EFF]">
          <FileText className="w-4 h-4" /> About You / Company Overview
        </div>
        <div>
          <textarea
            id="acc-bio"
            rows={4}
            value={form.bio}
            onChange={set('bio')}
            maxLength={2000}
            placeholder="Brief overview of your trading activity, commodities of interest, or investment profile..."
            className={authInputClass}
          />
          <div className="mt-1 flex justify-end text-[11px] text-slate-400">
            {form.bio.length} / 2000 characters
          </div>
        </div>
      </div>

      {/* Submit Action */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className={`${authButtonClass} sm:w-auto px-8 shadow-md shadow-[#005EFF]/20`}
        >
          {saving ? 'Saving Profile...' : 'Save Profile Changes'}
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Changes saved successfully
          </span>
        )}
      </div>
    </form>
  );
}

export default function Account() {
  const { attendee, setAttendee, options, loading, logout } = useAttendeeAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
        <div className="w-8 h-8 border-3 border-[#005EFF] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium">Loading your attendee account...</span>
      </div>
    );
  }
  if (!attendee) return <Navigate to="/login" replace state={{ from: '/account' }} />;

  const ticket = attendee.ticket || {};

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Seo title="My Account | International Commodity Summit" noindex />

      {/* Hero Cover Header */}
      <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-[#005EFF]/30 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,94,255,0.18),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(244,2,96,0.15),transparent_60%)] pointer-events-none" />
        {attendee.bannerUrl && (
          <img
            src={attendee.bannerUrl}
            alt=""
            className="w-full h-full object-cover absolute inset-0 opacity-30 mix-blend-overlay"
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-16 sm:pb-20 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold uppercase tracking-wider text-white/95">Official Delegate Portal</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Geneva 2027</span>
            </div>
            <div className="text-slate-400 text-xs hidden sm:flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#005EFF]" /> 15–17 November 2027
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F40260]" /> Geneva, Switzerland
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Identity Bar */}
        <div className="-mt-11 sm:-mt-14 bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-5 sm:p-6 mb-8 relative z-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left">
              {/* Avatar */}
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border-4 border-white bg-gradient-to-br from-[#005EFF] to-[#F40260] text-white p-0.5 shadow-lg shrink-0 overflow-hidden">
                {attendee.profilePhotoUrl ? (
                  <img
                    src={attendee.profilePhotoUrl}
                    alt={attendee.fullName}
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-heading font-black text-3xl tracking-tight bg-slate-900 rounded-[14px]">
                    {(attendee.fullName || attendee.email).charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name & Title */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                    {attendee.fullName || 'Delegate Profile'}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                
                <p className="text-sm font-medium text-slate-600">
                  {[attendee.jobTitle, attendee.company].filter(Boolean).join(' · ') || attendee.email}
                </p>
                
                <p className="text-xs text-slate-400 mt-0.5">
                  Signed in as <span className="font-mono text-slate-600">{attendee.email}</span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center sm:justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-slate-500" />
                <span>Sign out</span>
              </button>
            </div>

          </div>
        </div>

        {/* Welcome Alert */}
        {location.state?.welcome && (
          <div className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Welcome to the International Commodity Summit!</strong>
              Your account is active. Please complete your profile details and upload your photo below so our team can prepare your official event credentials.
            </div>
          </div>
        )}

        {/* Main Grid: Sidebar (4 cols) + Form (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pass & Media Uploads (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* VIP Pass Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-200/50 overflow-hidden">
              <div className="bg-gradient-to-r from-[#005EFF] to-[#F40260] p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <Ticket className="w-4 h-4" /> Official Event Pass
                </div>
                <span className="text-[10px] font-mono uppercase bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                  Geneva 2027
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900">
                    {ticket.packageName || ACCESS_LABELS[attendee.accessType] || 'All Access Pass'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {ACCESS_LABELS[attendee.accessType] || 'Delegate'} Tier Access • Full Convention Access
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <span>Ticket Identifier</span>
                    <span className="text-emerald-600 font-bold">Active</span>
                  </div>
                  <div className="font-mono text-lg font-black text-slate-900 tracking-wider">
                    {ticket.ticketNumber || 'ICS27-000001'}
                  </div>
                </div>

                <div className="text-xs text-slate-500 space-y-2 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#005EFF] shrink-0" />
                    <span>15–17 November 2027</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F40260] shrink-0" />
                    <span>Geneva International Convention Centre</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-[11px] text-blue-900 leading-relaxed flex items-start gap-2">
                  <QrCode className="w-4 h-4 text-[#005EFF] shrink-0 mt-0.5" />
                  <span>
                    Your digital badge QR and official networking app credentials will unlock in this portal closer to the event.
                  </span>
                </div>
              </div>
            </div>

            {/* Media Uploads Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md shadow-slate-200/50 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#005EFF]" />
                  <span>Badge & Media Assets</span>
                </h3>
              </div>

              <ImageUpload
                kind="photo"
                label="Profile Photo (Badge Headshot)"
                url={attendee.profilePhotoUrl}
                onUpdated={setAttendee}
                className="h-32 w-32 mx-auto sm:mx-0"
                hint="Square headshot. Displayed on your official summit badge."
              />

              <ImageUpload
                kind="logo"
                label="Company Logo"
                url={attendee.logoUrl}
                onUpdated={setAttendee}
                className="h-24 w-full"
                imgClass="object-contain p-2"
                hint="PNG with transparent background is recommended."
              />

              <ImageUpload
                kind="banner"
                label="Cover Banner"
                url={attendee.bannerUrl}
                onUpdated={setAttendee}
                className="h-24 w-full"
                hint="Wide cover photo (approx. 1800 x 600 px)."
              />
            </div>

          </div>

          {/* Right Column: Profile Form (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md shadow-slate-200/50">
            <div className="mb-6">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900">
                Delegate Profile Details
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Keep your details updated. Only you and the International Commodity Summit secretariat have access to this information.
              </p>
            </div>

            <AccountForm key={attendee.id} attendee={attendee} options={options} onSaved={setAttendee} />
          </div>

        </div>

      </div>
    </div>
  );
}
