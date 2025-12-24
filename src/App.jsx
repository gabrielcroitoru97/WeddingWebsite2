import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import Hero from '@/components/Hero';
import WeddingDetails from '@/components/WeddingDetails';
import Schedule from '@/components/Schedule';
import RSVP from '@/components/RSVP';
import Travel from '@/components/Travel';
import HingeProfiles from '@/components/HingeProfiles';
import SingleGuests from '@/components/SingleGuests';
import FAQ from '@/components/FAQ';
import { AthleticPage, TrumpetPage, SashaPage, CartagenaPage } from '@/components/MorePages';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <Helmet>
        <title>Gabriel & Sasha's 90s Wedding Bash</title>
        <meta name="description" content="Get ready to party like it's 1999! Join Gabriel and Sasha in Cartagena." />
      </Helmet>
      <ScrollToTop />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/details" element={<WeddingDetails />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/hinge" element={<HingeProfiles />} />
            <Route path="/single-guests" element={<SingleGuests />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/more/athletic" element={<AthleticPage />} />
            <Route path="/more/trumpet" element={<TrumpetPage />} />
            <Route path="/more/sasha" element={<SashaPage />} />
            <Route path="/more/cartagena" element={<CartagenaPage />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;