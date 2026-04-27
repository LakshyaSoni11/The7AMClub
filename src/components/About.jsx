import React from 'react';
import { motion } from 'framer-motion';
import { GlowCard } from './CardEffect';

const milestones = [
  { year: 'Daily', title: 'The 6 AM Grind', desc: 'Every weekday at Subhash Stadium. Open to all paces, no registration needed.' },
  { year: 'Sunday', title: 'Charity Sundays', desc: 'Special fitness events where every drop of sweat contributes to a local cause.' },
  { year: 'Always', title: 'More Than A Run', desc: "Inclusive community that vibes together, runs together, and grows together." },
];

const About = () => {
  return (
    <section id="about" className="py-32 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-7xl mb-8 leading-[0.9] text-center lg:text-left">
              More than <br className="hidden md:block" />
              Just a <span className="text-brand-green">Run.</span>
            </h2>
            <p className="text-white/50 text-base md:text-xl mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium text-center lg:text-left">
              7 AM CLUB is a fun and inclusive fitness community that meets every weekday at 6 AM. 
              From first-timers to marathoners, everyone has a place here. Come for the run, stay for the people.
            </p>


            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="group"
                >
                  <GlowCard 
                    glowColor="green" 
                    customSize={true} 
                    className="p-10 rounded-[40px] border-white/5 transition-all hover:bg-white/[0.02]"
                  >
                    <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                      <div className="text-4xl font-black text-brand-green min-w-[100px] group-hover:scale-110 transition-transform">{m.year}</div>
                      <div className="space-y-3">
                        <h4 className="text-2xl font-bold group-hover:text-brand-green transition-colors leading-none">{m.title}</h4>
                        <p className="text-white/40 leading-relaxed text-lg">{m.desc}</p>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <GlowCard 
              glowColor="green" 
              customSize={true} 
              className="aspect-square md:aspect-auto lg:aspect-square rounded-[40px] md:rounded-[80px] p-8 md:p-16 flex flex-col justify-center items-center text-center relative z-10 border-white/5"
            >
              <div className="text-6xl md:text-[180px] font-black text-brand-green opacity-5 absolute -top-5 md:-top-10 -right-5 md:-right-10 select-none">
                7AM
              </div>
              <h3 className="text-lg md:text-2xl font-black mb-4 md:mb-6 tracking-[0.3em] text-brand-olive">OUR MANIFESTO</h3>
              <p className="text-xl md:text-3xl italic text-white/90 leading-snug font-medium">
                "We rise when the world sleeps. We build while others dream. We give because we can."
              </p>
            </GlowCard>
            
            {/* Decorative element */}
            <div className="absolute -bottom-10 -left-10 w-48 md:w-64 h-48 md:h-64 bg-brand-green/10 rounded-full blur-[80px] md:blur-[100px] -z-10 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
