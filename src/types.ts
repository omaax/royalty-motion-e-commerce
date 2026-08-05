export interface ShopItem {
  id: string;
  title: string;
  price: number;
  category: Category;
  color: ProductColor;
  inStock: boolean;
  tag?: string;
  description?: string;
  image?: string;
}

export interface CartItem {
  item: ShopItem;
  quantity: number;
}

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

export interface ToastMessage {
  id: string;
  text: string;
}

export type Category = 'Wearables' | 'Headgear' | 'Accessories' | 'Tech' | 'Limited Edition';

export type ProductColor = 'Obsidian' | 'Graphite' | 'Silver' | 'Bronze' | 'White';

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

export type GridCols = 4 | 2 | 1;

export interface FilterState {
  selectedCategory: string;
  priceRange: [number, number];
  selectedColor: ProductColor | null;
  inStockOnly: boolean;
  sortBy: SortOption;
  searchQuery: string;
}

export interface AccordionState {
  category: boolean;
  price: boolean;
  color: boolean;
}

