import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, MapPin, Info } from 'lucide-react';

const Travel = () => {
  return (
    <section id="travel" className="py-24 bg-yellow-200 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)',
             backgroundSize: '40px 40px'
           }} 
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#000] transform rotate-1 mb-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Travel & Accommodations
            </h2>
          </div>
          <p className="text-xl font-bold font-mono bg-white inline-block px-4 py-2 border-2 border-black shadow-[4px_4px_0_0_#000] transform -rotate-1">Everything you need to plan your trip to Cartagena</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
          >
            <div className="bg-blue-400 w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mb-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <Plane className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-black uppercase text-black mb-4">Getting There</h3>
            <div className="space-y-3 text-black font-mono text-lg">
              <p><strong>Airport:</strong> Rafael Núñez International Airport (CTG)</p>
              <p><strong>Direct flights from:</strong> Miami, Fort Lauderdale, New York, Panama City, and more</p>
              <p><strong>Transfer:</strong> 20 minutes to the Hilton</p>
              <p className="text-sm text-black italic mt-4 border-t-2 border-black pt-2">
                We recommend booking flights early for the best rates. Most US citizens need a passport valid for 6 months.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
          >
            <div className="bg-purple-400 w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mb-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <Hotel className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-black uppercase text-black mb-4">Where to Stay</h3>
            <div className="space-y-3 text-black font-mono text-lg">
              <p><strong>Hotel Block:</strong> Hilton Hotel</p>
              <p><strong>Booking Code:</strong> TBD</p>
              <p><strong>Special Rate:</strong> Available until TBD, 2026</p>
              
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
          >
            <div className="bg-pink-400 w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mb-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <MapPin className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-black uppercase text-black mb-4">Things to Do</h3>
            <ul className="space-y-2 text-black font-mono text-lg">
              <li>• Go to a wedding</li>
              <li>• Walk the historic city walls at sunset</li>
              <li>• Visit Castillo San Felipe de Barajas</li>
              <li>• Go to a pool party</li>
              <li>• Relax on the Rosario Islands</li>
              <li>• Attend a shabbat dinner</li>
              <li>• Take a sunset cruise on the bay</li>
              <li>• Give generously to a Colombian man's wedding registry</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
          >
            <div className="bg-teal-400 w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mb-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <Info className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-black uppercase text-black mb-4">Good to Know</h3>
            <ul className="space-y-2 text-black font-mono text-lg">
              <li>• <strong>Weather:</strong> 75-85°F and humid</li>
              <li>• <strong>Currency:</strong> Colombian Peso</li>
              <li>• <strong>Language:</strong> Spanish (English in tourist areas)</li>
              <li>• <strong>Dress:</strong> Light, breathable fabrics recommended</li>
              <li>• <strong>Safety:</strong> Stick to tourist areas, use Ubers, don't hail a taxi from the street</li>
              <li>• <strong>Best time to arrive:</strong> Thursday or Friday before</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Travel;