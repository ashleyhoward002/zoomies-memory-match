/**
 * SCOREBOARD COMPONENT
 * Displays game progress - always visible for ADHD-friendly design
 */

import React from 'react';
import { motion } from 'framer-motion';
import { THEME, TEXT } from '../../data/theme';

interface StatItemProps {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${THEME.spacing.sm} ${THEME.spacing.md}`,
      background: THEME.colors.cardBackground,
      borderRadius: THEME.borderRadius.md,
      boxShadow: THEME.shadows.sm,
      minWidth: '70px',
    }}
  >
    <span style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{icon}</span>
    <span
      style={{
        fontSize: THEME.fontSizes.xl,
        fontWeight: 700,
        color: color || THEME.colors.text,
        fontFamily: THEME.fonts.main,
        lineHeight: 1.2,
      }}
    >
      {value}
    </span>
    <span
      style={{
        fontSize: THEME.fontSizes.xs,
        color: THEME.colors.textMuted,
        fontFamily: THEME.fonts.main,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      {label}
    </span>
  </motion.div>
);

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface ScoreBoardProps {
  score: number;
  moves: number;
  pairsFound: number;
  totalPairs: number;
  timer: number;
  hintsRemaining: number;
  showTimer?: boolean;
  timeLimit?: number | null;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  moves,
  pairsFound,
  totalPairs,
  timer,
  hintsRemaining,
  showTimer = true,
  timeLimit,
}) => {
  // Show time remaining if there's a limit, otherwise show elapsed time
  const displayTime = timeLimit
    ? formatTime(Math.max(0, timeLimit - timer))
    : formatTime(timer);

  const timerColor = timeLimit && (timeLimit - timer) < 30
    ? THEME.colors.warning
    : THEME.colors.textLight;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: THEME.spacing.sm,
        padding: THEME.spacing.md,
        flexWrap: 'wrap',
      }}
    >
      <StatItem
        label={TEXT.score}
        value={score}
        icon="⭐"
        color={THEME.colors.primary}
      />

      <StatItem
        label={TEXT.moves}
        value={moves}
        icon="👆"
        color={THEME.colors.secondary}
      />

      <StatItem
        label={TEXT.pairs}
        value={`${pairsFound}/${totalPairs}`}
        icon="🎯"
        color={THEME.colors.success}
      />

      {showTimer && (
        <StatItem
          label={timeLimit ? 'Left' : TEXT.timer}
          value={displayTime}
          icon="⏱️"
          color={timerColor}
        />
      )}

      <StatItem
        label={TEXT.hint}
        value={hintsRemaining > 99 ? '∞' : hintsRemaining}
        icon="💡"
        color={hintsRemaining > 0 ? THEME.colors.warningLight : THEME.colors.textMuted}
      />
    </motion.div>
  );
};

export default ScoreBoard;
