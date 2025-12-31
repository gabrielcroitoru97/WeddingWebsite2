import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, MapPin, Info } from 'lucide-react';

const Travel = () => {
  return (
    <section id="travel" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Travel & Accommodations
          </h2>
          <p className="text-gray-600 text-lg">Everything you need to plan your trip to Cartagena</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Getting There</h3>
            <div className="space-y-3 text-gray-700">
              <p><strong>Airport:</strong> Rafael Núñez International Airport (CTG)</p>
              <p><strong>Direct flights from:</strong> Miami, Fort Lauderdale, New York, Panama City, and more</p>
              <p><strong>Transfer:</strong> 15 minutes to the historic center</p>
              <p className="text-sm text-gray-600 mt-4">
                We recommend booking flights early for the best rates. Most US citizens need a passport valid for 6 months.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Hotel className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Where to Stay</h3>
            <div className="space-y-3 text-gray-700">
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
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Things to Do</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Go to a wedding</li>
              <li>• Walk the historic city walls at sunset</li>
              <li>• Visit Castillo San Felipe de Barajas</li>
              <li>• Go to a pool party</li>
              <li>• Relax on the Rosario Islands</li>
              <li>• Attend a shabbat dinner</li>
              <li>• Take a sunset cruise on the bay</li>
              <li>• Give generously to a Colombian mans wedding registry</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="bg-teal-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Info className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Good to Know</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Weather:</strong> Hot and humid (85-90°F)</li>
              <li>• <strong>Currency:</strong> Colombian Peso (USD widely accepted)</li>
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