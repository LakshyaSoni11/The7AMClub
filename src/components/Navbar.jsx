import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Story', href: '#about' },
    { name: 'Mindset', href: '#resources' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6"
      >
        <div className="glass-morphism px-4 md:px-8 py-3 rounded-full flex items-center justify-between md:justify-center gap-4 md:gap-12 border border-white/10 w-full max-w-[95%] md:w-auto">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="text-xl md:text-2xl font-black tracking-tighter text-brand-green neon-text cursor-pointer"
          >
            7AM
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-brand-green transition-colors">{link.name}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://chat.whatsapp.com/random" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-green text-black px-4 md:px-8 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(190,242,100,0.4)] transition-all whitespace-nowrap"
            >
              JOIN CLUB
            </motion.a>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white/70 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden glass-morphism pt-32 px-10"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-black uppercase tracking-widest text-white/80 hover:text-brand-green"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
