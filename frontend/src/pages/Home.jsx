import React, { useState } from 'react';
import Hero from '../components/Hero';
import Industries from '../components/Industries';
import FeaturedPanels from '../components/FeaturedPanels';
import FloorplanAnimation from '../components/FloorplanAnimation';
import BrandsAttending from '../components/BrandsAttending';
import Gallery2025 from '../components/Gallery2025';
import AppShowcase from '../components/AppShowcase';
import SponsorshipPackages from '../components/SponsorshipPackages';
import Agenda from '../components/Agenda';
import Tickets from '../components/Tickets';
import SignupSection from '../components/SignupSection';
import TicketModal from '../components/TicketModal';
import { useTrafficTracker } from '../hooks/useTrafficTracker';

export default function Home() {
  useTrafficTracker();
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <>
      {/* SUBTLE LIGHT BACKGROUND ACCENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-[#005EFF]/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-[#F40260]/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-[#005EFF]/5 rounded-full blur-[150px]" />
      </div>

      <main className="relative z-10">
        <Hero />
        <Industries />
        <FeaturedPanels />
        <FloorplanAnimation />
        <BrandsAttending />
        <Gallery2025 />
        <AppShowcase />
        <SponsorshipPackages />
        <Agenda />
        <Tickets onSelectTicket={(ticket) => setSelectedTicket(ticket)} />
        <SignupSection />
      </main>

      <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </>
  );
}
