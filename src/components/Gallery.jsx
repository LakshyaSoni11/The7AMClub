import React from 'react';
import { motion } from 'framer-motion';
import meetupImg from '../assets/meetup.png';
import charityImg from '../assets/charity.png';
import hustleImg from '../assets/hustle.png';

const images = [
  { src: meetupImg, title: "Sunday Vibes", size: "large" },
  { src: hustleImg, title: "Deep Work", size: "small" },
  { src: charityImg, title: "Giving Back", size: "medium" },
  { src: meetupImg, title: "Community Lunch", size: "medium" },
  { src: hustleImg, title: "Peak Performance", size: "large" },
  { src: charityImg, title: "Green Impact", size: "small" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl mb-6">The <span className="text-brand-green">Gallery</span></h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg">Snapshots from our journey. Authentic, raw, and high-energy.</p>
        </motion.div>

        {/* Desktop/Tablet Columns */}
        <div className="hidden md:columns-2 lg:columns-3 gap-8 space-y-8 md:block">
          {images.map((img, i) => (
            <GalleryCard key={i} img={img} index={i} />
          ))}
        </div>

        {/* Mobile Stacked View */}
        <div className="md:hidden relative h-[500px] flex items-center justify-center">
          {images.map((img, i) => (
            <motion.div
              key={i}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              style={{ zIndex: images.length - i }}
              initial={{ scale: 1 - i * 0.05, y: i * 20, opacity: 1 - i * 0.2 }}
              whileInView={{ opacity: 1 }}
              className="absolute w-full max-w-[300px] aspect-[4/5] rounded-[30px] overflow-hidden shadow-2xl glass border border-white/10"
            >
              <img 
                src={img.src} 
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent flex flex-col justify-end p-8">
                <div className="text-brand-green font-black text-2xl uppercase tracking-tighter">
                  {img.title}
                </div>
                <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
                  Slide to explore
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GalleryCard = ({ img, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="relative group overflow-hidden rounded-[40px] cursor-pointer bg-white/5"
  >
    <img 
      src={img.src} 
      alt={img.title}
      className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
      <div className="text-brand-green font-black text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        {img.title}
      </div>
      <div className="text-white/50 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 uppercase tracking-widest font-bold mt-2">
        The 7Am Club • 2024
      </div>
    </div>
  </motion.div>
);

export default Gallery;
