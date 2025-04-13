'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useAnimation, useInView } from 'framer-motion';
import { Button, LinkButton } from '../../components/Button';
import { heroFadeIn, staggerContainer } from '../../lib/framer';
// Import icons directly to ensure consistent rendering
import ArrowRightIcon from 'lucide-react/dist/esm/icons/arrow-right';
import CodeIcon from 'lucide-react/dist/esm/icons/code';
import GithubIcon from 'lucide-react/dist/esm/icons/github';
import GlobeIcon from 'lucide-react/dist/esm/icons/globe';
import TerminalIcon from 'lucide-react/dist/esm/icons/terminal';
import Image from 'next/image';
// Import Simple Icons from react-icons
import { 
  SiStripe, 
  SiFacebook, 
  SiShopify, 
  SiApple, 
  SiNetflix, 
  SiAirbnb, 
  SiSlack, 
  SiAdobe, 
  SiSpotify, 
  SiCoinbase, 
  SiTwitch 
} from 'react-icons/si';
import { CheckSquare, Timer, Calendar } from 'lucide-react';

// Define company logos
const companyLogos = [
  { 
    name: 'Stripe',
    Icon: SiStripe,
    color: '#635BFF',
  },
  { 
    name: 'Meta',
    Icon: SiFacebook,
    color: '#1877F2',
  },
  { 
    name: 'Shopify',
    Icon: SiShopify,
    color: '#7AB55C',
  },
  { 
    name: 'Apple',
    Icon: SiApple,
    color: '#000000',
  },
  { 
    name: 'Netflix',
    Icon: SiNetflix,
    color: '#E50914',
  },
  { 
    name: 'Airbnb',
    Icon: SiAirbnb,
    color: '#FF5A5F',
  },
  { 
    name: 'Slack',
    Icon: SiSlack,
    color: '#4A154B',
  },
  { 
    name: 'Adobe',
    Icon: SiAdobe,
    color: '#FF0000',
  },
  { 
    name: 'Spotify',
    Icon: SiSpotify,
    color: '#1DB954',
  },
  {
    name: 'Coinbase', 
    Icon: SiCoinbase,
    color: '#0052FF',
  },
  {
    name: 'Twitch',
    Icon: SiTwitch,
    color: '#9146FF', 
  }
];

