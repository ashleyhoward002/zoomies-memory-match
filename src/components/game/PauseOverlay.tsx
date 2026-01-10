/**
 * PAUSE OVERLAY
 * Simple pause menu with resume and quit options
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Home } from 'lucide-react';
import { THEME, TEXT } from '../../data/theme';
import GameButton from './GameButton';

interface PauseOverlayProps {
  isOpen: boolean;
  onResume: () => void;
  onQuit: () => void;
}

const PauseOverlay: React.FC<PauseOverlayProps> = ({
  isOpen,
  onResume,
  onQuit,
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
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              background: THEME.colors.cardBackground,
              borderRadius: THEME.borderRadius.xl,
              padding: THEME.spacing['2xl'],
              textAlign: 'center',
              boxShadow: THEME.shadows.xl,
              minWidth: '280px',
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: THEME.spacing.md }}>
              ⏸️
            </div>

            <h2
              style={{
                fontSize: THEME.fontSizes.xl,
                fontWeight: 700,
                color: THEME.colors.text,
                fontFamily: THEME.fonts.heading,
                marginBottom: THEME.spacing.xl,
              }}
            >
              Game Paused
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: THEME.spacing.sm,
              }}
            >
              <GameButton
                variant="primary"
                size="lg"
                fullWidth
                onClick={onResume}
                icon={<Play size={22} />}
              >
                {TEXT.resume}
              </GameButton>

              <GameButton
                variant="ghost"
                size="md"
                fullWidth
                onClick={onQuit}
                icon={<Home size={20} />}
              >
                {TEXT.quit}
              </GameButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PauseOverlay;
