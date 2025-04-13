'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {features.map((feature, index) => (
        <motion.div 
          key={index}
          variants={itemVariants}
        >
          <FeatureCard
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}; 