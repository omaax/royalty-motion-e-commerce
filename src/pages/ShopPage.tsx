import { useEffect, useRef, useState } from 'react';
import { ShopItem } from '../types';
import { useShopFilters } from '../hooks/useShopFilters';
import { ShopSidebar } from '../components/shop/ShopSidebar';
import { ShopToolbar } from '../components/shop/ShopToolbar';
import { SearchBar } from '../components/shop/SearchBar';
import { ProductGrid } from '../components/shop/ProductGrid';
import { JoinCircleModal } from '../components/shop/JoinCircleModal';
import { SEO } from '../components/SEO';

interface ShopPageProps {
  onAddToCart: (item: ShopItem) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (item: ShopItem) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart, wishlistIds, onToggleWishlist }) => {
  const filters = useShopFilters();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && filters.hasMore) {
          filters.loadMore();
        }
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [filters.hasMore, filters.loadMore]);

  return (
    <>
      <SEO
        title="Shop"
        description="Shop ROYALTY's collection of futuristic streetwear, techwear, and avant-garde accessories. Limited edition drops available now."
      />
      <div className="lg:flex lg:items-stretch flex-1 min-h-0 lg:overflow-hidden">
        <ShopSidebar filters={filters} onOpenJoinModal={() => setShowJoinModal(true)} />

        <main className="px-4 lg:px-8 pt-4 lg:pt-2 pb-6 lg:pb-2 lg:order-2 flex-1 min-w-0 flex flex-col lg:overflow-y-auto">
          <div className="space-y-4 lg:space-y-2 flex flex-col">
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

            <div className="pt-1">
              <ProductGrid
                items={filters.visibleProducts}
                gridCols={filters.gridCols}
                onAddToCart={onAddToCart}
                onResetFilters={filters.resetFilters}
                wishlistIds={wishlistIds}
                onToggleWishlist={onToggleWishlist}
              />
              <div
                ref={sentinelRef}
                className="h-16 flex items-center justify-center"
                aria-hidden
              >
                {filters.hasMore && (
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400 animate-pulse">
                    loading more...
                  </span>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {showJoinModal && <JoinCircleModal onClose={() => setShowJoinModal(false)} />}
    </>
  );
};