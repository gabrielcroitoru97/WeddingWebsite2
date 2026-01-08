import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "What should I wear?",
      answer: "Tropical formal attire. Think colorful and elegant but comfortable for warm weather. Ladies: cocktail dresses or elegant separates. Gentlemen: suits in light colors or traditional guayaberas are welcome!"
    },
    {
      question: "Can I bring a plus one?",
      answer: "Due to venue capacity, we can only accommodate those listed on your invitation. If you received a plus one, it will be indicated on your invitation."
    },
    {
      question: "Are children welcome?",
      answer: "We love your little ones, but we've decided to make this an adults-only celebration. We hope this gives you a chance to relax and enjoy the evening!"
    },
    {
      question: "Will there be vegetarian/vegan options?",
      answer: "Absolutely! Please indicate any dietary restrictions in your RSVP, and our caterers will ensure you have delicious options."
    },
    {
      question: "Is there a gift registry?",
      answer: "Your presence is the greatest gift! However, if you'd like to contribute, we have a registry at [Store Name] and also welcome contributions to our honeymoon fund."
    },
    {
      question: "What's the deadline to RSVP?",
      answer: "Please RSVP by April 15, 2026, so we can provide accurate counts to our vendors."
    },
    {
      question: "Will transportation be provided?",
      answer: "Yes! We'll have shuttles running between the hotel block and the venue throughout the evening. Details will be shared closer to the date."
    },
    {
      question: "What if I have other questions?",
      answer: "Feel free to reach out to us directly at gabeandmarco2026@gmail.com or call/text either of us. We're happy to help!"
    }
  ];

  return (
    <section id="faq" className="py-24 bg-cyan-200 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
             backgroundSize: '30px 30px'
           }} 
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#000] transform -rotate-1 mb-6">
            <div className="flex items-center justify-center gap-3">
              <HelpCircle className="w-8 h-8 text-black" />
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                Frequently Asked Questions
              </h2>
            </div>
          </div>
          <p className="text-xl font-bold font-mono bg-white inline-block px-4 py-2 border-2 border-black shadow-[4px_4px_0_0_#000] transform rotate-1">Everything you need to know</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
            >
              <h3 className="text-xl font-black uppercase text-black mb-3">{faq.question}</h3>
              <p className="text-black font-mono text-lg leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;