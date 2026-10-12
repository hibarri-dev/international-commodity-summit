import React, { useEffect } from 'react';
import { X } from 'lucide-react';

// 16px on phones — iOS Safari zooms into any focused input smaller than that.
const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-base sm:text-sm focus:outline-none focus:border-[#7a2fd6]';

export default function TicketModal({ ticket, onClose }) {
  useEffect(() => {
    if (!ticket) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [ticket, onClose]);

  if (!ticket) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration reserved for ${ticket.name}! Confirmation details have been emailed.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ticket-modal-title"
          onClick={(e) => e.stopPropagation()}
          className="bg-[#121526] border border-white/15 rounded-3xl max-w-md w-full p-6 sm:p-8 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs font-bold uppercase tracking-wider text-[#e01377]">Confirm Delegate Pass</span>
          <h4 id="ticket-modal-title" className="font-heading font-black text-2xl text-white mt-1 mb-2 pr-8">
            {ticket.name}
          </h4>
          <div className="font-heading font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#1863dc] mb-4">
            {ticket.priceFormatted}
          </div>

          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Meadowlands Exhibition Center, New York • 15 - 17 November 2027
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="ticket-name" className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input id="ticket-name" required type="text" autoComplete="name" placeholder="e.g. Clayton Vance" className={inputClass} />
            </div>
            <div>
              <label htmlFor="ticket-email" className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email</label>
              <input id="ticket-email" required type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" className={inputClass} />
            </div>
            <div>
              <label htmlFor="ticket-company" className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
              <input id="ticket-company" required type="text" autoComplete="organization" placeholder="e.g. Global Commodities Ltd" className={inputClass} />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-heading font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#1863dc] via-[#7a2fd6] to-[#e01377] shadow-lg shadow-[#7a2fd6]/25 mt-4 cursor-pointer"
            >
              Proceed to Checkout ({ticket.priceFormatted})
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
