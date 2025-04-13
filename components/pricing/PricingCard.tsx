'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LinkButton } from '../../components/Button';
import { FeatureList } from './FeatureList';

interface PricingCardProps {
  title: string;
  description: string;
  price: string | number;
  priceUnit: string;
  annualPrice?: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaLink: string;
  ctaColor?: string;
  gradientBorder?: string;
  icon?: React.ReactNode;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  priceUnit,
  annualPrice,
  features,
  isPopular = false,
  ctaText,
  ctaLink,
  ctaColor = "",
  gradientBorder = "",
  icon
}) => {
  return (
    <div className="relative h-full">
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-bold px-5 py-1.5 rounded-full shadow-md">
            Most Popular
          </div>
        </div>
      )}
      
      {/* Simplified border for the card */}
      {gradientBorder && (
        <div className={`absolute -inset-0.5 ${gradientBorder} rounded-2xl blur-sm opacity-30 z-0`} />
      )}
      
      <motion.div
        className={`bg-white rounded-2xl shadow-md p-8 border h-full flex flex-col relative z-10 ${
          gradientBorder ? "border-transparent" : "border-gray-100"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            {icon}
          </div>
          <p className="text-gray-600">{description}</p>
        </div>
        
        <div className="mb-6">
          <div className="text-5xl font-bold text-gray-900 flex items-end">
            {typeof price === 'string' ? (
              price
            ) : (
              <>
                <span className="text-3xl mr-0.5">$</span>
                {price}
                <span className="text-xl text-gray-500 font-normal ml-1">
                  {priceUnit}
                </span>
              </>
            )}
          </div>
          {annualPrice && (
            <div className="text-green-600 font-medium mt-1">
              {annualPrice}
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <LinkButton
            href={ctaLink}
            className={`w-full transition-colors duration-200 ${ctaColor}`}
          >
            {ctaText}
          </LinkButton>
        </div>
        
        <div className="mb-6 mt-auto">
          <div className="text-sm font-medium text-gray-800 mb-4">
            Plan includes:
          </div>
          <FeatureList features={features} />
        </div>
      </motion.div>
    </div>
  );
}; 