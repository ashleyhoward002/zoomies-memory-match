/**
 * COACH CALM COMPONENT
 * The wise turtle who provides hints and encouragement
 * Always encouraging, never critical (per PRD)
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME, TEXT } from '../../data/theme';

interface CoachCalmProps {
  message?: string;
  type?: 'hint' | 'encouragement' | 'match' | 'victory';
  show?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
  emotionFact?: string;
  onHide?: () => void;
}

const CoachCalm: React.FC<CoachCalmProps> = ({
  message,
  type = 'encouragement',
  show = true,
  autoHide = true,
  autoHideDelay = 3000,
  emotionFact,
  onHide,
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    if (show && autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onHide?.();
      }, autoHideDelay);
      return () => clearTimeout(timer);
    }
  }, [show, autoHide, autoHideDelay, onHide]);

  // Get random encouragement if no message provided
  const displayMessage = message ||
    TEXT.coachEncouragement[Math.floor(Math.random() * TEXT.coachEncouragement.length)];

  const bgColors = {
    hint: THEME.colors.warningLight,
    encouragement: THEME.colors.successLight,
    match: THEME.colors.success,
    victory: THEME.colors.primary,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: THEME.spacing.md,
            padding: THEME.spacing.md,
            background: THEME.colors.cardBackground,
            borderRadius: THEME.borderRadius.xl,
            boxShadow: THEME.shadows.lg,
            border: `3px solid ${bgColors[type]}`,
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          {/* Coach Calm avatar */}
          <motion.div
            animate={{
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              fontSize: '3rem',
              flexShrink: 0,
            }}
          >
            🐢
          </motion.div>

          {/* Message content */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: THEME.fontSizes.xs,
                fontWeight: 700,
                color: THEME.colors.successLight,
                fontFamily: THEME.fonts.main,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: THEME.spacing.xs,
              }}
            >
              Coach Calm
            </div>
            <div
              style={{
                fontSize: THEME.fontSizes.md,
                fontWeight: 600,
                color: THEME.colors.text,
                fontFamily: THEME.fonts.main,
                lineHeight: 1.4,
              }}
            >
              "{displayMessage}"
            </div>

            {/* Emotion fact (shown on match) */}
            {emotionFact && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.5 }}
                style={{
                  marginTop: THEME.spacing.sm,
                  padding: THEME.spacing.sm,
                  background: `${bgColors[type]}22`,
                  borderRadius: THEME.borderRadius.md,
                  fontSize: THEME.fontSizes.sm,
                  color: THEME.colors.textLight,
                  fontFamily: THEME.fonts.main,
                }}
              >
                💡 {emotionFact}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoachCalm;
