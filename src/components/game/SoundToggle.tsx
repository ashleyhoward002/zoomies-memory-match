/**
 * SOUND TOGGLE BUTTON
 * Global audio control that appears on all screens
 * Shows speaker icon when on, muted icon when off
 */

import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { THEME } from '../../data/theme';

interface SoundToggleProps {
  soundEnabled: boolean;
  onToggle: () => void;
}

const SoundToggle = ({ soundEnabled, onToggle }: SoundToggleProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      style={{
        position: 'fixed',
        top: THEME.spacing.lg,
        right: THEME.spacing.lg,
        zIndex: 1000,
        background: soundEnabled
          ? `linear-gradient(135deg, ${THEME.colors.primary}, ${THEME.colors.primaryDark})`
          : THEME.colors.cardBackground,
        border: 'none',
        borderRadius: THEME.borderRadius.full,
        width: '56px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: THEME.shadows.md,
        color: soundEnabled ? 'white' : THEME.colors.textMuted,
      }}
      aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
    >
      {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </motion.button>
  );
};

export default SoundToggle;
