"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

const AnimatedLikeButton = ({ initialLiked = false, onLike, className = "" }) => {
  const [liked, setLiked] = useState(initialLiked);

  const handleClick = () => {
    setLiked(!liked);
    if (onLike) onLike(!liked);
  };

  return (
    <motion.button
      className={`focus:outline-none ${className}`}
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        animate={liked ? {
          scale: [1, 1.3, 1],
          transition: { duration: 0.3 }
        } : {}}
      >
        {/* Heart icon - you can use your existing icon */}
        <svg 
          className={`w-6 h-6 ${liked ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          fill={liked ? "currentColor" : "none"}
          strokeWidth={liked ? "0" : "2"}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      </motion.div>
    </motion.button>
  );
};

export default AnimatedLikeButton;