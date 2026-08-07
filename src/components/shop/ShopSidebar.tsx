import { SlidersHorizontal } from 'lucide-react';
import { CategoryFilter } from './CategoryFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { ColorFilter } from './ColorFilter';
import { JoinCircleBox } from './JoinCircleBox';
import { useShopFilters } from '../../hooks/useShopFilters';

interface ShopSidebarProps {
  filters: ReturnType<typeof useShopFilters>;
  onOpenJoinModal: () => void;
}

export const ShopSidebar: React.FC<ShopSidebarProps> = ({ filters, onOpenJoinModal }) => {
  const {
    categoryCounts,
    colorCounts,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedColor,
    setSelectedColor,
    inStockOnly,
    setInStockOnly,
    hasActiveFilters,
    resetFilters,
    resetPage,
    collapseCategory,
    setCollapseCategory,
    collapsePrice,
    setCollapsePrice,
    collapseColor,
    setCollapseColor,
  } = filters;

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    resetPage();
  };

  const selectColor = (color: string | null) => {
    setSelectedColor(color);
    resetPage();
  };

  const changePrice = (range: [number, number]) => {
    setPriceRange(range);
    resetPage();
  };

  return (
    <aside className="order-2 lg:order-1 w-full lg:w-72 xl:w-80 shrink-0 lg:h-full lg:overflow-y-auto border-t lg:border-t-0 border-gray-100 lg:border-r bg-white pb-2 lg:pb-8 flex flex-col">
      <div className="px-5 lg:px-5 pt-4 pb-1">
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-black uppercase">
          SHOP
        </h2>
      </div>

      <div className="px-5 pt-2 space-y-3 text-xs flex-1 flex flex-col">
        <div className="flex items-center justify-between pb-2 border-b border-gray-200 text-xs font-mono tracking-[0.2em] font-bold uppercase">
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            FILTERS
          </span>
          <span className="text-gray-400">—</span>
        </div>

        <CategoryFilter
          collapsed={collapseCategory}
          onToggle={() => setCollapseCategory(!collapseCategory)}
          selectedCategory={selectedCategory}
          onSelect={selectCategory}
          counts={categoryCounts}
        />

        <PriceRangeFilter
          collapsed={collapsePrice}
          onToggle={() => setCollapsePrice(!collapsePrice)}
          priceRange={priceRange}
          onChange={changePrice}
        />

        <ColorFilter
          collapsed={collapseColor}
          onToggle={() => setCollapseColor(!collapseColor)}
          selectedColor={selectedColor}
          onSelect={selectColor}
          counts={colorCounts}
        />

        <div className="pt-4 border-t border-gray-100">
          <label className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => {
                setInStockOnly(e.target.checked);
                resetPage();
              }}
              className="w-3.5 h-3.5 accent-black rounded-none cursor-pointer"
            />
            <span>IN STOCK ONLY</span>
          </label>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="w-full py-2 border border-black text-[10px] font-mono tracking-widest uppercase hover:bg-black hover:text-white transition-all cursor-pointer mt-2"
          >
            RESET ALL FILTERS [✕]
          </button>
        )}

        <div className="py-4 flex justify-around text-black opacity-30 text-xs select-none">
          <span>•</span>
          <span>✦</span>
          <span>+</span>
          <span>✦</span>
        </div>

        <div className="mt-auto pt-6">
          <JoinCircleBox onOpen={onOpenJoinModal} />
        </div>
      </div>
    </aside>
  );
};