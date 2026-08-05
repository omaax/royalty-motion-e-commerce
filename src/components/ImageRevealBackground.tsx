import React, { useEffect, useRef, useState } from 'react';
import bgArmor from '@/assets/bg-armor.png';
import bgCloak from '@/assets/bg-colored-armor.png';

// High-resolution fashion editorial images for LGPSM reveal experience
export const BG_IMAGE_1 = bgArmor;
export const BG_IMAGE_2 = bgCloak;

// Circular spotlight mask matching the original soft radial falloff. Built at
// runtime with an explicit pixel radius so the fade completes exactly at the
// tile edge (defaulting to farthest-corner would leave a square halo).
// radius * 2 = mask tile edge length, so the circle always reads as circular.
const circleMask = (radius: number) =>
  `radial-gradient(circle ${radius}px at center, #000 0%, #000 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, transparent 100%)`;

export const ImageRevealBackground: React.FC = () => {
  const revealRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);

  const [bgImages] = useState<{ base: string; reveal: string }>({
    base: BG_IMAGE_1,
    reveal: BG_IMAGE_2,
  });

  // Raw cursor position, captured in mousemove
  const cursorRef = useRef<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 960,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 540,
  });

  // Smoothed spotlight position, eased toward the cursor in the render loop.
  // Distance-adaptive: gentle glide at low speeds, quick catch-up on fast
  // movement, so it feels fluid without trailing the cursor.
  const smoothRef = useRef<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 960,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 540,
  });

  const gridOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [gridCellSize, setGridCellSize] = useState<number>(48);
  const [radius, setRadius] = useState<number>(
    typeof window !== 'undefined' ? Math.round(Math.min(420, Math.max(160, window.innerWidth * 0.16)) * 1.2) : 188,
  );

  const radiusRef = useRef<number>(radius);
  radiusRef.current = radius;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const applySpotlight = () => {
      const el = revealRef.current;
      if (!el) return;
      const { x, y } = smoothRef.current;
      const r = radiusRef.current;
      const pos = `${x - r}px ${y - r}px`;
      el.style.maskPosition = pos;
      el.style.webkitMaskPosition = pos;
    };

    const updateDimensions = () => {
      const w = window.innerWidth;
      const cellSize = Math.round(Math.min(64, Math.max(36, w * 0.028)));
      setRadius(Math.round(Math.min(420, Math.max(160, w * 0.16)) * 1.2));
      setGridCellSize(cellSize);
      applySpotlight();
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateDimensions);

    let animationFrameId: number;

    const renderLoop = () => {
      // Ease the spotlight toward the cursor with a gentle constant factor so
      // it trails smoothly with a slight delay; a mild distance boost only
      // prevents big jumps across the screen from taking too long to settle
      const mouse = cursorRef.current;
      const smooth = smoothRef.current;
      const dx = mouse.x - smooth.x;
      const dy = mouse.y - smooth.y;
      const dist = Math.hypot(dx, dy);
      const ease = Math.min(0.22, 0.08 + dist / 3000);
      smooth.x += dx * ease;
      smooth.y += dy * ease;

      applySpotlight();

      // Imperceptible lazy parallax for the grid overlay only
      const { x, y } = cursorRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cxNorm = x / w - 0.5;
      const cyNorm = y / h - 0.5;

      gridOffsetRef.current.x += (cxNorm * 12 - gridOffsetRef.current.x) * 0.06;
      gridOffsetRef.current.y += (cyNorm * 12 - gridOffsetRef.current.y) * 0.06;

      if (patternRef.current) {
        patternRef.current.setAttribute('x', gridOffsetRef.current.x.toFixed(2));
        patternRef.current.setAttribute('y', gridOffsetRef.current.y.toFixed(2));
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Base Layer (BG_IMAGE_1 - Pure White Armor) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
        style={{
          backgroundImage: `url(${bgImages.base})`,
        }}
      />

      {/* 2. Reveal Layer (BG_IMAGE_2 - Crimson Floral Cloak) - full screen,
          masked by the spotlight tile whose mask-position follows the cursor.
          Moving mask-position is a cheap repaint (no canvas / dataURL encode)
          so the reveal keeps up with the cursor exactly. */}
      <div
        ref={revealRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${bgImages.reveal})`,
          WebkitMaskImage: circleMask(radius),
          WebkitMaskSize: `${radius * 2}px ${radius * 2}px`,
          WebkitMaskRepeat: 'no-repeat',
          maskImage: circleMask(radius),
          maskSize: `${radius * 2}px ${radius * 2}px`,
          maskRepeat: 'no-repeat',
        }}
      />

      {/* 3. Subtle Parallax Grid Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.10]">
        <defs>
          <pattern
            id="bg-grid-pattern"
            ref={patternRef}
            width={gridCellSize}
            height={gridCellSize}
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
          >
            <path
              d={`M ${gridCellSize} 0 L 0 0 0 ${gridCellSize}`}
              fill="none"
              stroke="#64748b"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-grid-pattern)" />
      </svg>
    </div>
  );
};