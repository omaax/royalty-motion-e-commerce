import React from 'react';
import { motion } from 'motion/react';

type MotionButtonVariant = 'ghost' | 'solid';

interface MotionButtonProps {
  variant?: MotionButtonVariant;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  children: React.ReactNode;
}

const VARIANT_STYLES: Record<
  MotionButtonVariant,
  { base: string; fill: string; content: { initial: string; hover: string } }
> = {
  ghost: {
    base: 'border border-gray-400 text-black',
    fill: 'bg-black',
    content: { initial: '#000000', hover: '#ffffff' },
  },
  solid: {
    base: 'border border-black bg-black text-white',
    fill: 'bg-white',
    content: { initial: '#ffffff', hover: '#000000' },
  },
};

export const MotionButton: React.FC<MotionButtonProps> = ({
  variant = 'ghost',
  onClick: onButtonClick,
  disabled = false,
  type = 'button',
  className = '',
  style,
  title,
  children,
}) => {
  const styles = VARIANT_STYLES[variant];
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onButtonClick?.(e);
  };

  const hasRounded = /(^|\s)rounded(-\S+)?(\s|$)/.test(className);
  const roundedClass = hasRounded ? '' : 'rounded-md';
  const hasPosition = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className);
  const positionClass = hasPosition ? '' : 'relative';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      style={style}
      className={`${positionClass} overflow-hidden inline-flex self-start items-center justify-center select-none cursor-pointer ${roundedClass} disabled:opacity-50 disabled:cursor-not-allowed ${styles.base} ${className}`}
    >
      <motion.div
        variants={{ initial: { x: '-100%' }, hover: { x: '0%' } }}
        transition={{ type: 'tween', ease: [0.25, 1, 0.5, 1], duration: 0.35 }}
        className={`absolute inset-0 ${styles.fill} pointer-events-none`}
      />
      <motion.span
        key={variant}
        variants={{
          initial: { color: styles.content.initial },
          hover: { color: styles.content.hover },
        }}
        transition={{ duration: 0.25 }}
        className="relative z-10 flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );
};