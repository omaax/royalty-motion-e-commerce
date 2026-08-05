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
      <div className="lg:flex lg:items-stretch">
        <ShopSidebar filters={filters} onOpenJoinModal={() => setShowJoinModal(true)} />

        <main className="px-6 lg:px-12 pt-10 lg:order-2 flex-1 min-w-0">
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

          <section className="space-y-5 pt-6">
            <ProductGrid
              items={filters.filteredProducts}
              gridCols={filters.gridCols}
              onQuickView={setSelectedQuickViewItem}
              onAddToCart={onAddToCart}
              onResetFilters={filters.resetFilters}
            />

            <Pagination
              currentPage={filters.currentPage}
              maxPage={filters.maxPage}
              onPage={filters.setCurrentPage}
            />
          </section>
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