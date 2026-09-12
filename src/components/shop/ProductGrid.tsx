import { ShopItem, GridCols } from '../../types';
import { ProductCard } from './ProductCard';
import { MotionButton } from '../MotionButton';

interface ProductGridProps {
  items: ShopItem[];
  gridCols: GridCols;
  onAddToCart: (item: ShopItem) => void;
  onResetFilters: () => void;
  wishlistIds?: Set<string> | string[];
  onToggleWishlist?: (item: ShopItem) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  items,
  gridCols,
  onAddToCart,
  onResetFilters,
  wishlistIds,
  onToggleWishlist,
}) => {
  const wishedIds = wishlistIds instanceof Set ? wishlistIds : new Set<string>(wishlistIds ?? []);
  if (items.length === 0) {
    return (
      <div className="py-24 text-center space-y-4 border border-dashed border-gray-200">
        <p className="font-mono text-sm uppercase text-gray-500">
          No products found matching your active filter criteria.
        </p>
        <MotionButton
          onClick={onResetFilters}
          className="font-mono text-xs tracking-widest uppercase px-6 py-2"
        >
          <span>Clear Filters</span>
        </MotionButton>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-x-4 gap-y-6 lg:gap-y-3 ${
        gridCols === 4
          ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
          : gridCols === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1'
      }`}
    >
      {items.map((item, index) => (
        <ProductCard
          key={item.id}
          item={item}
          onAddToCart={onAddToCart}
          wished={wishedIds.has(item.id)}
          onToggleWishlist={onToggleWishlist}
          priority={index === 0}
        />
      ))}
    </div>
  );
};