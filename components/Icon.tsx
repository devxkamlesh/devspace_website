'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface IconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
  color?: string;
}

export function Icon({ 
  icon: LucideIcon, 
  className, 
  size = 24, 
  color,
  ...props 
}: IconProps) {
  return (
    <LucideIcon
      size={size}
      className={cn('', className)}
      color={color}
      {...props}
    />
  );
} 