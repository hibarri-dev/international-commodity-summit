import React from 'react';
import { X } from 'lucide-react';

export default function TicketModal({ ticket, onClose }) {
  if (!ticket) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration reserved for ${ticket.name}! Confirmation details have been emailed.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121526] border border-white/15 rounded-3xl max-w-md w-full p-6 sm:p-8 relative">
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        
        <span className="text-xs font-bold uppercase tracking-wider text-[#e01377]">Confirm Delegate Pass</span>
        <h4 className="font-heading font-black text-2xl text-white mt-1 mb-2">{ticket.name}</h4>
        <div className="font-heading font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#1863dc] mb-4">
          {ticket.priceFormatted}
        </div>

        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Meadowlands Exhibition Center, New York • 15 - 17 November 2027
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input required type="text" placeholder="e.g. Clayton Vance" className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#7a2fd6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email</label>
            <input required type="email" placeholder="name@company.com" className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#7a2fd6]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
            <input required type="text" placeholder="e.g. Global Commodities Ltd" className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#7a2fd6]" />
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
  );
}
