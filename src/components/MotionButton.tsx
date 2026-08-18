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
  { base: string; fill: string; hoverText: string }
> = {
  ghost: {
    base: 'border border-gray-400 text-black',
    fill: 'bg-black',
    hoverText: 'group-hover/btn:text-white',
  },
  solid: {
    base: 'border border-black bg-black text-white',
    fill: 'bg-white',
    hoverText: 'group-hover/btn:text-black',
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
      whileTap={{ scale: 0.97 }}
      style={style}
      className={`${positionClass} group/btn overflow-hidden inline-flex self-start items-center justify-center select-none cursor-pointer ${roundedClass} disabled:opacity-50 disabled:cursor-not-allowed ${styles.base} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 ${styles.fill} translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none`}
      />
      <span
        className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${styles.hoverText}`}
      >
        {children}
      </span>
    </motion.button>
  );
};