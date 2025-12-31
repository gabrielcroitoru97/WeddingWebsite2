import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-[#ffeb3b]">
      {/* Retro Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ 
             backgroundImage: 'radial-gradient(#000 2px, transparent 2px), radial-gradient(#000 2px, transparent 2px)',
             backgroundSize: '40px 40px',
             backgroundPosition: '0 0, 20px 20px'
           }} 
      />
      
      {/* Decorative Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600 border-4 border-black rounded-full z-0 animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-20 right-10 w-0 h-0 border-l-[50px] border-l-transparent border-b-[100px] border-b-red-600 border-r-[50px] border-r-transparent rotate-12 z-0" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-red-600 border-4 border-black rotate-45 z-0" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-8 relative"
          >
             <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-full" />
            <div className="relative bg-white p-4 rounded-full border-4 border-black">
               <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-8xl mb-6 text-white text-outline transform -rotate-2 tracking-wider">
            Gabriel & Sasha
          </h1>
          
          <div className="inline-block bg-black text-white px-6 py-2 transform rotate-2 mb-12 border-2 border-white shadow-[4px_4px_0_0_#ff00ff]">
            <p className="text-2xl md:text-3xl font-bold uppercase tracking-widest font-mono">
              are getting married!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: -3 }}
              transition={{ delay: 0.4 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="bg-white p-4 pb-16 shadow-[10px_10px_0_0_rgba(0,0,0,1)] border-4 border-black"
            >
              <div className="relative overflow-hidden border-2 border-black bg-gray-200 aspect-[3/4]">
                <img 
                  alt="Gabriel and Sasha"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                 src="/images/CouplePic1.JPG" />
              </div>
              <div className="mt-4">
                <h3 className="text-black text-3xl font-bold font-mono">Indoor Skydivers</h3>
                <div className="flex justify-center gap-2 mt-2">
                   <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                   <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                   <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                   <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                   <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 3 }}
              transition={{ delay: 0.4 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="bg-white p-4 pb-16 shadow-[10px_10px_0_0_rgba(0,0,0,1)] border-4 border-black"
            >
              <div className="relative overflow-hidden border-2 border-black bg-gray-200 aspect-[3/4]">
                <img 
                  alt="Sasha and Gabriel"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                 src="/images/CouplePic2.JPG" />
              </div>
              <div className="mt-4">
                <h3 className="text-black text-3xl font-bold font-mono">Ice Cream Enthusiasts</h3>
                <div className="flex justify-center gap-2 mt-2">
                   <Zap className="w-5 h-5 text-blue-500 fill-blue-500" />
                   <Zap className="w-5 h-5 text-blue-500 fill-blue-500" />
                   <Zap className="w-5 h-5 text-blue-500 fill-blue-500" />
                   <Zap className="w-5 h-5 text-blue-500 fill-blue-500" />
                   <Zap className="w-5 h-5 text-blue-500 fill-blue-500" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex flex-col items-center bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#00ffff]"
          >
            <p className="text-3xl md:text-4xl text-black font-black mb-2 uppercase">
              January 15-17, 2027
            </p>
            <div className="w-full h-1 bg-black mb-2" />
            <p className="text-xl md:text-2xl text-purple-600 font-bold font-mono">
              Cartagena, Colombia
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;