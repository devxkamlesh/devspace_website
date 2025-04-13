'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlusIcon from 'lucide-react/dist/esm/icons/plus';
import MinusIcon from 'lucide-react/dist/esm/icons/minus';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  description: string;
  items: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ title, description, items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <motion.div 
      className="mt-24 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="space-y-4">
        {items.map((item, i) => (
          <motion.div 
            key={i}
            className="overflow-hidden rounded-xl border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
              boxShadow: activeIndex === i 
                ? "0 4px 20px -2px rgba(0, 0, 0, 0.1)"
                : "0 2px 10px -2px rgba(0, 0, 0, 0.05)"
            }}
          >
            <motion.button
              className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gray-50 transition-colors"
              onClick={() => toggleFAQ(i)}
              whileTap={{ scale: 0.98 }}
            >
              <h4 className="font-bold text-lg">{item.question}</h4>
              <motion.div
                className="flex-shrink-0 ml-4"
                animate={{ rotate: activeIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeIndex === i ? (
                  <MinusIcon className="w-5 h-5 text-primary-500" />
                ) : (
                  <PlusIcon className="w-5 h-5 text-gray-400" />
                )}
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: "auto", 
                    opacity: 1,
                    transition: {
                      height: { duration: 0.3 },
                      opacity: { duration: 0.3, delay: 0.1 }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3 },
                      opacity: { duration: 0.15 }
                    }
                  }}
                  className="overflow-hidden"
                >
                  <motion.div 
                    className="p-5 pt-0 text-gray-600 bg-white border-t border-gray-100"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    {item.answer}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}; 