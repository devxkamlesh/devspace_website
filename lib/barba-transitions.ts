let barba;
let gsap;

// Enhanced GSAP transitions for Barba.js
const transitions = {
  // Fade transition
  fade: {
    leave(data) {
      // Clear any previous GSAP animations
      gsap.killTweensOf(data.current.container);
      
      return gsap.to(data.current.container, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => window.scrollTo(0, 0)
      });
    },
    enter(data) {
      // Set initial state
      gsap.set(data.next.container, { opacity: 0 });
      
      // Initialize animations after Framer Motion has settled
      return gsap.to(data.next.container, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.1 // Small delay to let React/Framer Motion initialize
      });
    }
  },
  
  // Slide transition
  slide: {
    leave(data) {
      const direction = data.trigger.dataset.direction || 'left';
      const xValue = direction === 'left' ? -window.innerWidth : window.innerWidth;
      
      return gsap.to(data.current.container, {
        x: xValue,
        ease: 'power2.inOut',
        duration: 0.6,
        onComplete: () => window.scrollTo(0, 0)
      });
    },
    enter(data) {
      const direction = data.trigger.dataset.direction || 'left';
      const xValue = direction === 'left' ? window.innerWidth : -window.innerWidth;
      
      // Set initial state
      gsap.set(data.next.container, { x: xValue });
      
      return gsap.to(data.next.container, {
        x: 0,
        ease: 'power2.inOut',
        duration: 0.6,
        clearProps: 'x' // Clear transform properties when done
      });
    }
  },
  
  // Cover transition
  cover: {
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => window.scrollTo(0, 0)
      });
    },
    enter(data) {
      // Identify non-Framer Motion elements to animate with GSAP
      const staticElements = Array.from(
        data.next.container.querySelectorAll('.gsap-animate:not([data-framer-motion])')
      );
      
      // Set initial state
      gsap.set(data.next.container, { opacity: 0, y: 30 });
      gsap.set(staticElements, { opacity: 0, y: 30 });
      
      // Create staggered animation timeline
      const tl = gsap.timeline();
      
      // Animate container first
      tl.to(data.next.container, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'y'
      });
      
      // Then stagger animate static elements
      if (staticElements.length > 0) {
        tl.to(staticElements, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'y'
        }, '-=0.2');
      }
      
      return tl;
    },
    // Custom after function for each page
    after(data) {
      // Reinitialize any GSAP animations that depend on page being visible
      if (data.next.namespace === 'home') {
        // Home page specific GSAP animations
        const heroSection = data.next.container.querySelector('.hero-section');
        if (heroSection) {
          gsap.from(heroSection.querySelectorAll('.gsap-hero-item'), {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.3
          });
        }
      }
    }
  }
};

// Initialize Barba transitions
export async function initBarba() {
  // Make sure we're in the browser environment
  if (typeof window === 'undefined') return;

  // Dynamically import dependencies
  try {
    // Import the libraries only on the client side
    const barbaModule = await import('@barba/core');
    const gsapModule = await import('gsap');
    
    // Assign to our variables
    barba = barbaModule.default;
    gsap = gsapModule.gsap;
    
    // Continue with initialization once modules are loaded
    initializeBarba();
  } catch (error) {
    console.error('Error loading Barba.js or GSAP:', error);
  }
}

// Separate function to initialize Barba after imports are ready
function initializeBarba() {
  if (!barba || !gsap) {
    console.error('Barba or GSAP not loaded properly');
    return;
  }

  // Initialize Barba
  barba.init({
    // Define views for different page types
    views: [
      {
        namespace: 'home',
        beforeEnter() {
          console.log('Entering home page');
        },
        afterEnter() {
          // Initialize any home-specific GSAP animations
          // that aren't handled by Framer Motion
        }
      },
      {
        namespace: 'about',
        beforeEnter() {
          console.log('Entering about page');
        },
        afterEnter() {
          // Initialize any about-specific GSAP animations
          const timeline = gsap.timeline();
          const storySection = document.querySelector('.story-section');
          
          if (storySection) {
            timeline.from(storySection.querySelectorAll('.gsap-animate'), {
              y: 30,
              opacity: 0,
              stagger: 0.1,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        }
      },
      {
        namespace: 'contact',
        beforeEnter() {
          console.log('Entering contact page');
        },
        afterEnter() {
          // Initialize any contact-specific GSAP animations
          const mapSection = document.querySelector('.map-section');
          
          if (mapSection) {
            gsap.from(mapSection, {
              y: 50,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: 0.3
            });
          }
        }
      }
    ],
    
    // Define transitions
    transitions: [
      // Home page transitions
      {
        name: 'home-transition',
        to: { namespace: 'home' },
        ...transitions.fade,
        after: transitions.cover.after
      },
      
      // About page transitions 
      {
        name: 'about-transition',
        to: { namespace: 'about' },
        ...transitions.cover
      },
      
      // Contact page transitions
      {
        name: 'contact-transition',
        to: { namespace: 'contact' },
        ...transitions.slide
      },
      
      // Default transition for any other page
      {
        name: 'default-transition',
        ...transitions.fade
      }
    ],
    
    // Prevent default transition for specific routes
    prevent: ({ el }) => {
      // Skip barba for external links
      const href = el?.getAttribute('href');
      if (!href) return false;
      
      // Don't process external links
      if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        return true;
      }
      
      // Don't process links with "data-no-transition" attribute
      if (el.hasAttribute('data-no-transition')) {
        return true;
      }
      
      return false;
    }
  });

  // Global hooks for all transitions
  barba.hooks.before(() => {
    // Kill any orphaned GSAP animations to prevent conflicts
    gsap.killTweensOf("*");
  });
  
  barba.hooks.after(() => {
    // Reinitialize any scripts that need to run after new content is loaded
    console.log('Page transition complete');
  });
}

// Function to navigate programmatically with Barba
export function navigateTo(href, direction = 'left') {
  if (typeof window === 'undefined' || !barba) return;
  
  const trigger = document.createElement('a');
  trigger.href = href;
  trigger.dataset.direction = direction;
  
  barba.go(href, trigger);
} 