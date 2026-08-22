import { ShopItem } from './product';

export interface CollectionItem {
  id: string;
  code: string;
  title: string;
  description: string;
}

export interface JournalItem {
  id: string;
  date: string;
  title: string;
  readTime: string;
}

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

export type GridCols = 4 | 2 | 1;

export interface FilterState {
  selectedCategory: string;
  priceRange: [number, number];
  selectedColor: import('./product').ProductColor | null;
  inStockOnly: boolean;
  sortBy: SortOption;
  searchQuery: string;
}

export interface AccordionState {
  category: boolean;
  price: boolean;
  color: boolean;
}

export interface ToastMessage {
  id: string;
  text: string;
}
