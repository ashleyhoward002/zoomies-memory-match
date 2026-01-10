/**
 * HOME SCREEN
 * Main menu with Play button - ADHD-friendly design
 * Large buttons, clear hierarchy, no visual clutter
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Settings, HelpCircle } from 'lucide-react';
import { THEME, TEXT } from '../data/theme';
import GameButton from '../components/game/GameButton';

interface HomeScreenProps {
  onPlay: () => void;
  onSettings: () => void;
  onHowToPlay: () => void;
}

// Character data for the showcase (using headshot images)
// scale: custom zoom factor for characters with too much whitespace
const SHOWCASE_CHARACTERS = [
  { id: 'max', name: 'Max', color: '#4D96FF', image: '/images/characters/Max Emotions/Max Happy.png', scale: 1.0 },
  { id: 'zippy', name: 'Zippy', color: '#FF6B35', image: '/images/characters/Zippy Emotions/Zippy Headshot.png', scale: 1.0 },
  { id: 'luna', name: 'Luna', color: '#7C4DFF', image: '/images/characters/Luna Emotions/Luna Headshot.png', scale: 1.5 },
  { id: 'bounce', name: 'Bounce', color: '#FFD93D', image: '/images/characters/Bounce Emotions/Bounce Headshot.png', scale: 1.5 },
  { id: 'lucy', name: 'Lucy', color: '#4ECDC4', image: '/images/characters/Lucy Emotions/Lucy Headshot.png', scale: 1.0 },
  { id: 'papi', name: 'Papi', color: '#FF6B9D', image: '/images/characters/Papi Emotions/Papi Headshot.png', scale: 1.4 },
];

// Character image component with circular frame and solid background
const CharacterAvatar = ({
  name,
  color,
  image,
  size = 80,
  showName = false,
  delay = 0,
  imageScale = 1.0,
}: {
  name: string;
  color: string;
  image: string;
  size?: number;
  showName?: boolean;
  delay?: number;
  imageScale?: number;
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring' }}
      whileHover={{ scale: 1.1, y: -5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: THEME.spacing.xs,
      }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          delay: delay * 2,
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          // Solid white background to hide transparency/checkered patterns
          background: 'white',
          border: `4px solid ${color}`,
          boxShadow: `0 4px 12px ${color}44, 0 2px 8px rgba(0,0,0,0.1)`,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!imageError ? (
          <img
            src={image}
            alt={name}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              transform: `scale(${imageScale})`,
            }}
          />
        ) : (
          <span style={{ fontSize: size * 0.4, color: color }}>
            {name.charAt(0)}
          </span>
        )}
      </motion.div>
      {showName && (
        <span
          style={{
            fontSize: THEME.fontSizes.sm,
            fontWeight: 600,
            color: THEME.colors.text,
            fontFamily: THEME.fonts.main,
          }}
        >
          {name}
        </span>
      )}
    </motion.div>
  );
};

const HomeScreen = ({
  onPlay,
  onSettings,
  onHowToPlay,
}: HomeScreenProps) => {
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
        background: `linear-gradient(180deg, ${THEME.colors.background} 0%, ${THEME.colors.backgroundDark} 50%, ${THEME.colors.backgroundAlt} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating decorative elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          style={{
            position: 'absolute',
            top: `${10 + i * 15}%`,
            left: i % 2 === 0 ? `${5 + i * 5}%` : undefined,
            right: i % 2 !== 0 ? `${5 + i * 5}%` : undefined,
            fontSize: '1.5rem',
            pointerEvents: 'none',
          }}
        >
          {['⭐', '✨', '🌟', '💫', '⭐', '✨'][i]}
        </motion.div>
      ))}

      {/* Logo / Title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        style={{
          textAlign: 'center',
          marginBottom: THEME.spacing.xl,
        }}
      >
        {/* Treehouse Logo */}
        <motion.div
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            marginBottom: THEME.spacing.md,
          }}
        >
          <img
            src="/images/treehouse/Treehouse/Full Treehouse.png"
            alt="The Zoomies Treehouse"
            style={{
              width: '280px',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))',
            }}
          />
        </motion.div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 4rem)',
            fontWeight: 800,
            background: `linear-gradient(135deg, ${THEME.colors.primary}, ${THEME.colors.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: THEME.fonts.heading,
            margin: 0,
            letterSpacing: '-2px',
            textShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          {TEXT.gameTitle}
        </h1>

        <h2
          style={{
            fontSize: THEME.fontSizes['2xl'],
            fontWeight: 700,
            color: THEME.colors.text,
            fontFamily: THEME.fonts.heading,
            margin: `${THEME.spacing.xs} 0`,
          }}
        >
          {TEXT.gameSubtitle}
        </h2>

        <p
          style={{
            fontSize: THEME.fontSizes.md,
            color: THEME.colors.textLight,
            fontFamily: THEME.fonts.main,
            marginTop: THEME.spacing.sm,
            maxWidth: '320px',
            lineHeight: 1.4,
          }}
        >
          {TEXT.tagline}
        </p>
      </motion.div>

      {/* Menu buttons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: THEME.spacing.md,
          width: '100%',
          maxWidth: '320px',
        }}
      >
        <GameButton
          variant="primary"
          size="lg"
          fullWidth
          onClick={onPlay}
          icon={<Play size={26} />}
        >
          {TEXT.playButton}
        </GameButton>

        <div style={{ display: 'flex', gap: THEME.spacing.sm }}>
          <GameButton
            variant="outline"
            size="md"
            onClick={onHowToPlay}
            icon={<HelpCircle size={20} />}
            style={{ flex: 1 }}
          >
            How To
          </GameButton>

          <GameButton
            variant="outline"
            size="md"
            onClick={onSettings}
            icon={<Settings size={20} />}
            style={{ flex: 1 }}
          >
            Levels
          </GameButton>
        </div>
      </motion.div>

      {/* Character lineup at bottom with names (80px) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: THEME.spacing.lg,
          marginTop: THEME.spacing['2xl'],
          paddingBottom: THEME.spacing.lg,
        }}
      >
        {SHOWCASE_CHARACTERS.map((char, i) => (
          <CharacterAvatar
            key={`bottom-${char.id}`}
            name={char.name}
            color={char.color}
            image={char.image}
            size={80}
            showName={true}
            delay={0.7 + i * 0.08}
            imageScale={char.scale}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HomeScreen;
