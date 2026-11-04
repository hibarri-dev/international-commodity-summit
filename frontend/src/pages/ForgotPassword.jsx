import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import AuthCard, { FormError, authButtonClass, authInputClass, authLabelClass } from '../components/AuthCard';
import { attendeeApi } from '../lib/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      await attendeeApi.forgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Reset your password"
      subtitle={sent ? undefined : "Enter your account email and we'll send you a link to choose a new password."}
      footer={<Link to="/login" className="font-semibold text-[#005EFF] hover:underline">Back to sign in</Link>}
    >
      {sent ? (
        <div className="text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <p className="text-sm text-slate-700">
            If an account exists for <strong>{email}</strong>, a reset link is on its way. It expires in 1 hour.
          </p>
          <p className="text-xs text-slate-500">Check your spam folder if it doesn't arrive in a few minutes.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormError>{error}</FormError>
          <div>
            <label htmlFor="forgot-email" className={authLabelClass}>Email</label>
            <input id="forgot-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={authInputClass} />
          </div>
          <button type="submit" disabled={submitting} className={authButtonClass}>
            {submitting ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
      )}
    </AuthCard>
  );
}
