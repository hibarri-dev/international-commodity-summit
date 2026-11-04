import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthCard, { FormError, authButtonClass, authInputClass, authLabelClass } from '../components/AuthCard';
import { useAttendeeAuth } from '../context/AttendeeAuthContext';
import { attendeeApi } from '../lib/api';

/** Handles both the first-time invite link (/set-password/:token) and the reset link (/reset-password/:token). */
export default function SetPassword({ mode = 'set' }) {
  const { token } = useParams();
  const { startSession } = useAttendeeAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isReset = mode === 'reset';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    try {
      setSubmitting(true);
      setError('');
      const res = isReset
        ? await attendeeApi.resetPassword(token, password)
        : await attendeeApi.setPassword(token, password);
      startSession(res.data);
      navigate('/account', { replace: true, state: { welcome: !isReset } });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title={isReset ? 'Choose a new password' : 'Set your password'}
      subtitle={isReset ? 'You will be signed out of other devices.' : 'Welcome! Choose a password to activate your delegate account.'}
      footer={
        error ? (
          <Link to="/forgot-password" className="font-semibold text-[#005EFF] hover:underline">Request a new link</Link>
        ) : null
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormError>{error}</FormError>
        <div>
          <label htmlFor="new-password" className={authLabelClass}>New password</label>
          <input id="new-password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={authInputClass} />
        </div>
        <div>
          <label htmlFor="confirm-password" className={authLabelClass}>Confirm password</label>
          <input id="confirm-password" type="password" required minLength={8} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={authInputClass} />
        </div>
        <p className="text-[11px] text-slate-500">At least 8 characters.</p>
        <button type="submit" disabled={submitting} className={authButtonClass}>
          {submitting ? 'Saving...' : isReset ? 'Update password' : 'Activate account'}
        </button>
      </form>
    </AuthCard>
  );
}
