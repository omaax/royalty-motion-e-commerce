import React, { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'motion/react';
import bgArmorCutout from '@/assets/bg-armor-cutout.png';
import bgCloakCutout from '@/assets/bg-colored-armor-cutout.png';

// High-resolution fashion editorial images for LGPSM reveal experience
export const BG_IMAGE_1 = bgArmorCutout;
export const BG_IMAGE_2 = bgCloakCutout;

// Circular spotlight mask matching the original soft radial falloff.
const CHARACTER_SIZE = 'auto min(100vh, 1200px)';
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

  // Raw cursor position
  const cursorX = useMotionValue(initCenter.x);
  const cursorY = useMotionValue(initCenter.y);

  // Spotlight springs
  const spotX = useSpring(cursorX, { stiffness: 600, damping: 70, mass: 1 });
  const spotY = useSpring(cursorY, { stiffness: 600, damping: 70, mass: 1 });

  // Grid parallax springs
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
    <div className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
      {/* 0. Layer Behind Character: Editorial Accents */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Crown of Shadows (Bottom Right) */}
        <div className="absolute bottom-[6vh] right-[4vw] max-w-[250px] text-left z-0">
          <div className="flex justify-end mb-3 pr-3">
            <div className="w-4 h-4 rounded-full bg-black"></div>
          </div>
          <h3 className="font-orbitron font-extrabold text-[1.15rem] uppercase tracking-wider text-black mb-1.5">
            Crown of Shadows
          </h3>
          <p className="text-[11px] leading-[1.45] text-gray-700 font-normal">
            Beneath the golden crown lies a mystery, a silent figure who holds the weight of destiny in his hands.
          </p>
          <div className="mt-4 flex justify-end text-gray-400 text-lg font-light space-x-12 pr-6">
            <span>+</span>
            <span>+</span>
          </div>
        </div>

        {/* Floating words around mid torso */}
        <div className="absolute top-[52vh] left-[26vw] font-semibold text-[15px] tracking-wider text-black">
          Loyalty
        </div>
        <div className="absolute top-[56vh] right-[32vw] font-semibold text-[15px] tracking-wider text-black">
          Guides
        </div>
        <div className="absolute top-[54vh] right-[18vw] font-semibold text-[15px] tracking-wider text-black">
          Destiny
        </div>

        {/* Crosshairs & Star icons */}
        <div className="absolute top-[36vh] left-[13vw] text-black text-3xl font-thin select-none">
          ✦
        </div>
        <div className="absolute top-[32vh] left-[4vw] text-black text-[10px]">
          ●
        </div>
        <div className="absolute top-[41vh] left-[22vw] text-black text-[12px]">
          ●
        </div>
        <div className="absolute top-[46vh] right-[13vw] text-black text-[11px]">
          ●
        </div>
        <div className="absolute top-[61vh] right-[19vw] text-gray-400 text-[14px]">
          +
        </div>
        <div className="absolute top-[67vh] right-[13vw] text-[11px] font-semibold tracking-wider text-black">
          Justice & Shadow
        </div>
        <div className="absolute top-[70vh] right-[15vw] text-black text-[16px]">
          ●
        </div>

        {/* Bottom Editorial Notes in Crimson Red */}
        {/* <div className="absolute bottom-[6vh] left-[21vw] max-w-[320px] text-[11px] leading-[1.4] text-[#a52a2a] font-serif font-medium">
          Though his face remains concealed beneath his armor, he guards his realm with unyielding strength. Honor is creed before strength. It is not an absence of words but thoughts is very rare in those who oppose him.
        </div>
        <div className="absolute bottom-[6vh] right-[21vw] max-w-[320px] text-[11px] leading-[1.4] text-[#a52a2a] font-serif font-medium">
          In a quiet moment, comes a profound weight commanding majesty by nature and stature. His silence embodies his greatest strength; holding a power that inspires loyalty and respect.
        </div> */}
      </div>

      {/* 1. Base Layer (Character - Pure White Armor Cutout) */}
      <div
        className="absolute inset-0 bg-contain bg-bottom bg-no-repeat transition-opacity duration-300 pointer-events-none z-40"
        style={{
          backgroundImage: `url(${bgImages.base})`,
          backgroundSize: CHARACTER_SIZE,
        }}
      />

      {/* 2. Reveal Layer (Character - Crimson Floral Cloak Cutout with Spotlight Mask) */}
      <div
        ref={revealRef}
        className="absolute inset-0 bg-contain bg-bottom bg-no-repeat pointer-events-none z-50"
        style={{
          backgroundImage: `url(${bgImages.reveal})`,
          backgroundSize: CHARACTER_SIZE,
          WebkitMaskImage: circleMask(radius),
          WebkitMaskSize: `${radius * 2}px ${radius * 2}px`,
          WebkitMaskRepeat: 'no-repeat',
          maskImage: circleMask(radius),
          maskSize: `${radius * 2}px ${radius * 2}px`,
          maskRepeat: 'no-repeat',
        }}
      />

      {/* 3. Parallax Grid Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05] z-30">
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