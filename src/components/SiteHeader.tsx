import React from 'react';
import { Link } from 'react-router-dom';
import crestImg from '@/assets/crest.png';
import honorLogoImg from '@/assets/honor-logo.png';
import { APP_NAME } from '../constants/branding';
import { NavBar } from './NavBar';

interface SiteHeaderProps {
  activeNavTab: string;
  cartCount: number;
  wishlistCount: number;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = React.memo(({ activeNavTab, cartCount, wishlistCount, isLoggedIn, onLogout }) => {
  return (
    <header className="px-6 lg:px-12 relative bg-white z-40 shrink-0 pb-4">
      {/* Center Main Nav Tabs */}
      <NavBar
        activeNavTab={activeNavTab}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        className="pl-0 md:pl-24 lg:pl-40 pt-8 -mb-5 relative z-30"
      />

      <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
        {/* Top Left Crest Logo & Motto (Stacked) */}
        <div className="hidden sm:flex flex-col items-center gap-2">
          <Link
            to="/"
            className="w-30 h-30 md:w-35 md:h-35 rounded-full border border-black flex items-center justify-center p-1 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-sm"
            title="Home"
          >
            <img src={crestImg} alt="Guild Crest" width={140} height={140} className="w-full h-full object-cover" />
          </Link>
          <div className="text-[9px] text-center font-mono tracking-widest uppercase leading-tight font-bold hidden sm:block">
            <div>STRENGTH IN SILENCE</div>
            <div>CROWN OF SHADOWS</div>
            <div>JUSTICE & SHADOW</div>
          </div>
        </div>

        {/* Center Brand Title 'HONOR' Artwork Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative text-center my-1 md:my-0 self-center flex items-center justify-center">
            <img
              src={honorLogoImg}
              alt={APP_NAME}
              width={80}
              height={80}
              className="h-20 md:h-28 lg:h-32 scale-[2.6] md:scale-[3.4] lg:scale-[4.0] translate-y-8 md:translate-y-8 lg:translate-y-11 object-contain select-none origin-center transform pointer-events-none transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
});
