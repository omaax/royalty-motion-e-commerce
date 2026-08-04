import React, { useEffect, useRef, useState } from 'react';
import bgArmor from '@/assets/bg-armor.png';
import bgCloak from '@/assets/bg-cloak.png';

// High-resolution fashion editorial images for LGPSM reveal experience
export const BG_IMAGE_1 = bgArmor;
export const BG_IMAGE_2 = bgCloak;

export const ImageRevealBackground: React.FC = () => {
  const revealRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [bgImages] = useState<{ base: string; reveal: string }>({
    base: BG_IMAGE_1,
    reveal: BG_IMAGE_2,
  });

  const mouseRef = useRef<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
  });

  const smoothRef = useRef<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
  });

  const gridOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [gridCellSize, setGridCellSize] = useState<number>(48);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Offscreen canvas for fast hardware-accelerated spotlight mask rendering
    const offscreenCanvas = document.createElement('canvas');
    let ctx = offscreenCanvas.getContext('2d');

    const updateDimensions = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      offscreenCanvas.width = w;
      offscreenCanvas.height = h;

      // Grid cell size calculation: Math.round(Math.min(64, Math.max(36, window.innerWidth * 0.028)))
      const cellSize = Math.round(Math.min(64, Math.max(36, w * 0.028)));
      setGridCellSize(cellSize);
    };

    updateDimensions();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateDimensions);

    let animationFrameId: number;

    const renderLoop = () => {
      const mouse = mouseRef.current;
      const smooth = smoothRef.current;

      // Ease factor 0.1
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Fluid spotlight radius: Math.round(Math.min(420, Math.max(160, window.innerWidth * 0.16)))
      const radius = Math.round(Math.min(420, Math.max(160, w * 0.16)));

      if (ctx && revealRef.current) {
        ctx.clearRect(0, 0, w, h);

        const cx = smooth.x;
        const cy = smooth.y;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        // Exact gradient stops
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.4, 'rgba(255,255,255,1)');
        grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
        grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
        grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();

        const dataUrl = offscreenCanvas.toDataURL();

        const elemStyle = revealRef.current.style;
        elemStyle.maskImage = `url(${dataUrl})`;
        elemStyle.webkitMaskImage = `url(${dataUrl})`;
        elemStyle.maskSize = '100% 100%';
        elemStyle.webkitMaskSize = '100% 100%';
        elemStyle.maskRepeat = 'no-repeat';
        elemStyle.webkitMaskRepeat = 'no-repeat';
      }

      // Parallax Grid Offset calculation
      const cxNorm = smooth.x / w - 0.5;
      const cyNorm = smooth.y / h - 0.5;

      gridOffsetRef.current.x += (cxNorm * 16 - gridOffsetRef.current.x) * 0.06;
      gridOffsetRef.current.y += (cyNorm * 16 - gridOffsetRef.current.y) * 0.06;

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

      {/* 2. Reveal Layer (BG_IMAGE_2 - Crimson Floral Cloak) - Clipped by offscreen canvas mask */}
      <div
        ref={revealRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${bgImages.reveal})`,
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
              ref={pathRef}
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
