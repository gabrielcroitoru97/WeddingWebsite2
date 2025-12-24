import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';

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
          className="text-center mb-12"
        >
          <div className="bg-yellow-400 border-4 border-black shadow-[8px_8px_0_0_#000] inline-block px-8 py-6 transform -rotate-1">
            <h2 className="text-4xl md:text-6xl font-black text-black uppercase mb-2">
              Single Guests
            </h2>
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              <span className="font-mono font-bold text-lg">FIND YOUR MATCH</span>
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0_0_rgba(0,0,0,1)] mb-12"
        >
          <div className="prose prose-lg md:prose-xl font-mono text-black leading-relaxed space-y-6">
            <p>
              What's better than a wedding? A wedding that spawns more weddings! What better place to meet someone than an event taking place in a romantic setting where everyone in the room has been vetted as a quality person.
            </p>
            <p>
              But how are you to know who is and isn't single? Introducing the single slide decks! Click in to see who the other people are at the wedding. Want to be added? At the end of each slide deck is a template, simply create a copy, fill out your information, and you're officially on the market!
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.a
            href="https://docs.google.com/presentation/d/1JUaODyFLMpB-5VqvzV0ciicMlPzzv-fLeLEhOkSadV4/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, rotate: -1 }}
            className="block bg-blue-400 border-4 border-black p-8 shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-3xl font-black text-black uppercase">Men's Deck</h3>
              <ArrowRight className="w-8 h-8 text-black group-hover:translate-x-2 transition-transform" />
            </div>
            <p className="font-mono font-bold text-black">View the bachelors &rarr;</p>
          </motion.a>

          <motion.a
            href="https://docs.google.com/presentation/d/1XQ4gut19WtFZTfFUqNR3tNLxcwjPnDGMSEi6qSxX2k4/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="block bg-pink-400 border-4 border-black p-8 shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-3xl font-black text-black uppercase">Women's Deck</h3>
              <ArrowRight className="w-8 h-8 text-black group-hover:translate-x-2 transition-transform" />
            </div>
            <p className="font-mono font-bold text-black">View the bachelorettes &rarr;</p>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default SingleGuests;