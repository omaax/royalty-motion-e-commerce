import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogOut, ShoppingBag, UserRound, LayoutDashboard, User, Settings } from 'lucide-react';
import { RollingText } from './RollingText';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useCartCount } from '../hooks/useCart';
import { useWishlistIds } from '../hooks/useWishlist';
import { useUserRole } from '../hooks/useAuth';
import { useLogout } from '../hooks/useAuth';
import { useToken } from '../lib/useToken';

interface NavBarProps {
  activeNavTab: string;
  className?: string;
}

const NAV_ITEMS: { label: string; path: string }[] = [
  { label: 'HOME', path: '/' },
  { label: 'SHOP', path: '/shop' },
  { label: 'CATEGORIES', path: '/categories' },
  { label: 'COLLECTIONS', path: '/collections' },
];

export const NavBar: React.FC<NavBarProps> = ({ activeNavTab, className = '' }) => {
  const navigate = useNavigate();
  const cartCount = useCartCount();
  const wishlistIds = useWishlistIds();
  const token = useToken();
  const role = useUserRole();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isLoggedIn = Boolean(token);
  const isAdmin = role === 'admin';

  return (
    <div className={`flex flex-col md:flex-row md:items-center gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-2 md:gap-y-0 ${className}`}>
      <nav className="flex items-center gap-4 sm:gap-6 lg:gap-8 w-full md:w-auto md:flex-1 min-w-0 text-xs sm:text-sm lg:text-base font-mono tracking-[0.2em] sm:tracking-[0.24em] uppercase font-bold overflow-x-auto whitespace-nowrap scrollbar-hide">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNavTab === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative pb-2 cursor-pointer whitespace-nowrap group`}
            >
              <RollingText>{item.label}</RollingText>
              <span
                className={`absolute left-0 right-0 bottom-0 h-[3px] bg-black origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
              />
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center justify-end md:justify-start gap-4 w-full md:w-auto md:shrink-0">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="relative pb-2 hover:opacity-60 transition-opacity cursor-pointer"
                title="Profile"
              >
                <UserRound className="w-5 h-5 stroke-[2]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            className="relative pb-2 hover:opacity-60 transition-opacity cursor-pointer font-mono text-xs tracking-widest uppercase font-bold"
            title="Sign in"
          >
            SIGN IN
          </Link>
        )}

        <Link
          to="/wishlist"
          className="relative pb-2 hover:opacity-60 transition-opacity cursor-pointer"
          title="Wishlist"
        >
          <Heart className="w-5 h-5 stroke-[2]" />
          {wishlistIds.length > 0 && (
            <span className="absolute top-0 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistIds.length}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          className="relative pb-2 hover:opacity-60 transition-opacity cursor-pointer"
          title="Shopping Bag"
        >
          <ShoppingBag className="w-5 h-5 stroke-[2]" />
          {cartCount > 0 && (
            <span className="absolute top-0 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};