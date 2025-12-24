import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Music, Heart, BookOpen } from 'lucide-react';

const MoreSection = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 space-y-32">
        {/* Athletic Accomplishments */}
        <motion.section
          id="athletic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-10 h-10 text-yellow-500" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Athletic Accomplishments
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Gabe's Achievements</h3>
              <ul className="space-y-3 text-gray-700">
                <li>🏃‍♂️ Completed 5 marathons (best time: 3:42:15)</li>
                <li>🏊‍♂️ Ironman 70.3 finisher (2022, 2023)</li>
                <li>🚴‍♂️ Century rider - 100+ miles</li>
                <li>🏅 Boston Marathon qualifier</li>
                <li>⚽ College varsity soccer (4 years)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Marco's Achievements</h3>
              <ul className="space-y-3 text-gray-700">
                <li>🎾 Former college tennis player</li>
                <li>🏃‍♂️ Half marathon finisher (multiple)</li>
                <li>🧘‍♂️ Certified yoga instructor</li>
                <li>🏊‍♂️ Open water swimmer</li>
                <li>⛰️ Hiked the Inca Trail to Machu Picchu</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Gabe Playing Trumpet */}
        <motion.section
          id="trumpet"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Music className="w-10 h-10 text-purple-500" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Gabe's Musical Journey
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                Gabe has been playing trumpet since age 10, inspired by his grandfather who was a jazz musician. 
                He's performed in various jazz ensembles, wedding bands, and even busked in Central Park during college.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Currently, he plays with the West Village Jazz Collective every Thursday night. His favorite artists 
                include Miles Davis, Dizzy Gillespie, and Wynton Marsalis.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Fun fact: Gabe proposed to Marco with a custom arrangement of "What a Wonderful World" played at 
                sunset in Central Park!
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                alt="Gabe playing trumpet on stage"
                className="w-full h-full object-cover aspect-[4/3]"
               src="https://images.unsplash.com/photo-1563260453-3f7fe67541e5" />
            </div>
          </div>
        </motion.section>

        {/* Marco */}
        <motion.section
          id="marco"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-10 h-10 text-pink-500" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              All About Marco
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                alt="Marco portrait in natural setting"
                className="w-full h-full object-cover aspect-[4/3]"
               src="https://images.unsplash.com/photo-1692717416794-ffd4490dc483" />
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-8 shadow-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                Marco grew up in Cartagena (yes, that's why we're getting married there!) and moved to New York 
                for design school. He's a senior graphic designer at a leading creative agency, specializing in 
                brand identity and digital experiences.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                When he's not designing, Marco loves exploring the city's art galleries, trying new restaurants, 
                and planning the couple's next travel adventure. He speaks three languages fluently: Spanish, 
                English, and Portuguese.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Marco is the organized one in the relationship (this whole wedding wouldn't happen without him!) 
                and makes the world's best arepas, according to Gabe.
              </p>
            </div>
          </div>
        </motion.section>

        {/* History of Cartagena */}
        <motion.section
          id="cartagena"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-10 h-10 text-blue-500" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              History of Cartagena
            </h2>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                <strong>Cartagena de Indias</strong>, founded in 1533 by Spanish conquistador Pedro de Heredia, 
                is one of South America's most historically significant cities. Named after Cartagena, Spain, the 
                city quickly became a major port and trading hub in the Spanish colonial empire.
              </p>
              <p>
                The city's strategic location on the Caribbean coast made it a target for pirates and foreign 
                powers. To protect the wealth flowing through the port, the Spanish built an extensive system of 
                fortifications, including the famous <strong>Castillo San Felipe de Barajas</strong>, one of the 
                greatest military constructions of Spanish colonial times.
              </p>
              <p>
                The old city walls, completed in 1796, stretch for 13 kilometers and represent one of the most 
                complete fortification systems in South America. Today, these walls are a UNESCO World Heritage 
                site and a favorite spot for sunset walks.
              </p>
              <p>
                Cartagena's <strong>Historic Center</strong> is a living museum of colonial architecture, with 
                colorful buildings, flower-draped balconies, and cobblestone streets that transport visitors back 
                in time. The city has been meticulously preserved and is now one of the Caribbean's most beautiful 
                and romantic destinations.
              </p>
              <p>
                The city played a crucial role in Colombia's independence movement and was one of the first cities 
                to declare independence from Spain in 1811. Today, Cartagena seamlessly blends its rich history 
                with modern Colombian culture, making it the perfect setting for a wedding celebration!
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                alt="Historic Cartagena city walls at sunset"
                className="w-full h-full object-cover aspect-[4/3]"
               src="https://images.unsplash.com/photo-1632302928592-71b6f7bb27c6" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                alt="Colorful colonial buildings in Cartagena"
                className="w-full h-full object-cover aspect-[4/3]"
               src="https://images.unsplash.com/photo-1661012469578-c15d1c4def23" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                alt="Castillo San Felipe de Barajas fortress"
                className="w-full h-full object-cover aspect-[4/3]"
               src="https://images.unsplash.com/photo-1600232803475-58d251f601e5" />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default MoreSection;