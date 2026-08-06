import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';

interface LayoutProps {
  cartCount: number;
}

export const Layout: React.FC<LayoutProps> = ({ cartCount }) => {
  const location = useLocation();
  const isShopPage = location.pathname === '/shop';

  return (
    <div
      className={`bg-white text-black font-jakarta selection:bg-black selection:text-white relative flex flex-col ${
        isShopPage ? 'lg:h-screen lg:overflow-hidden min-h-screen pb-10 lg:pb-0' : 'min-h-screen pb-20'
      }`}
    >
      {location.pathname !== '/' && (
        <SiteHeader activeNavTab={location.pathname} cartCount={cartCount} />
      )}
      <Outlet />
    </div>
  );
};