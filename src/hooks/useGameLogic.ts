/**
 * GAME LOGIC HOOK
 * Handles all game state and logic for Memory Match
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { EMOTIONS, LEVELS, GAME_SETTINGS, CHARACTERS, getCharacterImage } from '../data/theme';
import type { EmotionId, CharacterId } from '../data/theme';

export interface CardData {
  id: string;
  emotionId: EmotionId;
  characterId: CharacterId;
  characterName: string;
  emotionName: string;
  emoji: string;
  color: string;
  imagePath: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type GameState = 'idle' | 'playing' | 'paused' | 'won';
export type GameMode = 'same-character' | 'emotion-match' | 'story-match';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Creates card pairs for Same Character Match mode
 * Each card shows character + emotion, match identical cards
 */
const createCardsForSameCharacterMode = (
  levelConfig: typeof LEVELS[number]
): CardData[] => {
  const cards: CardData[] = [];
  const { pairs, characters, emotions } = levelConfig;

  // Create pool of character-emotion combinations
  const combinations: Array<{ characterId: string; emotionId: string }> = [];

  for (const characterId of characters) {
    for (const emotionId of emotions) {
      combinations.push({ characterId, emotionId });
    }
  }

  // Shuffle and select the number of pairs needed
  const selectedCombos = shuffleArray(combinations).slice(0, pairs);

  // Create two cards for each combination (a pair)
  selectedCombos.forEach((combo) => {
    const character = CHARACTERS.find(c => c.id === combo.characterId);
    const emotion = EMOTIONS.find(e => e.id === combo.emotionId);

    if (!character || !emotion) return;

    const baseCard = {
      emotionId: combo.emotionId as EmotionId,
      characterId: combo.characterId as CharacterId,
      characterName: character.name,
      emotionName: emotion.name,
      emoji: emotion.emoji,
      color: emotion.color,
      imagePath: getCharacterImage(combo.characterId, combo.emotionId),
      isFlipped: false,
      isMatched: false,
    };

    // Create pair (two identical cards)
    cards.push({ ...baseCard, id: `${combo.characterId}-${combo.emotionId}-a` });
    cards.push({ ...baseCard, id: `${combo.characterId}-${combo.emotionId}-b` });
  });

  return shuffleArray(cards);
};

/**
 * Calculate star rating based on moves
 */
const calculateStars = (moves: number, thresholds: readonly number[]): number => {
  if (moves <= thresholds[0]) return 3;
  if (moves <= thresholds[1]) return 2;
  return 1;
};

/**
 * Check if two cards match (same character + same emotion in Same Character mode)
 */
const cardsMatch = (card1: CardData, card2: CardData, mode: GameMode): boolean => {
  if (mode === 'same-character') {
    return card1.characterId === card2.characterId &&
           card1.emotionId === card2.emotionId;
  }
  // For emotion-match mode (future): same emotion, different character
  if (mode === 'emotion-match') {
    return card1.emotionId === card2.emotionId;
  }
  return false;
};

