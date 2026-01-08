import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Music, BookOpen, Smile, Baby } from 'lucide-react';

export const AthleticPage = () => {
  const events = [
    { name: "2023 Chicago Half Marathon", img: "/images/Chicago Half.jpeg" },
    { name: "2023 Chicago Marathon", img: "/images/Chicago Marathon.JPG" },
    { name: "2024 Miami Marathon", img: "/images/Miami Marathon.jpeg" },
    { name: "2024 Wisconsin Half Iron Man", img: "/images/Wisconsin Ironman.jpg" },
    { name: "2024 Highland Park Turkey Trot 5k", img: null },
    { name: "2025 Michigan Half Iron Man", img: "/images/Michigan Ironman.JPG" },
    { name: "2025 Highland Park Turkey Trot 5k", img: "/images/turkey_trot.jpg" },
    { name: "Upcoming: 2026 Pettit Indoor Marathon", img: null },
  ];

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8 justify-center"
        >
          <Trophy className="w-10 h-10 text-yellow-500" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Athletic Accomplishments
          </h2>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0_0_rgba(0,0,0,1)]"
        >
          <p className="text-2xl md:text-3xl font-black text-center mb-12 font-mono uppercase leading-relaxed">
            Since starting to date in August of 2023, Gabe and Sasha have completed a combined:
          </p>
          
          <ul className="space-y-6 text-xl md:text-2xl font-bold text-black mb-16">
            <li className="flex items-center gap-4 p-4 bg-yellow-100 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="text-3xl">🏊‍♂️</span>
              2 Half Iron Mans
            </li>
            <li className="flex items-center gap-4 p-4 bg-pink-100 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] transform rotate-1 hover:rotate-0 transition-transform">
              <span className="text-3xl">🏃‍♂️</span>
              3 Marathons
            </li>
            <li className="flex items-center gap-4 p-4 bg-cyan-100 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="text-3xl">👟</span>
              1 Half Marathon
            </li>
            <li className="flex items-center gap-4 p-4 bg-purple-100 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] transform rotate-1 hover:rotate-0 transition-transform">
              <span className="text-3xl">🦃</span>
              3 Turkey Trots
            </li>
          </ul>

          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div key={index} className="space-y-4">
                <div className={`border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform overflow-hidden bg-gray-100 aspect-[4/3] relative`}>
                  {event.img ? (
                    <img 
                      src={event.img} 
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-4xl">🏃‍♂️</span>
                    </div>
                  )}
                </div>
                <p className="text-center font-bold font-mono text-lg">{event.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const FutureKidsPage = () => (
  <section className="py-24 bg-pink-200 min-h-screen relative overflow-hidden">
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
        className="flex flex-col items-center gap-6 mb-12 text-center"
      >
        <div className="inline-block bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#000] transform rotate-1">
          <div className="flex items-center justify-center gap-3">
            <Baby className="w-8 h-8 text-black" />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              See Our Future Kids
            </h2>
            <Baby className="w-8 h-8 text-black" />
          </div>
        </div>
        <div className="bg-white border-4 border-black px-6 py-3 shadow-[4px_4px_0_0_#000] transform -rotate-1">
          <p className="text-xl md:text-2xl font-bold font-mono">
            This is what AI says our future kids will look like!
          </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rotate-1 hover:rotate-0 transition-transform overflow-hidden bg-white">
            <img 
              src="/images/Future Boy.png" 
              alt="Future Boy"
              className="w-full h-full object-cover aspect-[3/4]"
            />
          </div>
          <p className="text-center font-bold font-mono text-lg">Gabriel Jr.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] -rotate-1 hover:rotate-0 transition-transform overflow-hidden bg-white">
            <img 
              src="/images/Future Girl.png" 
              alt="Future Girl"
              className="w-full h-full object-cover aspect-[3/4]"
            />
          </div>
          <p className="text-center font-bold font-mono text-lg">Sasha Jr.</p>
        </motion.div>
      </div>
    </div>
  </section>
);

export const JokePage = () => (
  <section className="py-24 bg-white min-h-screen">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black">
          <img 
            src="/images/Fish Joke1.jpeg" 
            alt="Fish Joke Part 1"
            className="w-full h-auto"
          />
        </div>
        <div className="rounded-2xl overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black">
          <img 
            src="/images/Fish Joke2.jpeg" 
            alt="Fish Joke Part 2"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
);

export const MarcoPage = () => {
  const [position, setPosition] = React.useState(null);

  const movePolo = () => {
    const top = Math.random() * 80 + 10;
    const left = Math.random() * 80 + 10;
    
    // Calculate angle from center to ensure button points inwards
    // This prevents the button from going off-screen when the text is near the edge
    const angleFromCenter = Math.atan2(top - 50, left - 50);
    const angle = angleFromCenter + Math.PI + (Math.random() * (Math.PI / 1.5) - Math.PI / 3);
    
    const distance = 100 + Math.random() * 100; // 100px to 200px radius
    const btnX = Math.cos(angle) * distance;
    const btnY = Math.sin(angle) * distance;
    
    setPosition({ top: `${top}%`, left: `${left}%`, btnX, btnY });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      <div 
        className={`flex flex-col items-center gap-4 ${position ? 'absolute' : ''}`}
        style={position ? { top: position.top, left: position.left, transform: 'translate(-50%, -50%)' } : {}}
      >
        <p className="text-2xl font-medium text-black">Polo</p>
        <button 
          onClick={movePolo} 
          className="px-8 py-3 bg-black text-white font-bold font-mono uppercase tracking-widest border-4 border-transparent hover:bg-white hover:text-black hover:border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-colors transition-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
          style={position ? { 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${position.btnX}px), calc(-50% + ${position.btnY}px))`,
            width: 'max-content'
          } : {}}
        >
          Marco
        </button>
      </div>
    </div>
  );
};

export const CartagenaPage = () => (
  <section className="py-24 bg-teal-200 min-h-screen relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" 
         style={{ 
           backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)',
           backgroundSize: '40px 40px'
         }} 
    />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-block bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#000] transform -rotate-1">
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-black" />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              History of Cartagena
            </h2>
          </div>
        </div>
      </motion.div>
      <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0_0_rgba(0,0,0,1)] max-w-5xl mx-auto mb-12">
        <div className="space-y-6 text-black font-mono text-lg leading-relaxed">
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
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all">
          <img 
            alt="Historic Cartagena city walls at sunset"
            className="w-full h-full object-cover aspect-[4/3]"
           src="https://images.unsplash.com/photo-1686929405131-eb30a78c0d72" />
        </div>
        <div className="border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all">
          <img 
            alt="Colorful colonial buildings in Cartagena"
            className="w-full h-full object-cover aspect-[4/3]"
           src="https://images.unsplash.com/photo-1576541453633-b1e3e9b6b72e" />
        </div>
        <div className="border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all">
          <img 
            alt="Castillo San Felipe de Barajas fortress"
            className="w-full h-full object-cover aspect-[4/3]"
           src="https://images.unsplash.com/photo-1544056746-9e4f9534c363" />
        </div>
      </div>
    </div>
  </section>
);