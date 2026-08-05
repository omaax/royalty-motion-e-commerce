import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageRevealBackground, BG_IMAGE_1 } from '../components/ImageRevealBackground';
import { CornerBracket, CheckerboardGrid, WireframeGlobe } from '../components/SVGIcons';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex-1 flex flex-col justify-between overflow-hidden">
      {/* Interactive Desktop Spotlight Image Reveal Background */}
      <ImageRevealBackground />

      {/* Main Hero Section (flex-1, z-10) */}
      <main
        style={{
          paddingInline: 'var(--pad-x)',
          paddingBlock: 'var(--main-py)',
        }}
        className="relative z-10 flex-1 flex flex-col justify-between w-full"
      >
        <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row lg:items-end justify-between w-full my-auto">
          {/* Left Block (Vertically Centered / Stacked) */}
          <div className="flex flex-col items-start space-y-3 max-w-4xl">
            {/* Top-Left Corner Bracket */}
            <CornerBracket
              position="TL"
              style={{
                width: 'var(--corner)',
                height: 'var(--corner)',
              }}
              className="text-black mb-1"
            />

            {/* Headline */}
            <h1
              className="font-orbitron font-extrabold uppercase tracking-[0.08em] leading-[1.05] text-black"
              style={{ fontSize: 'var(--headline)' }}
            >
              <div>FUTURE</div>
              <div>FORWARD</div>
              <div className="flex items-baseline flex-wrap">
                <span>FASHION</span>
                <CheckerboardGrid className="ml-3 inline-block align-baseline translate-y-[2px]" />
              </div>
            </h1>

            {/* Bottom-Left Corner Bracket */}
            <CornerBracket
              position="BL"
              style={{
                width: 'var(--corner)',
                height: 'var(--corner)',
              }}
              className="text-black mt-1"
            />

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => navigate('/shop')}
                style={{
                  paddingInline: 'var(--btn-px)',
                  paddingBlock: 'var(--btn-py)',
                  gap: 'var(--btn-gap)',
                  fontSize: 'var(--body)',
                }}
                className="border border-gray-400 rounded-md font-jakarta uppercase tracking-[0.18em] font-semibold text-black hover:bg-black hover:text-white hover:border-black transition-all group flex items-center cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowUpRight className="w-4 h-4 stroke-[1.8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Lower Feature Block (Bottom Aligned on Desktop) */}
          <div className="lg:self-end">
            <div
              style={{
                minWidth: 'var(--feature-min)',
                padding: 'var(--feature-pad)',
              }}
              className="relative border border-transparent flex flex-col items-start gap-4"
            >
              {/* Corner Brackets at Absolute Corners of framed box */}
              <CornerBracket
                position="TL"
                style={{ width: 'var(--corner)', height: 'var(--corner)' }}
                className="absolute top-0 left-0 text-black"
              />
              <CornerBracket
                position="TR"
                style={{ width: 'var(--corner)', height: 'var(--corner)' }}
                className="absolute top-0 right-0 text-black"
              />
              <CornerBracket
                position="BL"
                style={{ width: 'var(--corner)', height: 'var(--corner)' }}
                className="absolute bottom-0 left-0 text-black"
              />
              <CornerBracket
                position="BR"
                style={{ width: 'var(--corner)', height: 'var(--corner)' }}
                className="absolute bottom-0 right-0 text-black"
              />

              {/* Wireframe Globe SVG */}
              <WireframeGlobe className="text-black" />

              {/* Tagline */}
              <div
                className="font-jakarta font-semibold uppercase tracking-[0.18em] text-black leading-tight"
                style={{ fontSize: 'var(--body)' }}
              >
                <div>BEYOND TRENDS.</div>
                <div>BUILT FOR TOMORROW.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile static image section (below hero for < lg viewports) */}
        <div className="mt-12 lg:hidden w-full">
          <div className="border border-gray-200 rounded-lg overflow-hidden aspect-[4/5] sm:aspect-[16/9] relative">
            <img
              src={BG_IMAGE_1}
              alt="LGPSM Future Forward Fashion"
              className="w-full h-full object-cover bg-white"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </main>
    </div>
  );
};