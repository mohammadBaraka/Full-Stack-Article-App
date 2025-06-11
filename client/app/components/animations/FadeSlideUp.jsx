"use client";

import { motion } from 'framer-motion';
import { slideUp } from '../../utils/animationVariants';

const FadeSlideUp = ({ children, className = "", delay = 0 }) => {
  const customVariants = {
    hidden: slideUp.hidden,
    visible: {
      ...slideUp.visible,
      transition: {
        ...slideUp.visible.transition,
        delay
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={customVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeSlideUp;