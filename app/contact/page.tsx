'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { ContactWrapper } from '../../components/ContactWrapper';

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

// Office locations data
const offices = [
  {
    city: 'San Francisco',
    address: '123 Market Street, Suite 456, San Francisco, CA 94105',
    phone: '+1 (415) 555-1234',
    email: 'sf@devspace.com'
  },
  {
    city: 'New York',
    address: '789 Broadway, 10th Floor, New York, NY 10003',
    phone: '+1 (212) 555-5678',
    email: 'nyc@devspace.com'
  },
  {
    city: 'London',
    address: '45 Tech Square, Shoreditch, London EC2A 4XY, UK',
    phone: '+44 20 5555 9876',
    email: 'london@devspace.com'
  }
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
    
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1500);
    }
  };

  return (
    <ContactWrapper>
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero section */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Link 
              href="/" 
              className="inline-flex items-center mb-8 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to home
            </Link>
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Have questions about DevSpace? We'd love to hear from you.
            </p>
          </motion.div>
          
          {/* Contact information and form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {/* Contact info and office locations */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-gray-50 p-8 rounded-xl mb-8">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-primary-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email Us</h3>
                      <p className="text-gray-600">info@devspace.com</p>
                      <p className="text-gray-500 text-sm">For general inquiries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-primary-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Call Us</h3>
                      <p className="text-gray-600">+1 (800) 555-7890</p>
                      <p className="text-gray-500 text-sm">Mon-Fri from 9am to 6pm ET</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Office Locations</h3>
                
                <motion.div 
                  className="space-y-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {offices.map((office, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeIn}
                      className="flex items-start"
                    >
                      <MapPin className="w-5 h-5 text-secondary-600 mt-1 mr-3" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{office.city}</h4>
                        <p className="text-gray-600 text-sm mb-1">{office.address}</p>
                        <p className="text-gray-600 text-sm">{office.phone}</p>
                        <p className="text-gray-600 text-sm">{office.email}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
            
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white p-8 rounded-xl shadow-lg relative"
            >
              {/* Success message overlay */}
              {isSubmitted && (
                <motion.div 
                  className="absolute inset-0 bg-white bg-opacity-95 rounded-xl flex flex-col items-center justify-center p-8 z-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle size={64} className="text-green-500 mb-6" />
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-600 text-center mb-6">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
              
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition appearance-none bg-white ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a topic</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing Question">Billing Question</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Career">Career Information</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
          
          {/* Map section */}
          <motion.div 
            className="rounded-xl overflow-hidden shadow-lg mb-24 h-96 map-section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            data-framer-motion
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0487361832908!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858090347f15d1%3A0xf717a71d7e3cc4c!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1655387978594!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
          
          {/* FAQ section */}
          <motion.div 
            className="max-w-3xl mx-auto mb-24 faq-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            data-framer-motion
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md faq-item"
                variants={fadeIn}
                data-framer-motion
              >
                <h3 className="text-xl font-bold mb-3">What support options are available?</h3>
                <p className="text-gray-600">
                  We offer email support for all customers, with priority phone support available for Pro and Enterprise plans.
                  Our help center is also available 24/7 with extensive documentation and tutorials.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md faq-item"
                variants={fadeIn}
                data-framer-motion
              >
                <h3 className="text-xl font-bold mb-3">How do I report a bug?</h3>
                <p className="text-gray-600">
                  You can report bugs through our support portal or by emailing bugs@devspace.com. Please include steps to reproduce,
                  expected behavior, and any relevant screenshots or error messages.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md faq-item"
                variants={fadeIn}
                data-framer-motion
              >
                <h3 className="text-xl font-bold mb-3">Do you offer enterprise on-premises deployment?</h3>
                <p className="text-gray-600">
                  Yes, we offer on-premises and private cloud deployment options for Enterprise customers. Contact our sales team
                  for more information about custom deployments and security requirements.
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* CTA section */}
          <motion.div 
            className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 text-center text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-primary-100">
              Sign up for a free trial today and experience the future of development environments.
              No credit card required.
            </p>
            <Link 
              href="#" 
              className="inline-block bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </main>
    </ContactWrapper>
  );
} 