import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Building2, CheckCircle2, ImagePlus, LogOut, Plus, Ticket, Trash2, Upload } from 'lucide-react';
import Seo from '../components/Seo';
import { FormError, authButtonClass, authInputClass, authLabelClass } from '../components/AuthCard';
import { useAttendeeAuth } from '../context/AttendeeAuthContext';
import { attendeeApi } from '../lib/api';

const ACCESS_LABELS = { ticket: 'Delegate', media_partner: 'Media Partner', association: 'Association' };

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
                className="shrink-0 p-2.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50"
                aria-label={`Remove ${label.toLowerCase()} ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
      {values.length < max && (
        <button type="button" onClick={() => onChange([...values, ''])} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#005EFF] hover:underline">
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
        {busy && <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-xs font-semibold text-slate-700">Uploading...</div>}
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormError>{error}</FormError>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="acc-name" className={authLabelClass}>Full name</label>
          <input id="acc-name" value={form.fullName} onChange={set('fullName')} autoComplete="name" className={authInputClass} />
        </div>
        <div>
          <label htmlFor="acc-title" className={authLabelClass}>Job title</label>
          <input id="acc-title" value={form.jobTitle} onChange={set('jobTitle')} autoComplete="organization-title" className={authInputClass} />
        </div>
        <div>
          <label htmlFor="acc-company" className={authLabelClass}>Company</label>
          <input id="acc-company" value={form.company} onChange={set('company')} autoComplete="organization" className={authInputClass} />
        </div>
        <div>
          <label htmlFor="acc-category" className={authLabelClass}>Company category</label>
          <select
            id="acc-category"
            value={form.companyCategory}
            onChange={(e) => {
              setSaved(false);
              setForm((prev) => ({ ...prev, companyCategory: e.target.value, energySubcategory: e.target.value === 'Energy' ? prev.energySubcategory : '' }));
            }}
            className={authInputClass}
          >
            <option value="">Choose a category...</option>
            {options.companyCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        {form.companyCategory === 'Energy' && (
          <div className="sm:col-span-2">
            <span className={authLabelClass}>Energy type *</span>
            <div className="flex flex-wrap gap-2">
              {options.energySubcategories.map((sub) => (
                <label
                  key={sub}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    form.energySubcategory === sub ? 'border-[#005EFF] bg-[#005EFF] text-white' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <input type="radio" name="energySubcategory" value={sub} checked={form.energySubcategory === sub} onChange={set('energySubcategory')} className="sr-only" />
                  {sub}
                </label>
              ))}
            </div>
          </div>
        )}
        <div>
          <label htmlFor="acc-website" className={authLabelClass}>Website</label>
          <input id="acc-website" value={form.website} onChange={set('website')} placeholder="https://" autoComplete="url" className={authInputClass} />
        </div>
        <div>
          <label htmlFor="acc-country" className={authLabelClass}>Country</label>
          <input id="acc-country" value={form.country} onChange={set('country')} autoComplete="country-name" className={authInputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ListField label="Phone numbers" type="tel" values={form.phones} onChange={setList('phones')} placeholder="+1 555 000 0000" />
        <ListField label="Other email addresses" type="email" values={form.emails} onChange={setList('emails')} placeholder="name@company.com" />
      </div>

      <div>
        <label htmlFor="acc-bio" className={authLabelClass}>About you / your company</label>
        <textarea id="acc-bio" rows={4} value={form.bio} onChange={set('bio')} maxLength={2000} className={authInputClass} />
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3">
        <button type="submit" disabled={saving} className={`${authButtonClass} sm:w-auto`}>
          {saving ? 'Saving...' : 'Save profile'}
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="w-4 h-4" /> Saved
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
    return <div className="min-h-[60vh] flex items-center justify-center text-sm text-slate-500">Loading your account...</div>;
  }
  if (!attendee) return <Navigate to="/login" replace state={{ from: '/account' }} />;

  const ticket = attendee.ticket || {};

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <Seo title="My Account | International Commodity Summit" noindex />

      <div className="relative h-40 sm:h-56 bg-gradient-to-r from-[#005EFF] to-[#F40260]">
        {attendee.bannerUrl && <img src={attendee.bannerUrl} alt="" className="w-full h-full object-cover" />}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl border-4 border-white bg-slate-200 overflow-hidden shadow-md shrink-0">
            {attendee.profilePhotoUrl ? (
              <img src={attendee.profilePhotoUrl} alt={attendee.fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-heading font-bold text-3xl text-slate-500">
                {(attendee.fullName || attendee.email).charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 pb-1">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 truncate">{attendee.fullName || 'Your account'}</h1>
            <p className="text-sm text-slate-600 truncate">
              {[attendee.jobTitle, attendee.company].filter(Boolean).join(' · ') || attendee.email}
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="self-start sm:self-end inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>

        {location.state?.welcome && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            Welcome to the International Commodity Summit! Complete your profile below so we can prepare your event badge and app listing.
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F40260]">
                <Ticket className="w-4 h-4" /> Your Pass
              </div>
              <p className="mt-2 font-heading font-bold text-xl text-slate-900">{ticket.packageName || ACCESS_LABELS[attendee.accessType]}</p>
              <p className="mt-1 text-xs text-slate-500">{ACCESS_LABELS[attendee.accessType]} access · 15-17 November 2027 · New York</p>
              {ticket.ticketNumber && (
                <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Ticket number</p>
                  <p className="font-mono text-lg font-bold text-slate-900">{ticket.ticketNumber}</p>
                </div>
              )}
              <p className="mt-3 text-[11px] text-slate-500">Your printable ticket and event app login will appear here closer to the event.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Building2 className="w-4 h-4" /> Images
              </div>
              <ImageUpload kind="photo" label="Profile photo" url={attendee.profilePhotoUrl} onUpdated={setAttendee} className="h-32 w-32" hint="Square headshot, used on your badge." />
              <ImageUpload kind="logo" label="Company logo" url={attendee.logoUrl} onUpdated={setAttendee} className="h-24 w-full" imgClass="object-contain p-2" hint="PNG with transparent background works best." />
              <ImageUpload kind="banner" label="Banner" url={attendee.bannerUrl} onUpdated={setAttendee} className="h-24 w-full" hint="Wide image, about 1800 x 600." />
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="font-heading font-bold text-xl text-slate-900">Profile</h2>
            <p className="mt-1 mb-6 text-sm text-slate-500">
              Signed in as <strong className="text-slate-700">{attendee.email}</strong>. Only you and the summit team can see this information.
            </p>
            <AccountForm key={attendee.id} attendee={attendee} options={options} onSaved={setAttendee} />
          </div>
        </div>
      </div>
    </div>
  );
}
