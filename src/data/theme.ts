/**
 * THE ZOOMIES: MEMORY MATCH - THEME CONFIGURATION
 * ADHD-friendly design system for neurodivergent children ages 4-10
 */

// Character colors from PRD
export const CHARACTER_COLORS = {
  zippy: '#FF6B35',   // Orange Squirrel
  luna: '#7C4DFF',    // Brown Owl
  bounce: '#FFD93D',  // Tan Kangaroo
  lucy: '#4ECDC4',    // Black Labrador
  papi: '#FFE66D',    // White Cockatoo
  coachCalm: '#6BCB77', // Green Turtle
  max: '#4D96FF',     // Human Boy
} as const;

export const THEME = {
  colors: {
    // Character colors
    ...CHARACTER_COLORS,

    // Primary brand colors (Zippy Orange)
    primary: '#FF6B35',
    primaryLight: '#FF8F66',
    primaryDark: '#E55A2B',

    // Secondary (Luna Purple)
    secondary: '#7C4DFF',
    secondaryLight: '#A07FFF',
    secondaryDark: '#5C35CC',

    // Background colors (warm, calming)
    background: '#FFF8F0',
    backgroundDark: '#FFF0E0',
    backgroundAlt: '#E8F4F8', // Soft sky blue
    cardBackground: '#FFFFFF',

    // Text colors
    text: '#2D3436',
    textLight: '#636E72',
    textMuted: '#B2BEC3',

    // State colors
    success: '#4CAF50',
    successLight: '#6BCB77',
    warning: '#FF9800',
    warningLight: '#FFD93D',
    error: '#FF6B6B',

    // Card specific
    cardBack: '#4D96FF',
    cardBackGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardMatched: '#4CAF50',
    cardFlipped: '#FFFFFF',

    // UI elements
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },

  fonts: {
    main: "'Nunito', 'Segoe UI', system-ui, sans-serif",
    heading: "'Nunito', 'Segoe UI', system-ui, sans-serif",
  },

  // Minimum 18px for body, 22px for buttons (ADHD-friendly)
  fontSizes: {
    xs: '0.875rem',   // 14px
    sm: '1rem',       // 16px
    md: '1.125rem',   // 18px (minimum body)
    lg: '1.375rem',   // 22px (button text)
    xl: '1.75rem',    // 28px
    '2xl': '2.25rem', // 36px
    '3xl': '3rem',    // 48px
    '4xl': '4rem',    // 64px
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },

  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 12px 48px rgba(0, 0, 0, 0.15)',
    glow: '0 0 20px rgba(124, 77, 255, 0.3)',
    success: '0 0 20px rgba(76, 175, 80, 0.3)',
  },

  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
    bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },

  // ADHD-friendly: Large touch targets (64px min, 80px preferred)
  touchTarget: {
    min: '64px',
    preferred: '80px',
    button: '52px',
    buttonLg: '60px',
  },
} as const;

/**
 * TEXT STRINGS
 * All game text in one place for easy updates/translations
 */
export const TEXT = {
  // Branding
  gameTitle: 'The Zoomies',
  gameSubtitle: 'Memory Match',
  tagline: "Every brain is different, and that's what makes us special!",

  // Home screen
  playButton: 'Play Game',
  settingsButton: 'Settings',
  howToPlay: 'How To Play',

  // Game screen
  score: 'Score',
  moves: 'Moves',
  pairs: 'Pairs',
  timer: 'Time',
  hint: 'Hint',
  pause: 'Pause',
  resume: 'Resume',
  quit: 'Quit',
  exit: 'Exit',

  // Victory screen
  congratulations: 'Amazing Job!',
  perfectScore: 'Perfect! You matched them all!',
  greatScore: 'Great work! You did awesome!',
  goodScore: 'Well done! Keep practicing!',
  playAgain: 'Play Again',
  nextLevel: 'Next Level',
  backToHome: 'Treehouse',

  // Coach Calm messages
  coachEncouragement: [
    "You're doing great! Keep going!",
    "Take your time, there's no rush!",
    "Every match helps you learn!",
    "I believe in you!",
    "Nice try! You'll get it!",
  ],
  coachHint: "Hmm... I remember seeing that emotion over here...",
  coachMatch: "Wonderful! You found a match!",
  coachVictory: "You did it! I'm so proud of you!",

  // Level names
  levels: {
    1: 'Level 1',
    2: 'Level 2',
    3: 'Level 3',
    4: 'Level 4',
    5: 'Level 5',
  },
} as const;

