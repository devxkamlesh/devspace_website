'use client';

import React, { useEffect } from 'react';
import { animateStaggered } from '../lib/gsap-helper';
import { gsap } from 'gsap';

interface ContactWrapperProps {
  children: React.ReactNode;
}

export function ContactWrapper({ children }: ContactWrapperProps) {
  useEffect(() => {
    // Initialize GSAP-specific animations for the contact page
    
    // Animate map with reveal animation
    const mapElement = document.querySelector('.map-section');
    if (mapElement) {
      gsap.set(mapElement, { opacity: 0, y: 50 });
      
      gsap.to(mapElement, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.4
      });
    }
    
    // Create staggered animation for FAQ items
    animateStaggered('.faq-section', '.faq-item', {
      y: 20,
      stagger: 0.1,
      delay: 0.2
    });
    
    // Return cleanup function
    return () => {
      // Any cleanup needed for contact page GSAP animations
    };
  }, []);
  
  return (
    <div data-barba="container" data-barba-namespace="contact">
      {children}
    </div>
  );
} 