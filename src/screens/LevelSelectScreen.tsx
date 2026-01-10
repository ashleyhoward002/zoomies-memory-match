/**
 * LEVEL SELECT SCREEN
 * Shows available levels with lock/unlock status
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Check } from 'lucide-react';
import { THEME, LEVELS } from '../data/theme';
import GameButton from '../components/game/GameButton';

interface LevelSelectScreenProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: number;
  onSelectLevel: (levelId: number) => void;
  starsEarned?: Record<number, number>;
}

interface LevelCardProps {
  level: typeof LEVELS[number];
  isSelected: boolean;
  isUnlocked: boolean;
  starsEarned: number;
  onSelect: () => void;
}

const LevelCard = ({
  level,
  isSelected,
  isUnlocked,
  starsEarned,
  onSelect,
}: LevelCardProps) => {
  const isCompleted = starsEarned > 0;

  return (
    <motion.button
      whileHover={isUnlocked ? { scale: 1.05, y: -4 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
      onClick={isUnlocked ? onSelect : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: THEME.spacing.lg,
        background: isSelected
          ? `linear-gradient(135deg, ${THEME.colors.primary}, ${THEME.colors.primaryDark})`
          : isUnlocked
          ? THEME.colors.cardBackground
          : `${THEME.colors.backgroundDark}`,
        borderRadius: THEME.borderRadius.xl,
        border: isSelected
          ? 'none'
          : isCompleted
          ? `3px solid ${THEME.colors.success}`
          : `3px solid ${THEME.colors.backgroundDark}`,
        boxShadow: isSelected ? THEME.shadows.lg : THEME.shadows.sm,
        cursor: isUnlocked ? 'pointer' : 'not-allowed',
        minWidth: '120px',
        opacity: isUnlocked ? 1 : 0.6,
        transition: THEME.transitions.normal,
        position: 'relative',
      }}
    >
      {/* Lock icon for locked levels */}
      {!isUnlocked && (
        <div
          style={{
            position: 'absolute',
            top: THEME.spacing.sm,
            right: THEME.spacing.sm,
            color: THEME.colors.textMuted,
          }}
        >
          <Lock size={16} />
        </div>
      )}

      {/* Completed checkmark */}
      {isCompleted && isUnlocked && (
        <div
          style={{
            position: 'absolute',
            top: THEME.spacing.sm,
            right: THEME.spacing.sm,
            width: '20px',
            height: '20px',
            borderRadius: THEME.borderRadius.full,
            background: THEME.colors.success,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={12} color="white" />
        </div>
      )}

      {/* Level number */}
      <span
        style={{
          fontSize: THEME.fontSizes['2xl'],
          fontWeight: 800,
          color: isSelected ? 'white' : THEME.colors.text,
          fontFamily: THEME.fonts.heading,
        }}
      >
        {level.id}
      </span>

      {/* Level name */}
      <span
        style={{
          fontSize: THEME.fontSizes.sm,
          fontWeight: 600,
          color: isSelected ? 'rgba(255,255,255,0.9)' : THEME.colors.textLight,
          fontFamily: THEME.fonts.main,
          marginTop: THEME.spacing.xs,
        }}
      >
        {level.name}
      </span>

      {/* Pairs count */}
      <span
        style={{
          fontSize: THEME.fontSizes.xs,
          color: isSelected ? 'rgba(255,255,255,0.7)' : THEME.colors.textMuted,
          fontFamily: THEME.fonts.main,
          marginTop: THEME.spacing.xs,
        }}
      >
        {level.pairs} pairs
      </span>

      {/* Stars earned */}
      {isUnlocked && (
        <div
          style={{
            display: 'flex',
            gap: '2px',
            marginTop: THEME.spacing.sm,
          }}
        >
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              style={{
                fontSize: '0.9rem',
                filter: star <= starsEarned
                  ? 'none'
                  : 'grayscale(1) opacity(0.3)',
              }}
            >
              ⭐
            </span>
          ))}
        </div>
      )}

      {/* Time limit indicator */}
      {level.timeLimit && (
        <span
          style={{
            fontSize: THEME.fontSizes.xs,
            color: isSelected ? 'rgba(255,255,255,0.6)' : THEME.colors.textMuted,
            marginTop: THEME.spacing.xs,
          }}
        >
          ⏱️ {level.timeLimit}s
        </span>
      )}
    </motion.button>
  );
};

const LevelSelectScreen = ({
  isOpen,
  onClose,
  currentLevel,
  onSelectLevel,
  starsEarned = {},
}: LevelSelectScreenProps) => {
  // For MVP, unlock all levels for testing
  const allUnlocked = LEVELS.map(l => l.id);

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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: THEME.colors.background,
              borderRadius: THEME.borderRadius.xl,
              padding: THEME.spacing.xl,
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
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
                }}
              >
                Select Level
              </h2>
              <GameButton
                variant="ghost"
                size="sm"
                onClick={onClose}
                icon={<X size={20} />}
              />
            </div>

            {/* Level grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: THEME.spacing.md,
              }}
            >
              {LEVELS.map((level) => (
                <LevelCard
                  key={level.id}
                  level={level}
                  isSelected={level.id === currentLevel}
                  isUnlocked={allUnlocked.includes(level.id)}
                  starsEarned={starsEarned[level.id] || 0}
                  onSelect={() => {
                    onSelectLevel(level.id);
                    onClose();
                  }}
                />
              ))}
            </div>

            {/* Info text */}
            <p
              style={{
                textAlign: 'center',
                fontSize: THEME.fontSizes.sm,
                color: THEME.colors.textMuted,
                marginTop: THEME.spacing.xl,
                fontFamily: THEME.fonts.main,
              }}
            >
              Complete levels to earn stars and unlock new challenges!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LevelSelectScreen;
