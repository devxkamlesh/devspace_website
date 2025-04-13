'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
// Import component icons
import SparklesIcon from 'lucide-react/dist/esm/icons/sparkles';
import UserIcon from 'lucide-react/dist/esm/icons/user';
import BuildingIcon from 'lucide-react/dist/esm/icons/building';
import CheckIcon from 'lucide-react/dist/esm/icons/check';

// Import custom pricing components
import { PricingToggle } from '../../components/pricing/PricingToggle';
import { PricingCard } from '../../components/pricing/PricingCard';
import { FAQSection } from '../../components/pricing/FAQSection';
import { CTABanner } from '../../components/pricing/CTABanner';

const features = {
  basic: [
    "Basic AI suggestions",
    "Standard editor features",
    "Git integration",
    "5 projects",
    "Community support"
  ],
  pro: [
    "Advanced AI code completion",
    "Real-time collaboration",
    "Performance analytics",
    "Unlimited projects",
    "Priority support",
    "Custom themes",
    "Advanced Git workflows"
  ],
  enterprise: [
    "Custom AI model training",
    "Enterprise security features",
    "Dedicated account manager",
    "SLA guarantees",
    "SSO integration",
    "Role-based access control",
    "Custom API integrations",
    "24/7 premium support"
  ]
};

// FAQ items
const faqItems = [
  {
    question: "Can I switch between plans?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, we'll prorate the remaining time on your current plan. When downgrading, changes will apply at the end of your current billing cycle."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial on all our plans. No credit card required to start. You can upgrade to a paid plan at any time during or after your trial."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, including Visa, Mastercard, and American Express. For Enterprise plans, we also support invoicing and purchase orders."
  },
  {
    question: "Can I request a refund?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with DevSpace, simply contact our support team within 30 days of your purchase for a full refund."
  },
  {
    question: "Do you offer special pricing for startups?",
    answer: "Yes, we have special startup offers for early-stage companies. Please contact our sales team to discuss the qualifications and available discounts."
  }
];

