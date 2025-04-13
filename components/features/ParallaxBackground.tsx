'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ParallaxBackground: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax motion values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Floating animation variants
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0, -10, 0],
      transition: {
        duration: 10,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      {/* Top right blob */}
      <motion.div 
        className="absolute right-0 bottom-0 -mb-40 -mr-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-primary-50/80 to-secondary-50/80 blur-3xl opacity-60"
        style={{ y: y1, scale: scale1 }}
        initial="initial"
        animate="animate"
        variants={floatingAnimation}
      />
      
      {/* Bottom left blob */}
      <motion.div 
        className="absolute left-0 top-0 -mt-40 -ml-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary-50/80 to-amber-50/80 blur-3xl opacity-60"
        style={{ y: y2, scale: scale2 }}
        initial="initial"
        animate="animate"
        variants={{
          ...floatingAnimation,
          animate: {
            ...floatingAnimation.animate,
            transition: {
              ...floatingAnimation.animate.transition,
              delay: 0.5
            }
          }
        }}
      />
      
      {/* Center decorative element */}
      <motion.div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-green-50/50 to-blue-50/50 blur-3xl opacity-40"
        style={{ y: y3, opacity }}
        initial="initial"
        animate="animate"
        variants={{
          ...floatingAnimation,
          animate: {
            ...floatingAnimation.animate,
            transition: {
              ...floatingAnimation.animate.transition,
              delay: 1
            }
          }
        }}
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
    </div>
  );
}; 