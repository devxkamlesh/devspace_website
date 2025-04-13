'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionHeaderProps {
  tagline: string;
  title: string;
  description: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ tagline, title, description }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Split the title by line breaks
  const titleLines = title.split('<br>');

  return (
    <motion.div 
      ref={ref}
      className="text-center mb-20"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className="inline-block px-4 py-1.5 bg-gradient-to-r from-primary-100 to-indigo-100 text-primary-800 rounded-full font-medium text-sm mb-4 shadow-sm"
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.span
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -3, 0, 3, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          className="inline-block mr-1"
        >
          ✨
        </motion.span>
        {tagline}
      </motion.div>
      
      <div className="mb-6">
        {titleLines.map((line, i) => (
          <motion.div key={i} variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight inline-block">
              {i === titleLines.length - 1 ? (
                <motion.span
                  className="relative inline-block"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                    {line}
                  </span>
                  <motion.div 
                    className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  />
                </motion.span>
              ) : (
                line
              )}
              {i < titleLines.length - 1 && <br />}
            </h2>
          </motion.div>
        ))}
      </div>
      
      <motion.p 
        className="text-gray-600 text-xl max-w-3xl mx-auto"
        variants={itemVariants}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}; 