import { ShopItem, GridCols } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  items: ShopItem[];
  gridCols: GridCols;
  onQuickView: (item: ShopItem) => void;
  onAddToCart: (item: ShopItem) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  items,
  gridCols,
  onQuickView,
  onAddToCart,
  onResetFilters,
}) => {
  if (items.length === 0) {
    return (
      <div className="py-24 text-center space-y-4 border border-dashed border-gray-200">
        <p className="font-mono text-sm uppercase text-gray-500">
          No products found matching your active filter criteria.
        </p>
        <button
          onClick={onResetFilters}
          className="px-6 py-2 bg-black text-white text-xs font-mono tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-x-6 gap-y-12 ${
        gridCols === 4
          ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
          : gridCols === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1'
      }`}
    >
      {items.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};