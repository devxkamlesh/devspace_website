'use client';

import React, { useEffect } from 'react';
import { createScrollAnimation, animateStaggered } from '../lib/gsap-helper';

interface HomeWrapperProps {
  children: React.ReactNode;
}

export function HomeWrapper({ children }: HomeWrapperProps) {
  useEffect(() => {
    // Initialize any specific GSAP animations for the home page
    // that should happen after component mount
    
    // Add scroll animations for specific elements
    createScrollAnimation('.hero-heading', { 
      y: 40,
      delay: 0.1
    });
    
    // Create staggered animations for groups of elements
    animateStaggered('.features-grid', '.feature-card', {
      y: 30,
      stagger: 0.15,
      delay: 0.1
    });
    
    // Return cleanup function
    return () => {
      // Any cleanup needed for home page GSAP animations
    };
  }, []);

  return (
    <div data-barba="container" data-barba-namespace="home">
      {children}
    </div>
  );
} 