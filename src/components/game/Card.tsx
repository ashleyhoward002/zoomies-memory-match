/**
 * CARD COMPONENT
 * Memory card with flip animation showing character emotions
 * ADHD-friendly: Large touch targets, clear feedback
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../data/theme';
import type { CardData } from '../../hooks/useGameLogic';

interface CardProps {
  card: CardData;
  onClick: () => void;
  disabled?: boolean;
  index?: number;
}

const Card: React.FC<CardProps> = ({
  card,
  onClick,
  disabled = false,
  index = 0,
}) => {
  const [imageError, setImageError] = useState(false);
  const { isFlipped, isMatched, emoji, emotionName, characterName, color, imagePath } = card;

  const handleClick = () => {
    if (!disabled && !isFlipped && !isMatched) {
      onClick();
    }
  };

  const canClick = !disabled && !isFlipped && !isMatched;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
      }}
      transition={{
        delay: index * 0.03,
        duration: 0.4,
        type: 'spring',
        stiffness: 200,
      }}
      style={{
        perspective: '1000px',
        cursor: canClick ? 'pointer' : 'default',
      }}
      onClick={handleClick}
      whileHover={canClick ? { scale: 1.05 } : {}}
      whileTap={canClick ? { scale: 0.95 } : {}}
    >
      <motion.div
        animate={{
          rotateY: isFlipped || isMatched ? 180 : 0,
        }}
        transition={{
          duration: 0.5,
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1.15',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Back */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: THEME.borderRadius.lg,
            background: THEME.colors.cardBackGradient,
            border: '3px solid rgba(255, 255, 255, 0.3)',
            boxShadow: THEME.shadows.md,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Decorative pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.15,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
              padding: '8px',
              fontSize: '0.8rem',
            }}
          >
            {Array(9).fill('✨').map((star, i) => (
              <span key={i} style={{ textAlign: 'center' }}>{star}</span>
            ))}
          </div>

          {/* Center emoji (Zoomies logo placeholder) */}
          <span
            style={{
              fontSize: 'clamp(2rem, 8vw, 3rem)',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              zIndex: 1,
            }}
          >
            🧠
          </span>

          <span
            style={{
              fontSize: THEME.fontSizes.xs,
              color: 'rgba(255,255,255,0.7)',
              fontFamily: THEME.fonts.main,
              fontWeight: 600,
              marginTop: THEME.spacing.xs,
            }}
          >
            Zoomies
          </span>
        </div>

        {/* Card Front */}
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: THEME.borderRadius.lg,
            background: isMatched
              ? `linear-gradient(135deg, ${color}22, ${color}44)`
              : THEME.colors.cardFlipped,
            border: `3px solid ${isMatched ? THEME.colors.success : color}`,
            boxShadow: isMatched ? THEME.shadows.success : THEME.shadows.md,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: THEME.spacing.sm,
            overflow: 'hidden',
          }}
        >
          {/* Character image or emoji fallback */}
          {!imageError ? (
            <motion.img
              src={imagePath}
              alt={`${characterName} ${emotionName}`}
              onError={() => setImageError(true)}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: isFlipped || isMatched ? 1 : 0.5, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
              style={{
                width: '70%',
                height: 'auto',
                objectFit: 'contain',
                maxHeight: '60%',
              }}
            />
          ) : (
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: isFlipped || isMatched ? 1 : 0.5 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
              style={{
                fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
                lineHeight: 1,
              }}
            >
              {emoji}
            </motion.span>
          )}

          {/* Character name */}
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: isFlipped || isMatched ? 1 : 0,
              y: isFlipped || isMatched ? 0 : 5,
            }}
            transition={{ delay: 0.25 }}
            style={{
              fontSize: THEME.fontSizes.xs,
              fontWeight: 700,
              color: THEME.colors.text,
              fontFamily: THEME.fonts.main,
              marginTop: THEME.spacing.xs,
            }}
          >
            {characterName}
          </motion.span>

          {/* Emotion name */}
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: isFlipped || isMatched ? 1 : 0,
              y: isFlipped || isMatched ? 0 : 5,
            }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: THEME.fontSizes.sm,
              fontWeight: 600,
              color: color,
              fontFamily: THEME.fonts.main,
            }}
          >
            {emotionName}
          </motion.span>

          {/* Match indicator */}
          {isMatched && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              style={{
                position: 'absolute',
                top: THEME.spacing.xs,
                right: THEME.spacing.xs,
                width: '24px',
                height: '24px',
                borderRadius: THEME.borderRadius.full,
                background: THEME.colors.success,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              ✓
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
