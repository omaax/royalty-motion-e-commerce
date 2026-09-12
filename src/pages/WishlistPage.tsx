import React, { useMemo } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/shop/ProductCard';
import { MotionLink } from '../components/MotionButton';
import { SEO } from '../components/SEO';
import { useWishlist } from '../hooks/useWishlist';
import { useShopActions } from '../hooks/useCart';

export const WishlistPage: React.FC = () => {
  const { ids, products, isEmpty } = useWishlist();
  const { onAddToCart, onToggleWishlist } = useShopActions();
  const wishlistIds = useMemo(() => new Set(ids), [ids]);

  return (
    <main className="px-6 lg:px-12 pt-10 pb-16">
      <SEO
        title="Wishlist"
        description="Your saved items from ROYALTY — gathered, marked, and yours to claim."
      />
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
        <div className="flex flex-col md:flex-row md:items-baseline gap-6">
          <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-tight text-black uppercase">
            WISHLIST
          </h2>
          <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
            <div>Saved items ({products.length})</div>
            <div>Gathered. Marked. Yours to claim.</div>
          </div>
        </div>
      </div>

      {isEmpty ? (
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
          <Heart className="w-12 h-12 stroke-[1.2]" />
          <p className="text-xs uppercase font-semibold tracking-widest">
            Your wishlist is empty.
          </p>
          <MotionLink
            to="/shop"
            className="font-mono text-xs tracking-widest uppercase px-6 py-2"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </MotionLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 pt-8">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onAddToCart={onAddToCart}
              wished={wishlistIds.has(item.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </main>
  );
};