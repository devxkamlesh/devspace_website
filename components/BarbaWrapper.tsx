'use client';

import React, { useEffect, useRef } from 'react';
import { initBarba } from '../lib/barba-transitions';

interface BarbaWrapperProps {
  children: React.ReactNode;
  namespace?: string;
}

export function BarbaWrapper({ children, namespace = 'default' }: BarbaWrapperProps) {
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize Barba once
    if (!initialized.current) {
      initBarba();
      initialized.current = true;
    }
  }, []);

  return (
    <div data-barba="wrapper">
      <div data-barba="container" data-barba-namespace={namespace}>
        {children}
      </div>
    </div>
  );
} 