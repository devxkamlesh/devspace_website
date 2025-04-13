'use client';

import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { hoverScale } from '../lib/framer';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

export function Card({ 
  children, 
  className, 
  animated = false
}: CardProps) {
  const baseClasses = "bg-white rounded-xl shadow-lg p-6 transition duration-300";
  
  if (animated) {
    return (
      <motion.div
        className={cn(baseClasses, className)}
        whileHover={hoverScale}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={cn(baseClasses, className)}>
      {children}
    </div>
  );
} 