'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, User, Building, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const testimonials = [
  {
    quote: "DevSpace transformed the way our engineering team collaborates. The AI-powered code suggestions have increased our productivity by at least 40%, and the integrated workflows make onboarding new developers incredibly smooth.",
    author: "Sarah Johnson",
    role: "VP of Engineering",
    company: "TechGrowth Inc.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    logo: "https://ui-avatars.com/api/?name=TG&color=fff&background=5046e4&bold=true",
    color: "blue"
  },
  {
    quote: "After switching our entire engineering organization to DevSpace, our release cycles shortened dramatically. The real-time collaboration alone paid for itself within the first month, not to mention the security features that helped us pass SOC2 compliance.",
    author: "Michael Chen",
    role: "CTO",
    company: "CodeWave Solutions",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    logo: "https://ui-avatars.com/api/?name=CW&color=fff&background=0ea5e9&bold=true",
    color: "primary"
  },
  {
    quote: "As a freelance developer juggling multiple client projects, DevSpace's context-switching capabilities are simply unmatched. I can instantly jump between projects with all my preferences intact, and the AI suggestions adapt to each codebase's style.",
    author: "Alex Rodriguez",
    role: "Independent Consultant",
    company: "AR Development",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    logo: "https://ui-avatars.com/api/?name=AR&color=fff&background=16a34a&bold=true",
    color: "green"
  },
  {
    quote: "Our distributed team spans 7 time zones, and DevSpace has been the glue that holds our development process together. The asynchronous collaboration features and detailed code history have eliminated the communication barriers we used to face.",
    author: "Emma Torres",
    role: "Lead Developer",
    company: "GlobalTech Partners",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
    logo: "https://ui-avatars.com/api/?name=GP&color=fff&background=dc2626&bold=true",
    color: "secondary"
  }
];

// Modern Testimonial Card Component with 3D effects
const TestimonialCard = ({ testimonial, direction, isActive }) => {
  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-indigo-600',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      badge: 'bg-blue-500'
    },
    primary: {
      gradient: 'from-primary-500 to-primary-700',
      light: 'bg-primary-50',
      border: 'border-primary-200',
      text: 'text-primary-600',
      badge: 'bg-primary-500'
    },
    green: {
      gradient: 'from-green-500 to-emerald-600',
      light: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      badge: 'bg-green-500'
    },
    secondary: {
      gradient: 'from-secondary-500 to-secondary-700',
      light: 'bg-secondary-50',
      border: 'border-secondary-200',
      text: 'text-secondary-600',
      badge: 'bg-secondary-500'
    }
  };

  const { gradient, light, border, text, badge } = colorClasses[testimonial.color] || colorClasses.primary;

  // Animated variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      x: direction === 'right' ? 60 : -60,
      rotateY: direction === 'right' ? -5 : 5
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      rotateY: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      x: direction === 'right' ? -60 : 60,
      rotateY: direction === 'right' ? 5 : -5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-full w-full perspective-1000"
    >
      <div className="group bg-white rounded-2xl shadow-lg h-full w-full flex flex-col overflow-hidden transform-gpu transition-all duration-300">
        {/* Card header with gradient */}
        <div className={`bg-gradient-to-r ${gradient} p-6 relative`}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="absolute -bottom-10 right-6 w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden"
          >
            <img 
              src={testimonial.avatar} 
              alt={testimonial.author}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative z-10"
          >
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg inline-flex mb-3">
              <img 
                src={testimonial.logo}
                alt={testimonial.company}
                className="w-8 h-8 rounded"
              />
            </div>
            
            <div className="flex text-white mb-2">
              {Array(testimonial.rating).fill(null).map((_, i) => (
                <Star key={i} size={18} fill="white" stroke="none" className="mr-1" />
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Card body */}
        <div className="flex-1 p-6 pt-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 0.3 }}
            className={`${text} absolute top-[5.5rem] left-6`}
          >
            <Quote size={60} strokeWidth={1} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <p className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
              {testimonial.quote}
            </p>
            
            <div className="flex items-center pt-4 border-t border-gray-100">
              <div>
                <p className="font-bold text-gray-900">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}, {testimonial.company}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Animated metric counter
const CountUp = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    let startValue = 0;
    let endValue = parseInt(value.replace(/[^0-9]/g, ''));
    const hasPlus = value.includes('+');
    const hasPercentage = value.includes('%');
    const hasX = value.includes('x');
    
    // Handle special formats like "3.5x"
    if (hasX) {
      endValue = parseFloat(value.replace('x', '')) * 10;
      startValue = 0;
    }
    
    const duration = 2000;
    const counter = setInterval(() => {
      startValue += 1;
      
      if (hasX) {
        setCount(parseFloat((startValue / 10).toFixed(1)));
      } else {
        setCount(startValue);
      }
      
      if (startValue >= endValue) {
        clearInterval(counter);
      }
    }, duration / endValue);
    
    return () => clearInterval(counter);
  }, [isInView, value]);
  
  // Format the display value based on the original format
  const displayValue = () => {
    if (value.includes('x')) {
      return `${count}x`;
    } else if (value.includes('%')) {
      return `${count}%`;
    } else if (value.includes('M+')) {
      return `${count}M+`;
    } else if (value.includes('+')) {
      return `${count}+`;
    } else if (value.includes('min')) {
      return `${count}min`;
    }
    return count;
  };
  
  return <span ref={ref}>{isInView ? displayValue() : value}</span>;
};

