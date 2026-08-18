import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, LogOut, ShoppingBag, UserRound } from 'lucide-react';
import { RollingText } from './RollingText';

interface NavBarProps {
  activeNavTab: string;
  cartCount?: number;
  wishlistCount?: number;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  className?: string;
}

const NAV_ITEMS: { label: string; path: string }[] = [
  { label: 'HOME', path: '/' },
  { label: 'SHOP', path: '/shop' },
  { label: 'CATEGORIES', path: '/categories' },
  { label: 'COLLECTIONS', path: '/collections' },
];

export const NavBar: React.FC<NavBarProps> = ({
  activeNavTab,
  cartCount = 0,
  wishlistCount = 0,
  isLoggedIn = false,
  onLogout,
  className = '',
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout?.();
    navigate('/login');
  };

  return (
    <div className={`flex flex-col md:flex-row md:items-center gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-2 md:gap-y-0 ${className}`}>
      <nav className="flex items-center gap-4 sm:gap-6 lg:gap-8 w-full md:w-auto md:flex-1 min-w-0 text-xs sm:text-sm lg:text-base font-mono tracking-[0.2em] sm:tracking-[0.24em] uppercase font-bold overflow-x-auto whitespace-nowrap scrollbar-hide">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNavTab === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative pb-2 cursor-pointer whitespace-nowrap group`}
            >
              <RollingText>{item.label}</RollingText>
              <span
                className={`absolute left-0 right-0 bottom-0 h-[3px] bg-black origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
              />
            </button>
          );
        })}
      </nav>

      <div className="flex items-center justify-end md:justify-start gap-4 w-full md:w-auto md:shrink-0">
        <button
          onClick={() => navigate('/profile')}
          className="relative pb-2 hover:opacity-60 transition-opacity cursor-pointer"
          title="Profile"
        >
          <UserRound className="w-5 h-5 stroke-[2]" />
        </button>

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="relative pb-2 hover:opacity-60 transition-opacity cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-5 h-5 stroke-[2]" />
          </button>
        )}

        <button
          onClick={() => navigate('/wishlist')}
          className="relative pb-2 hover:opacity-60 transition-opacity cursor-pointer"
          title="Wishlist"
        >
          <Heart className="w-5 h-5 stroke-[2]" />
          {wishlistCount > 0 && (
            <span className="absolute top-0 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate('/cart')}
          className="relative pb-2 hover:opacity-60 transition-opacity cursor-pointer"
          title="Shopping Bag"
        >
          <ShoppingBag className="w-5 h-5 stroke-[2]" />
          {cartCount > 0 && (
            <span className="absolute top-0 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};