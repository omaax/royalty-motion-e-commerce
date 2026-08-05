import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';

interface LayoutProps {
  cartCount: number;
}

export const Layout: React.FC<LayoutProps> = ({ cartCount }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-black font-jakarta selection:bg-black selection:text-white pb-20 relative flex flex-col">
      {location.pathname !== '/' && (
        <SiteHeader activeNavTab={location.pathname} cartCount={cartCount} />
      )}
      <Outlet />
    </div>
  );
};