/**
 * EMOTIONS DATA
 * 6 core emotions with educational facts
 */
export const EMOTIONS = [
  {
    id: 'happy',
    name: 'Happy',
    emoji: '😊',
    color: '#FFD93D',
    facts: [
      "When we smile, our brain releases happy chemicals!",
      "Sharing happiness makes it grow bigger!",
      "It's okay to feel happy even when others are sad.",
    ],
  },
  {
    id: 'sad',
    name: 'Sad',
    emoji: '😢',
    color: '#74B9FF',
    facts: [
      "Everyone feels sad sometimes - it's normal!",
      "Crying can help us feel better.",
      "It's okay to ask for a hug when you're sad.",
    ],
  },
  {
    id: 'angry',
    name: 'Angry',
    emoji: '😠',
    color: '#FF6B6B',
    facts: [
      "Feeling angry is okay. Hurting others is not okay.",
      "Taking deep breaths can help calm big feelings.",
      "It's okay to need alone time when you're angry.",
    ],
  },
  {
    id: 'surprised',
    name: 'Surprised',
    emoji: '😲',
    color: '#A29BFE',
    facts: [
      "Surprises can feel exciting or scary!",
      "Our eyes get big when we're surprised!",
      "Some surprises are good, some need time to understand.",
    ],
  },
  {
    id: 'scared',
    name: 'Scared',
    emoji: '😨',
    color: '#81ECEC',
    facts: [
      "Being brave doesn't mean never being scared.",
      "It's smart to be scared of dangerous things!",
      "Talking about fears can make them smaller.",
    ],
  },
  {
    id: 'calm',
    name: 'Calm',
    emoji: '😌',
    color: '#6BCB77',
    facts: [
      "Calm feels like a quiet pond inside.",
      "Deep breaths help us find our calm.",
      "Everyone can learn to find their calm place.",
    ],
  },
] as const;

export type EmotionId = typeof EMOTIONS[number]['id'];
export type Emotion = typeof EMOTIONS[number];

/**
 * CHARACTERS DATA
 * The Zoomies cast
 */
export const CHARACTERS = [
  {
    id: 'max',
    name: 'Max',
    animal: 'Human Boy',
    color: '#4D96FF',
    description: 'A curious boy learning about emotions',
  },
  {
    id: 'zippy',
    name: 'Zippy',
    animal: 'Squirrel',
    color: '#FF6B35',
    description: 'Energetic and always on the move!',
  },
  {
    id: 'luna',
    name: 'Luna',
    animal: 'Owl',
    color: '#7C4DFF',
    description: 'Thoughtful and a bit dreamy',
  },
  {
    id: 'lucy',
    name: 'Lucy',
    animal: 'Labrador',
    color: '#4ECDC4',
    description: 'Friendly and loves to play',
  },
  {
    id: 'bounce',
    name: 'Bounce',
    animal: 'Kangaroo',
    color: '#FFD93D',
    description: "Can't sit still - loves to jump!",
  },
  {
    id: 'papi',
    name: 'Papi',
    animal: 'Cockatoo',
    color: '#FFE66D',
    description: 'Expressive with BIG feelings',
  },
  {
    id: 'coach-calm',
    name: 'Coach Calm',
    animal: 'Turtle',
    color: '#6BCB77',
    description: 'Wise, patient guide',
  },
] as const;

export type CharacterId = typeof CHARACTERS[number]['id'];
export type Character = typeof CHARACTERS[number];

/**
 * CHARACTER IMAGES MAP
 * Maps character + emotion to actual image file paths
 * Uses Happy as fallback for missing emotions
 */
