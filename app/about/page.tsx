'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Github, Twitter, Linkedin, Book, Users, Lightbulb, ChevronRight } from 'lucide-react';
import { AboutWrapper } from '../../components/AboutWrapper';
import Image from 'next/image';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Enhanced animation variants
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5
    }
  }
};

// Team members data
const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'Founder & CEO',
    bio: 'Former software engineer at Google with over 15 years of experience in developer tools.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Sarah Chen',
    role: 'CTO',
    bio: 'PhD in Computer Science with expertise in AI and developer productivity optimization.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Michael Thomas',
    role: 'Head of Product',
    bio: 'User experience specialist with a passion for creating intuitive developer tools.',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Emily Rodriguez',
    role: 'Lead Engineer',
    bio: 'Full-stack developer with experience building scalable cloud development environments.',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  }
];

export default function AboutPage() {
  // Refs for scroll-triggered animations
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const ctaRef = useRef(null);
  
  // InView states
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true });
  
  // Parallax effect for hero section
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <AboutWrapper>
      <main className="pt-32 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Hero section with parallax */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-20 relative"
            style={{ y: heroY }}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            data-framer-motion
          >
            {/* Background design elements */}
            <motion.div 
              className="absolute -z-10 top-0 right-0 w-64 h-64 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full opacity-20 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1], 
                rotate: [0, 15, 0],
                opacity: [0.2, 0.3, 0.2] 
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -z-10 -bottom-20 -left-20 w-72 h-72 bg-gradient-to-r from-secondary-100 to-secondary-200 rounded-full opacity-20 blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1], 
                rotate: [0, -15, 0],
                opacity: [0.2, 0.25, 0.2] 
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link 
                href="/" 
                className="inline-flex items-center mb-8 text-gray-600 hover:text-primary-600 transition-colors px-4 py-2 border border-gray-200 rounded-full hover:border-primary-300 hover:bg-primary-50"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to home
              </Link>
            </motion.div>
            
            <motion.h1 
              className="text-5xl font-bold mb-6 story-title bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600"
              style={{ scale: titleScale, opacity: titleOpacity }}
            >
              About DevSpace
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              We're on a mission to revolutionize the developer experience with tools that make coding more productive, collaborative, and enjoyable.
            </motion.p>
          </motion.div>
          
          {/* Mission section with animated background */}
          <motion.div 
            className="relative bg-gradient-to-r from-primary-50 to-secondary-50 p-12 rounded-2xl mb-24 overflow-hidden"
            ref={storyRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={storyInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div 
                className="absolute -right-40 -top-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                animate={{ 
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <motion.div 
                className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                animate={{ 
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
            
            <div className="relative z-10">
              <motion.h2 
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Our Story
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                  variants={slideInLeft}
                  initial="hidden"
                  animate={storyInView ? "visible" : "hidden"}
                >
                  <p className="mb-4">
                    DevSpace was founded in 2022 by a team of experienced developers who were frustrated with the fragmented
                    nature of modern development environments. We believed there had to be a better way to code.
                  </p>
                  <p>
                    Our team set out to build a comprehensive platform that combines the best aspects of IDEs,
                    collaboration tools, and AI assistance in one seamless environment.
                  </p>
                </motion.div>
                <motion.div
                  variants={slideInRight}
                  initial="hidden"
                  animate={storyInView ? "visible" : "hidden"}
                >
                  <p className="mb-4">
                    What started as a small project has grown into a platform used by thousands of developers and teams
                    around the world. Our commitment to developer experience guides everything we do.
                  </p>
                  <p>
                    Today, we're backed by leading investors and are growing our team to bring even more innovative
                    features to our platform.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Stats section - new section */}
          <motion.div 
            className="mb-24 py-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "5K+", label: "Active Users", color: "from-primary-500 to-primary-600" },
                { number: "100+", label: "Team Workspaces", color: "from-secondary-500 to-secondary-600" },
                { number: "99.9%", label: "Uptime", color: "from-green-500 to-teal-600" },
                { number: "24/7", label: "Support", color: "from-blue-500 to-indigo-600" }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <motion.h3 
                    className={`text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Values section with improved animations */}
          <motion.div 
            className="mb-24"
            ref={valuesRef}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            data-framer-motion
          >
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center"
              variants={fadeIn}
            >
              Our Values
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 value-card"
                variants={fadeIn}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
                data-framer-motion
              >
                <motion.div 
                  className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <Book size={24} className="text-primary-600" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">Developer First</h3>
                <p className="text-gray-600">
                  We build tools with developers at the center. Our platform is designed to adapt to your workflow, not the other way around.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 value-card"
                variants={fadeIn}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
                data-framer-motion
              >
                <motion.div 
                  className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-6"
                  whileHover={{ rotate: -5, scale: 1.1 }}
                >
                  <Users size={24} className="text-secondary-600" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">Open Collaboration</h3>
                <p className="text-gray-600">
                  We believe in the power of teamwork. Our tools enable seamless collaboration without getting in the way of your creative flow.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 value-card"
                variants={fadeIn}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
                data-framer-motion
              >
                <motion.div 
                  className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <Lightbulb size={24} className="text-gray-600" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">Continuous Innovation</h3>
                <p className="text-gray-600">
                  Technology doesn't stand still, and neither do we. We're constantly improving our platform based on user feedback and emerging trends.
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Team section with enhanced hover effects */}
          <div ref={teamRef} className="mb-24">
            <motion.h2 
              className="text-3xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Meet Our Team
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 text-center max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={teamInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our diverse team brings together expertise from companies like Google, Microsoft, and Amazon to build the best developer tools.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={teamInView ? "visible" : "hidden"}
            >
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.name}
                  className="bg-white rounded-xl overflow-hidden shadow-md group"
                  variants={scaleUp}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="relative overflow-hidden h-56">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      width={300}
                      height={300}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                  
                  <div className="p-6 relative">
                    <motion.div
                      className="absolute -top-8 w-full left-0 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      {[
                        { Icon: Twitter, href: member.social.twitter, color: "#1DA1F2" },
                        { Icon: Linkedin, href: member.social.linkedin, color: "#0A66C2" },
                        { Icon: Github, href: member.social.github, color: "#333" }
                      ].map((social, i) => (
                        <motion.a 
                          key={i}
                          href={social.href}
                          className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                          whileHover={{ y: -3, scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.Icon size={18} style={{ color: social.color }} />
                        </motion.a>
                      ))}
                    </motion.div>
                    
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-primary-600 mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* CTA section with enhanced animations */}
          <motion.div 
            ref={ctaRef}
            className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7 }}
          >
            {/* Animated background elements */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-full opacity-10"
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: "100% 100%" }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            />
            
            <div className="relative z-10">
              <motion.h2 
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Join Our Team
              </motion.h2>
              
              <motion.p 
                className="max-w-2xl mx-auto mb-8 text-gray-300"
                initial={{ opacity: 0 }}
                animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                We're always looking for talented individuals to join our mission. Check out our open positions
                and become part of building the future of developer tools.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contact" 
                  className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  View Open Positions
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ChevronRight size={18} className="ml-2" />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </AboutWrapper>
  );
} 