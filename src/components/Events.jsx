import React from 'react';
import { Calendar, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowCard } from './CardEffect';

const events = [
  {
    title: "Daily Morning Run",
    date: "Every Weekday, 6:00 AM",
    description: "Start your day with purpose. Meet at Subhash Stadium for a group run. Open to all.",
    type: "Daily",
    contribution: "Free",
    color: "brand-green"
  },
  {
    title: "Rajnandgaon Half Marathon",
    date: "Upcoming 2025",
    description: "Conquering the miles together at the Rajnandgaon Half Marathon. Join the squad!",
    type: "Race",
    contribution: "Registration Required",
    color: "brand-olive"
  },
  {
    title: "Charity Sunday Run",
    date: "Every Sunday, 7:00 AM",
    description: "Run for a cause. A special session where we contribute towards local community impact.",
    type: "Charity",
    contribution: "Optional Donation",
    color: "brand-green"
  }
];


const Events = () => {
  return (
    <section id="events" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl mb-6 leading-none">Upcoming <span className="text-brand-green">Vibes</span></h2>
            <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto md:mx-0">Join our upcoming events and be part of the heartbeat of our community.</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button className="px-6 md:px-8 py-2 md:py-3 rounded-full glass text-[10px] md:text-sm font-bold border-brand-green/50 border hover:bg-brand-green/10 transition-colors">UPCOMING</button>
            <button className="px-6 md:px-8 py-2 md:py-3 rounded-full glass text-[10px] md:text-sm font-bold text-white/30 hover:text-white/50 transition-colors">PAST MEMORIES</button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <GlowCard 
                glowColor="green" 
                customSize={true} 
                className="h-full border-white/5 hover:border-brand-green/30 group transition-all duration-500 overflow-hidden"
              >
                <div className="flex flex-col h-full relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 bg-white/5 text-brand-green group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    {event.type === 'Charity' ? <Heart size={32} /> : <Calendar size={32} />}
                  </div>
                  
                  <div className="text-[11px] font-black tracking-[0.2em] text-brand-olive uppercase mb-4">{event.date}</div>
                  <h3 className="text-3xl md:text-4xl mb-6 group-hover:text-brand-green transition-colors leading-[1.1] font-bold">{event.title}</h3>
                  <p className="text-white/40 mb-12 leading-relaxed text-lg font-medium">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                    <span className="text-xs font-black uppercase tracking-widest text-white/60">{event.contribution}</span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-brand-green/20 group-hover:text-brand-green transition-all">
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;

