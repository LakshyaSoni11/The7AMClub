import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      {/* Animated Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-green/5 blur-[80px] md:blur-[120px] rounded-full animate-float" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-olive/5 blur-[60px] md:blur-[100px] rounded-full animate-float-delayed" />
      <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-brand-green/3 blur-[40px] md:blur-[80px] rounded-full animate-float-slow hidden md:block" />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
             backgroundSize: '100px 100px'
           }} />
    </div>
  );
};

export default Background;
