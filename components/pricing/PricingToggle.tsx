'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PricingToggleProps {
  annual: boolean;
  setAnnual: (value: boolean) => void;
}

export const PricingToggle: React.FC<PricingToggleProps> = ({ annual, setAnnual }) => {
  return (
    <motion.div 
      className="flex justify-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-100 p-1.5 rounded-xl inline-flex items-center shadow-inner">
        <motion.button
          onClick={() => setAnnual(false)}
          className={`px-5 py-2.5 rounded-lg transition-all flex items-center relative ${
            !annual ? 'text-gray-900 font-medium z-10' : 'text-gray-500'
          }`}
          whileHover={!annual ? {} : { scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">Monthly</span>
          {!annual && (
            <motion.div 
              className="absolute inset-0 bg-white rounded-lg shadow-md"
              layoutId="pricingToggleBackground"
              initial={false}
              transition={{ type: 'spring', duration: 0.6, bounce: 0.15 }}
            />
          )}
        </motion.button>
        
        <motion.button
          onClick={() => setAnnual(true)}
          className={`px-5 py-2.5 rounded-lg transition-all flex items-center justify-center space-x-2 relative ${
            annual ? 'text-gray-900 font-medium z-10' : 'text-gray-500'
          }`}
          whileHover={annual ? {} : { scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">Annual</span>
          
          <motion.div 
            className="relative z-10 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center"
            animate={{ 
              scale: annual ? [1, 1.15, 1] : 1,
            }}
            transition={{ duration: 0.5, times: [0, 0.5, 1], repeat: annual ? 1 : 0 }}
          >
            <motion.span
              animate={{ rotate: annual ? [0, -5, 5, -5, 0] : 0 }}  
              transition={{ duration: 0.5, delay: 0.5, repeat: annual ? 0 : 0 }}
            >
              Save 20%
            </motion.span>
          </motion.div>
          
          {annual && (
            <motion.div 
              className="absolute inset-0 bg-white rounded-lg shadow-md"
              layoutId="pricingToggleBackground"
              initial={false}
              transition={{ type: 'spring', duration: 0.6, bounce: 0.15 }}
            />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}; 