'use client';

import { Variants } from 'framer-motion';

// Fade up animation
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Hero fade in animation
export const heroFadeIn: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

// Scale animation
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Side slide animation
export const slideIn = (direction: "left" | "right" | "up" | "down"): Variants => {
  return {
    hidden: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
};

// Hover animation for cards
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 }
}; 