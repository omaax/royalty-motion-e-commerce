import React, { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'motion/react';
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

const initCenter = {
  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 960,
  y: typeof window !== 'undefined' ? window.innerHeight / 2 : 540,
};

export const ImageRevealBackground: React.FC = () => {
  const revealRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);

  const [bgImages] = useState<{ base: string; reveal: string }>({
    base: BG_IMAGE_1,
    reveal: BG_IMAGE_2,
  });

  // Raw cursor position (source for the springs)
  const cursorX = useMotionValue(initCenter.x);
  const cursorY = useMotionValue(initCenter.y);

  // Spotlight springs - firm and fast so the spotlight tracks the cursor
  // almost 1:1 with only a hint of smoothing; overdamped so it never overshoots.
  const spotX = useSpring(cursorX, { stiffness: 600, damping: 70, mass: 1 });
  const spotY = useSpring(cursorY, { stiffness: 600, damping: 70, mass: 1 });

  // Grid parallax springs - heavily damped, slow glide to mimic a lazy lerp.
  const gridX = useSpring(cursorX, { stiffness: 25, damping: 65, mass: 1 });
  const gridY = useSpring(cursorY, { stiffness: 25, damping: 65, mass: 1 });

  const [gridCellSize, setGridCellSize] = useState<number>(48);
  const [radius, setRadius] = useState<number>(
    Math.round(Math.min(420, Math.max(160, initCenter.x * 0.32)) * 1.2),
  );

  const radiusRef = useRef<number>(radius);
  radiusRef.current = radius;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const applySpotlight = () => {
      const el = revealRef.current;
      if (!el) return;
      const r = radiusRef.current;
      const pos = `${spotX.get() - r}px ${spotY.get() - r}px`;
      el.style.maskPosition = pos;
      el.style.webkitMaskPosition = pos;
    };

    const applyGrid = () => {
      const p = patternRef.current;
      if (!p) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      p.setAttribute('x', ((gridX.get() / w - 0.5) * 12).toFixed(2));
      p.setAttribute('y', ((gridY.get() / h - 0.5) * 12).toFixed(2));
    };

    const unSubSpotX = spotX.on('change', applySpotlight);
    const unSubSpotY = spotY.on('change', applySpotlight);
    const unSubGridX = gridX.on('change', applyGrid);
    const unSubGridY = gridY.on('change', applyGrid);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const updateDimensions = () => {
      const w = window.innerWidth;
      const cellSize = Math.round(Math.min(64, Math.max(36, w * 0.028)));
      setRadius(Math.round(Math.min(420, Math.max(160, w * 0.16)) * 1.2));
      setGridCellSize(cellSize);
      applySpotlight();
      applyGrid();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateDimensions);

    return () => {
      unSubSpotX();
      unSubSpotY();
      unSubGridX();
      unSubGridY();
      spotX.stop();
      spotY.stop();
      gridX.stop();
      gridY.stop();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateDimensions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          masked by the spotlight tile whose mask-position is driven by motion
          springs from the cursor, giving a smooth trailing reveal. */}
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