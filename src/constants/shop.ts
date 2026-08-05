import { Category, ProductColor } from '../types';

export const PRICE_MIN = 50;
export const PRICE_MAX = 5000;
export const PRICE_STEP = 50;

export const CATEGORIES: Category[] = [
  'Wearables',
  'Headgear',
  'Accessories',
  'Tech',
  'Limited Edition',
];

export const PRODUCT_COLORS: ProductColor[] = [
  'Obsidian',
  'Graphite',
  'Silver',
  'Bronze',
  'White',
];

export const COLOR_HEX: Record<ProductColor, string> = {
  Obsidian: '#121212',
  Graphite: '#4B5563',
  Silver: '#CBD5E1',
  Bronze: '#854D0E',
  White: '#FFFFFF',
};

export const DEFAULT_FILTERS = {
  selectedCategory: 'All Products',
  priceRange: [PRICE_MIN, PRICE_MAX] as [number, number],
  selectedColor: null as ProductColor | null,
  inStockOnly: false,
  sortBy: 'featured' as const,
  searchQuery: '',
};

export const SORT_LABELS: Record<string, string> = {
  featured: 'FEATURED',
  'price-low': 'PRICE: LOW TO HIGH',
  'price-high': 'PRICE: HIGH TO LOW',
  newest: 'NEWEST',
};

export const MAX_PAGE = 3;