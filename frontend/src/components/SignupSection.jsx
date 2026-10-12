import React, { useState } from 'react';
import { Ticket } from 'lucide-react';

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
    <section className="relative z-10 py-16 sm:py-20 bg-gradient-to-b from-[#0e111d] to-[#090a12] border-t border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-12 h-12 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-[#1863dc] via-[#7a2fd6] to-[#e01377] flex items-center justify-center">
          <Ticket className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-heading font-black text-2xl min-[400px]:text-3xl sm:text-4xl text-white mb-3">
          Stay Updated on Agenda & Speaker Additions
        </h3>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
          Receive the official summit prospectus, delegate list updates, and room rate codes for the Meadowlands Exhibition Center.
        </p>

        {signupSubmitted ? (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm font-semibold max-w-md mx-auto">
            ✓ Thank you! The Summit Prospectus & Registration kit has been sent.
          </div>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              required 
              placeholder="Enter corporate email..." 
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-[#121526] border border-white/15 text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:border-[#7a2fd6]"
            />
            <button 
              type="submit"
              className="px-6 py-3 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-[#1863dc] to-[#e01377] shadow-lg shadow-[#7a2fd6]/20 hover:opacity-95 transition-opacity cursor-pointer"
            >
              Join Dispatch
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
