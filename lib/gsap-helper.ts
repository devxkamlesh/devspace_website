// Use dynamic import for GSAP to avoid SSR issues
let gsap;

// Initialize standard GSAP animations that work alongside Framer Motion
export async function initGsapAnimations() {
  // Make sure we're in the browser environment
  if (typeof window === 'undefined') return;
  
  try {
    // Dynamically import GSAP
    const gsapModule = await import('gsap');
    gsap = gsapModule.gsap;
    
    // Add class to body when GSAP is fully initialized
    document.body.classList.add('gsap-ready');
    
    // Animate elements with gsap-animate class that aren't controlled by Framer Motion
    const animateElements = document.querySelectorAll(
      '.gsap-animate:not([data-framer-motion])'
    );
    
    if (animateElements.length > 0) {
      gsap.from(animateElements, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'y'
      });
    }
  } catch (error) {
    console.error('Error initializing GSAP:', error);
  }
}

// Create a scroll-triggered animation
export async function createScrollAnimation(
  selector: string, 
  options: { delay?: number; y?: number; opacity?: number; stagger?: number }
) {
  // Make sure we're in the browser environment
  if (typeof window === 'undefined') return;
  
  // Ensure GSAP is loaded
  if (!gsap) {
    try {
      const gsapModule = await import('gsap');
      gsap = gsapModule.gsap;
    } catch (error) {
      console.error('Error loading GSAP:', error);
      return;
    }
  }
  
  const elements = document.querySelectorAll(selector);
  
  if (elements.length === 0) return;
  
  const { delay = 0, y = 30, opacity = 0, stagger = 0.1 } = options;
  
  elements.forEach(element => {
    // Create an observer for each element
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate when element enters viewport
            gsap.fromTo(
              entry.target,
              { y, opacity },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.6, 
                delay,
                ease: 'power2.out',
                clearProps: 'y'
              }
            );
            
            // Stop observing after animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Start observing
    observer.observe(element);
  });
}

// Staggered animation for groups of elements
export async function animateStaggered(
  parentSelector: string,
  childSelector: string,
  options: { delay?: number; y?: number; x?: number; stagger?: number }
) {
  // Make sure we're in the browser environment
  if (typeof window === 'undefined') return;
  
  // Ensure GSAP is loaded
  if (!gsap) {
    try {
      const gsapModule = await import('gsap');
      gsap = gsapModule.gsap;
    } catch (error) {
      console.error('Error loading GSAP:', error);
      return;
    }
  }
  
  const parent = document.querySelector(parentSelector);
  if (!parent) return;
  
  const children = parent.querySelectorAll(childSelector);
  if (children.length === 0) return;
  
  const { delay = 0, y = 30, x = 0, stagger = 0.1 } = options;
  
  // Create an observer for the parent
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate children when parent enters viewport
          gsap.fromTo(
            children,
            { y, x, opacity: 0 },
            { 
              y: 0, 
              x: 0,
              opacity: 1, 
              duration: 0.5, 
              stagger,
              delay,
              ease: 'power2.out',
              clearProps: 'transform'
            }
          );
          
          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  // Start observing
  observer.observe(parent);
}

// Special text reveal animation
export async function animateText(selector: string, options?: { delay?: number; speed?: number }) {
  // Make sure we're in the browser environment
  if (typeof window === 'undefined') return;
  
  // Ensure GSAP is loaded
  if (!gsap) {
    try {
      const gsapModule = await import('gsap');
      gsap = gsapModule.gsap;
    } catch (error) {
      console.error('Error loading GSAP:', error);
      return;
    }
  }
  
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;
  
  const { delay = 0, speed = 0.03 } = options || {};
  
  elements.forEach(element => {
    // Split text into spans
    const text = element.textContent || '';
    const chars = text.split('');
    
    // Clear the element
    element.textContent = '';
    
    // Create spans for each character
    chars.forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for actual spaces
      span.style.display = 'inline-block';
      element.appendChild(span);
    });
    
    // Create an observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate when element enters viewport
            const spans = Array.from(element.children) as HTMLElement[];
            
            // Set initial state
            gsap.set(spans, { opacity: 0, y: 20 });
            
            // Animate each character
            gsap.to(spans, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: speed,
              delay,
              ease: 'power2.out',
              clearProps: 'transform'
            });
            
            // Stop observing after animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Start observing
    observer.observe(element);
  });
} 