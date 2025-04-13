'use client';

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS merging capability
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 