"use client";

import { motion } from 'framer-motion';
import { staggerContainer, slideUp } from '../../utils/animationVariants';

const StaggeredList = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredItem = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={slideUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default StaggeredList;