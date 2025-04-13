'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureIconProps {
  Icon: LucideIcon;
  color: string;
  isActive?: boolean;
}

export const FeatureIcon: React.FC<FeatureIconProps> = ({ Icon, color, isActive = false }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600'
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-600'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600'
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600'
    },
    rose: {
      bg: 'bg-rose-100',
      text: 'text-rose-600'
    },
    primary: {
      bg: 'bg-primary-100',
      text: 'text-primary-600'
    },
    secondary: {
      bg: 'bg-secondary-100',
      text: 'text-secondary-600'
    }
  };

  const { bg, text } = colorClasses[color as keyof typeof colorClasses] || 
    colorClasses.primary;

  return (
    <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center`}>
      <Icon className={`${text} w-8 h-8`} strokeWidth={1.5} />
    </div>
  );
}; 