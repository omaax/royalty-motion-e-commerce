import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RollingText } from './RollingText';

interface NavBarProps {
  activeNavTab: string;
  className?: string;
}

const NAV_ITEMS: { label: string; path: string }[] = [
  { label: 'HOME', path: '/' },
  { label: 'SHOP', path: '/shop' },
  { label: 'COLLECTIONS', path: '/collections' },
  { label: 'JOURNAL', path: '/journal' },
  { label: 'ABOUT', path: '/about' },
  { label: 'CONTACT', path: '/contact' },
];

export const NavBar: React.FC<NavBarProps> = ({ activeNavTab, className = '' }) => {
  const navigate = useNavigate();

  return (
    <nav
      className={`flex items-center gap-4 md:gap-6 text-md font-mono tracking-[0.22em] uppercase overflow-x-auto whitespace-nowrap ${className}`}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeNavTab === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`relative pb-1 cursor-pointer whitespace-nowrap ${isActive ? 'font-bold' : ''
              }`}
          >
            <RollingText>{item.label}</RollingText>
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full bg-black" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
