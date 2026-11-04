import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import AuthCard, { FormError, authButtonClass } from '../components/AuthCard';
import { publicApi } from '../lib/api';

const MAX_CHECKS = 6;
const CHECK_EVERY_MS = 3000;

function formatAmount(cents, currency) {
  if (typeof cents !== 'number') return '';
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: (currency || 'usd').toUpperCase() }).format(cents / 100);
}

function PaymentSuccess({ sessionId }) {
  const [state, setState] = useState({ status: sessionId ? 'checking' : 'error', data: null });

  useEffect(() => {
    if (!sessionId) return undefined;
    let cancelled = false;
    let timer;
    let attempt = 0;

    // Card payments confirm instantly; a few re-checks cover slower methods and webhook lag.
    const check = async () => {
      attempt += 1;
      try {
        const res = await publicApi.getCheckoutSession(sessionId);
        if (cancelled) return;
        if (res.data.paid) return setState({ status: 'paid', data: res.data });
        if (attempt < MAX_CHECKS) timer = setTimeout(check, CHECK_EVERY_MS);
        else setState({ status: 'processing', data: res.data });
      } catch {
        if (!cancelled) setState({ status: 'error', data: null });
      }
    };
    check();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [sessionId]);

  if (state.status === 'checking') {
    return (
      <AuthCard title="Confirming your payment..." seoTitle="Payment">
        <p className="text-sm text-slate-600">This only takes a moment. Please don't close this page.</p>
      </AuthCard>
    );
  }

  if (state.status === 'paid') {
    const { data } = state;
    return (
      <AuthCard title="Payment received" seoTitle="Payment">
        <div className="space-y-4 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
          <p className="text-sm text-slate-600 leading-relaxed">
            Thank you{data.fullName ? `, ${data.fullName}` : ''}! Your <strong className="text-slate-900">{data.packageName}</strong>
            {data.amountTotal ? ` (${formatAmount(data.amountTotal, data.currency)})` : ''} is confirmed.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            We've emailed <strong className="text-slate-900">{data.email}</strong> a link to set your password. Use it to sign in
            and complete your delegate profile.
          </p>
          <p className="text-xs text-slate-500">Can't find it? Check your spam folder, or contact the summit team.</p>
          <Link to="/" className={authButtonClass}>Back to the Summit</Link>
        </div>
      </AuthCard>
    );
  }

  if (state.status === 'processing') {
    return (
      <AuthCard title="Payment processing" seoTitle="Payment">
        <div className="space-y-4 text-center">
          <Clock className="mx-auto h-12 w-12 text-amber-500" />
          <p className="text-sm text-slate-600 leading-relaxed">
            Your payment is still being confirmed by the bank. As soon as it clears we'll email your login link to{' '}
            <strong className="text-slate-900">{state.data?.email}</strong>.
          </p>
          <Link to="/" className={authButtonClass}>Back to the Summit</Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="We couldn't confirm this payment" seoTitle="Payment">
      <div className="space-y-4">
        <FormError>
          If you were charged, don't worry. Your payment is safe and our team will confirm your pass by email.
        </FormError>
        <Link to="/" className={authButtonClass}>Back to the Summit</Link>
      </div>
    </AuthCard>
  );
}

function PaymentCancelled({ registrationId }) {
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState('');

  const retry = async () => {
    try {
      setRetrying(true);
      setError('');
      const res = await publicApi.startCheckout(registrationId);
      window.location.assign(res.data.checkoutUrl);
    } catch (err) {
      setError(err.message);
      setRetrying(false);
    }
  };

  return (
    <AuthCard title="Payment not completed" seoTitle="Payment">
      <div className="space-y-4 text-center">
        <XCircle className="mx-auto h-12 w-12 text-slate-400" />
        <p className="text-sm text-slate-600 leading-relaxed">
          No payment was taken. Your details are saved, so you can finish paying whenever you're ready.
        </p>
        <FormError>{error}</FormError>
        {registrationId && (
          <button type="button" onClick={retry} disabled={retrying} className={authButtonClass}>
            {retrying ? 'Opening secure payment...' : 'Try payment again'}
          </button>
        )}
        <Link to="/#tickets" className="block text-sm font-semibold text-[#005EFF] hover:underline">
          Choose a different pass
        </Link>
      </div>
    </AuthCard>
  );
}

export default function PaymentResult({ mode }) {
  const [searchParams] = useSearchParams();
  return mode === 'success' ? (
    <PaymentSuccess sessionId={searchParams.get('session_id')} />
  ) : (
    <PaymentCancelled registrationId={searchParams.get('registration')} />
  );
}
