import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ShopItem } from '../types';
import { SHOP_PRODUCTS } from '../data/shopData';
import { slugToCategory } from '../constants/shop';
import { ProductCard } from '../components/shop/ProductCard';
import { MotionLink } from '../components/MotionButton';

interface CategoryPageProps {
  onAddToCart: (item: ShopItem) => void;
  wishlistIds: string[];
  onToggleWishlist: (item: ShopItem) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const { slug } = useParams<{ slug: string }>();

  const category = useMemo(() => (slug ? slugToCategory(slug) : null), [slug]);

  const items = useMemo(
    () => (category ? SHOP_PRODUCTS.filter((p) => p.category === category) : []),
    [category]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) {
    return (
      <main className="px-6 lg:px-12 pt-10 pb-20">
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-gray-200">
          <Sparkles className="w-12 h-12 stroke-[1.2] text-gray-300" />
          <p className="font-mono text-sm uppercase text-gray-500">
            Category not found.
          </p>
          <Link
            to="/shop"
            className="px-6 py-2 bg-black text-white text-xs font-mono tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO SHOP</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 lg:px-12 pt-8 pb-16">
      <Link
        to="/shop"
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-black transition-colors cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop</span>
      </Link>

      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-4xl font-bold uppercase tracking-wide">
          {category}
        </h1>
        <p className="mt-2 text-[11px] font-mono uppercase tracking-widest text-gray-400">
          {items.length} {items.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-gray-200">
          <Sparkles className="w-12 h-12 stroke-[1.2] text-gray-300" />
          <p className="font-mono text-sm uppercase text-gray-500">
            No products in this category yet.
          </p>
          <MotionLink
            to="/shop"
            className="font-mono text-xs tracking-widest uppercase px-6 py-2"
          >
            <span>Explore All Products</span>
          </MotionLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onAddToCart={onAddToCart}
              wished={wishlistIds.includes(item.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </main>
  );
};