import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

interface LayoutProps {
  cartCount: number;
  wishlistCount: number;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ cartCount, wishlistCount, isLoggedIn, onLogout }) => {
  const location = useLocation();

  return (
    <div className="bg-white text-black font-jakarta selection:bg-black selection:text-white relative flex flex-col min-h-screen">
      {location.pathname !== '/' && (
        <SiteHeader activeNavTab={location.pathname} cartCount={cartCount} wishlistCount={wishlistCount} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      )}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      {location.pathname !== '/' && <SiteFooter />}
    </div>
  );
};