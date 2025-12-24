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
                See Our Hinge Profiles!
              </h2>
              <Smile className="w-8 h-8 text-black fill-yellow-400" />
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
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
                You think Hinge is a useless app that never works? Well here is one example of it paying off and getting a good result. Then again, between the two of us we went on dozens of bad Hinge dates before finding each other so the success rate isn't all that great.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Gabriel's Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="retro-card group"
            >
              <div className="bg-purple-600 text-white font-bold font-mono p-2 border-b-4 border-black flex justify-between items-center">
                <span>PROFILE: GABRIEL</span>
                <MousePointer2 className="w-4 h-4" />
              </div>
              <div className="aspect-[9/16] relative bg-black border-b-4 border-black">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="/images/gabriel_profile_cover image.JPG"
                >
                  <source src="/videos/gabriel-hinge.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>

            {/* Sasha's Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="retro-card group"
            >
              <div className="bg-pink-600 text-white font-bold font-mono p-2 border-b-4 border-black flex justify-between items-center">
                <span>PROFILE: SASHA</span>
                <MousePointer2 className="w-4 h-4" />
              </div>
              <div className="aspect-[9/16] relative bg-black border-b-4 border-black">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="/images/sasha_profile_cover image.JPG"
                >
                  <source src="/videos/sasha_profile.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>

            {/* Conversation Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="retro-card group"
            >
              <div className="bg-yellow-400 text-black font-bold font-mono p-2 border-b-4 border-black flex justify-between items-center">
                <span>LOG: THE CHAT</span>
                <MousePointer2 className="w-4 h-4" />
              </div>
              <div className="aspect-[9/16] relative bg-black border-b-4 border-black">
                <video 
                  className="w-full h-full object-cover"
                  controls
                >
                  <source src="/videos/initial_hinge_convo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HingeProfiles;