import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ShopItem } from '../types';
import { COLLECTION_ITEMS } from '../data/pageData';
import { COLLECTION_PRODUCTS } from '../data/shopData';
import { ProductCard } from '../components/shop/ProductCard';
import { MotionButton } from '../components/MotionButton';

interface CollectionPageProps {
  onAddToCart: (item: ShopItem) => void;
  wishlistIds: string[];
  onToggleWishlist: (item: ShopItem) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const collection = useMemo(
    () => COLLECTION_ITEMS.find((c) => c.id === id) ?? null,
    [id]
  );

  const items = useMemo(
    () => (collection ? COLLECTION_PRODUCTS[collection.id] ?? [] : []),
    [collection]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!collection) {
    return (
      <main className="px-6 lg:px-12 pt-10 pb-20">
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-gray-200">
          <Sparkles className="w-12 h-12 stroke-[1.2] text-gray-300" />
          <p className="font-mono text-sm uppercase text-gray-500">
            Collection not found.
          </p>
          <button
            onClick={() => navigate('/collections')}
            className="px-6 py-2 bg-black text-white text-xs font-mono tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO COLLECTIONS</span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 lg:px-12 pt-8 pb-16">
      <button
        onClick={() => navigate('/collections')}
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-black transition-colors cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Collections</span>
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black mb-8">
        <div className="flex flex-col md:flex-row md:items-baseline gap-6">
          <div className="text-[10px] font-mono tracking-widest uppercase text-gray-400">
            {collection.code}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-black uppercase">
            {collection.title}
          </h1>
        </div>
        <div className="text-left md:text-right text-xs font-mono tracking-widest uppercase text-gray-500">
          {items.length} {items.length === 1 ? 'PRODUCT' : 'PRODUCTS'} IN SERIES
        </div>
      </div>

      <p className="max-w-2xl text-xs md:text-sm text-gray-600 font-jakarta leading-relaxed pb-8">
        {collection.description}
      </p>

      {items.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-gray-200">
          <Sparkles className="w-12 h-12 stroke-[1.2] text-gray-300" />
          <p className="font-mono text-sm uppercase text-gray-500">
            No products in this collection yet.
          </p>
          <MotionButton
            onClick={() => navigate('/shop')}
            className="font-mono text-xs tracking-widest uppercase px-6 py-2"
          >
            <span>Explore All Products</span>
          </MotionButton>
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