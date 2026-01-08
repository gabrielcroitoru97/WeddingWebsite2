import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart } from 'lucide-react';

const Registry = () => {
  const tiers = [
    { name: "Bronze Tier", amount: "$25-$49", prize: "A personalized thank you card or text", color: "bg-orange-300" },
    { name: "Silver Tier", amount: "$50-$99", prize: "All the above and early access to the buffet", color: "bg-gray-300" },
    { name: "Gold Tier", amount: "$100-$199", prize: "All the above and special gold kippahs to wear to the ceremony and shabbat", color: "bg-yellow-400" },
    { name: "Platinum Tier", amount: "$200-$299", prize: "All the above and you get to be picked up on a chair during the hora", color: "bg-blue-300" },
    { name: "Diamond Tier", amount: "$300-$499", prize: "All the above and you get permission to wear white to the wedding", color: "bg-cyan-300" },
    { name: "Double Diamond Tier", amount: "$500-$999", prize: "All the above and you get a drink named after you at the cocktail hour", color: "bg-purple-300" },
    { name: "Elite Tier", amount: "$1,000+", prize: "All the above and you get to choose the song we use for our first dance", color: "bg-pink-400" },
  ];

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
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">
              Registry
            </h2>
            <div className="flex items-center justify-center gap-2">
               <Heart className="w-6 h-6 text-red-500 fill-red-500" />
               <p className="font-mono font-bold text-xl">Your presence is the greatest gift!</p>
               <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </div>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-16">
          {/* Store Registry */}
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
            <h3 className="text-2xl font-black uppercase mb-4">Gift Registry</h3>
            <div className="font-mono text-lg leading-relaxed mb-8 space-y-4">
              <p>
                We realize that Colombia is a far trip for most of you, so you coming to celebrate with us is already very generous and more than enough of a gift (we mean it, no pressure or expectation to get anything else).
              </p>
              <p>
                That said, we realize that many of you will still decide to get a gift, so we’ve put together a registry with a few items that you can contribute to.
              </p>
            </div>
            <a 
              href="https://www.zola.com/registry/gabrielandsasha2027"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-pink-400 text-black font-bold font-mono py-3 border-2 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all uppercase"
            >
              View Registry
            </a>
          </motion.div>
        </div>

        {/* Tiers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
            <h3 className="text-3xl md:text-4xl font-black uppercase text-center mb-6">Supporter Tiers</h3>
            <p className="text-center font-mono text-lg mb-8">
              To thank those that contribute for their generosity, we’ve put together a set of supporters tiers with special prizes at each level:
            </p>
            
            <div className="space-y-4">
              {tiers.map((tier, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-4 p-4 border-2 border-black ${tier.color} shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all`}>
                  <div className="text-center md:text-left md:w-1/3 flex-shrink-0">
                    <h4 className="font-black uppercase text-xl">{tier.name}</h4>
                    <span className="font-mono font-bold block">{tier.amount}</span>
                  </div>
                  <div className="flex-grow text-center md:text-left font-mono font-bold">
                    {tier.prize}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center font-mono text-sm md:text-base italic text-gray-600 border-t-2 border-black pt-4">
              <p>
                Note: These tiers are jokes, please do not expect any of these prizes. Especially please do not wear white to the wedding because Sasha will blame me and I will blame you for not reading this note
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Registry;