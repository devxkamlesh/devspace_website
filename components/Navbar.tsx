'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button, LinkButton } from './Button';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// Import icons directly to ensure consistent rendering
import MenuIcon from 'lucide-react/dist/esm/icons/menu';
import XIcon from 'lucide-react/dist/esm/icons/x';
import ArrowUpIcon from 'lucide-react/dist/esm/icons/arrow-up';
import { fadeUp, slideIn } from '../lib/framer';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  
  // Scroll progress for indicator
  const { scrollYProgress } = useScroll();
  const scrollProgressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Determine active section (simplified version)
      const sections = ['home', 'features', 'testimonials', 'pricing'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };
  
  const mobileNavVariants = {
    closed: { 
      height: 0,
      opacity: 0,
      transition: {
        damping: 20,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      height: 'auto',
      opacity: 1,
      transition: {
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 }
  };

  return (
    <>
      <motion.header 
        ref={navRef}
        className={`fixed w-full backdrop-blur-md z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 shadow-md' : 'bg-white/80 border-b border-gray-100'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Scroll progress indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
          style={{ width: scrollProgressWidth }}
        />
        
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo with hover effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div 
                className="w-8 h-8 rounded-md bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold"
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                D
              </motion.div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">DevSpace</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation with improved hover effects */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Home', href: '#home' },
              { name: 'Features', href: '#features' },
              { name: 'Testimonials', href: '#testimonials' },
              { name: 'Pricing', href: '#pricing' }
            ].map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link 
                  href={item.href} 
                  className={`text-gray-700 hover:text-primary-600 transition-colors relative group ${
                    activeSection === item.name.toLowerCase() ? 'text-primary-600 font-medium' : ''
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Active indicator */}
                  {activeSection === item.name.toLowerCase() && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 rounded-full"
                      layoutId="activeSection"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  
                  {/* Hover indicator */}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Action Buttons with improved animations */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <LinkButton 
                href="https://dashboard.armordivison.in" 
                variant="outline" 
                size="sm"
                className="group overflow-hidden relative"
              >
                <motion.span 
                  className="relative z-10"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Log In
                </motion.span>
                <motion.span 
                  className="absolute inset-0 bg-primary-50 -z-0 transform origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </LinkButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkButton href="https://dashboard.armordivison.in" size="sm">
                <motion.span
                  initial={{ opacity: 1 }}
                  whileHover={{ 
                    opacity: [1, 0.8, 1], 
                    transition: { duration: 1, repeat: Infinity }
                  }}
                >
                  Get Started
                </motion.span>
              </LinkButton>
            </motion.div>
          </div>

          {/* Mobile Menu Button with enhanced animation */}
          <motion.button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XIcon size={24} className="text-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuIcon size={24} className="text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu with enhanced animations */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100"
              variants={mobileNavVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'Features', href: '#features' },
                  { name: 'Testimonials', href: '#testimonials' },
                  { name: 'Pricing', href: '#pricing' }
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="overflow-hidden"
                  >
                    <Link 
                      href={item.href} 
                      className={`flex items-center justify-between text-gray-700 hover:text-primary-600 transition-colors py-3 border-b border-gray-100 ${
                        activeSection === item.name.toLowerCase() ? 'text-primary-600 font-medium' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      {activeSection === item.name.toLowerCase() && (
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-primary-600"
                          layoutId="activeMobileSection"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
                <motion.div 
                  className="flex flex-col space-y-3 pt-2"
                  variants={itemVariants}
                >
                  <LinkButton href="https://dashboard.armordivison.in" variant="outline" size="sm">
                    Log In
                  </LinkButton>
                  <LinkButton href="https://dashboard.armordivison.in" size="sm">
                    Get Started
                  </LinkButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Scroll to top button - appears when scrolled down */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            className="fixed bottom-6 right-6 p-3 rounded-full bg-primary-600 text-white shadow-lg z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUpIcon size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
} 