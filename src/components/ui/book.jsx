"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft } from "lucide-react";

export const Book = ({
  pages = [], // Array of page contents
  cover,
  backOfCover,
  rotate = -30,
  coverRotate = -100,
  className,
  color = "#FF00E5"
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rotatePage = useMotionValue(0);
  const rotateSpring = useSpring(rotatePage, {
    stiffness: 100,
    damping: 40,
  });

  const handleMouseEnter = () => rotatePage.set(coverRotate);
  const handleMouseLeave = () => {
    if (currentPage === 0) rotatePage.set(0);
  };

  const nextPage = (e) => {
    e.stopPropagation();
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = (e) => {
    e.stopPropagation();
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="relative group" style={{ perspective: "1500px" }}>
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY: rotate,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={cn("relative transform-3d", className)}
      >
        {/* Cover */}
        <motion.div
          style={{
            rotateY: rotateSpring,
            z: 50,
          }}
          className="z-50 shadow-2xl w-full h-full absolute transform-3d origin-left"
        >
          <div
            style={{ transform: "rotateY(180deg)" }}
            className={cn(
              "absolute w-full h-full top-0 left-0 overflow-hidden rounded-r-xs bg-zinc-900 backface-hidden"
            )}
          >
            {backOfCover}
          </div>

          <div
            className={cn(
              "absolute w-full h-full top-0 left-0 overflow-hidden rounded-l-xs backface-hidden"
            )}
          >
            {cover}
          </div>
        </motion.div>

        {/* Pages Content */}
        <div className="absolute z-10 top-[1%] left-0 w-[calc(100%-3%)] h-[calc(100%-2%)] bg-zinc-50 overflow-hidden shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              {pages[currentPage]}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-30">
            {currentPage > 0 && (
              <button 
                onClick={prevPage}
                className="w-8 h-8 rounded-full bg-midnight/10 flex items-center justify-center hover:bg-midnight/20 transition-colors text-midnight"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            {currentPage < pages.length - 1 && (
              <button 
                onClick={nextPage}
                className="w-8 h-8 rounded-full bg-midnight/10 flex items-center justify-center hover:bg-midnight/20 transition-colors text-midnight"
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          {/* Page Number */}
          <div className="absolute bottom-4 left-4 text-[10px] font-bold text-midnight/30 uppercase tracking-widest">
            Page {currentPage + 1} / {pages.length}
          </div>
        </div>

        {/* Book Edge (Pages) */}
        <div
          className="absolute top-[1%] -right-[4%] h-[calc(100%-2%)] w-[29px] transform rotate-y-90  bg-gradient-to-r from-zinc-50 via-zinc-300 to-zinc-50 bg-[length:5%_100%] bg-repeat-x shadow-2xl" />

        {/* Spine */}
        <div
          style={{ background: color }}
          className="absolute top-0 left-0 h-full w-[30px] transform -rotate-y-90 -translate-x-[50%] opacity-90 shadow-2xl" />

        {/* Back Cover */}
        <motion.div
          style={{ z: -50, background: color }}
          className="absolute top-0 left-0 w-full rounded-r-xs h-full opacity-90 shadow-lg " />
      </motion.div>
    </div>
  );
};