export const CHARACTER_IMAGES: Record<string, Record<string, string>> = {
  max: {
    happy: '/images/characters/Max Emotions/Max Happy.png',
    sad: '/images/characters/Max Emotions/Max Sad.png',
    angry: '/images/characters/Max Emotions/Max Angry.png',
    scared: '/images/characters/Max Emotions/Max Scared.png',
    calm: '/images/characters/Max Emotions/Max Calm.png',
    surprised: '/images/characters/Max Emotions/Max Happy.png', // fallback to happy
    headshot: '/images/characters/Max Emotions/Max Happy.png', // use happy as headshot
  },
  zippy: {
    happy: '/images/characters/Zippy Emotions/Zippy Happy.png',
    sad: '/images/characters/Zippy Emotions/Zippy Sad.png',
    angry: '/images/characters/Zippy Emotions/Zippy Angry.png',
    surprised: '/images/characters/Zippy Emotions/Zippy Surprised.png',
    scared: '/images/characters/Zippy Emotions/Zippy Sad.png', // fallback to sad
    calm: '/images/characters/Zippy Emotions/Zippy Sleepy.png', // fallback to sleepy
    headshot: '/images/characters/Zippy Emotions/Zippy Headshot.png',
  },
  luna: {
    happy: '/images/characters/Luna Emotions/Luna Happy.png',
    sad: '/images/characters/Luna Emotions/Luna Sad (2).png',
    angry: '/images/characters/Luna Emotions/Luna Angry.png',
    surprised: '/images/characters/Luna Emotions/Luna Surprised.png',
    calm: '/images/characters/Luna Emotions/Luna Calm.png',
    scared: '/images/characters/Luna Emotions/Luna Tired.png', // fallback to tired
    headshot: '/images/characters/Luna Emotions/Luna Headshot.png',
  },
  lucy: {
    happy: '/images/characters/Lucy Emotions/Lucy Happy.png',
    sad: '/images/characters/Lucy Emotions/Lucy Sad.png',
    angry: '/images/characters/Lucy Emotions/Lucy Angry.png',
    surprised: '/images/characters/Lucy Emotions/Lucy Surprised.png',
    calm: '/images/characters/Lucy Emotions/Lucy Calm.png',
    scared: '/images/characters/Lucy Emotions/Lucy Annoyed.png', // fallback to annoyed
    headshot: '/images/characters/Lucy Emotions/Lucy Headshot.png',
  },
  bounce: {
    happy: '/images/characters/Bounce Emotions/Bounce Happy.png',
    sad: '/images/characters/Bounce Emotions/Bounce Sad.png',
    angry: '/images/characters/Bounce Emotions/Bounce Angry.png',
    calm: '/images/characters/Bounce Emotions/Bounce Calm.png',
    scared: '/images/characters/Bounce Emotions/Bounced Confused.png', // use confused
    surprised: '/images/characters/Bounce Emotions/Bounce Hop.png', // use hop
    headshot: '/images/characters/Bounce Emotions/Bounce Headshot.png',
  },
  papi: {
    happy: '/images/characters/Papi Emotions/Papi Happy.png',
    sad: '/images/characters/Papi Emotions/Papi Sad.png',
    angry: '/images/characters/Papi Emotions/Papi Angry.png',
    surprised: '/images/characters/Papi Emotions/Papi Surprised.png',
    calm: '/images/characters/Papi Emotions/Papi Sleepy.png', // fallback to sleepy
    scared: '/images/characters/Papi Emotions/Papi Tired.png', // fallback to tired
    headshot: '/images/characters/Papi Emotions/Papi Headshot.png',
  },
  'coach-calm': {
    happy: '/images/characters/Coach Calm Emotions/Coach Calm Happy.png',
    sad: '/images/characters/Coach Calm Emotions/Coach Calm Sad.png',
    angry: '/images/characters/Coach Calm Emotions/Coach Calm Angry.png',
    scared: '/images/characters/Coach Calm Emotions/Coach Calm Scared.png',
    calm: '/images/characters/Coach Calm Emotions/Coach Calm Calm.png',
    surprised: '/images/characters/Coach Calm Emotions/Coach Calm Happy.png', // fallback
    headshot: '/images/characters/Coach Calm Emotions/Coach Calm Headshot.png',
  },
};

