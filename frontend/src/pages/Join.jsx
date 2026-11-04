import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import AuthCard, { FormError, authButtonClass, authInputClass, authLabelClass } from '../components/AuthCard';
import { useAttendeeAuth } from '../context/AttendeeAuthContext';
import { attendeeApi } from '../lib/api';

export default function Join() {
  const { attendee, startSession } = useAttendeeAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    code: searchParams.get('code') || '',
    fullName: '',
    company: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (attendee) return <Navigate to="/account" replace />;

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    try {
      setSubmitting(true);
      setError('');
      const res = await attendeeApi.redeemCode({
        code: form.code.trim(),
        fullName: form.fullName.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      startSession(res.data);
      navigate('/account', { replace: true, state: { welcome: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Partner sign up"
      seoTitle="Partner sign up"
      subtitle="For media partners and associations. Enter the access code the summit team sent you."
      footer={
        <>
          Already have an account? <Link to="/login" className="font-semibold text-[#005EFF] hover:underline">Sign in</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormError>{error}</FormError>
        <div>
          <label htmlFor="join-code" className={authLabelClass}>Access code *</label>
          <input
            id="join-code"
            required
            autoComplete="off"
            value={form.code}
            onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
            placeholder="ICS-MP-XXXXXXXX"
            className={`${authInputClass} font-mono tracking-wider`}
          />
        </div>
        <div>
          <label htmlFor="join-name" className={authLabelClass}>Full name *</label>
          <input id="join-name" required autoComplete="name" value={form.fullName} onChange={set('fullName')} className={authInputClass} />
        </div>
        <div>
          <label htmlFor="join-company" className={authLabelClass}>Organization</label>
          <input id="join-company" autoComplete="organization" value={form.company} onChange={set('company')} className={authInputClass} />
        </div>
        <div>
          <label htmlFor="join-email" className={authLabelClass}>Email *</label>
          <input id="join-email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} className={authInputClass} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="join-password" className={authLabelClass}>Password *</label>
            <input id="join-password" type="password" required minLength={8} autoComplete="new-password" value={form.password} onChange={set('password')} className={authInputClass} />
          </div>
          <div>
            <label htmlFor="join-confirm" className={authLabelClass}>Confirm *</label>
            <input id="join-confirm" type="password" required minLength={8} autoComplete="new-password" value={form.confirm} onChange={set('confirm')} className={authInputClass} />
          </div>
        </div>
        <p className="text-[11px] text-slate-500">At least 8 characters.</p>
        <button type="submit" disabled={submitting} className={authButtonClass}>
          {submitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </AuthCard>
  );
}
