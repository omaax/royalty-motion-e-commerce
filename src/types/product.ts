export type Category = 'Wearables' | 'Headgear' | 'Accessories' | 'Limited Edition';

export type CollectionId = 'series-01' | 'series-02' | 'series-03';

export type ProductColor = 'Black' | 'White' | 'Gray' | 'Red' | 'Blue' | 'Green';

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
