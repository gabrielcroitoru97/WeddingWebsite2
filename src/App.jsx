import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import Hero from '@/components/Hero';
import WeddingDetails from '@/components/WeddingDetails';
import Schedule from '@/components/Schedule';
import RSVP from '@/components/RSVP';
import Travel from '@/components/Travel';
import Registry from '@/components/Registry';
import HingeProfiles from '@/components/HingeProfiles';
import SingleGuests from '@/components/SingleGuests';
import FAQ from '@/components/FAQ';
import Pong from '@/components/Pong';
import { JokePage, MarcoPage, FutureKidsPage } from '@/components/MorePages';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('siteAuth') === 'true'
  );
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'password') {
      localStorage.setItem('siteAuth', 'true');
      setIsAuthenticated(true);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-pink-200 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
               backgroundSize: '30px 30px'
             }} 
        />
        <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)] max-w-md w-full transform -rotate-1 relative z-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-6 text-center">
            Restricted Area
          </h1>
          <p className="font-mono font-bold mb-6 text-center text-lg">Please enter the password to access the website.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input type="password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} className="w-full px-4 py-3 border-4 border-black font-mono text-lg focus:outline-none focus:ring-4 focus:ring-cyan-300" placeholder="Password" />
              {error && <p className="text-red-600 font-bold font-mono mt-3 bg-red-100 border-2 border-red-600 px-2 py-1 inline-block transform rotate-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">Incorrect password! Try again.</p>}
            </div>
            <button type="submit" className="w-full py-3 bg-yellow-300 text-black border-4 border-black font-black uppercase text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all">
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

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
            <Route path="/registry" element={<Registry />} />
            <Route path="/hinge" element={<HingeProfiles />} />
            <Route path="/single-guests" element={<SingleGuests />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/more/joke" element={<JokePage />} />
            <Route path="/more/marco" element={<MarcoPage />} />
            <Route path="/more/future-kids" element={<FutureKidsPage />} />
            <Route path="/more/pong" element={<Pong />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;