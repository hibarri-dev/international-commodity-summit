import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#005EFF]';

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
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overscroll-contain" 
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 shadow-2xl rounded-2xl sm:rounded-3xl max-w-md w-full p-5 sm:p-8 relative max-h-[92dvh] overflow-y-auto overscroll-contain my-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

          <span className="text-xs font-bold uppercase tracking-wider text-[#F40260]">Confirm Delegate Pass</span>
          <h4 id="ticket-modal-title" className="font-heading font-black text-2xl text-slate-900 mt-1 mb-2 pr-8">
            {ticket.name}
          </h4>
          <div className="font-heading font-black text-3xl sm:text-4xl text-slate-900 mb-2">
            {ticket.priceFormatted}
          </div>

          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Meadowlands Exhibition Center, New York • 15 - 17 November 2027
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="ticket-name" className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input id="ticket-name" required type="text" autoComplete="name" placeholder="e.g. Clayton Vance" className={inputClass} />
            </div>
            <div>
              <label htmlFor="ticket-email" className="block text-xs font-bold text-slate-700 mb-1">Corporate Email</label>
              <input id="ticket-email" required type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" className={inputClass} />
            </div>
            <div>
              <label htmlFor="ticket-company" className="block text-xs font-bold text-slate-700 mb-1">Company / Organization</label>
              <input id="ticket-company" required type="text" autoComplete="organization" placeholder="e.g. Global Commodities Ltd" className={inputClass} />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] shadow-md hover:opacity-95 mt-4 cursor-pointer"
            >
              Proceed to Registration ({ticket.priceFormatted})
            </button>
          </form>
        </div>
      </div>
    );
  }
