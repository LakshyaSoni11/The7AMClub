import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '@/components/ui/book';

const Resources = () => {
  return (
    <section id="resources" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl mb-6 leading-none uppercase font-black">
            The <span className="text-brand-green">Mindset</span> Library
          </h2>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            We run for the body, we read for the mind. Here's our top recommendation for building the 7 AM habit.
          </p>
        </div>

        <div className="flex justify-center items-center px-10">
          <Book
            color="#689F38"
            className="w-48 h-72 md:w-64 md:h-96"
            cover={
              <div className="w-full h-full bg-gradient-to-br from-brand-green to-midnight p-8 flex flex-col justify-between items-center text-center">
                <div className="text-xs tracking-[0.3em] font-black opacity-50 uppercase">7AM CLUB RECOMMENDS</div>
                <div className="text-3xl font-black leading-tight uppercase">Atomic <br/> Habits</div>
                <div className="text-sm font-bold opacity-60">James Clear</div>
              </div>
            }
            backOfCover={
              <div className="w-full h-full bg-midnight-light p-6 flex flex-col justify-center items-center text-center">
                <p className="text-xs leading-relaxed opacity-60 italic">
                  "You do not rise to the level of your goals. You fall to the level of your systems."
                </p>
              </div>
            }
            pages={[
              <div className="w-full h-full bg-white p-8 text-midnight overflow-hidden">
                <h4 className="font-black text-xl mb-4 uppercase leading-none">The 1% Rule</h4>
                <p className="text-sm leading-relaxed mb-4">
                  Small habits don't add up, they compound. That's the power of atomic habits.
                </p>
                <div className="h-px bg-midnight/10 mb-4" />
                <ul className="text-xs space-y-2 font-bold opacity-70">
                  <li>• Make it obvious</li>
                  <li>• Make it attractive</li>
                  <li>• Make it easy</li>
                  <li>• Make it satisfying</li>
                </ul>
              </div>,
              <div className="w-full h-full bg-white p-8 text-midnight overflow-hidden">
                <h4 className="font-black text-xl mb-4 uppercase leading-none">The 7 AM System</h4>
                <p className="text-sm leading-relaxed mb-4">
                  Systems are the secret to consistency. Our club is the ultimate system for early risers.
                </p>
                <div className="h-px bg-midnight/10 mb-4" />
                <ul className="text-xs space-y-2 font-bold opacity-70">
                  <li>• Community Accountability</li>
                  <li>• Set Meeting Point</li>
                  <li>• No-Decision Mornings</li>
                  <li>• Shared Victory</li>
                </ul>
              </div>
            ]}

          />
        </div>
      </div>
    </section>
  );
};

export default Resources;
