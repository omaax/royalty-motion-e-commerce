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

  return (
    <header className="px-6 lg:px-12 relative bg-white z-50">
      {/* Center Main Nav Tabs */}
      <NavBar activeNavTab={activeNavTab} className="pl-0 md:pl-24 lg:pl-40 pt-10 -mb-10" />

      <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-0">
        {/* Top Left Crest Logo & Motto (Stacked) */}
        <div className="flex flex-col items-start gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-black flex items-center justify-center p-1 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-sm"
            title="Home"
          >
            <img src={crestImg} alt="Guild Crest" className="w-full h-full object-cover" />
          </button>
          <div className="text-[9px] text-center font-mono tracking-widest uppercase leading-tight font-bold">
            <div>STRENGTH IN SILENCE</div>
            <div>CROWN OF SHADOWS</div>
            <div>JUSTICE & SHADOW</div>
          </div>
        </div>

        {/* Center Brand Title 'HONOR' Artwork Image */}
        <div className="relative text-center my-2 md:my-0 self-center md:self-auto flex items-center justify-center">
          <img
            src={honorLogoImg}
            alt="HONOR"
            className="h-20 md:h-28 lg:h-32 object-contain select-none"
          />
        </div>

        {/* Top Right Utility Icons */}
        <div className="flex flex-col items-end gap-3 self-end md:self-auto">
          <div className="flex items-center gap-4">
            <CartButton cartCount={cartCount} />
          </div>

          <div className="hidden lg:flex items-center text-[10px] font-mono tracking-[0.2em] uppercase text-black font-medium mt-3">
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
