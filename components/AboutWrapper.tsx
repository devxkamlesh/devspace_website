'use client';

import React, { useEffect } from 'react';
import { createScrollAnimation, animateText } from '../lib/gsap-helper';

interface AboutWrapperProps {
  children: React.ReactNode;
}

export function AboutWrapper({ children }: AboutWrapperProps) {
  useEffect(() => {
    // Initialize GSAP-specific animations for the about page
    
    // Animate the story section title with character animation
    animateText('.story-title', { 
      speed: 0.02,
      delay: 0.3
    });
    
    // Animate the values section with scroll-triggered animations
    createScrollAnimation('.value-card', { 
      y: 30,
      stagger: 0.1
    });
    
    // Return cleanup function
    return () => {
      // Any cleanup needed for about page GSAP animations
    };
  }, []);

  return (
    <div data-barba="container" data-barba-namespace="about" className="story-section">
      {children}
    </div>
  );
} 