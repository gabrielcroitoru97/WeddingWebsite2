import React from 'react';
import { motion } from 'framer-motion';

const Schedule = () => {
  const events = [
    {
      time: '4:30 PM',
      title: 'Guest Arrival',
      description: 'Welcome drinks and live music as guests arrive',
      color: 'from-pink-500 to-pink-600'
    },
    {
      time: '5:00 PM',
      title: 'Ceremony',
      description: 'Exchange of vows in the beautiful colonial courtyard',
      color: 'from-purple-500 to-purple-600'
    },
    {
      time: '6:00 PM',
      title: 'Cocktail Hour',
      description: 'Hors d\'oeuvres and signature cocktails',
      color: 'from-blue-500 to-blue-600'
    },
    {
      time: '7:00 PM',
      title: 'Reception & Dinner',
      description: 'Delicious Colombian cuisine with international flair',
      color: 'from-teal-500 to-teal-600'
    },
    {
      time: '9:00 PM',
      title: 'Dancing & Celebration',
      description: 'Live band and DJ to dance the night away',
      color: 'from-orange-500 to-orange-600'
    },
    {
      time: '12:00 AM',
      title: 'After Party',
      description: 'Keep the celebration going at our favorite local spot',
      color: 'from-rose-500 to-rose-600'
    }
  ];

  return (
    <section id="schedule" className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Schedule of Events
          </h2>
          <p className="text-gray-600 text-lg">A day to remember</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              <div className="flex items-start gap-6">
                <div className={`bg-gradient-to-br ${event.color} text-white px-6 py-3 rounded-full font-bold text-lg min-w-[120px] text-center shadow-lg`}>
                  {event.time}
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-lg">{event.description}</p>
                </div>
              </div>
              {index < events.length - 1 && (
                <div className="ml-[60px] h-8 w-0.5 bg-gradient-to-b from-purple-300 to-pink-300" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;