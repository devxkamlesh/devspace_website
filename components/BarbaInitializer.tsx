'use client';

import { useEffect, useRef } from 'react';
import { initBarba } from '../lib/barba-transitions';

// Separate the GSAP imports to handle them dynamically
let initGsapAnimations: () => void;

export function BarbaInitializer() {
  const initialized = useRef(false);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || initialized.current) return;

    const initializeAnimations = async () => {
      try {
        // Dynamically import GSAP helper to avoid SSR issues
        const gsapHelper = await import('../lib/gsap-helper');
        initGsapAnimations = gsapHelper.initGsapAnimations;

        // Initialize Barba first (it now imports dependencies dynamically)
        await initBarba();
        
        // Set a small timeout to ensure React has finished initial rendering
        // before initializing GSAP animations
        setTimeout(() => {
          if (initGsapAnimations) {
            initGsapAnimations();
          }
        }, 100);
        
        initialized.current = true;
      } catch (error) {
        console.error('Error initializing animations:', error);
      }
    };

    initializeAnimations();
    
    // Cleanup function to kill any lingering GSAP animations on unmount
    return () => {
      if (typeof window !== 'undefined') {
        // Access GSAP directly from window to avoid import issues during SSR
        const gsapInstance = (window as any).gsap;
        if (gsapInstance) {
          gsapInstance.killTweensOf("*");
        }
      }
    };
  }, []);

  // This component doesn't render anything
  return null;
} 