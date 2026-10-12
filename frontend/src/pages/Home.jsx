import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Industries from '../components/Industries';
import BrandsAttending from '../components/BrandsAttending';
import SpeakersCarousel from '../components/SpeakersCarousel';
import Agenda from '../components/Agenda';
import Tickets from '../components/Tickets';
import SignupSection from '../components/SignupSection';
import Footer from '../components/Footer';
import TicketModal from '../components/TicketModal';
import { useTrafficTracker } from '../hooks/useTrafficTracker';

export default function Home() {
  useTrafficTracker();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className="min-h-screen bg-[#090a12] text-slate-100 selection:bg-[#e01377] selection:text-white">
      {/* BACKGROUND GLOW ACCENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-[#1863dc]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-[#7a2fd6]/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-[#e01377]/12 rounded-full blur-[150px]" />
      </div>

      {/* HEADER / NAVIGATION */}
      <Navbar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      {/* MAIN SECTIONS */}
      <main className="relative z-10">
        <Hero />
        <Industries />
        <BrandsAttending />
        <SpeakersCarousel />
        <Agenda />
        <Tickets onSelectTicket={(ticket) => setSelectedTicket(ticket)} />
        <SignupSection />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* MODAL */}
      <TicketModal 
        ticket={selectedTicket} 
        onClose={() => setSelectedTicket(null)} 
      />
    </div>
  );
}
