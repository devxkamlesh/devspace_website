'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Development Workflow?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have already made the switch to DevSpace. Get started today for free, no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-primary-700 hover:bg-gray-100 text-lg px-8 py-3"
              onClick={() => window.location.href = 'https://dashboard.armordivison.in'}
            >
              Get Started Free
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-3"
              onClick={() => window.location.href = 'https://dashboard.armordivison.in'}
            >
              <span>Schedule a Demo</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <p className="mt-8 text-sm opacity-75">
            Trusted by developers from companies like Google, Microsoft, Amazon, and thousands of startups.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
