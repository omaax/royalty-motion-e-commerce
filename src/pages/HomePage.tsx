import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ImageRevealBackground, BG_IMAGE_1 } from '../components/ImageRevealBackground';
import { CornerBracket, CheckerboardGrid } from '../components/SVGIcons';
import { NavBar } from '../components/NavBar';
import { CartButton } from '../components/CartButton';
import crestRedImg from '@/assets/crest-red.png';

interface HomePageProps {
  cartCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({ cartCount }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="relative flex-1 flex flex-col justify-between overflow-hidden">
      {/* Interactive Desktop Spotlight Image Reveal Background */}
      <ImageRevealBackground />

      {/* NavBar Overlay + Cart - pinned top-right on desktop, full-width scroll on mobile */}
      <div className="absolute top-[var(--header-pt)] left-[var(--pad-x)] right-[var(--pad-x)] z-30 flex items-center gap-4 md:gap-6">
        <NavBar activeNavTab={location.pathname} className="flex-1 justify-start lg:justify-end" />
        <CartButton cartCount={cartCount} />
      </div>

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

      {/* Red Honor Crest Logo - pinned bottom-left of screen */}
      <img
        src={crestRedImg}
        alt="Honor Red Crest"
        className="absolute left-[var(--pad-x)] bottom-0 w-35 md:w-54 lg:w-105 object-contain select-none z-10"
      />
    </div>
  );
};
