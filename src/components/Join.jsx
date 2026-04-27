import React, { useState } from 'react';
import { Plus, Minus, MessageCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowCard } from './CardEffect';

const faqs = [
  { q: "Do I need to register?", a: "Nope! Just show up at the meeting point. We're open to everyone regardless of pace or fitness level." },
  { q: "Is there a bag drop?", a: "We usually have a car parked nearby where you can leave small bags, but we recommend traveling light!" },
  { q: "What is the pace?", a: "We have a mix of walkers, joggers, and runners. No one gets left behind—it's about the community, not just the speed." },
  { q: "Is it free?", a: "100% free. Our Sunday charity runs are optional contribution-based events where the proceeds go directly to impact." },
];


const Join = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="join" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <GlowCard 
            glowColor="green" 
            customSize={true} 
            className="rounded-[80px] p-10 md:p-24 overflow-hidden border-white/5"
          >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 blur-[120px] -mr-64 -mt-64 animate-pulse" />
          
          <div className="grid lg:grid-cols-2 gap-20 relative z-10">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h2 className="text-4xl md:text-8xl mb-8 leading-[0.9]">
                Ready to <span className="text-gradient neon-text">level up?</span>
              </h2>
              <p className="text-white/50 text-base md:text-xl mb-10 md:mb-12 max-w-md leading-relaxed font-medium">
                Stop watching from the sidelines. The best time to start was yesterday. The second best time is 7 AM tomorrow.
              </p>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://chat.whatsapp.com/random"
                target="_blank"
                className="w-full md:w-auto inline-flex items-center justify-center gap-4 md:gap-6 px-8 md:px-12 py-6 md:py-8 bg-[#25D366] text-white rounded-2xl md:rounded-[32px] font-black text-lg md:text-2xl shadow-[0_20px_50px_rgba(37,211,102,0.2)] transition-all"
              >
                <MessageCircle size={28} className="md:w-9 md:h-9" />
                JOIN ON WHATSAPP
              </motion.a>
              
              <div className="mt-16 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-midnight bg-brand-green/20 backdrop-blur-sm" />
                  ))}
                </div>
                <div className="text-[10px] md:text-xs font-black text-white/40 uppercase tracking-[0.2em]">
                  +496 Active Hustlers
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black mb-10 uppercase tracking-[0.3em] text-brand-olive">Common Queries</h3>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-white/5">
                    <button 
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full flex items-center justify-between text-left py-6 group"
                    >
                      <span className={`text-xl md:text-2xl font-bold transition-colors ${openIndex === i ? 'text-brand-green' : 'text-white/80 group-hover:text-white'}`}>
                        {faq.q}
                      </span>
                      <ChevronDown className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-brand-green' : 'text-white/30'}`} size={24} />
                    </button>
                    <AnimatePresence>
                      {openIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/40 pb-8 text-lg leading-relaxed font-medium">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Join;
