"use client";

import { motion } from 'framer-motion';

const AnimatedContainer = ({ 
  children, 
  variants, 
  className = "", 
  delay = 0,
  duration = 0.3,
  ...props 
}) => {
  const defaultVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration, 
        delay 
      } 
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants || defaultVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;