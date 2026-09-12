import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-white text-black font-jakarta selection:bg-black selection:text-white relative flex flex-col min-h-screen">
      {location.pathname !== '/' && (
        <SiteHeader activeNavTab={location.pathname} />
      )}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      {location.pathname !== '/' && <SiteFooter />}
    </div>
  );
};