import { CartItem } from './cart';

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentInfo {
  cardLast4: string;
  expiry: string;
}

export interface Order {
  id: string;
  placedAt: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shipping?: ShippingInfo;
  payment?: PaymentInfo;
}
