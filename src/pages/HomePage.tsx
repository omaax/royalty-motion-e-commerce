import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { ImageRevealBackground, BG_IMAGE_1 } from '../components/ImageRevealBackground';
// import { CornerBracket, CheckerboardGrid } from '../components/SVGIcons';
import { NavBar } from '../components/NavBar';
import { MotionLink } from '../components/MotionButton';
import { APP_NAME, APP_TAGLINE } from '../constants/branding';
import crestRedImg from '@/assets/crest-red.png';

interface HomePageProps {
  cartCount: number;
  wishlistCount: number;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ cartCount, wishlistCount, isLoggedIn, onLogout }) => {
  const location = useLocation();

  return (
    <div className="relative flex-1 flex flex-col justify-between overflow-y-auto lg:overflow-hidden">
      {/* Interactive Desktop Spotlight Image Reveal Background */}
      <ImageRevealBackground />

      {/* NavBar - same position as the SiteHeader navbar on other pages */}
      <div className="absolute top-4 left-6 right-6 lg:left-12 lg:right-12 z-30 flex items-center gap-4 md:gap-6">
        <NavBar
          activeNavTab={location.pathname}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          className="pl-0 md:pl-24 lg:pl-40 pt-8 w-full"
        />
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
            {/* <CornerBracket
              position="TL"
              style={{
                width: 'var(--corner)',
                height: 'var(--corner)',
              }}
              className="text-black mb-1"
            /> */}

            {/* Headline: The Silent King */}
            <div className="space-y-2">
              <h1
                className="font-orbitron font-extrabold uppercase tracking-[0.12em] leading-[1.05] text-black"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 2.5rem)' }}
              >
                THE SILENT KING
              </h1>
              <p className="text-sm md:text-base text-gray-700 max-w-lg font-normal leading-relaxed">
                Hidden behind the shadows, he guards his realm with unyielding strength. Honor is his creed, and justice his blade.
              </p>
            </div>

            {/* Bottom-Left Corner Bracket */}
            {/* <CornerBracket
              position="BR"
              style={{
                width: 'var(--corner)',
                height: 'var(--corner)',
              }}
              className="text-black mt-1"
            /> */}

            {/* CTA Button */}
            <div className="pt-4">
              <MotionLink
                to="/shop"
                style={{
                  paddingInline: 'var(--btn-px)',
                  paddingBlock: 'var(--btn-py)',
                  fontSize: 'var(--body)',
                }}
                className="font-jakarta uppercase tracking-[0.18em] font-semibold"
              >
                <span>SHOP NOW</span>
                <ArrowUpRight className="w-4 h-4 stroke-[1.8]" />
              </MotionLink>
            </div>
          </div>
        </div>

        {/* Mobile static image section (below hero for < lg viewports) */}
        <div className="mt-12 lg:hidden w-full shrink-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden aspect-[4/5] sm:aspect-[16/9] relative">
            <img
              src={BG_IMAGE_1}
              alt={`${APP_NAME} ${APP_TAGLINE}`}
              width={1200}
              height={800}
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
        width={420}
        height={420}
        className="absolute left-[var(--pad-x)] bottom-0 w-35 md:w-54 lg:w-105 object-contain select-none z-10"
      />
    </div>
  );
};
