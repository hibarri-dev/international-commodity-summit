import React from 'react';
import Seo from './Seo';

export const authInputClass =
  'w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#005EFF]';
export const authLabelClass = 'block text-xs font-semibold text-slate-700 mb-1';
export const authButtonClass =
  'w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] hover:opacity-95 disabled:opacity-60 transition-opacity cursor-pointer min-h-[44px]';

export function FormError({ children }) {
  if (!children) return null;
  return <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700">{children}</div>;
}

/** Centered card shell shared by the sign-in, sign-up and password pages. */
export default function AuthCard({ title, subtitle, children, footer, seoTitle }) {
  return (
    <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center px-4 py-12 sm:py-16">
      <Seo title={`${seoTitle || title} | International Commodity Summit`} noindex />
      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-slate-600 leading-relaxed">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
        {footer && <div className="mt-4 text-center text-sm text-slate-600">{footer}</div>}
      </div>
    </div>
  );
}
