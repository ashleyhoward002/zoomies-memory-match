/**
 * AUDIO HOOK
 * Manages background music and sound effects
 * CRITICAL: Only ONE background track at a time!
 */

import { useState, useEffect, useRef, useCallback } from 'react';

interface AudioConfig {
  volume?: number;
  loop?: boolean;
}

export const useAudio = () => {
  // Sound enabled state - persisted in localStorage
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('zoomies-sound');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  // Ref for background music
  const musicRef = useRef<HTMLAudioElement | null>(null);

  // Save sound preference to localStorage
  useEffect(() => {
    localStorage.setItem('zoomies-sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    };
  }, []);

  /**
   * Toggle sound on/off
   */
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newValue = !prev;
      if (!newValue && musicRef.current) {
        musicRef.current.pause();
        setIsPlaying(false);
      }
      return newValue;
    });
  }, []);

  /**
   * Play background music
   * CRITICAL: Stops any current music before playing new track
   */
  const playMusic = useCallback((src: string, config: AudioConfig = {}) => {
    if (!soundEnabled) return;

    const { volume = 0.2, loop = true } = config;

    // Stop current music first (CRITICAL RULE)
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current = null;
    }

    // Create new audio element
    const audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop;

    // Handle play promise (browsers may block autoplay)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setCurrentTrack(src);
        })
        .catch((error) => {
          console.log('Audio autoplay blocked:', error);
          setIsPlaying(false);
        });
    }

    musicRef.current = audio;

    // Handle when track ends (if not looping)
    audio.onended = () => {
      if (!loop) {
        setIsPlaying(false);
        setCurrentTrack(null);
      }
    };
  }, [soundEnabled]);

  /**
   * Stop background music
   */
  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
      musicRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  }, []);

  /**
   * Pause background music (can resume)
   */
  const pauseMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  /**
   * Resume background music
   */
  const resumeMusic = useCallback(() => {
    if (!soundEnabled) return;

    if (musicRef.current) {
      const playPromise = musicRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [soundEnabled]);

  /**
   * Play a sound effect (doesn't interrupt music)
   */
  const playSfx = useCallback((src: string, volume = 0.5) => {
    if (!soundEnabled) return;

    // Create new audio for SFX (allows overlapping)
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => {
      // Silently fail if blocked
    });
  }, [soundEnabled]);

  /**
   * Set music volume (0-1)
   */
  const setMusicVolume = useCallback((volume: number) => {
    if (musicRef.current) {
      musicRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  return {
    soundEnabled,
    isPlaying,
    currentTrack,
    toggleSound,
    playMusic,
    stopMusic,
    pauseMusic,
    resumeMusic,
    playSfx,
    setMusicVolume,
  };
};

export default useAudio;
