'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram, Mail, ArrowUp, ExternalLink, Code, Heart } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 50 }
    }
  };
  
  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.3,
        type: "spring"
      }
    })
  };
  
  const socialLinks = [
    { icon: Github, href: "https://github.com", color: "#333", hoverColor: "#2d333b", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", color: "#1DA1F2", hoverColor: "#0d8bd9", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", color: "#0A66C2", hoverColor: "#084b8e", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", color: "#E4405F", hoverColor: "#d32546", label: "Instagram" }
  ];

  const productLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Roadmap", href: "#" }
  ];

  const resourceLinks = [
    { name: "Documentation", href: "#" },
    { name: "Tutorials", href: "#" },
    { name: "Blog", href: "#" },
    { name: "API Reference", href: "#" }
  ];

  const companyLinks = [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" }
  ];

  // FooterLink component for consistent styling and animation
  const FooterLink = ({ href, name }) => (
    <motion.li
      variants={childVariants}
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Link 
        href={href} 
        className="text-gray-400 hover:text-primary-400 transition-all duration-300 relative group flex items-center"
      >
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 group-hover:w-full transition-all duration-300" />
        {name}
        {href.startsWith('http') && (
          <ExternalLink size={14} className="ml-1 opacity-70" />
        )}
      </Link>
    </motion.li>
  );

  return (
    <footer 
      className="relative overflow-hidden bg-gray-900 text-white"
      ref={footerRef}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-32 -right-32 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]"></div>
      </div>

      {/* Main footer content */}
      <motion.div 
        className="container mx-auto px-4 pt-20 pb-12 relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8 mb-16">
          {/* Brand column */}
          <motion.div 
            className="col-span-1 md:col-span-4"
            variants={childVariants}
          >
            <motion.div
              className="mb-6 inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-md bg-gradient-to-br from-primary-500 to-primary-700 p-1.5 text-white">
                  <Code size={20} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
                  DevSpace
                </h3>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 mb-6 max-w-sm"
              variants={childVariants}
            >
              Your all-in-one developer environment designed to boost productivity and streamline workflows for developers, students, and digital creators.
            </motion.p>
            
            <motion.div
              className="flex items-center space-x-4 mb-8"
              variants={childVariants}
            >
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={i}
                  variants={socialVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    y: -5,
                    backgroundColor: social.hoverColor,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  style={{ backgroundColor: social.color }}
                  className="p-2 rounded-full text-white shadow-lg transform transition-all duration-300"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
            
            <motion.div
              variants={childVariants}
              className="flex items-center text-gray-400 text-sm"
            >
              <Heart size={14} className="text-secondary-500 mr-2" />
              Made with passion in California
            </motion.div>
          </motion.div>
          
          {/* Links columns */}
          <motion.div className="col-span-1 md:col-span-2" variants={childVariants}>
            <motion.h3 className="font-semibold text-white mb-6 text-lg" variants={childVariants}>
              Product
            </motion.h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <FooterLink key={link.name} href={link.href} name={link.name} />
              ))}
            </ul>
          </motion.div>
          
          <motion.div className="col-span-1 md:col-span-2" variants={childVariants}>
            <motion.h3 className="font-semibold text-white mb-6 text-lg" variants={childVariants}>
              Resources
            </motion.h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <FooterLink key={link.name} href={link.href} name={link.name} />
              ))}
            </ul>
          </motion.div>
          
          <motion.div className="col-span-1 md:col-span-2" variants={childVariants}>
            <motion.h3 className="font-semibold text-white mb-6 text-lg" variants={childVariants}>
              Company
            </motion.h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <FooterLink key={link.name} href={link.href} name={link.name} />
              ))}
            </ul>
          </motion.div>
          
          {/* Newsletter section */}
          <motion.div 
            className="col-span-1 md:col-span-12 lg:col-span-2"
            variants={childVariants}
          >
            <motion.h3 className="font-semibold text-white mb-6 text-lg" variants={childVariants}>
              Stay Updated
            </motion.h3>
            <p className="text-gray-400 mb-4 text-sm">
              Get the latest updates, news and product developments.
            </p>
            <div className="flex flex-col space-y-2">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300" 
                />
              </motion.div>
              <motion.button 
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg shadow-primary-500/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
                <Mail size={16} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Divider with gradient */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
        
        {/* Copyright section */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          variants={childVariants}
        >
          <motion.p 
            className="text-gray-400 text-sm"
            variants={childVariants}
          >
            &copy; {new Date().getFullYear()} DevSpace. All rights reserved.
          </motion.p>
          
          {/* Back to top button */}
          <motion.button
            className="mt-6 md:mt-0 flex items-center text-sm text-primary-400 hover:text-primary-300 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to top 
            <motion.div
              className="ml-2 bg-gray-800 p-1.5 rounded-full"
              whileHover={{ y: -2 }}
              transition={{ repeat: 3, duration: 0.3 }}
            >
              <ArrowUp size={14} className="text-primary-400 group-hover:text-primary-300" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
} 