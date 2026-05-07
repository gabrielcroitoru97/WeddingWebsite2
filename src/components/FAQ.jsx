import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "What should I wear to these events?",
      answer: (
        <div className="space-y-2">
          <p><strong>Shabbat:</strong> Dressy casual (think tropical: sundresses, linen shirts, guayaberas, socks, shoes, etc.)</p>
          <p><strong>Pool party:</strong> pool attire (bathing suits, goggles, water wings, wetsuits).</p>
          <p><strong>Wedding:</strong> cocktail/semi-formal attire (any suit, any length dresses).</p>
        </div>
      )
    },
    {
      question: "What precautions should I take in Cartagena?",
      answer: (
        <div className="space-y-2">
          <p>Cartagena is a very safe city, but it’s always important to take extra precautions as a tourist, such as:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Stick to touristy, busier areas</li>
            <li>Use taxis called by the hotel or order Ubers, avoid hailing a taxi from the street. Ubers are very safe and a cheap way of getting around.</li>
            <li>Keep phones and wallets in your front pockets</li>
            <li>Wear a seatbelt while in a car or on a plane</li>
            <li>Look both ways before crossing a road</li>
          </ul>
        </div>
      )
    },
    {
      question: "Where should I stay?",
      answer: "We recommend staying at the Hilton Hotel since this is where all the events will be and it’ll give you a chance to be with the rest of the guests. We also recommend booking through our room block for the best rates, note that other sites may advertise prices that don’t include the 19% tax that gets added at check-in."
    },
    {
      question: "I’ve never been to a Jewish wedding, what will it be like?",
      answer: (
        <>
          It’ll probably be something like this: <a href="https://www.youtube.com/watch?v=yGBG8mCt59s&list=RDyGBG8mCt59s&start_radio=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">https://www.youtube.com/watch?v=yGBG8mCt59s&list=RDyGBG8mCt59s&start_radio=1</a>
        </>
      )
    },
    {
      question: "I’ve never been to a Colombian wedding what will it be like?",
      answer: (
        <>
          Something like this: <a href="https://youtu.be/JOL2KS5BgM0?si=wGmF7V5Z72WmLLOV&t=12" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">https://youtu.be/JOL2KS5BgM0?si=wGmF7V5Z72WmLLOV&t=12</a>
        </>
      )
    },
    {
      question: "Why do the Jews pick people up on chairs at the wedding?",
      answer: "So that we can feel tall for once."
    },
    {
      question: "What footwear should girls wear to the reception?",
      answer: "We highly recommend bringing close toed shoes to dance in. If you have them, steel toed boots are best."
    },
    {
      question: "What happens if I get hurt at the wedding?",
      answer: "You can seek help from one of the 20+ medical professionals who will be at the wedding."
    },
    {
      question: "What happens if I need legal advice at the wedding?",
      answer: "Feel free to ask one of the 10+ lawyers that will be at the wedding?"
    },
    {
      question: "What airline should I fly to Cartagena?",
      answer: (
        <div className="space-y-2">
          <p>The official airline for Gabriel and Sasha’s wedding is Spirit Airlines. Spirit: they’ll get you there in one piece and that’s about it.</p>
          <p>Note: this FAQ was written before the tragic closure of Spirit Airlines. We decided to keep in memory of the cheap fares that we've lost.</p>
        </div>
      )
    },
    {
      question: "What’s Gabriel’s favorite animal?",
      answer: "The buffalo."
    },
    {
      question: "What foods should I try in Colombia?",
      answer: (
        <div className="space-y-2">
          <p>Typical to the Colombian coast are mojarra frita, pargo frito (both whole fried fish), arroz de coco, and arepa de huevo.</p>
          <p>Typical to Colombia but not necessarily the coast are sancocho, bandeja paisa, empanadas, ajiaco, and arepas (which are Colombian, don’t let any Venezuelan tell you otherwise). Typical baked goods are pandebono, buñuelos, pandeyuca, and pan de queso.</p>
          <p>We also have the best coffee in the world and great fruit juices.</p>
        </div>
      )
    },
    {
      question: "Where can I connect through to get to Cartagena?",
      answer: "Various airlines fly there from NYC, Atlanta, Panama, Miami, Bogota, and Fort Lauderdale."
    },
    {
      question: "What did the buffalo say to his son when he went to college?",
      answer: "Bison"
    },
    {
      question: "What’s a Tisch?",
      answer: "The Tisch will be an opportunity for the friends and family of the couple to toast to their marriage. Only family will be giving speeches at the Shabbat and Wedding, so this is your chance to say a few words in honor of the couple. If speaking isn’t your style, songs, dances and slam poetry are also accepted. Anyone who wants to join is welcome to, but this event is mostly geared towards the younger crowd."
    },
    {
      question: "What if Sasha or Gabriel say no under the Chupah?",
      answer: "If this happens then the crowd will get robbed of an awesome glass smashing moment."
    },
    {
      question: "How come you didn’t get married at the Bad Bunny halftime show?",
      answer: "The smashed glass would’ve been a hazard for the players in the second half."
    },
    {
      question: "Will there be a time during the ceremony for me to object to this marriage?",
      answer: "No, but if you would like to lodge an objection, please send it in writing and they will be considered in the order in which they arrive"
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
              <div className="text-black font-mono text-lg leading-relaxed">{faq.answer}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;