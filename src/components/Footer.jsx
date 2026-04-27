import React from 'react';

const Footer = () => {
  return (
    <footer className="py-32 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="text-5xl font-black tracking-tighter text-brand-green mb-8 neon-text">7AM</div>
            <p className="text-white/40 max-w-sm mb-10 leading-relaxed text-lg font-medium">
              We are a global community of early risers building the future. 
              Join the club, find your tribe, and make an impact.
            </p>
            <div className="flex gap-6">
              {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-xs font-black uppercase tracking-widest text-white/20 hover:text-brand-green transition-colors">{social}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-brand-olive">Navigation</h4>
            <ul className="space-y-6 text-white/40 font-bold uppercase text-xs tracking-widest">
              <li><a href="#" className="hover:text-brand-green transition-colors">Home</a></li>
              <li><a href="#events" className="hover:text-brand-green transition-colors">Events</a></li>
              <li><a href="#gallery" className="hover:text-brand-green transition-colors">Gallery</a></li>
              <li><a href="#about" className="hover:text-brand-green transition-colors">Story</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-brand-olive">Legal</h4>
            <ul className="space-y-6 text-white/40 font-bold uppercase text-xs tracking-widest">
              <li><a href="#" className="hover:text-brand-green transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 md:gap-8 text-white/20 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-center md:text-left">
          <div>© 2024 THE 7AM CLUB. ALL RIGHTS RESERVED.</div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <span>Built by the community</span>
            <span className="text-brand-green">Rise and Conquer</span>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
