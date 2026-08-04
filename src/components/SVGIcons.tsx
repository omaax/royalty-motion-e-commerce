import React from 'react';

interface CornerBracketProps {
  position?: 'TL' | 'TR' | 'BL' | 'BR';
  className?: string;
  style?: React.CSSProperties;
}

export const CornerBracket: React.FC<CornerBracketProps> = ({
  position = 'TL',
  className = '',
  style,
}) => {
  const pathMap = {
    TL: 'M0 11.5V0.5H11.5',
    TR: 'M0.5 0.5H11.5V11.5',
    BL: 'M0 0.5V11.5H11.5',
    BR: 'M0.5 11.5H11.5V0.5',
  };

  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      style={style}
    >
      <path d={pathMap[position]} />
    </svg>
  );
};

export const CheckerboardGrid: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style,
}) => {
  // 4 rows of 3.8x3.8 black squares; even rows shifted by 2.25
  // Row 0 (y=0): x = 0, 7.5, 15, 22.5, 30
  // Row 1 (y=4.5): x = 2.25, 9.75, 17.25, 24.75, 32.25
  // Row 2 (y=9): x = 0, 7.5, 15, 22.5, 30
  // Row 3 (y=13.5): x = 2.25, 9.75, 17.25, 24.75, 32.25
  const rows = [
    { y: 0, xs: [0, 7.5, 15, 22.5, 30] },
    { y: 4.5, xs: [2.25, 9.75, 17.25, 24.75, 32.25] },
    { y: 9, xs: [0, 7.5, 15, 22.5, 30] },
    { y: 13.5, xs: [2.25, 9.75, 17.25, 24.75, 32.25] },
  ];

  return (
    <svg
      viewBox="0 0 36 18"
      fill="currentColor"
      className={className}
      style={{
        width: 'var(--checker-w)',
        height: 'var(--checker-h)',
        ...style,
      }}
    >
      {rows.map((row, rIdx) =>
        row.xs.map((x, xIdx) => (
          <rect
            key={`${rIdx}-${xIdx}`}
            x={x}
            y={row.y}
            width="3.8"
            height="3.8"
            fill="currentColor"
          />
        ))
      )}
    </svg>
  );
};

export const WireframeGlobe: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style,
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
      style={{
        width: 'var(--globe)',
        height: 'var(--globe)',
        ...style,
      }}
    >
      {/* Outer circle r=28 */}
      <circle cx="32" cy="32" r="28" />
      {/* Equator line */}
      <line x1="4" y1="32" x2="60" y2="32" />
      {/* Meridian line */}
      <line x1="32" y1="4" x2="32" y2="60" />
      {/* Horizontal ellipses */}
      <ellipse cx="32" cy="32" rx="28" ry="14" />
      <ellipse cx="32" cy="32" rx="28" ry="22" />
      {/* Vertical ellipses */}
      <ellipse cx="32" cy="32" rx="14" ry="28" />
      <ellipse cx="32" cy="32" rx="22" ry="28" />
    </svg>
  );
};
