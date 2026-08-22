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
