export interface ProductMeasurement {
  label: string;
  value: string;
}

export interface ProductMeasurements {
  sizeRange?: string;
  sizes?: string[];
  dimensions: ProductMeasurement[];
}

export interface ShopItem {
  id: string;
  title: string;
  price: number;
  category: Category;
  colors: ProductColor[];
  inStock: boolean;
  tag?: string;
  description?: string;
  images: string[];
  measurements?: ProductMeasurements;
  collection?: CollectionId;
}

export interface CartLineOptions {
  color?: string;
  size?: string;
}

export interface CartItem {
  key: string;
  item: ShopItem;
  quantity: number;
  color?: string;
  size?: string;
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

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface UserProfile {
  name: string;
  email: string;
  address: string;
}

export interface Order {
  id: string;
  placedAt: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
}

export interface ToastMessage {
  id: string;
  text: string;
}

export type Category = 'Wearables' | 'Headgear' | 'Accessories' | 'Limited Edition';

export type CollectionId = 'series-01' | 'series-02' | 'series-03';

export type ProductColor = 'Black' | 'White' | 'Gray' | 'Red' | 'Blue' | 'Green';

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

