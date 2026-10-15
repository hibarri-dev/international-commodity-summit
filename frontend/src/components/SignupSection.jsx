import React, { useState } from 'react';
import { Ticket, CheckCircle2 } from 'lucide-react';

export default function SignupSection() {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupSubmitted, setSignupSubmitted] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupEmail) {
      setSignupSubmitted(true);
    }
  };

  return (
    <section className="relative z-10 py-16 sm:py-20 bg-slate-50 border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-12 h-12 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-[#005EFF] to-[#F40260] flex items-center justify-center shadow-md">
          <Ticket className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-heading font-black text-2xl min-[400px]:text-3xl sm:text-4xl text-slate-900 mb-3">
          Stay Updated on Agenda & Plenary Additions
        </h3>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
          Receive the official summit prospectus, delegate list updates, and room block codes for the Meadowlands Exhibition Center.
        </p>

        {signupSubmitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-semibold max-w-md mx-auto flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Thank you! The Summit Prospectus & Registration kit has been sent.</span>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              required 
              placeholder="Enter corporate email..." 
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#005EFF] shadow-xs"
            />
            <button 
              type="submit"
              className="px-6 py-3 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-[#005EFF] to-[#F40260] shadow-sm hover:opacity-95 transition-opacity cursor-pointer shrink-0"
            >
              Join Dispatch
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
