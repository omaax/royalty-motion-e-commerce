import React from 'react';
import { motion } from 'motion/react';

// Rolling text hover (per the Motion docs): each character lives in a one-line
// clipped window holding two stacked copies. On hover the outgoing copy rolls
// DOWN out of the window (y 0% -> 100%) while the incoming copy rolls DOWN in
// from above (y -100% -> 0%), staggered per character.
const OUTGOING_VARIANTS = {
  initial: { y: '0%' },
  hover: { y: '100%' },
};

const INCOMING_VARIANTS = {
  initial: { y: '-100%' },
  hover: { y: '0%' },
};

interface RollingTextProps {
  children: string;
  stagger?: number;
}

export const RollingText: React.FC<RollingTextProps> = ({ children, stagger = 0.025 }) => {
  const chars = children.split('');

  return (
    <motion.span
      initial="initial"
      whileHover="hover"
      variants={{
        initial: {},
        hover: { transition: { staggerChildren: stagger, delayChildren: 0.02 } },
      }}
      className="inline-block"
    >
      {chars.map((char, i) => (
        <span key={i} className="relative inline-block overflow-hidden align-top">
          <motion.span
            variants={OUTGOING_VARIANTS}
            transition={{ type: 'spring', stiffness: 500, damping: 42, mass: 0.8 }}
            className="block whitespace-pre"
          >
            {char}
          </motion.span>
          <motion.span
            variants={INCOMING_VARIANTS}
            transition={{ type: 'spring', stiffness: 500, damping: 42, mass: 0.8 }}
            aria-hidden
            className="block whitespace-pre absolute inset-0"
          >
            {char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};