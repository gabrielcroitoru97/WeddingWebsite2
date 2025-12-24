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
    <section id="faq" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-10 h-10 text-purple-500" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-gray-600 text-lg">Everything you need to know</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h3>
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;