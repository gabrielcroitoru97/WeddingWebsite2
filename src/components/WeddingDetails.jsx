import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Heart, Music, Sun, Wine, Ticket, Shirt, Star, Users, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
const WeddingDetails = () => {
  const timelineData = [{
    date: "Friday, Jan 15, 2027",
    events: [{
      title: "Old City Tour",
      time: "Morning (exact time TBD)",
      location: "Meet in Hilton Lobby for Buses",
      description: "Fun Fact: The reason they call it an old city is because it is older than most other cities",
      icon: MapPin,
      color: "bg-pink-200",
      dressCode: "Casual, wear walking shoes"
    }, {
      title: "Shabbat",
      icon: Wine,
      color: "bg-indigo-200",
      dressCode: "Dressy casual (think tropical: sundresses, linen shirts, guayaberas, short sleeve button downs, etc)",
      subEvents: [{
        title: "Kabbalat Shabbat",
        time: "5:45 PM",
        location: "The Beach",
        description: "Optional Shabbat services at the beach led by Joey Becker. Afterwords, we'll continue with a full ma'ariv indoors."
      }, {
        title: "Shabbat Dinner",
        time: "7:00 PM",
        location: "Hilton Gardens",
        description: "18th person to show up gets to say the Hamotzi"
      }, {
        title: "Tisch",
        time: "Following Shabbat Dinner",
        location: "Hilton Gardens",
        description: "A chance for the friends of the couple to have a few drinks and toast to the bride and groom. Of course all are welcome, but this event is really geared towards the younger crowd."
      }]
    }]
  }, {
    date: "Saturday, Jan 16, 2027",
    events: [{
      title: "Pool Party",
      time: "1:00 PM",
      location: "Hilton Pool",
      description: "The Hilton has an artificial body of water 30 ft from a natural body of water, you'll have to see it to believe it",
      icon: Sun,
      color: "bg-cyan-200",
      dressCode: "Pool attire"
    }, {
      title: "Havdalah",
      time: "5:45 PM",
      location: "The Beach",
      description: "An optional brief ceremony to close out Shabbat. Come see our cool, twisty candle",
      icon: Moon,
      color: "bg-indigo-300",
      dressCode: "Casual"
    }]
  }, {
    date: "Sunday, Jan 17, 2027",
    events: [{
      title: "The Ceremony",
      time: "5:30 PM",
      location: "Hilton Garden",
      description: "Come early to make sure you get a little hat",
      icon: Heart,
      color: "bg-green-200",
      dressCode: "Cocktail/ formal (suits, dresses)"
    }, {
      title: "The Reception",
      time: "Following the Ceremony",
      location: "Hilton Ballroom",
      description: "If you haven't seen a Latino Jewish Hora, make sure you bring closed toed shoes. And maybe a mouth guard. And make sure your health and life insurances are up to date.",
      icon: Music,
      color: "bg-purple-200",
      dressCode: "Cocktail/ formal (suits, dresses)"
    }]
  }];
  return <div className="min-h-screen bg-gray-50 py-12 px-4" style={{
    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
    backgroundSize: '20px 20px'
  }}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-16 bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 bg-yellow-300 inline-block px-4 border-2 border-black transform -rotate-2">
            The Timeline
          </h1>
          <p className="text-xl font-bold mt-4 font-mono">Save the Dates: January 15-17, 2027</p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-pink-400 border-2 border-black font-bold text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-full">
              Cartagena, Colombia
            </span>
            <span className="px-4 py-2 bg-cyan-400 border-2 border-black font-bold text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-full">Hilton Hotel</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12 relative">
          {/* Vertical Line (Desktop only) */}
          <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-1 bg-black -translate-x-1/2 z-0" />

          {timelineData.map((day, dayIndex) => <div key={day.date} className="relative z-10">
              {/* Date Header */}
              <motion.div initial={{
            scale: 0.8,
            opacity: 0
          }} whileInView={{
            scale: 1,
            opacity: 1
          }} viewport={{
            once: true
          }} className="flex justify-center mb-8">
                <div className="bg-black text-white px-6 py-2 font-bold text-xl border-4 border-yellow-300 shadow-[4px_4px_0_0_rgba(0,0,0,1)] uppercase tracking-widest transform rotate-1">
                  {day.date}
                </div>
              </motion.div>

              {/* Events */}
              <div className="grid gap-8">
                {day.events.map((event, eventIndex) => {
              return <motion.div key={event.title} initial={{
                x: dayIndex % 2 === 0 ? -50 : 50,
                opacity: 0
              }} whileInView={{
                x: 0,
                opacity: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: eventIndex * 0.2
              }} className={cn("bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all relative overflow-hidden group", event.color)}>
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <event.icon size={100} />
                      </div>

                      <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b-4 border-black pb-4">
                          <h3 className="text-2xl font-black uppercase tracking-tight">
                            {event.title}
                          </h3>
                          {event.time && (
                            <div className="flex items-center gap-2 bg-black text-white px-3 py-1 font-mono font-bold text-sm">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </div>
                          )}
                        </div>

                        {event.location && (
                          <div className="flex items-center gap-2 mb-3 font-bold text-lg">
                            <MapPin className="w-5 h-5" />
                            {event.location}
                          </div>
                        )}

                        {event.dressCode && (
                          <div className="flex items-center gap-2 mb-3 font-bold text-lg">
                            <Shirt className="w-5 h-5" />
                            Dress Code: {event.dressCode}
                          </div>
                        )}

                        {event.description && (
                          <p className="font-medium text-lg leading-relaxed border-l-4 border-black pl-4">
                            {event.description}
                          </p>
                        )}

                        {event.subEvents && (
                          <div className="space-y-5 mt-4 border-l-4 border-black pl-4 py-1">
                            {event.subEvents.map((subEvent, idx) => (
                              <div key={idx}>
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <h4 className="font-bold uppercase text-lg">{subEvent.title}</h4>
                                  <div className="flex items-center gap-1 bg-black text-white px-2 py-0.5 font-mono font-bold text-xs">
                                    <Clock className="w-3 h-3" />
                                    {subEvent.time}
                                  </div>
                                </div>
                                {subEvent.location && (
                                  <div className="flex items-center gap-1 mb-1 font-bold text-sm text-gray-800">
                                    <MapPin className="w-4 h-4" />
                                    {subEvent.location}
                                  </div>
                                )}
                                <p className="font-medium text-base">
                                  {subEvent.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>;
            })}
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default WeddingDetails;