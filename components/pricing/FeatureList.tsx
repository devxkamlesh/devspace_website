'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CheckCircleIcon from 'lucide-react/dist/esm/icons/check-circle';
import XCircleIcon from 'lucide-react/dist/esm/icons/x-circle';

interface FeatureListProps {
  features: string[];
  available?: boolean;
  colorClass?: string;
  showUnavailable?: boolean;
  isIncluded?: (feature: string) => boolean;
}

export const FeatureList: React.FC<FeatureListProps> = ({ 
  features, 
  available = true, 
  colorClass = "text-green-500",
  showUnavailable = false,
  isIncluded
}) => {
  return (
    <ul className="space-y-3">
      {features.map((feature, i) => {
        const featureAvailable = isIncluded ? isIncluded(feature) : available;
        
        if (!featureAvailable && !showUnavailable) return null;
        
        return (
          <motion.li 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start group"
          >
            {featureAvailable ? (
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <CheckCircleIcon className={`h-5 w-5 ${colorClass} mr-2 flex-shrink-0 mt-0.5`} />
              </motion.div>
            ) : (
              <XCircleIcon className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0 mt-0.5" />
            )}
            <motion.span 
              className={featureAvailable ? "text-gray-600" : "text-gray-400"}
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {feature}
            </motion.span>
          </motion.li>
        );
      })}
    </ul>
  );
}; 