export const useGameLogic = (initialLevel = 1) => {
  // Game state
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentLevel, setCurrentLevel] = useState(initialLevel);
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardData[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsRemaining, setHintsRemaining] = useState<number>(3);
  const [timer, setTimer] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [streak, setStreak] = useState(0);
  const [lastMatchedEmotion, setLastMatchedEmotion] = useState<typeof EMOTIONS[number] | null>(null);

  // Refs
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastFlipTimeRef = useRef<number>(Date.now());

  // Get current level config
  const levelConfig = LEVELS.find(l => l.id === currentLevel) || LEVELS[0];
  const totalPairs = levelConfig.pairs;

  /**
   * Start a new game
   */
  const startGame = useCallback((level = currentLevel) => {
    const config = LEVELS.find(l => l.id === level) || LEVELS[0];
    const newCards = createCardsForSameCharacterMode(config);

    setCurrentLevel(level);
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setScore(0);
    setHintsRemaining(config.hints);
    setTimer(0);
    setGameState('playing');
    setIsProcessing(false);
    setStreak(0);
    setLastMatchedEmotion(null);

    // Start timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);
  }, [currentLevel]);

  /**
   * Handle card click
   */
  const handleCardClick = useCallback((cardId: string) => {
    if (isProcessing || gameState !== 'playing') return;

    const clickedCard = cards.find(c => c.id === cardId);

    // Ignore if card is already flipped or matched
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Ignore if we already have 2 cards flipped
    if (flippedCards.length >= 2) return;

    // Track flip time for quick match bonus
    lastFlipTimeRef.current = Date.now();

    // Flip the card
    const newCards = cards.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    // Check for match if we have 2 cards
    if (newFlippedCards.length === 2) {
      setMoves(m => m + 1);
      setIsProcessing(true);

      const [first, second] = newFlippedCards;

      if (cardsMatch(first, second, levelConfig.mode)) {
        // Match found!
        const timeSinceFlip = Date.now() - lastFlipTimeRef.current;
        const isQuickMatch = timeSinceFlip < 3000;

        setTimeout(() => {
          // Mark cards as matched
          setCards(prevCards =>
            prevCards.map(card =>
              (card.characterId === first.characterId && card.emotionId === first.emotionId)
                ? { ...card, isMatched: true }
                : card
            )
          );

          // Update matched pairs
          const pairId = `${first.characterId}-${first.emotionId}`;
          setMatchedPairs(prev => [...prev, pairId]);

          // Calculate score
          let earnedPoints = GAME_SETTINGS.pointsPerMatch;
          if (isQuickMatch) earnedPoints += GAME_SETTINGS.quickMatchBonus;

          // Streak bonus
          setStreak(s => {
            const newStreak = s + 1;
            if (newStreak >= 3) {
              earnedPoints += GAME_SETTINGS.streakBonus;
            }
            return newStreak;
          });

          setScore(s => s + earnedPoints);

          // Store matched emotion for fact display
          const emotion = EMOTIONS.find(e => e.id === first.emotionId);
          if (emotion) setLastMatchedEmotion(emotion);

          setFlippedCards([]);
          setIsProcessing(false);
        }, GAME_SETTINGS.matchDelay);
      } else {
        // No match - flip back
        setStreak(0); // Reset streak

        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);
        }, GAME_SETTINGS.flipDelay);
      }
    }
  }, [cards, flippedCards, isProcessing, gameState, levelConfig.mode]);

  /**
   * Use a hint - Coach Calm helps!
   */
  const useHint = useCallback(() => {
    if (hintsRemaining <= 0 || isProcessing || gameState !== 'playing') return;

    // Find an unmatched pair
    const unmatchedCards = cards.filter(c => !c.isMatched && !c.isFlipped);
    if (unmatchedCards.length < 2) return;

    // Find a matching pair
    const firstCard = unmatchedCards[0];
    const matchingCard = unmatchedCards.find(
      c => c.id !== firstCard.id &&
           c.characterId === firstCard.characterId &&
           c.emotionId === firstCard.emotionId
    );

    if (!matchingCard) return;

    setIsProcessing(true);
    setHintsRemaining(h => h - 1);
    setScore(s => Math.max(0, s - GAME_SETTINGS.hintPenalty));

    // Briefly show the matching pair
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === firstCard.id || card.id === matchingCard.id
          ? { ...card, isFlipped: true }
          : card
      )
    );

    setTimeout(() => {
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === firstCard.id || card.id === matchingCard.id
            ? { ...card, isFlipped: false }
            : card
        )
      );
      setIsProcessing(false);
    }, GAME_SETTINGS.hintDuration);
  }, [cards, hintsRemaining, isProcessing, gameState]);

  /**
   * Pause/Resume game
   */
  const togglePause = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused');
      if (timerRef.current) clearInterval(timerRef.current);
    } else if (gameState === 'paused') {
      setGameState('playing');
      timerRef.current = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
  }, [gameState]);

  /**
   * Reset game (play again at same level)
   */
  const resetGame = useCallback(() => {
    startGame(currentLevel);
  }, [currentLevel, startGame]);

  /**
   * Next level
   */
  const nextLevel = useCallback(() => {
    const nextLevelId = currentLevel + 1;
    if (nextLevelId <= LEVELS.length) {
      startGame(nextLevelId);
    }
  }, [currentLevel, startGame]);

  /**
   * Calculate final score with bonuses
   */
  const calculateFinalScore = useCallback(() => {
    let finalScore = score;

    // Level complete bonus
    finalScore += GAME_SETTINGS.levelCompleteBonus;

    // Time bonus (if there was a time limit)
    if (levelConfig.timeLimit) {
      const timeRemaining = levelConfig.timeLimit - timer;
      if (timeRemaining > 0) {
        finalScore += timeRemaining * GAME_SETTINGS.timeBonus;
      }
    }

    return finalScore;
  }, [score, timer, levelConfig.timeLimit]);

  // Check for win condition
  useEffect(() => {
    if (gameState === 'playing' && matchedPairs.length === totalPairs) {
      // Stop timer
      if (timerRef.current) clearInterval(timerRef.current);
      setGameState('won');
    }
  }, [matchedPairs.length, totalPairs, gameState]);

  // Check for time limit exceeded
  useEffect(() => {
    if (gameState === 'playing' && levelConfig.timeLimit && timer >= levelConfig.timeLimit) {
      // Time's up! Still let them finish (ADHD-friendly - no punishment)
      // Just stop giving time bonus
    }
  }, [timer, levelConfig.timeLimit, gameState]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const stars = calculateStars(moves, levelConfig.starThresholds);
  const finalScore = calculateFinalScore();

  return {
    // State
    gameState,
    currentLevel,
    cards,
    matchedPairs,
    moves,
    score,
    finalScore,
    hintsRemaining,
    timer,
    isProcessing,
    stars,
    streak,
    lastMatchedEmotion,

    // Config
    levelConfig,
    totalPairs,

    // Actions
    startGame,
    handleCardClick,
    useHint,
    togglePause,
    resetGame,
    nextLevel,
    setCurrentLevel,
  };
};

export default useGameLogic;
