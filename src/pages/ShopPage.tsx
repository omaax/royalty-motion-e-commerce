import { useState } from 'react';
import { ShopItem } from '../types';
import { useShopFilters } from '../hooks/useShopFilters';
import { ShopSidebar } from '../components/shop/ShopSidebar';
import { ShopToolbar } from '../components/shop/ShopToolbar';
import { SearchBar } from '../components/shop/SearchBar';
import { ProductGrid } from '../components/shop/ProductGrid';
import { Pagination } from '../components/shop/Pagination';
import { QuickViewModal } from '../components/shop/QuickViewModal';
import { JoinCircleModal } from '../components/shop/JoinCircleModal';

interface ShopPageProps {
  onAddToCart: (item: ShopItem) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart }) => {
  const filters = useShopFilters();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedQuickViewItem, setSelectedQuickViewItem] = useState<ShopItem | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <>
      <div className="lg:flex lg:items-stretch flex-1 min-h-0 lg:overflow-hidden">
        <ShopSidebar filters={filters} onOpenJoinModal={() => setShowJoinModal(true)} />

        <main className="px-4 lg:px-8 pt-4 lg:pt-2 pb-6 lg:pb-2 lg:order-2 flex-1 min-w-0 flex flex-col justify-between">
          <div className="space-y-4 lg:space-y-2 flex-1 min-h-0 flex flex-col">
            <ShopToolbar
              sortBy={filters.sortBy}
              onSortBy={filters.setSortBy}
              gridCols={filters.gridCols}
              onGridCols={filters.setGridCols}
              isSearchOpen={isSearchOpen}
              onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
            />

            {isSearchOpen && (
              <SearchBar
                query={filters.searchQuery}
                onQuery={filters.setSearchQuery}
                onClose={() => setIsSearchOpen(false)}
              />
            )}

            <div className="flex-1 min-h-0 lg:overflow-hidden pt-1">
              <ProductGrid
                items={filters.visibleProducts}
                gridCols={filters.gridCols}
                onQuickView={setSelectedQuickViewItem}
                onAddToCart={onAddToCart}
                onResetFilters={filters.resetFilters}
              />
            </div>
          </div>

          <Pagination
            currentPage={filters.currentPage}
            maxPage={filters.totalPages}
            onPage={filters.setCurrentPage}
          />
        </main>
      </div>

      {selectedQuickViewItem && (
        <QuickViewModal
          item={selectedQuickViewItem}
          onClose={() => setSelectedQuickViewItem(null)}
          onAddToCart={onAddToCart}
        />
      )}

      {showJoinModal && <JoinCircleModal onClose={() => setShowJoinModal(false)} />}
    </>
  );
};