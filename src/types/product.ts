export type Category = string;

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
  originalPrice?: number;
  category: string;
  colors: string[];
  inStock: boolean;
  tag?: string;
  description?: string;
  images: string[];
  measurements?: ProductMeasurements;
  collection?: CollectionId;
}