// Enhanced Metrics component for displaying statistics
const Metrics = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [10, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);
  
  const metrics = [
    { value: "30+", label: "Integrations", icon: "🔌", color: "bg-blue-500 text-white" },
    { value: "96%", label: "Satisfaction Rate", icon: "👍", color: "bg-green-500 text-white" },
    { value: "5.2M+", label: "Lines of Code Improved", icon: "💻", color: "bg-indigo-500 text-white" }
  ];
  
  return (
    <motion.div 
      ref={containerRef}
      style={{ rotateX, opacity }}
      className="mt-32 perspective-1000"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold mb-4">Trusted by thousands of developers</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See how DevSpace is transforming developer workflows with real metrics from our customers
        </p>
      </motion.div>
      
      {/* Primary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className={`rounded-xl p-8 text-center relative overflow-hidden group hover:scale-105 transition-transform duration-300 ${metric.color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            <motion.div 
              className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 mix-blend-overlay"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            />
            
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 shadow-inner text-2xl">
              {metric.icon}
            </div>
            
            <h3 className="text-5xl font-bold mb-3 tracking-tight">
              <CountUp value={metric.value} />
            </h3>
            
            <p className="text-white/80 text-lg font-medium">{metric.label}</p>
          </motion.div>
        ))}
      </div>
      
      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
        className="text-center mt-16"
      >
        <Link 
          href="/case-studies" 
          className="inline-flex items-center text-primary-600 font-medium text-lg hover:text-primary-700 transition-colors"
        >
          View our case studies
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

// Navigation dot with animation
const NavDot = ({ active, onClick, index }) => (
  <motion.button
    onClick={onClick}
    className={`relative h-3 rounded-full transition-all duration-300 ${
      active ? 'w-10 bg-primary-500' : 'w-3 bg-gray-300'
    }`}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    aria-label={`Go to testimonial ${index + 1}`}
  >
    {active && (
      <motion.div 
        className="absolute inset-0 rounded-full bg-primary-400 opacity-50"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity
        }}
      />
    )}
  </motion.button>
);

// Modern background pattern
const BackgroundPattern = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.2]);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div 
        className="absolute -right-40 top-40 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-blue-100/40 to-primary-100/40 mix-blend-multiply filter blur-3xl"
        style={{ y: y1, opacity }}
      />
      <motion.div 
        className="absolute -left-40 top-1/3 w-[25rem] h-[25rem] rounded-full bg-gradient-to-br from-green-100/30 to-secondary-100/30 mix-blend-multiply filter blur-3xl"
        style={{ y: y2, opacity }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-20 [background-size:20px_20px] pointer-events-none" />
    </div>
  );
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [direction, setDirection] = useState('right');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (!autoplay || !isInView) return;
    
    const interval = setInterval(() => {
      setDirection('right');
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [autoplay, isInView]);
  
  const next = () => {
    setAutoplay(false);
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prev = () => {
    setAutoplay(false);
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToTestimonial = (index) => {
    setAutoplay(false);
    setDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      <BackgroundPattern />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div 
            className="inline-block px-5 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-800 rounded-full font-medium text-sm mb-6 border border-primary-100 shadow-sm"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <motion.span 
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 3, duration: 1 }}
              className="inline-block mr-2"
            >
              💬
            </motion.span>
            Trusted by Developers Worldwide
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            What Developers 
            <span className="relative ml-3">
              <span className="relative z-10 text-primary-600">Love</span>
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-3 bg-primary-100 rounded-full -z-10"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4, delay: 0.7 }}
              />
            </span> 
            <span className="block mt-2">About DevSpace</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Thousands of developers and teams have transformed their 
            workflow with our intelligent development environment.
          </motion.p>
        </motion.div>
        
        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto relative">
          <div className="relative h-[480px] md:h-[400px] mb-16">
            <AnimatePresence mode="wait">
              <TestimonialCard 
                key={activeIndex} 
                testimonial={testimonials[activeIndex]}
                direction={direction}
                isActive={true}
              />
            </AnimatePresence>
            
            {/* Enhanced navigation controls */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-20">
              <motion.button 
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-colors border border-gray-100"
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              
              <div className="flex gap-2 items-center py-2">
                {testimonials.map((_, i) => (
                  <NavDot 
                    key={i} 
                    active={i === activeIndex} 
                    onClick={() => goToTestimonial(i)} 
                    index={i}
                  />
                ))}
              </div>
              
              <motion.button 
                onClick={next}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-colors border border-gray-100"
                whileHover={{ scale: 1.1, x: 3 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
          
          {/* Enhanced metrics section */}
          <Metrics />
        </div>
      </div>
    </section>
  );
}
