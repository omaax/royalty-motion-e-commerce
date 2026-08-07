import { useEffect, useMemo, useState } from 'react';
import { ShopItem, SortOption, ProductColor } from '../types';
import { SHOP_PRODUCTS } from '../data/shopData';
import { PRICE_MIN, PRICE_MAX, DEFAULT_FILTERS } from '../constants/shop';

const PAGE_SIZE = 8;

export function useShopFilters() {
  const [selectedCategory, setSelectedCategory] = useState<string>(DEFAULT_FILTERS.selectedCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_FILTERS.priceRange);
  const [selectedColor, setSelectedColor] = useState<string | null>(DEFAULT_FILTERS.selectedColor);
  const [inStockOnly, setInStockOnly] = useState<boolean>(DEFAULT_FILTERS.inStockOnly);
  const [sortBy, setSortBy] = useState<SortOption>(DEFAULT_FILTERS.sortBy);
  const [searchQuery, setSearchQuery] = useState<string>(DEFAULT_FILTERS.searchQuery);
  const [gridCols, setGridCols] = useState<4 | 2 | 1>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [collapseCategory, setCollapseCategory] = useState(false);
  const [collapsePrice, setCollapsePrice] = useState(false);
  const [collapseColor, setCollapseColor] = useState(false);

  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter((item) => {
      if (selectedCategory !== 'All Products' && item.category !== selectedCategory) {
        return false;
      }
      if (item.price < priceRange[0] || item.price > priceRange[1]) {
        return false;
      }
      if (selectedColor && !item.colors.includes(selectedColor as ProductColor)) {
        return false;
      }
      if (inStockOnly && !item.inStock) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
        );
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0;
    });
  }, [selectedCategory, priceRange, selectedColor, inStockOnly, sortBy, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Products': SHOP_PRODUCTS.length };
    for (const item of SHOP_PRODUCTS) {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const colorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of SHOP_PRODUCTS) {
      for (const color of item.colors) {
        counts[color] = (counts[color] ?? 0) + 1;
      }
    }
    return counts;
  }, []);

  const hasActiveFilters =
    selectedCategory !== 'All Products' ||
    priceRange[0] > PRICE_MIN ||
    priceRange[1] < PRICE_MAX ||
    selectedColor !== null ||
    inStockOnly ||
    searchQuery.trim() !== '';

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  const resetFilters = () => {
    setSelectedCategory(DEFAULT_FILTERS.selectedCategory);
    setPriceRange(DEFAULT_FILTERS.priceRange);
    setSelectedColor(DEFAULT_FILTERS.selectedColor);
    setInStockOnly(DEFAULT_FILTERS.inStockOnly);
    setSearchQuery(DEFAULT_FILTERS.searchQuery);
  };

  const resetPage = () => setCurrentPage(1);

  return {
    filteredProducts,
    categoryCounts,
    colorCounts,
    hasActiveFilters,
    resetFilters,
    resetPage,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedColor,
    setSelectedColor,
    inStockOnly,
    setInStockOnly,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    gridCols,
    setGridCols,
    currentPage,
    setCurrentPage,
    collapseCategory,
    setCollapseCategory,
    collapsePrice,
    setCollapsePrice,
    collapseColor,
    setCollapseColor,
    totalPages,
    visibleProducts,
    pageSize: PAGE_SIZE,
  };
}
