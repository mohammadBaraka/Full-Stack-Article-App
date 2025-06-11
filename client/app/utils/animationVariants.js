import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Common animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } }
};

export const pulseAnimation = {
  pulse: { 
    scale: [1, 1.2, 1], 
    transition: { duration: 0.3, times: [0, 0.5, 1] } 
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const modalAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.3, 
      ease: 'easeOut' 
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    transition: { 
      duration: 0.2, 
      ease: 'easeIn' 
    } 
  }
};

// Custom hook for animations triggered when element is in view
export const useAnimateInView = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return { ref, isInView };
};