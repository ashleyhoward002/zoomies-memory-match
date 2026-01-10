/**
 * HOW TO PLAY SCREEN
 * Simple instructions for children - visual + text
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { THEME } from '../data/theme';
import GameButton from '../components/game/GameButton';

interface HowToPlayScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    emoji: '👆',
    title: 'Tap a card',
    description: 'Tap any card to flip it over and see the emotion!',
  },
  {
    emoji: '🔄',
    title: 'Tap another card',
    description: 'Try to find the matching emotion card.',
  },
  {
    emoji: '✅',
    title: 'Find matches',
    description: 'When two cards match, they stay face up!',
  },
  {
    emoji: '🏆',
    title: 'Win the game',
    description: 'Find all the matches to complete the level!',
  },
];

const HowToPlayScreen: React.FC<HowToPlayScreenProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: THEME.colors.overlay,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: THEME.spacing.md,
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: THEME.colors.cardBackground,
              borderRadius: THEME.borderRadius.xl,
              padding: THEME.spacing.xl,
              maxWidth: '400px',
              width: '100%',
              boxShadow: THEME.shadows.xl,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: THEME.spacing.xl,
              }}
            >
              <h2
                style={{
                  fontSize: THEME.fontSizes.xl,
                  fontWeight: 700,
                  color: THEME.colors.text,
                  fontFamily: THEME.fonts.heading,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: THEME.spacing.sm,
                }}
              >
                <span>🎮</span> How To Play
              </h2>
              <GameButton
                variant="ghost"
                size="sm"
                onClick={onClose}
                icon={<X size={20} />}
              />
            </div>

            {/* Steps */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: THEME.spacing.lg,
              }}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: THEME.spacing.md,
                  }}
                >
                  {/* Step number with emoji */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: THEME.borderRadius.full,
                      background: THEME.colors.backgroundDark,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0,
                    }}
                  >
                    {step.emoji}
                  </div>

                  {/* Step content */}
                  <div>
                    <h3
                      style={{
                        fontSize: THEME.fontSizes.md,
                        fontWeight: 700,
                        color: THEME.colors.text,
                        fontFamily: THEME.fonts.main,
                        margin: 0,
                        marginBottom: THEME.spacing.xs,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: THEME.fontSizes.sm,
                        color: THEME.colors.textLight,
                        fontFamily: THEME.fonts.main,
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tips */}
            <div
              style={{
                marginTop: THEME.spacing.xl,
                padding: THEME.spacing.md,
                background: `${THEME.colors.successLight}22`,
                borderRadius: THEME.borderRadius.lg,
                border: `2px solid ${THEME.colors.successLight}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: THEME.spacing.sm,
                  marginBottom: THEME.spacing.sm,
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>🐢</span>
                <span
                  style={{
                    fontSize: THEME.fontSizes.sm,
                    fontWeight: 700,
                    color: THEME.colors.successLight,
                  }}
                >
                  Coach Calm's Tip
                </span>
              </div>
              <p
                style={{
                  fontSize: THEME.fontSizes.sm,
                  color: THEME.colors.textLight,
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                Take your time! There's no rush. Use the hint button if you need help finding a match.
              </p>
            </div>

            {/* Close button */}
            <GameButton
              variant="primary"
              size="lg"
              fullWidth
              onClick={onClose}
              style={{ marginTop: THEME.spacing.xl }}
            >
              Got it!
            </GameButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HowToPlayScreen;