/**
 * Get character image path with fallback
 */
export const getCharacterImage = (characterId: string, emotionId: string): string => {
  const character = CHARACTER_IMAGES[characterId];
  if (!character) {
    return CHARACTER_IMAGES.max.happy; // ultimate fallback
  }
  return character[emotionId] || character.happy;
};

/**
 * LEVEL CONFIGURATION
 * Same Character Match mode (Mode 1)
 */
export const LEVELS = [
  {
    id: 1,
    name: 'Level 1',
    pairs: 4,
    gridCols: 4,
    gridRows: 2,
    timeLimit: null,
    hints: 999, // Unlimited for beginners
    mode: 'same-character' as const,
    characters: ['max'],
    emotions: ['happy', 'sad', 'angry', 'scared'],
    starsRequired: 0,
    starThresholds: [4, 6, 8], // moves for 3, 2, 1 star
  },
  {
    id: 2,
    name: 'Level 2',
    pairs: 6,
    gridCols: 4,
    gridRows: 3,
    timeLimit: null,
    hints: 3,
    mode: 'same-character' as const,
    characters: ['max', 'zippy'],
    emotions: ['happy', 'sad', 'angry', 'surprised', 'scared', 'calm'],
    starsRequired: 1,
    starThresholds: [6, 9, 12],
  },
  {
    id: 3,
    name: 'Level 3',
    pairs: 8,
    gridCols: 4,
    gridRows: 4,
    timeLimit: 120,
    hints: 2,
    mode: 'same-character' as const,
    characters: ['max', 'zippy', 'luna'],
    emotions: ['happy', 'sad', 'angry', 'surprised', 'scared', 'calm'],
    starsRequired: 4,
    starThresholds: [8, 12, 16],
  },
  {
    id: 4,
    name: 'Level 4',
    pairs: 10,
    gridCols: 5,
    gridRows: 4,
    timeLimit: 90,
    hints: 1,
    mode: 'same-character' as const,
    characters: ['max', 'zippy', 'luna', 'lucy'],
    emotions: ['happy', 'sad', 'angry', 'surprised', 'scared', 'calm'],
    starsRequired: 8,
    starThresholds: [10, 15, 20],
  },
  {
    id: 5,
    name: 'Level 5',
    pairs: 12,
    gridCols: 6,
    gridRows: 4,
    timeLimit: 60,
    hints: 0,
    mode: 'same-character' as const,
    characters: ['max', 'zippy', 'luna', 'lucy', 'bounce', 'papi'],
    emotions: ['happy', 'sad', 'angry', 'surprised', 'scared', 'calm'],
    starsRequired: 12,
    starThresholds: [12, 18, 24],
  },
] as const;

export type Level = typeof LEVELS[number];

/**
 * GAME SETTINGS
 */
export const GAME_SETTINGS = {
  flipDelay: 1000,      // ms before non-matching cards flip back
  matchDelay: 500,      // ms delay after finding a match
  hintDuration: 1500,   // ms to show hint

  // Scoring (from PRD)
  pointsPerMatch: 20,
  quickMatchBonus: 10,  // under 3 seconds
  streakBonus: 5,       // 3+ matches in a row
  levelCompleteBonus: 50,
  timeBonus: 1,         // per second remaining
  hintPenalty: 5,
} as const;

/**
 * AUDIO CONFIGURATION
 * CRITICAL: Only ONE background track at a time!
 */
export const AUDIO = {
  music: {
    home: { file: 'theme-song.mp3', volume: 0.2 },
    game: { file: 'skipping-stones-1.mp3', volume: 0.15 },
    victory: { file: 'youre-amazing.mp3', volume: 0.3 },
  },
  sfx: {
    cardFlip: { file: 'card-flip.mp3', volume: 0.5 },
    match: { file: 'match-ding.mp3', volume: 0.5 },
    noMatch: { file: 'no-match-boop.mp3', volume: 0.3 },
    buttonClick: { file: 'button-click.mp3', volume: 0.4 },
    hint: { file: 'coach-hmm.mp3', volume: 0.5 },
    victory: { file: 'victory-jingle.mp3', volume: 0.5 },
  },
} as const;
