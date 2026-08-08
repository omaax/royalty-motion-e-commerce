import { Category, ProductColor } from '../types';

export const PRICE_MIN = 50;
export const PRICE_MAX = 5000;
export const PRICE_STEP = 50;

export const CATEGORIES: Category[] = [
  'Wearables',
  'Headgear',
  'Accessories',
  'Limited Edition',
];

export const CATEGORY_SLUGS: Record<Category, string> = {
  Wearables: 'wearables',
  Headgear: 'headgear',
  Accessories: 'accessories',
  'Limited Edition': 'limited-edition',
};

export const CATEGORY_BY_SLUG: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((category) => [CATEGORY_SLUGS[category], category])
) as Record<string, Category>;

export const categoryToSlug = (category: Category): string => CATEGORY_SLUGS[category];

export const slugToCategory = (slug: string): Category | null =>
  CATEGORY_BY_SLUG[slug] ?? null;

export const PRODUCT_COLORS: ProductColor[] = [
  'Black',
  'White',
  'Gray',
  'Red',
  'Blue',
  'Green',
];

export const COLOR_HEX: Record<ProductColor, string> = {
  Black: '#111111',
  White: '#FFFFFF',
  Gray: '#9CA3AF',
  Red: '#DC2626',
  Blue: '#2563EB',
  Green: '#16A34A',
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