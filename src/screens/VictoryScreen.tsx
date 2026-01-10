/**
 * VICTORY SCREEN
 * Celebration when level is complete
 * Brief, joyful feedback (1-2 seconds celebration per PRD)
 */

import { motion } from 'framer-motion';
import { ChevronRight, RotateCcw, Home } from 'lucide-react';
import { THEME, TEXT } from '../data/theme';
import StarRating from '../components/game/StarRating';
import GameButton from '../components/game/GameButton';
import CoachCalm from '../components/game/CoachCalm';

interface VictoryScreenProps {
  score: number;
  moves: number;
  timer: number;
  stars: number;
  hasNextLevel: boolean;
  onPlayAgain: () => void;
  onNextLevel: () => void;
  onHome: () => void;
}

const VictoryScreen = ({
  score,
  moves,
  timer,
  stars,
  hasNextLevel,
  onPlayAgain,
  onNextLevel,
  onHome,
}: VictoryScreenProps) => {
  const getMessage = () => {
    if (stars === 3) return TEXT.perfectScore;
    if (stars === 2) return TEXT.greatScore;
    return TEXT.goodScore;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: THEME.spacing.xl,
        background: `linear-gradient(180deg, ${THEME.colors.background} 0%, ${THEME.colors.backgroundDark} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Confetti effect - brief celebration */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 0,
          }}
          animate={{
            opacity: [1, 1, 0],
            x: Math.random() * 300 - 150,
            y: Math.random() * 300 - 150,
            scale: [0, 1, 0.5],
            rotate: Math.random() * 720,
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 0.3,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            fontSize: '1.5rem',
            pointerEvents: 'none',
          }}
        >
          {['🎉', '⭐', '✨', '🌟'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      {/* Victory content */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        style={{
          textAlign: 'center',
          background: THEME.colors.cardBackground,
          borderRadius: THEME.borderRadius.xl,
          padding: THEME.spacing['2xl'],
          boxShadow: THEME.shadows.xl,
          maxWidth: '400px',
          width: '100%',
        }}
      >
        {/* Trophy */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 1.5, repeat: 2 }}
          style={{ fontSize: '4rem', marginBottom: THEME.spacing.md }}
        >
          🏆
        </motion.div>

        <h1
          style={{
            fontSize: THEME.fontSizes['2xl'],
            fontWeight: 800,
            color: THEME.colors.text,
            fontFamily: THEME.fonts.heading,
            marginBottom: THEME.spacing.xs,
          }}
        >
          {TEXT.congratulations}
        </h1>

        <p
          style={{
            fontSize: THEME.fontSizes.md,
            color: THEME.colors.textLight,
            fontFamily: THEME.fonts.main,
            marginBottom: THEME.spacing.lg,
          }}
        >
          {getMessage()}
        </p>

        {/* Stars */}
        <div style={{ marginBottom: THEME.spacing.xl }}>
          <StarRating stars={stars} />
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: THEME.spacing.md,
            marginBottom: THEME.spacing.xl,
            padding: THEME.spacing.md,
            background: THEME.colors.backgroundDark,
            borderRadius: THEME.borderRadius.lg,
          }}
        >
          <div>
            <div
              style={{
                fontSize: THEME.fontSizes.xl,
                fontWeight: 700,
                color: THEME.colors.primary,
              }}
            >
              {score}
            </div>
            <div
              style={{
                fontSize: THEME.fontSizes.xs,
                color: THEME.colors.textMuted,
                textTransform: 'uppercase',
              }}
            >
              {TEXT.score}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: THEME.fontSizes.xl,
                fontWeight: 700,
                color: THEME.colors.secondary,
              }}
            >
              {moves}
            </div>
            <div
              style={{
                fontSize: THEME.fontSizes.xs,
                color: THEME.colors.textMuted,
                textTransform: 'uppercase',
              }}
            >
              {TEXT.moves}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: THEME.fontSizes.xl,
                fontWeight: 700,
                color: THEME.colors.success,
              }}
            >
              {formatTime(timer)}
            </div>
            <div
              style={{
                fontSize: THEME.fontSizes.xs,
                color: THEME.colors.textMuted,
                textTransform: 'uppercase',
              }}
            >
              {TEXT.timer}
            </div>
          </div>
        </div>

        {/* Coach Calm celebration */}
        <div style={{ marginBottom: THEME.spacing.lg }}>
          <CoachCalm
            message={TEXT.coachVictory}
            type="victory"
            autoHide={false}
          />
        </div>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: THEME.spacing.sm,
          }}
        >
          {hasNextLevel && (
            <GameButton
              variant="success"
              size="lg"
              fullWidth
              onClick={onNextLevel}
              icon={<ChevronRight size={22} />}
              iconPosition="right"
            >
              {TEXT.nextLevel}
            </GameButton>
          )}

          <GameButton
            variant="primary"
            size="md"
            fullWidth
            onClick={onPlayAgain}
            icon={<RotateCcw size={20} />}
          >
            {TEXT.playAgain}
          </GameButton>

          <GameButton
            variant="ghost"
            size="md"
            fullWidth
            onClick={onHome}
            icon={<Home size={20} />}
          >
            {TEXT.backToHome}
          </GameButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VictoryScreen;
