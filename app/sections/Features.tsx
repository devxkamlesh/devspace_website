'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CheckSquare, Calendar, Timer, BarChart2, DollarSign, Code, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Feature data aligned with new positioning
const features = [
  {
    icon: CheckSquare,
    title: "Task Management",
    description: "Create, organize and track your daily, weekly, or sprint-based work with an intuitive task manager designed for developers.",
    color: "blue",
    link: "/features/tasks"
  },
  {
    icon: Calendar,
    title: "Smart Calendar",
    description: "Plan your day with an intelligent calendar that integrates directly with your tasks and focus sessions for seamless productivity.",
    color: "purple",
    link: "/features/calendar"
  },
  {
    icon: Timer,
    title: "Focus Timer",
    description: "Boost concentration with Pomodoro-style deep work sessions and break timers to maximize your productive hours.",
    color: "amber",
    link: "/features/focus"
  },
  {
    icon: BarChart2,
    title: "Productivity Analytics",
    description: "Track your productivity trends, focus patterns, and task completion metrics with beautiful, actionable visualizations.",
    color: "green",
    link: "/features/analytics"
  },
  {
    icon: DollarSign,
    title: "Expense Tracking",
    description: "Stay on top of your budget with built-in expense tracking and analysis, perfect for freelancers and digital nomads.",
    color: "indigo",
    link: "/features/expenses"
  },
  {
    icon: Code,
    title: "Developer-First Experience",
    description: "Enjoy a minimal, fast UI built for coders who value speed and simplicity, with keyboard shortcuts and markdown support.",
    color: "rose",
    link: "/features/developer-experience"
  }
];

// Animated Feature Card component with hover effects
const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  // Define color classes
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100",
    amber: "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100",
    green: "bg-green-50 text-green-600 border-green-200 hover:bg-green-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100",
    rose: "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
  };
  
  const colorClass = colorClasses[feature.color as keyof typeof colorClasses];
  const delay = 0.2 + (index * 0.1);
  
  return (
    <motion.div
      ref={cardRef}
      className={`rounded-2xl border p-6 transition-all duration-300 ${colorClass}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 0.1)" }}
    >
      <motion.div 
        className="mb-4 inline-block rounded-xl p-3"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.1 }}
        whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
      >
        <feature.icon className="h-8 w-8" />
      </motion.div>
      
      <motion.h3 
        className="text-xl font-bold mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
      >
        {feature.title}
      </motion.h3>
      
      <motion.p 
        className="text-gray-700 mb-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      >
        {feature.description}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.4 }}
        whileHover={{ x: 5 }}
      >
        <Link 
          href={feature.link} 
          className="inline-flex items-center text-sm font-medium"
        >
          Learn more
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

// Section header with animated underline
const AnimatedHeader = ({ title, subtitle }: { title: string, subtitle: string }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  // Split title into words for letter-by-letter animation
  const titleWords = title.split(' ');
  
  return (
    <motion.div
      ref={headerRef}
      className="text-center mb-16 py-8 relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute left-1/4 top-0 w-6 h-6 rounded-full bg-blue-400 opacity-70 blur-sm"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { 
          scale: [0, 1.2, 1],
          opacity: [0, 0.7, 0.5],
          y: [0, -20, -10]
        } : {}}
        transition={{ duration: 1.5, delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div 
        className="absolute right-1/4 bottom-1/4 w-8 h-8 rounded-full bg-purple-400 opacity-70 blur-sm"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { 
          scale: [0, 1.4, 1],
          opacity: [0, 0.7, 0.5],
          y: [0, 20, 10]
        } : {}}
        transition={{ duration: 2, delay: 0.4, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div 
        className="absolute right-1/3 top-1/4 w-5 h-5 rounded-full bg-amber-400 opacity-70 blur-sm"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { 
          scale: [0, 1.1, 0.9],
          opacity: [0, 0.6, 0.4],
          x: [0, 15, 5]
        } : {}}
        transition={{ duration: 1.8, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Tagline with bouncing effect */}
      <motion.div
        className="inline-block px-6 py-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-800 rounded-full font-medium text-sm mb-6 backdrop-blur-sm border border-primary-200"
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15, 
          delay: 0.1 
        }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {subtitle}
        </motion.span>
      </motion.div>
      
      {/* Animated title with word-by-word reveal */}
      <div className="overflow-hidden mb-6">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 inline-flex flex-wrap justify-center gap-x-3"
          initial={{ y: 100 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
      </div>
      
      {/* Animated highlight element */}
      <motion.div
        className="w-32 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto"
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: 128, opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />
      
      {/* Description text with fade in animation */}
      <motion.p
        className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        DevSpace brings together all the productivity tools developers, students, and digital creators need to focus, organize, and excel in their work.
      </motion.p>
    </motion.div>
  );
};

// Background pattern with parallax effect
const BackgroundPattern = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute -right-40 -top-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        style={{ y: y2 }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
};

// Tech stack showcase with animated typing effect
const TechStackShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const technologies = [
    { name: "Next.js", color: "bg-black text-white" },
    { name: "Tailwind CSS", color: "bg-sky-500 text-white" },
    { name: "Supabase", color: "bg-emerald-500 text-white" },
    { name: "Framer Motion", color: "bg-purple-500 text-white" },
    { name: "TypeScript", color: "bg-blue-600 text-white" },
    { name: "React", color: "bg-blue-400 text-white" }
  ];
  
  return (
    <motion.div
      ref={containerRef}
      className="mt-20 p-8 rounded-2xl bg-gray-50 border border-gray-100"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-center">Built for Developers, By Developers</h3>
      
      <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-center">
        DevSpace is crafted with a modern tech stack providing a lightning-fast experience
        that respects developer workflows.
      </p>
      
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {technologies.map((tech, index) => (
          <motion.span
            key={tech.name}
            className={`px-4 py-2 rounded-full text-sm font-medium ${tech.color}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
            whileHover={{ 
              scale: 1.05, 
              rotate: [-1, 1, -1, 0],
              transition: { duration: 0.3 } 
            }}
          >
            {tech.name}
          </motion.span>
        ))}
      </div>
      
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link
          href="/tech-stack"
          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
        >
          Learn about our tech stack
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default function Features() {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="features" ref={ref} className="py-24 relative overflow-hidden">
      <BackgroundPattern />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedHeader 
          subtitle="Powerful Productivity Tools" 
          title="Everything You Need in One Dashboard"
        />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
        
        <TechStackShowcase />
      </div>
    </section>
  );
}
