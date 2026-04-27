import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';
import Gallery from './components/Gallery';
import About from './components/About';
import Join from './components/Join';
import Resources from './components/Resources';
import Footer from './components/Footer';

import Background from './components/Background';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen text-white selection:bg-brand-pink selection:text-white">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      
      <Background />
      <Navbar />
      <main>
        <Hero />
        <Events />
        <Gallery />
        <About />
        <Resources />
        <Join />

      </main>
      <Footer />
    </div>
  );
}

export default App;
