import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

const Registry = () => {
  return (
    <section className="py-24 bg-green-200 min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
             backgroundSize: '30px 30px'
           }} 
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#000] transform -rotate-1">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Registry
            </h2>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-16">
          {/* Combined Registry Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)] flex flex-col items-center text-center"
          >
            <div className="bg-pink-100 p-4 rounded-full border-2 border-black mb-6">
              <Gift className="w-12 h-12 text-pink-600" />
            </div>
            <h3 className="text-2xl font-black uppercase mb-4">Gift Registries</h3>
            <div className="font-mono text-lg leading-relaxed mb-8 space-y-4">
              <p>
                We're including our registry linked below. However, Colombia is a far trip and coming to celebrate with us is very generous and more than enough of a gift (we mean it, no pressure or expectation to get us anything else).
              </p>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <a 
                href="https://www.zola.com/registry/gabrielandsasha2027/?preview=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-pink-400 text-black font-bold font-mono py-3 border-2 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] hover:bg-pink-300 transition-all uppercase flex items-center justify-center"
              >
                Zola Registry
              </a>
          <a 
            href="https://www.crateandbarrel.com/gift-registry/sasha-becker-and-gabriel-croitoru/r7537829"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-cyan-400 text-black font-bold font-mono py-3 border-2 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] hover:bg-cyan-300 transition-all uppercase flex items-center justify-center"
          >
            Crate & Barrel
          </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Registry;