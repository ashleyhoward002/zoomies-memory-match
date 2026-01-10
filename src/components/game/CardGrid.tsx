/**
 * CARD GRID COMPONENT
 * Responsive grid of memory cards
 */

import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { THEME } from '../../data/theme';
import type { CardData } from '../../hooks/useGameLogic';

interface CardGridProps {
  cards: CardData[];
  onCardClick: (cardId: string) => void;
  gridCols?: number;
  disabled?: boolean;
}

const CardGrid: React.FC<CardGridProps> = ({
  cards,
  onCardClick,
  gridCols = 4,
  disabled = false,
}) => {
  // Calculate responsive grid
  const getGridStyles = (): React.CSSProperties => {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${Math.min(gridCols, 4)}, 1fr)`,
      gap: THEME.spacing.md,
      width: '100%',
      maxWidth: `${gridCols * 110}px`,
      margin: '0 auto',
      padding: THEME.spacing.md,
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={getGridStyles()}
      className="card-grid"
    >
      <style>
        {`
          @media (min-width: ${THEME.breakpoints.tablet}) {
            .card-grid {
              grid-template-columns: repeat(${gridCols}, 1fr) !important;
              gap: ${THEME.spacing.lg} !important;
              max-width: ${gridCols * 130}px !important;
            }
          }

          @media (max-width: ${THEME.breakpoints.mobile}) {
            .card-grid {
              grid-template-columns: repeat(${Math.min(gridCols, 3)}, 1fr) !important;
              gap: ${THEME.spacing.sm} !important;
              padding: ${THEME.spacing.sm} !important;
              max-width: 100% !important;
            }
          }
        `}
      </style>

      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => onCardClick(card.id)}
          disabled={disabled}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default CardGrid;