// New BlurredText component for letter-by-letter unblur animation
const BlurredText = ({ 
  text, 
  delay = 0, 
  staggerDelay = 0.08,
  className = "" 
}: { 
  text: string, 
  delay?: number, 
  staggerDelay?: number, 
  className?: string 
}) => {
  const hasGradient = className?.includes('bg-gradient');
  
  // Use deterministic rotation values instead of random ones
  const getRotation = (index: number) => {
    // Create a predictable pattern using the character index
    const rotations = [4, -3, 2, -5, 3, -2, 5, -4, 2, -1];
    return rotations[index % rotations.length];
  };
  
  // Safety check for empty text
  if (!text) return <span className={className}></span>;
  
  return (
    <span className={`inline-flex ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ 
            filter: "blur(8px)",
            opacity: 0.1,
            y: 10,
            rotate: getRotation(i),
            color: hasGradient ? "currentColor" : "rgba(156, 163, 175, 1)"
          }}
          animate={{ 
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            rotate: 0,
            color: hasGradient ? "currentColor" : "rgba(31, 41, 55, 1)"
          }}
          transition={{ 
            duration: 0.7,
            delay: delay + (i * staggerDelay),
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          style={{ 
            display: char === ' ' ? 'inline-block' : 'inline', 
            marginRight: char === ' ' ? '0.3em' : '0',
            textShadow: hasGradient ? '0 0 8px rgba(99, 102, 241, 0.3)' : 'none'
          }}
          whileHover={{
            scale: 1.3,
            y: -6,
            rotate: getRotation(i),
            transition: { 
              type: "spring", 
              stiffness: 500, 
              damping: 10 
            }
          }}
          className="letter-hover"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

// New GradientText component for the animated DevSpace text
const GradientText = ({ text, className = "" }: { text: string, className?: string }) => {
  const [isClient, setIsClient] = useState(false);
  
  // Only run animations on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Safety check for empty text
  if (!text) return <span className={className}></span>;
  
  // Static fallback for SSR
  if (!isClient) {
    return (
      <span className={`${className} bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-primary-600 via-purple-500 via-pink-500 to-secondary-600 animate-gradient-x font-extrabold relative`}>
        {text}
      </span>
    );
  }
  
  return (
    <motion.span
      className={`${className} bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-primary-600 via-purple-500 via-pink-500 to-secondary-600 animate-gradient-x font-extrabold relative`}
      initial={{ filter: "blur(12px)", opacity: 0, y: 15, scale: 0.9 }}
      animate={{ filter: "blur(0px)", opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 1.2, 
        delay: 1.0,
        type: "spring",
        stiffness: 50,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.08, 
        textShadow: "0 0 15px rgba(139, 92, 246, 0.7)" 
      }}
    >
      {text}
      <motion.span 
        className="absolute -z-10 inset-0 bg-gradient-to-r from-primary-600/20 via-purple-500/20 to-secondary-600/20 blur-xl"
        animate={{ 
          opacity: [0.4, 0.8, 0.4],
          scale: [0.92, 1.08, 0.92],
          rotate: [0, 2, 0, -2, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
    </motion.span>
  );
};

// Typing animation component with enhanced reveal effect
const TypedText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const index = useRef(0);
  const startDelay = 1.2; // Start after BlurredText finishes
  
  // Only run animations on the client side
  useEffect(() => {
    setIsClient(true);
    
    // Add a delay before starting the typing animation to let the BlurredText finish
    const initialDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (index.current < text.length) {
          setDisplayText((prev) => prev + text.charAt(index.current));
          index.current += 1;
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
        }
      }, 100);
      
      return () => clearInterval(typingInterval);
    }, startDelay * 1000);
    
    return () => clearTimeout(initialDelay);
  }, [text]);
  
  // Safety check for empty text
  if (!text) return <span></span>;
  
  // Static fallback for SSR
  if (!isClient) {
    return (
      <span className="relative bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent">
        {text}
      </span>
    );
  }
  
  return (
    <motion.span
      initial={{ 
        WebkitTextStroke: "1px rgba(99, 102, 241, 0.2)",
        WebkitTextFillColor: "transparent",
        filter: "blur(4px)"
      }}
      animate={isComplete ? { 
        WebkitTextStroke: "0px rgba(99, 102, 241, 0)",
        WebkitTextFillColor: "transparent", 
        backgroundSize: "100% 100%",
        filter: "blur(0px)"
      } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`relative bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 ${isComplete ? 'text-transparent' : ''}`}
      whileHover={isComplete ? { 
        scale: 1.05,
        textShadow: "0 0 8px rgba(139, 92, 246, 0.3)"
      } : {}}
    >
      {displayText || <span className="opacity-0">{text}</span>}
      {isComplete && (
        <motion.span 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}
    </motion.span>
  );
};

// Feature card component with animation
const FeatureCard = ({ icon, title, description, color, delay }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  color: string,
  delay: number 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px 0px" });
  const [isMounted, setIsMounted] = useState(false);
  
  // Only enable animations after component is mounted on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Define hover animation properties
  const hoverAnimation = {
    y: -8, 
    scale: 1.02,
    boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  };
  
  // Define icon hover animation
  const iconHoverAnimation = {
    scale: 1.1,
    rotate: 5,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };
  
  return (
    <motion.div 
      ref={cardRef}
      className={`bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 relative overflow-hidden`}
      initial={isMounted ? { opacity: 0, y: 40, scale: 0.95 } : undefined}
      animate={isMounted && isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 15,
          delay: delay
        }
      } : undefined}
      whileHover={isMounted ? hoverAnimation : undefined}
    >
      <motion.div 
        className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
        whileHover={isMounted ? iconHoverAnimation : undefined}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      
      {/* Add a subtle gradient overlay on hover */}
      {isMounted && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white opacity-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default function Hero() {
  const logoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });
  
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Random logo pulse effect
    const interval = setInterval(() => {
      const randomLogo = Math.floor(Math.random() * companyLogos.length);
      if (logoRefs.current[randomLogo]) {
        logoRefs.current[randomLogo]?.classList.add('animate-pulse-once');
        setTimeout(() => {
          logoRefs.current[randomLogo]?.classList.remove('animate-pulse-once');
        }, 1000);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={scrollRef} className="pt-16 pb-12 md:pt-24 md:pb-20 overflow-hidden relative">
      {/* Background elements with parallax effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Static background elements for SSR */}
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Animated elements only on client side */}
        {isMounted && (
          <>
            <motion.div 
              className="absolute -right-40 -top-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-0"
              animate={{ 
                opacity: 0.3,
                x: [0, 30, 10, 40, 0], 
                y: [0, -30, -10, -20, 0],
                scale: [1, 1.1, 1.05, 1.15, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                opacity: { duration: 0.5 },
                default: {
                  duration: 15, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            ></motion.div>
            <motion.div 
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-0"
              animate={{ 
                opacity: 0.3,
                x: [0, -20, -30, -10, 0], 
                y: [0, 40, 20, 50, 0],
                scale: [1, 1.15, 1.05, 1.1, 1],
                rotate: [0, -5, 0, 5, 0]
              }}
              transition={{ 
                opacity: { duration: 0.5 },
                default: {
                  duration: 18, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            ></motion.div>
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-0"
              animate={{ 
                opacity: [0.3, 0.4, 0.35, 0.45, 0.3],
                scale: [1, 1.2, 1.1, 1.25, 1]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            ></motion.div>
            
            {/* Animated grid pattern */}
            <motion.div 
              className="absolute inset-0 bg-grid-pattern opacity-0"
              animate={{
                opacity: [0.05, 0.07, 0.05]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto hero-section"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          data-framer-motion
        >
          {/* Animated Eyebrow text */}
          <motion.div 
            variants={heroFadeIn}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 bg-primary-100 text-primary-800 rounded-full font-medium text-sm gsap-hero-item"
            data-framer-motion
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-2"
            >
              ✨
            </motion.span>
            All-in-One Productivity Dashboard
          </motion.div>
          
          {/* Main headline with typing effect */}
          <motion.h1 
            variants={heroFadeIn}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight hero-heading gsap-hero-item"
            data-framer-motion
          >
            <BlurredText text="Develop Faster With " delay={0.3} />
            <span className="gradient-text relative inline-block">
              <GradientText text="DevSpace" />
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path 
                  d="M2 10C50.5 4 148.5 2.5 298 2.5" 
                  stroke="url(#paint0_linear)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.0, delay: 2.0, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="paint0_linear" x1="2" y1="6.23651" x2="298" y2="6.23651" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1"/>
                    <stop offset="1" stopColor="#8B5CF6"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>
          
          {/* Subheadline with sequenced animation */}
          <motion.p 
            variants={heroFadeIn}
            className="text-lg md:text-xl text-gray-600 mb-10 mx-auto gsap-hero-item"
            data-framer-motion
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            Centralize your workflow with task management, smart calendar, focus timer,
            expenses, and analytics — built for developers, students, and digital creators.
          </motion.p>
          
          {/* CTA buttons with hover effects */}
          <motion.div
            variants={heroFadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 gsap-hero-item"
            data-framer-motion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <LinkButton href="https://dashboard.armordivison.in" size="lg" className="group relative overflow-hidden">
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 3, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.span className="flex items-center relative z-10">
                Get Started Free
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.span>
              </motion.span>
            </LinkButton>
            <LinkButton href="https://github.com/devspace" size="lg" variant="outline" className="group">
              <motion.span
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="mr-2"
              >
                <GithubIcon className="h-4 w-4" />
              </motion.span>
              <motion.span 
                initial={{ opacity: 1 }}
                whileHover={{ 
                  color: "#6366f1",
                  transition: { duration: 0.2 }
                }}
              >
                View on GitHub
              </motion.span>
            </LinkButton>
          </motion.div>
          
          {/* Demo video/screenshot with floating effect */}
          <motion.div 
            variants={heroFadeIn}
            className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100 group max-w-3xl mx-auto"
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, type: "spring", damping: 20 }}
            whileHover={{ 
              y: -8, 
              scale: 1.02, 
              transition: { duration: 0.3, type: "spring", stiffness: 300 } 
            }}
          >
            <motion.div 
              className="bg-gradient-to-r from-gray-800 to-gray-900 py-1.5 px-3 flex items-center space-x-2"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="flex space-x-2">
                <motion.div 
                  className="w-2.5 h-2.5 bg-red-500 rounded-full"
                  whileHover={{ scale: 1.4 }}
                  transition={{ type: "spring", stiffness: 500 }}
                ></motion.div>
                <motion.div 
                  className="w-2.5 h-2.5 bg-yellow-500 rounded-full"
                  whileHover={{ scale: 1.4 }}
                  transition={{ type: "spring", stiffness: 500 }}
                ></motion.div>
                <motion.div 
                  className="w-2.5 h-2.5 bg-green-500 rounded-full"
                  whileHover={{ scale: 1.4 }}
                  transition={{ type: "spring", stiffness: 500 }}
                ></motion.div>
              </div>
              <div className="text-gray-400 text-xs flex-1 text-center">DevSpace</div>
            </motion.div>
            <div className="relative">
              <motion.img 
                src="/editor-screenshot.png" 
                alt="DevSpace Editor" 
                className="w-full"
                style={{ maxHeight: "400px", objectFit: "cover" }}
                initial={{ scale: 1.05, opacity: 0.8, filter: "brightness(0.9)" }}
                animate={{ scale: 1, opacity: 1, filter: "brightness(1)" }}
                transition={{ duration: 0.7 }}
                whileHover={{ scale: 1.03, filter: "brightness(1.05)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <LinkButton 
                  href="https://dashboard.armordivison.in"
                  className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  size="default"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Watch Demo
                  </motion.span>
                </LinkButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Tech Partners with enhanced animations */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div 
            className="text-gray-500 text-sm uppercase tracking-wider mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Trusted by developers from
            </motion.span>
          </motion.div>
          
          {/* Logos marquee container with improved interaction */}
          <div className="relative w-full overflow-hidden py-6 group">
            {/* First set of logos */}
            <div className="flex animate-marquee group-hover:pause-animation whitespace-nowrap">
              {companyLogos.map((company, index) => (
                <div 
                  key={`logo-1-${index}`}
                  className="flex items-center justify-center mx-8"
                >
                  <div className="h-10 w-auto relative flex items-center justify-center">
                    <motion.div 
                      className="bg-white rounded-md p-3 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-110 relative"
                      ref={el => { logoRefs.current[index] = el; }}
                      whileHover={{ 
                        scale: 1.2,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
                      }}
                    >
                      <company.Icon size={24} color={company.color} />
                      <motion.div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10"
                        whileHover={{ opacity: 1 }}
                      >
                        {company.name}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Duplicate set of logos for seamless scrolling */}
            <div className="flex animate-marquee2 group-hover:pause-animation whitespace-nowrap absolute top-6">
              {companyLogos.map((company, index) => (
                <div 
                  key={`logo-2-${index}`}
                  className="flex items-center justify-center mx-8"
                >
                  <div className="h-10 w-auto relative flex items-center justify-center">
                    <motion.div 
                      className="bg-white rounded-md p-3 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-110 relative"
                      whileHover={{ 
                        scale: 1.2,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
                      }}
                    >
                      <company.Icon size={24} color={company.color} />
                      <motion.div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10"
                        whileHover={{ opacity: 1 }}
                      >
                        {company.name}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Feature Highlights with staggered animations */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            },
            hidden: {}
          }}
        >
          <FeatureCard 
            icon={<CheckSquare className="text-primary-600" />}
            title="Task Management"
            description="Create, organize, and track your tasks with an intuitive interface designed for maximum productivity."
            color="bg-primary-100"
            delay={0.1}
          />
          
          <FeatureCard 
            icon={<Timer className="text-secondary-600" />}
            title="Focus Timer"
            description="Boost concentration with Pomodoro-style deep work sessions to maximize your productive hours."
            color="bg-secondary-100"
            delay={0.3}
          />
          
          <FeatureCard 
            icon={<Calendar className="text-gray-600" />}
            title="Smart Calendar"
            description="Plan your day with an intelligent calendar that integrates with your tasks and focus sessions."
            color="bg-gray-100"
            delay={0.5}
          />
        </motion.div>

        {/* Replace the tech stack section with code-formatted version */}
        <motion.div 
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-800">
            {/* Code editor header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="text-gray-400 text-xs">techstack.js</div>
              <div className="w-4"></div> {/* Empty div for flex justification */}
            </div>
            
            {/* Code content */}
            <div className="p-5 text-left font-mono text-sm overflow-x-auto">
              <div className="text-blue-400">// Built for Developers, By Developers</div>
              <div className="mt-3">
                <span className="text-purple-400">const</span> <span className="text-green-400">devSpace</span> <span className="text-white">=</span> <span className="text-yellow-300">{'{'}</span>
              </div>
              <div className="ml-6">
                <span className="text-blue-300">frontend</span><span className="text-white">:</span> <span className="text-orange-300">[</span>
                <span className="text-green-300">'Next.js'</span><span className="text-orange-300">,</span> <span className="text-green-300">'Tailwind CSS'</span><span className="text-orange-300">,</span> <span className="text-green-300">'Framer Motion'</span>
                <span className="text-orange-300">]</span><span className="text-white">,</span>
              </div>
              <div className="ml-6">
                <span className="text-blue-300">backend</span><span className="text-white">:</span> <span className="text-orange-300">[</span>
                <span className="text-green-300">'Supabase'</span><span className="text-orange-300">,</span> <span className="text-green-300">'Edge Functions'</span>
                <span className="text-orange-300">]</span><span className="text-white">,</span>
              </div>
              <div className="ml-6">
                <span className="text-blue-300">performance</span><span className="text-white">:</span> <span className="text-green-300">'lightning-fast'</span><span className="text-white">,</span>
              </div>
              <div className="ml-6">
                <span className="text-blue-300">devExperience</span><span className="text-white">:</span> <span className="text-green-300">'respects developer workflows'</span>
              </div>
              <div><span className="text-yellow-300">{'}'}</span><span className="text-white">;</span></div>
              
              <div className="mt-3 text-gray-400">
                <span className="text-purple-400">export default</span> devSpace;
              </div>
            </div>
            
            {/* Code footer with link */}
            <div className="bg-gray-800 p-3 text-center border-t border-gray-700">
              <a 
                href="/tech-stack" 
                className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors text-sm"
              >
                <CodeIcon className="mr-1 h-4 w-4" />
                <span>View full tech stack documentation</span>
                <svg className="ml-1 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
