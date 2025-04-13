'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { FeatureIcon } from './FeatureIcon';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  learnMoreUrl?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color,
  learnMoreUrl = "#"
}) => {
  // Dynamic color classes for text
  const textColor = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    amber: 'text-amber-600',
    green: 'text-green-600', 
    indigo: 'text-indigo-600',
    rose: 'text-rose-600',
    primary: 'text-primary-600',
    secondary: 'text-secondary-600'
  }[color] || 'text-gray-600';

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >      
      <motion.div 
        className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col h-full z-10 relative shadow-sm transition-all duration-300 hover:shadow-md group"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
      >
        <div className="mb-6">
          <FeatureIcon Icon={icon} color={color} />
        </div>
        
        <h3 className={`text-xl font-bold mb-3 ${textColor}`}>
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        <div className="mt-auto">
          <Link href={learnMoreUrl} className={`${textColor} font-medium flex items-center group`}>
            <span className="mr-2">Learn more</span>
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}; 