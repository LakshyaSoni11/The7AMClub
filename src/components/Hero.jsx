import React from 'react';
import { motion } from 'framer-motion';
import { ParticleTextEffect } from './welcomeText';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
      {/* Full Page Fixed Particle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleTextEffect />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10 text-center h-full flex flex-col justify-center"
      >
        <motion.div variants={itemVariants} className="mb-12 mt-10 md:mt-20">
          <div className="h-8 md:h-24" />
          
          <p className="max-w-xl mx-auto text-lg md:text-3xl text-white/90 mb-32 md:mb-40 font-bold leading-relaxed tracking-wide drop-shadow-2xl px-6 text-center">
            Every Weekday • 6 AM <br className="md:hidden" /> 
            • Subhash Stadium <br />
            Join Raipur's most inclusive <br className="md:hidden" /> fitness community. 
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://chat.whatsapp.com/random"
              className="w-full md:w-auto px-8 md:px-12 py-4 md:py-6 bg-brand-green text-black rounded-xl md:rounded-2xl font-black text-lg md:text-2xl hover:shadow-[0_0_40px_rgba(190,242,100,0.6)] transition-all text-center"
            >
              JOIN THE MOVEMENT
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              href="#events"
              className="w-full md:w-auto px-8 md:px-12 py-4 md:py-6 glass border-brand-green/30 rounded-xl md:rounded-2xl font-black text-lg md:text-2xl transition-all text-center"
            >
              EXPLORE EVENTS
            </motion.a>
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div 
          variants={itemVariants}
          className="mt-auto pb-10 md:pb-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto w-full px-6"
        >
          {[
            { label: 'Members', value: '500+' },
            { label: 'Meetups', value: '24+' },
            { label: 'Impact', value: '$10k+' },
            { label: 'Cities', value: '5+' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div className="text-2xl md:text-4xl font-black text-brand-green mb-1 drop-shadow-md">{stat.value}</div>
              <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Interaction Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[9px] uppercase tracking-[0.5em] text-white/20 animate-pulse hidden md:block">
        Interact with the background • Right-click to disperse
      </div>
    </section>
  );
};

export default Hero;
