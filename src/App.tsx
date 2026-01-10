/**
 * THE ZOOMIES: MEMORY MATCH
 * Main Application - Educational memory game for neurodivergent children
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

// Screens
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import VictoryScreen from './screens/VictoryScreen';
import LevelSelectScreen from './screens/LevelSelectScreen';
import HowToPlayScreen from './screens/HowToPlayScreen';

// Components
import PauseOverlay from './components/game/PauseOverlay';
import SoundToggle from './components/game/SoundToggle';

// Hooks & Data
import useGameLogic from './hooks/useGameLogic';
import { THEME, LEVELS } from './data/theme';

type Screen = 'home' | 'game' | 'victory';

// SINGLE audio track - only ONE track ever
const THEME_MUSIC = '/audio/theme-song.mp3';

function App() {
  // Screen state
  const [screen, setScreen] = useState<Screen>('home');
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showPause, setShowPause] = useState(false);

  // Audio state - persisted in localStorage
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('zoomies-sound');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });
  const [musicStarted, setMusicStarted] = useState(false);

  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Progress tracking (localStorage persistence)
  const [starsEarned, setStarsEarned] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('zoomies-stars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Game logic
  const gameLogic = useGameLogic(1);

  // Save sound preference to localStorage
  useEffect(() => {
    localStorage.setItem('zoomies-sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('zoomies-stars', JSON.stringify(starsEarned));
  }, [starsEarned]);

  // Watch for win condition
  useEffect(() => {
    if (gameLogic.gameState === 'won') {
      // Save stars for this level
      const currentStars = starsEarned[gameLogic.currentLevel] || 0;
      if (gameLogic.stars > currentStars) {
        setStarsEarned(prev => ({
          ...prev,
          [gameLogic.currentLevel]: gameLogic.stars,
        }));
      }
      setScreen('victory');
    }
  }, [gameLogic.gameState, gameLogic.currentLevel, gameLogic.stars, starsEarned]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  /**
   * Start the theme music (only ONE track ever!)
   * Called when "Play Game" is clicked
   */
  const startMusic = useCallback(() => {
    if (!soundEnabled || musicStarted) return;

    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio(THEME_MUSIC);
      audioRef.current.volume = 0.2;
      audioRef.current.loop = true;
    }

    audioRef.current.play()
      .then(() => setMusicStarted(true))
      .catch((err) => console.log('Audio autoplay blocked:', err));
  }, [soundEnabled, musicStarted]);

  /**
   * Toggle sound on/off
   * Stops or resumes the ONE track
   */
  const handleToggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newValue = !prev;
      if (audioRef.current) {
        if (newValue && musicStarted) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
      return newValue;
    });
  }, [musicStarted]);

  // Handler functions
  const handlePlay = () => {
    // Start music when user clicks Play (first interaction)
    startMusic();
    gameLogic.startGame(gameLogic.currentLevel);
    setScreen('game');
  };

  const handleBack = () => {
    setShowPause(true);
  };

  const handlePause = () => {
    gameLogic.togglePause();
    setShowPause(true);
    // Pause music during pause overlay
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleResume = () => {
    gameLogic.togglePause();
    setShowPause(false);
    // Resume music
    if (audioRef.current && soundEnabled) {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleQuit = () => {
    setShowPause(false);
    setScreen('home');
    // Keep music playing (it's the same track)
  };

  const handlePlayAgain = () => {
    gameLogic.resetGame();
    setScreen('game');
    // Music keeps playing (same track)
  };

  const handleNextLevel = () => {
    gameLogic.nextLevel();
    setScreen('game');
    // Music keeps playing (same track)
  };

  const handleHome = () => {
    setScreen('home');
    // Music keeps playing (same track)
  };

  const handleSelectLevel = (levelId: number) => {
    // Start music when selecting a level too
    startMusic();
    gameLogic.setCurrentLevel(levelId);
    gameLogic.startGame(levelId);
    setShowLevelSelector(false);
    setScreen('game');
  };

  const hasNextLevel = gameLogic.currentLevel < LEVELS.length;

  return (
    <div
      style={{
        fontFamily: THEME.fonts.main,
        minHeight: '100vh',
        background: THEME.colors.background,
      }}
    >
      {/* Global Sound Toggle - appears on all screens */}
      <SoundToggle
        soundEnabled={soundEnabled}
        onToggle={handleToggleSound}
      />

      {/* Main screen content */}
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <HomeScreen
            key="home"
            onPlay={handlePlay}
            onSettings={() => setShowLevelSelector(true)}
            onHowToPlay={() => setShowHowToPlay(true)}
          />
        )}

        {screen === 'game' && (
          <GameScreen
            key="game"
            gameLogic={gameLogic}
            onBack={handleBack}
            onPause={handlePause}
          />
        )}

        {screen === 'victory' && (
          <VictoryScreen
            key="victory"
            score={gameLogic.finalScore}
            moves={gameLogic.moves}
            timer={gameLogic.timer}
            stars={gameLogic.stars}
            hasNextLevel={hasNextLevel}
            onPlayAgain={handlePlayAgain}
            onNextLevel={handleNextLevel}
            onHome={handleHome}
          />
        )}
      </AnimatePresence>

      {/* Overlays */}
      <PauseOverlay
        isOpen={showPause}
        onResume={handleResume}
        onQuit={handleQuit}
      />

      <LevelSelectScreen
        isOpen={showLevelSelector}
        onClose={() => setShowLevelSelector(false)}
        currentLevel={gameLogic.currentLevel}
        onSelectLevel={handleSelectLevel}
        starsEarned={starsEarned}
      />

      <HowToPlayScreen
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
    </div>
  );
}

export default App;
