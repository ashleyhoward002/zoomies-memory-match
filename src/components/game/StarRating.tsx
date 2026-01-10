/**
 * STAR RATING COMPONENT
 * Shows 1-3 stars based on performance
 */

import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../data/theme';

interface StarProps {
  filled: boolean;
  index: number;
  size?: 'small' | 'medium' | 'large';
}

const Star: React.FC<StarProps> = ({ filled, index, size = 'large' }) => {
  const sizeMap = {
    small: '2rem',
    medium: '3rem',
    large: '4rem',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        delay: 0.3 + index * 0.2,
        duration: 0.6,
        type: 'spring',
        stiffness: 200,
      }}
      style={{
        fontSize: sizeMap[size],
        filter: filled
          ? 'drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5))'
          : 'grayscale(1) opacity(0.3)',
        display: 'inline-block',
      }}
    >
      {filled ? '⭐' : '☆'}
    </motion.span>
  );
};

interface StarRatingProps {
  stars?: number;
  maxStars?: number;
  size?: 'small' | 'medium' | 'large';
}

const StarRating: React.FC<StarRatingProps> = ({
  stars = 0,
  maxStars = 3,
  size = 'large',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: THEME.spacing.sm,
      }}
    >
      {Array.from({ length: maxStars }).map((_, index) => (
        <Star
          key={index}
          filled={index < stars}
          index={index}
          size={size}
        />
      ))}
    </motion.div>
  );
};

export default StarRating;
