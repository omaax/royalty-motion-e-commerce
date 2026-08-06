import React from 'react';
import { useNavigate } from 'react-router-dom';
import crestImg from '@/assets/crest.png';
import honorLogoImg from '@/assets/honor-logo.png';
import { NavBar } from './NavBar';
import { CartButton } from './CartButton';

interface SiteHeaderProps {
  activeNavTab: string;
  cartCount: number;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ activeNavTab, cartCount }) => {
  const navigate = useNavigate();
  const isShop = activeNavTab === '/shop';

  return (
    <header className={`px-6 lg:px-12 relative bg-white z-40 shrink-0 ${isShop ? 'pb-2 pt-3' : 'pb-4 pt-4'}`}>
      {/* Center Main Nav Tabs */}
      <NavBar activeNavTab={activeNavTab} className={`pl-0 md:pl-24 lg:pl-40 ${isShop ? 'pt-4 -mb-6' : 'pt-6 -mb-8'}`} />

      <div className="flex flex-col md:flex-row items-start justify-between gap-3 md:gap-0">
        {/* Top Left Crest Logo & Motto (Stacked) */}
        <div className="flex flex-col items-start gap-2">
          <button
            onClick={() => navigate('/')}
            className={`${
              isShop ? 'w-16 h-16 md:w-20 md:h-20' : 'w-20 h-20 md:w-24 md:h-24'
            } rounded-full border border-black flex items-center justify-center p-1 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-sm`}
            title="Home"
          >
            <img src={crestImg} alt="Guild Crest" className="w-full h-full object-cover" />
          </button>
          <div className="text-[9px] text-center font-mono tracking-widest uppercase leading-tight font-bold hidden sm:block">
            <div>STRENGTH IN SILENCE</div>
            <div>CROWN OF SHADOWS</div>
            <div>JUSTICE & SHADOW</div>
          </div>
        </div>

        {/* Center Brand Title 'HONOR' Artwork Image */}
        <div className="relative text-center my-1 md:my-0 self-center flex items-center justify-center">
          <img
            src={honorLogoImg}
            alt="HONOR"
            className={`${
              isShop
                ? 'h-16 md:h-22 lg:h-24 scale-[2.0] md:scale-[2.6] lg:scale-[3.0] translate-y-2 md:translate-y-4 lg:translate-y-5'
                : 'h-20 md:h-28 lg:h-32 scale-[2.6] md:scale-[3.4] lg:scale-[4.0] translate-y-4 md:translate-y-8 lg:translate-y-11'
            } object-contain select-none origin-center transform pointer-events-none transition-transform duration-300`}
          />
        </div>

        {/* Top Right Utility Icons */}
        <div className="flex flex-col items-end gap-2 self-end md:self-auto">
          <div className="flex items-center gap-4">
            <CartButton cartCount={cartCount} />
          </div>

          <div className="hidden lg:flex items-center text-[10px] font-mono tracking-[0.2em] uppercase text-black font-medium mt-2">
            <span>LOYALTY</span>
            <span className="mx-1.5">•</span>
            <span>GUIDES</span>
            <span className="mx-1.5">•</span>
            <span>DESTINY</span>
            <span className="ml-1.5">✦</span>
          </div>
        </div>
      </div>
    </header>
  );
};
