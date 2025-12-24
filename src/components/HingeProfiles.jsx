import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, MousePointer2 } from 'lucide-react';

const HingeProfiles = () => {
  return (
    <section id="hinge" className="py-20 bg-cyan-200 border-t-4 border-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#ff00ff] mb-8 transform -rotate-1">
            <div className="flex items-center justify-center gap-4">
              <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                How We Met
              </h2>
              <Smile className="w-8 h-8 text-black fill-yellow-400" />
            </div>
          </div>
          <p className="text-xl font-mono font-bold bg-black text-green-400 inline-block px-4 py-1">
             &gt; INSERT LOVE STORY HERE_
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0_0_rgba(0,0,0,1)] mb-16 relative overflow-hidden"
          >
             {/* Window Controls Decoration */}
             <div className="absolute top-0 left-0 right-0 h-8 bg-pink-500 border-b-4 border-black flex items-center px-2 gap-2">
                <div className="w-4 h-4 bg-white border-2 border-black"></div>
                <div className="w-full h-[2px] bg-black opacity-20"></div>
                <div className="w-4 h-4 bg-white border-2 border-black"></div>
                <div className="w-4 h-4 bg-black border-2 border-white"></div>
             </div>

            <div className="mt-4 font-mono text-lg leading-relaxed space-y-6">
              <p>
                <span className="font-bold bg-yellow-300 px-1">SYSTEM LOG 03.2023:</span> Like many modern love stories, ours began with a swipe. In March 2023, Gabriel and Sasha matched on Hinge, 
                and what started as a simple "hey" turned into hours of conversation. Their first date at a cozy wine 
                bar in the West Village lasted until closing time.
              </p>
              <p>
                 <span className="font-bold bg-green-300 px-1">UPDATE 06.2026:</span> Three years later, surrounded by friends and family in Central Park, Gabriel got down on one knee. 
                Sasha said yes (through happy tears). Now, we're inviting you to celebrate this journey with us!
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Gabriel's Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="retro-card group"
            >
              <div className="bg-purple-600 text-white font-bold font-mono p-2 border-b-4 border-black flex justify-between items-center">
                <span>USER: GABRIEL</span>
                <MousePointer2 className="w-4 h-4" />
              </div>
              <div className="aspect-[4/5] relative border-b-4 border-black group-hover:invert transition-all duration-500">
                <img 
                  alt="Gabriel's Hinge profile picture"
                  className="w-full h-full object-cover"
                 src="https://images.unsplash.com/photo-1593793439372-634665494332" />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-black mb-4 uppercase underline decoration-4 decoration-yellow-400">Stats & Facts</h3>
                <ul className="space-y-3 font-mono text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold">►</span>
                    "The best way to ask me out is with a terrible pun"
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold">►</span>
                     Plays trumpet in a jazz band
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold">►</span>
                    Marathon runner and triathlete
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold">►</span>
                    Will debate pizza toppings for hours
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Sasha's Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="retro-card group"
            >
              <div className="bg-pink-600 text-white font-bold font-mono p-2 border-b-4 border-black flex justify-between items-center">
                <span>USER: SASHA</span>
                <MousePointer2 className="w-4 h-4" />
              </div>
              <div className="aspect-[4/5] relative border-b-4 border-black group-hover:invert transition-all duration-500">
                <img 
                  alt="Sasha's Hinge profile picture"
                  className="w-full h-full object-cover"
                 src="https://images.unsplash.com/photo-1615847879584-4b9f0b72fd2e" />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-black mb-4 uppercase underline decoration-4 decoration-cyan-400">Stats & Facts</h3>
                <ul className="space-y-3 font-mono text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">►</span>
                    "Looking for someone to explore the city with"
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">►</span>
                    Graphic designer (made this site cool)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">►</span>
                    Coffee connoisseur
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">►</span>
                    Can find the best tacos in any city
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HingeProfiles;