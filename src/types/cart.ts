import { ShopItem } from './product';

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

export interface CartLineProduct {
  id: string;
  title: string;
  price: number;
  category: string;
  colors: string[];
  inStock: boolean;
  images: string[];
  description?: string;
  tag?: string;
}

export interface CartLineItem {
  itemId: string;
  product: CartLineProduct;
  color?: string;
  quantity: number;
  price: number;
}
