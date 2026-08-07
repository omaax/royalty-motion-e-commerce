import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShopItem } from '../types';
import { ProductCard } from '../components/shop/ProductCard';
import { MotionButton } from '../components/MotionButton';

interface WishlistPageProps {
  wishlistItems: ShopItem[];
  onAddToCart: (item: ShopItem) => void;
  onToggleWishlist: (item: ShopItem) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  wishlistItems,
  onAddToCart,
  onToggleWishlist,
}) => {
  const navigate = useNavigate();
  const wishlistIds = wishlistItems.map((w) => w.id);

  return (
    <main className="px-6 lg:px-12 pt-10 pb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
        <div className="flex flex-col md:flex-row md:items-baseline gap-6">
          <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-black uppercase">
            WISHLIST
          </h2>
          <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
            <div>Saved items ({wishlistItems.length})</div>
            <div>Gathered. Marked. Yours to claim.</div>
          </div>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
          <Heart className="w-12 h-12 stroke-[1.2]" />
          <p className="text-xs uppercase font-semibold tracking-widest">
            Your wishlist is empty.
          </p>
          <MotionButton
            onClick={() => navigate('/shop')}
            className="font-mono text-xs tracking-widest uppercase px-6 py-2"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </MotionButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 pt-8">
          {wishlistItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onAddToCart={onAddToCart}
              wished
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </main>
  );
};