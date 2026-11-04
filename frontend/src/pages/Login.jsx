import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthCard, { FormError, authButtonClass, authInputClass, authLabelClass } from '../components/AuthCard';
import { useAttendeeAuth } from '../context/AttendeeAuthContext';

export default function Login() {
  const { attendee, login } = useAttendeeAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const next = location.state?.from || '/account';
  if (attendee) return <Navigate to={next} replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      await login(email.trim(), password);
      navigate(next, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Delegate sign in"
      subtitle="Sign in with the email you registered with. Accounts are created once your ticket is paid, or with a partner access code."
      footer={
        <>
          Media partner or association with an access code?{' '}
          <Link to="/join" className="font-semibold text-[#005EFF] hover:underline">Create your account</Link>
          <span className="block mt-2">
            No ticket yet?{' '}
            <Link to="/#tickets" className="font-semibold text-[#005EFF] hover:underline">Get your pass</Link>
          </span>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormError>{error}</FormError>
        <div>
          <label htmlFor="login-email" className={authLabelClass}>Email</label>
          <input id="login-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={authInputClass} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className={authLabelClass}>Password</label>
            <Link to="/forgot-password" className="text-xs font-semibold text-[#005EFF] hover:underline mb-1">Forgot password?</Link>
          </div>
          <input id="login-password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={authInputClass} />
        </div>
        <button type="submit" disabled={submitting} className={authButtonClass}>
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthCard>
  );
}
