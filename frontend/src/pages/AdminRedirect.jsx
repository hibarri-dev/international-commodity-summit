import React, { useEffect } from 'react';
import { SUPERADMIN_SUMMIT_URL } from '../lib/api';

/** The old on-site admin moved to the Hibarri Superadmin; send anyone with an old bookmark there. */
export default function AdminRedirect() {
  useEffect(() => {
    // Sign-in token left behind by the retired on-site admin.
    localStorage.removeItem('ics_admin_token');
    window.location.replace(SUPERADMIN_SUMMIT_URL);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center text-sm text-slate-500">
      <p>
        The admin has moved to{' '}
        <a href={SUPERADMIN_SUMMIT_URL} className="font-semibold text-[#005EFF] underline">
          Hibarri Superadmin
        </a>
        . Redirecting…
      </p>
    </div>
  );
}
