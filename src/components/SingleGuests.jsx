import React from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, Wine, MessageCircle, Sparkles, Music } from 'lucide-react';

const SingleGuests = () => {
  return (
    <section className="py-24 bg-purple-600 min-h-screen relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(white 2px, transparent 2px), linear-gradient(90deg, white 2px, transparent 2px)',
             backgroundSize: '50px 50px'
           }} 
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="bg-yellow-400 border-4 border-black shadow-[8px_8px_0_0_#000] inline-block px-8 py-6 transform rotate-2">
            <div className="flex items-center justify-center gap-3 mb-2">
              <PartyPopper className="w-10 h-10 text-black" />
              <h2 className="text-4xl md:text-6xl font-black text-black uppercase">
                Flying Solo?
              </h2>
              <Sparkles className="w-10 h-10 text-white fill-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <p className="text-black font-mono font-bold text-lg">NO DATE? NO PROBLEM!</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#00ffff]"
          >
            <div className="bg-black w-16 h-16 flex items-center justify-center mb-6 border-2 border-white shadow-[4px_4px_0_0_#ff00ff]">
              <Wine className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-black mb-4 uppercase bg-cyan-300 inline-block px-2">The Singles Mixer</h3>
            <p className="text-black font-mono leading-relaxed mb-4">
              Join us during the first 30 minutes of the Cocktail Hour (6:00 PM - 6:30 PM). Look for the neon sign! It's a low-pressure way to meet other solo travelers.
            </p>
            <div className="bg-gray-100 p-4 border-2 border-black border-dashed">
              <p className="text-sm text-black font-bold font-mono">
                ✨ PRO TIP: Try the "Spicy Margarita" – it's a conversation starter!
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#ff00ff]"
          >
            <div className="bg-black w-16 h-16 flex items-center justify-center mb-6 border-2 border-white shadow-[4px_4px_0_0_#00ffff]">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-black mb-4 uppercase bg-pink-300 inline-block px-2">Icebreakers</h3>
            <p className="text-black font-mono leading-relaxed mb-4">
              Stuck for words? Try these cheat codes:
            </p>
            <ul className="space-y-3 font-mono text-sm border-t-4 border-black pt-4">
              <li className="bg-yellow-200 p-2 border-2 border-black">"How do you know Gabriel or Sasha?"</li>
              <li className="bg-green-200 p-2 border-2 border-black">"Have you explored the Walled City yet?"</li>
              <li className="bg-blue-200 p-2 border-2 border-black">"Team Arepa de Huevo or Team Empanada?"</li>
            </ul>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative border-4 border-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90 z-10 flex items-center justify-center backdrop-grayscale">
              <div className="text-center p-8 max-w-2xl border-4 border-white m-4">
                <div className="flex justify-center mb-4">
                  <Music className="w-12 h-12 text-yellow-400 animate-bounce" />
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 font-display text-shadow-retro">AFTER PARTY</h3>
                <p className="text-white text-lg mb-6 font-mono">
                  The real bonding happens after midnight. We've rented out the rooftop at <strong>Alquímico</strong>.
                </p>
                <div className="inline-block bg-red-600 px-8 py-3 text-white font-black border-4 border-black shadow-[4px_4px_0_0_white] transform hover:scale-110 transition-transform">
                  STARTING AT 12:00 AM
                </div>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67"
              alt="People celebrating at a party with drinks" 
              className="w-full h-[400px] object-cover filter contrast-125"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SingleGuests;