/**
 * GAME BUTTON COMPONENT
 * ADHD-friendly button with large touch targets (64px min)
 */

import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../data/theme';

interface GameButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

const GameButton: React.FC<GameButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  style = {},
}) => {
  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${THEME.colors.primary}, ${THEME.colors.primaryDark})`,
      color: 'white',
      border: 'none',
      boxShadow: THEME.shadows.md,
    },
    secondary: {
      background: `linear-gradient(135deg, ${THEME.colors.secondary}, ${THEME.colors.secondaryDark})`,
      color: 'white',
      border: 'none',
      boxShadow: THEME.shadows.md,
    },
    success: {
      background: `linear-gradient(135deg, ${THEME.colors.success}, #3d8b40)`,
      color: 'white',
      border: 'none',
      boxShadow: THEME.shadows.md,
    },
    outline: {
      background: 'transparent',
      color: THEME.colors.primary,
      border: `3px solid ${THEME.colors.primary}`,
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      color: THEME.colors.text,
      border: 'none',
      boxShadow: 'none',
    },
  };

  // ADHD-friendly: Large touch targets
  const sizes = {
    sm: {
      minHeight: THEME.touchTarget.min,
      padding: `0 ${THEME.spacing.lg}`,
      fontSize: THEME.fontSizes.md,
      borderRadius: THEME.borderRadius.md,
      gap: THEME.spacing.sm,
    },
    md: {
      minHeight: THEME.touchTarget.preferred,
      padding: `0 ${THEME.spacing.xl}`,
      fontSize: THEME.fontSizes.lg,
      borderRadius: THEME.borderRadius.lg,
      gap: THEME.spacing.sm,
    },
    lg: {
      minHeight: THEME.touchTarget.preferred,
      padding: `0 ${THEME.spacing['2xl']}`,
      fontSize: THEME.fontSizes.xl,
      borderRadius: THEME.borderRadius.xl,
      gap: THEME.spacing.md,
    },
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={disabled ? undefined : onClick}
      style={{
        ...currentVariant,
        ...currentSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: iconPosition === 'right' ? 'row-reverse' : 'row',
        fontFamily: THEME.fonts.main,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        transition: THEME.transitions.fast,
        outline: 'none',
        ...style,
      }}
      disabled={disabled}
    >
      {icon && (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </span>
      )}
      {children}
    </motion.button>
  );
};

export default GameButton;
