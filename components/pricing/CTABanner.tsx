'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LinkButton } from '../../components/Button';

interface CTABannerProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink
}) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(bannerRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={bannerRef}
      className="mt-24 rounded-2xl p-10 text-white text-center relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      style={{
        background: "linear-gradient(-45deg, #5046e4, #8547e4, #4387e1, #5c6ac1)",
        backgroundSize: "400% 400%",
      }}
      animate={isInView ? {
        backgroundPosition: ["0% 0%", "100% 100%"],
        transition: {
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }
      } : {}}
    >
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-10"
        style={{ filter: "blur(50px)" }}
        animate={{ 
          x: [0, 30, 0], 
          y: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white opacity-10"
        style={{ filter: "blur(40px)" }}
        animate={{ 
          x: [0, -20, 0], 
          y: [0, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Content container */}
      <div className="relative z-10">
        <motion.h3 
          className="text-2xl md:text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {description}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <LinkButton 
              href={primaryButtonLink} 
              className="bg-white text-primary-600 hover:bg-gray-100 px-8"
            >
              {primaryButtonText}
            </LinkButton>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <LinkButton 
              href={secondaryButtonLink} 
              className="bg-transparent border-2 border-white hover:bg-white/10 px-8"
            >
              {secondaryButtonText}
            </LinkButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}; 