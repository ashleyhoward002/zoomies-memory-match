/**
 * GAME SCREEN
 * Main gameplay area with card grid, score, and Coach Calm
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Pause, Lightbulb } from 'lucide-react';
import { THEME, TEXT } from '../data/theme';
import CardGrid from '../components/game/CardGrid';
import ScoreBoard from '../components/game/ScoreBoard';
import GameButton from '../components/game/GameButton';
import CoachCalm from '../components/game/CoachCalm';
import type { useGameLogic } from '../hooks/useGameLogic';

interface GameScreenProps {
  gameLogic: ReturnType<typeof useGameLogic>;
  onBack: () => void;
  onPause: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  gameLogic,
  onBack,
  onPause,
}) => {
  const {
    cards,
    handleCardClick,
    useHint,
    matchedPairs,
    totalPairs,
    moves,
    score,
    timer,
    hintsRemaining,
    isProcessing,
    levelConfig,
    gameState,
    lastMatchedEmotion,
  } = gameLogic;

  const [showMatchFeedback, setShowMatchFeedback] = useState(false);
  const [currentFact, setCurrentFact] = useState<string>('');

  // Show match feedback when a new match is found
  useEffect(() => {
    if (lastMatchedEmotion) {
      const randomFact = lastMatchedEmotion.facts[
        Math.floor(Math.random() * lastMatchedEmotion.facts.length)
      ];
      setCurrentFact(randomFact);
      setShowMatchFeedback(true);

      const timer = setTimeout(() => {
        setShowMatchFeedback(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [lastMatchedEmotion, matchedPairs.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(180deg, ${THEME.colors.background} 0%, ${THEME.colors.backgroundDark} 100%)`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: THEME.spacing.md,
        }}
      >
        <GameButton
          variant="ghost"
          size="sm"
          onClick={onBack}
          icon={<ArrowLeft size={20} />}
        >
          Exit
        </GameButton>

        <span
          style={{
            fontSize: THEME.fontSizes.lg,
            fontWeight: 700,
            color: THEME.colors.text,
            fontFamily: THEME.fonts.main,
          }}
        >
          {levelConfig.name}
        </span>

        <GameButton
          variant="ghost"
          size="sm"
          onClick={onPause}
          icon={<Pause size={20} />}
        />
      </div>

      {/* Progress bar */}
      <div
        style={{
          padding: `0 ${THEME.spacing.lg}`,
          marginBottom: THEME.spacing.sm,
        }}
      >
        <div
          style={{
            height: '8px',
            background: THEME.colors.backgroundDark,
            borderRadius: THEME.borderRadius.full,
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(matchedPairs.length / totalPairs) * 100}%` }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${THEME.colors.success}, ${THEME.colors.successLight})`,
              borderRadius: THEME.borderRadius.full,
            }}
          />
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: THEME.fontSizes.sm,
            color: THEME.colors.textLight,
            marginTop: THEME.spacing.xs,
          }}
        >
          Pairs Found: {matchedPairs.length}/{totalPairs}
        </div>
      </div>

      {/* Score board */}
      <ScoreBoard
        score={score}
        moves={moves}
        pairsFound={matchedPairs.length}
        totalPairs={totalPairs}
        timer={timer}
        hintsRemaining={hintsRemaining}
        timeLimit={levelConfig.timeLimit}
      />

      {/* Card grid */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: THEME.spacing.md,
          minHeight: '300px',
        }}
      >
        <CardGrid
          cards={cards}
          onCardClick={handleCardClick}
          gridCols={levelConfig.gridCols}
          disabled={isProcessing || gameState !== 'playing'}
        />
      </div>

      {/* Match feedback overlay */}
      <AnimatePresence>
        {showMatchFeedback && lastMatchedEmotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: THEME.colors.cardBackground,
              borderRadius: THEME.borderRadius.xl,
              padding: THEME.spacing.xl,
              boxShadow: THEME.shadows.xl,
              textAlign: 'center',
              zIndex: 50,
              border: `4px solid ${lastMatchedEmotion.color}`,
              maxWidth: '320px',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              style={{ fontSize: '3rem', marginBottom: THEME.spacing.sm }}
            >
              ✨ MATCH! ✨
            </motion.div>
            <div
              style={{
                fontSize: '2.5rem',
                marginBottom: THEME.spacing.sm,
              }}
            >
              {lastMatchedEmotion.emoji}
            </div>
            <div
              style={{
                fontSize: THEME.fontSizes.lg,
                fontWeight: 700,
                color: lastMatchedEmotion.color,
                marginBottom: THEME.spacing.md,
              }}
            >
              That's {lastMatchedEmotion.name}!
            </div>
            <div
              style={{
                fontSize: THEME.fontSizes.sm,
                color: THEME.colors.textLight,
                fontStyle: 'italic',
              }}
            >
              "{currentFact}"
            </div>
            <div
              style={{
                marginTop: THEME.spacing.md,
                fontSize: THEME.fontSizes.md,
                fontWeight: 700,
                color: THEME.colors.success,
              }}
            >
              +20 points
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint button & Coach Calm area */}
      <div
        style={{
          padding: THEME.spacing.md,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: THEME.spacing.md,
        }}
      >
        <GameButton
          variant={hintsRemaining > 0 ? 'secondary' : 'ghost'}
          size="md"
          onClick={useHint}
          disabled={hintsRemaining <= 0 || isProcessing || gameState !== 'playing'}
          icon={<Lightbulb size={20} />}
        >
          {TEXT.hint} ({hintsRemaining > 99 ? '∞' : hintsRemaining})
        </GameButton>

        {/* Coach Calm encouragement (shows periodically) */}
        {!showMatchFeedback && moves > 0 && moves % 5 === 0 && (
          <CoachCalm
            type="encouragement"
            autoHide
            autoHideDelay={3000}
          />
        )}
      </div>
    </motion.div>
  );
};

export default GameScreen;
