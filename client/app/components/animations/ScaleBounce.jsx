"use client";

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const ScaleBounce = ({ children, isActive = false, className = "" }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      controls.start({
        scale: [1, 1.03, 1],
        transition: { duration: 0.4, times: [0, 0.5, 1] }
      });
    }
  }, [isActive, controls]);

  return (
    <motion.div animate={controls} className={className}>
      {children}
    </motion.div>
  );
};

export default ScaleBounce;