// Enhanced animated background component
const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.3]);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-blue-100/30 to-primary-100/30 mix-blend-multiply filter blur-3xl"
        style={{ y: y1, opacity }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-[35rem] h-[35rem] rounded-full bg-gradient-to-br from-secondary-100/30 to-green-100/20 mix-blend-multiply filter blur-3xl"
        style={{ y: y2, opacity }}
      />
      
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-60 right-[20%] w-8 h-8 bg-primary-500/10 rounded-full"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-[40%] left-[15%] w-6 h-6 bg-secondary-500/10 rounded-full"
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute bottom-40 right-[30%] w-10 h-10 bg-green-500/10 rounded-full"
        animate={{ 
          y: [0, -25, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-20 [background-size:20px_20px]"></div>
    </div>
  );
};

// Animated feature list component
const AnimatedFeatureList = ({ features, color = "primary", delay = 0 }) => {
  return (
    <ul className="space-y-3 mt-6">
      {features.map((feature, index) => (
        <motion.li 
          key={feature}
          className="flex items-start"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: delay + (index * 0.05),
            ease: "easeOut"
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className={`flex-shrink-0 h-6 w-6 rounded-full bg-${color}-100 text-${color}-600 flex items-center justify-center mr-3`}>
            <CheckIcon className="h-4 w-4" />
          </span>
          <span>{feature}</span>
        </motion.li>
      ))}
    </ul>
  );
};

// Enhanced PricingCardWrapper with animations
const PricingCardWrapper = ({ 
  annual, 
  tier, 
  title, 
  description, 
  price, 
  priceUnit, 
  annualPrice, 
  features, 
  color = "primary",
  isPopular = false,
  ctaText, 
  ctaLink,
  icon,
  delay = 0
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  // Define color schemes based on tier
  const colorSchemes = {
    basic: {
      cardBg: "bg-white",
      hoverBg: "hover:bg-gray-50",
      shadowColor: "rgba(0, 0, 0, 0.05)",
      border: "border-gray-200",
      priceColor: "text-gray-900",
      buttonBg: "bg-gray-900 hover:bg-gray-800",
      buttonText: "text-white",
      highlight: ""
    },
    pro: {
      cardBg: "bg-white",
      hoverBg: "hover:bg-primary-50/30",
      shadowColor: "rgba(79, 70, 229, 0.08)",
      border: "border-primary-200",
      priceColor: "text-primary-600",
      buttonBg: "bg-primary-600 hover:bg-primary-700",
      buttonText: "text-white",
      highlight: "from-primary-500 to-indigo-600"
    },
    enterprise: {
      cardBg: "bg-white",
      hoverBg: "hover:bg-secondary-50/30",
      shadowColor: "rgba(220, 38, 38, 0.08)",
      border: "border-secondary-200",
      priceColor: "text-secondary-600",
      buttonBg: "bg-secondary-600 hover:bg-secondary-700",
      buttonText: "text-white",
      highlight: "from-secondary-500 to-secondary-600"
    }
  };
  
  const scheme = colorSchemes[tier];
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="h-full perspective-1000"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div 
        className={`relative h-full rounded-2xl ${scheme.cardBg} shadow-lg ${scheme.hoverBg} transition-all duration-300 overflow-hidden flex flex-col border ${scheme.border}`}
        style={{ 
          boxShadow: `0 8px 30px ${scheme.shadowColor}`
        }}
      >
        {isPopular && (
          <div className="absolute top-0 right-0 left-0">
            <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 to-indigo-500"></div>
            <div className="flex justify-center">
              <span className="bg-gradient-to-r from-primary-500 to-indigo-600 text-white text-xs font-medium px-4 py-1 rounded-b-lg shadow-sm">
                Most Popular
              </span>
            </div>
          </div>
        )}
        
        <div className={`p-8 ${isPopular ? 'pt-10' : ''}`}>
          <div className="flex items-center mb-4">
            <div className={`flex-shrink-0 mr-3 p-2 rounded-lg bg-${tier === 'basic' ? 'gray' : tier === 'pro' ? 'primary' : 'secondary'}-100`}>
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex items-end">
              <span className={`text-4xl font-bold ${scheme.priceColor}`}>
                {typeof price === 'number' ? `$${price}` : price}
              </span>
              {priceUnit && (
                <span className="text-gray-500 ml-1 text-lg">{priceUnit}</span>
              )}
            </div>
            {annualPrice && (
              <p className="text-gray-500 text-sm mt-1">{annualPrice}</p>
            )}
          </div>
          
          <AnimatedFeatureList 
            features={features} 
            color={tier === 'basic' ? 'gray' : tier === 'pro' ? 'primary' : 'secondary'}
            delay={delay + 0.2}
          />
          
          <div className="mt-8">
            <motion.a
              href={ctaLink}
              className={`block w-full py-3 px-4 rounded-lg ${scheme.buttonBg} ${scheme.buttonText} text-center font-medium transition-all duration-200`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {ctaText}
            </motion.a>
          </div>
        </div>
        
        {isPopular && (
          <motion.div
            className="absolute -top-14 -left-14 w-28 h-28 rotate-45 bg-gradient-to-r from-primary-500/10 to-indigo-500/10 rounded-md"
            animate={{ 
              rotate: [45, 60, 45],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        {tier === 'enterprise' && (
          <motion.div
            className="absolute -bottom-14 -right-14 w-28 h-28 rotate-12 bg-gradient-to-r from-secondary-500/10 to-red-500/10 rounded-md"
            animate={{ 
              rotate: [12, -5, 12],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Enhanced SectionHeader component
const SectionHeader = ({ annual, setAnnual }) => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={headerRef}
      className="text-center mb-16 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="inline-block px-5 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-800 rounded-full font-medium text-sm mb-6 border border-primary-100 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <motion.span 
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.8 }}
          className="inline-block mr-2"
        >
          ✨
        </motion.span>
        Simple Pricing for Powerful Development
      </motion.div>
      
      <motion.h2 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Choose the Perfect
        <span className="relative ml-3">
          <span className="relative z-10 text-primary-600">DevSpace Plan</span>
          <motion.span 
            className="absolute -bottom-2 left-0 w-full h-3 bg-primary-100 rounded-full -z-10"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          />
        </span>
      </motion.h2>
      
      <motion.p 
        className="text-gray-600 text-xl max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Select a plan that fits your needs. All plans include updates and core developer features.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10"
      >
        <PricingToggle annual={annual} setAnnual={setAnnual} />
      </motion.div>
    </motion.div>
  );
};

// Main component
export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <section id="pricing" ref={sectionRef} className="py-32 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader annual={annual} setAnnual={setAnnual} />

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCardWrapper
            annual={annual}
            tier="basic"
            title="Basic"
            description="For individual developers"
            price={annual ? 9 : 12}
            priceUnit={annual ? "/mo" : "/mo"}
            annualPrice={annual ? "$108 billed annually" : undefined}
            features={features.basic}
            ctaText="Get Started"
            ctaLink="/signup"
            icon={<UserIcon className="h-5 w-5 text-gray-500" />}
            delay={0}
          />
          
          <PricingCardWrapper
            annual={annual}
            tier="pro"
            title="Pro"
            description="For professional developers"
            price={annual ? 19 : 24}
            priceUnit={annual ? "/mo" : "/mo"}
            annualPrice={annual ? "$228 billed annually" : undefined}
            features={features.pro}
            isPopular={true}
            ctaText="Get Started"
            ctaLink="/signup"
            icon={<SparklesIcon className="h-5 w-5 text-primary-500" />}
            delay={0.1}
          />
          
          <PricingCardWrapper
            annual={annual}
            tier="enterprise"
            title="Enterprise"
            description="For teams and organizations"
            price="Custom"
            priceUnit=""
            features={features.enterprise}
            ctaText="Contact Sales"
            ctaLink="/contact"
            icon={<BuildingIcon className="h-5 w-5 text-secondary-500" />}
            delay={0.2}
            annualPrice={undefined}
          />
        </div>
        
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mt-32"
        >
          <FAQSection 
            title="Frequently Asked Questions"
            description="Everything you need to know about our plans and pricing"
            items={faqItems}
          />
        </motion.div>
      </div>
    </section>
  );
}
