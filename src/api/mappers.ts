import { API_BASE_URL } from './client';
import type {
  ApiCart,
  ApiCartItem,
  ApiCartProduct,
  ApiCategory,
  ApiOrder,
  ApiOrderItem,
  ApiProduct,
  ApiProductDetail,
  ApiReview,
  ApiShopBrand,
  ApiUser,
} from './types';
import type { CartLineItem, CartLineProduct, ShopItem } from '../types';

export const CURRENCY = 'EGP';
export const TAX_RATE = 0.14;
export const SHIPPING_FEE = 50;

export const formatPrice = (value: number): string =>
  `${value.toFixed(2)} ${CURRENCY}`;

const COLOR_HEX_MAP: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
  gray: '#9ca3af',
  grey: '#9ca3af',
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  beige: '#e8dcc4',
  brown: '#8b5a2b',
  navy: '#1e3a5f',
  pink: '#ec4899',
  purple: '#a855f7',
  orange: '#f97316',
  yellow: '#eab308',
};

export const normalizeColorName = (color: string): string => {
  const lower = color.trim().toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export const colorHex = (color: string): string =>
  COLOR_HEX_MAP[color.trim().toLowerCase()] ?? '#999999';

export const toKebab = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');

const isRemote = (uri: string): boolean => /^(https?:|data:|blob:)/i.test(uri);

/**
 * Turn a backend image string into a loadable URL.
 * - Full URLs (http/https/data/blob) pass through untouched.
 * - `uploads/<subdir>/<file>` stays on the same origin.
 * - A bare filename is scoped under the given folder (e.g. `Products`).
 */
export function resolveImagePath(uri?: string | null, folder?: string): string {
  if (!uri) return '';
  if (isRemote(uri)) return uri;
  const clean = uri.replace(/^\/+/, '');
  if (clean.startsWith('uploads/')) {
    return `${API_BASE_URL}/${clean}`;
  }
  const scoped = folder ? `${folder}/${clean}` : clean;
  return `${API_BASE_URL}/uploads/${scoped}`;
}

export function resolveCategory(
  category: ApiCategory | string | { name?: string } | undefined | null
): string {
  if (!category) return 'Uncategorized';
  if (typeof category === 'string') return category;
  return category?.name ?? 'Uncategorized';
}

export function resolveProductImages(product: ApiProduct): string[] {
  const images: string[] = [];
  if (product.imageCover) images.push(resolveImagePath(product.imageCover, 'Products'));
  for (const image of product.images ?? []) {
    if (!images.includes(resolveImagePath(image, 'Products'))) {
      images.push(resolveImagePath(image, 'Products'));
    }
  }
  return images;
}

export function mapProduct(product: ApiProduct): ShopItem {
  const hasDiscount =
    typeof product.priceAfterDiscount === 'number' && product.priceAfterDiscount > 0;
  const price = hasDiscount ? product.priceAfterDiscount : product.price;
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  return {
    id: String(product._id ?? product.id ?? ''),
    title: product.title,
    price,
    originalPrice: hasDiscount ? product.price : undefined,
    category: resolveCategory(product.category),
    colors: product.color ?? [],
    inStock: (product.quantity ?? 0) > 0,
    tag: undefined,
    description: product.description,
    images: resolveProductImages(product),
    ...(sizes.length > 0
      ? { measurements: { dimensions: [], sizes } }
      : {}),
  };
}

export interface ReviewView {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment?: string;
}

export function mapReview(review: ApiReview): ReviewView {
  const author = typeof review.user === 'object' && review.user ? review.user.name : '';
  return {
    id: String(review._id),
    author,
    rating: Number(review.ratings ?? 0),
    date: review.createdAt ?? '',
    comment: review.title,
  };
}

export function mapProductDetail(product: ApiProductDetail): ShopItem {
  return mapProduct(product);
}

export function mapCategory(category: ApiCategory): { name: string; image: string } {
  return {
    name: category.name,
    image: resolveImagePath(category.image, 'Categories'),
  };
}

export function mapBrand(brand: ApiShopBrand): {
  _id: string;
  name: string;
  image: string;
} {
  return {
    _id: brand._id,
    name: brand.name,
    image: resolveImagePath(brand.image, 'Brands'),
  };
}

export function mapUser(user: ApiUser): ApiUser {
  return {
    ...user,
    imgProfile: user.imgProfile ? resolveImagePath(user.imgProfile, 'Users') : undefined,
  };
}

export const mapCartProduct = (product: ApiCartProduct | string): CartLineProduct => {
  if (typeof product === 'string') {
    return {
      id: product,
      title: 'Product',
      price: 0,
      category: '',
      colors: [],
      inStock: true,
      images: [],
    };
  }
  return {
    id: String(product._id ?? ''),
    title: product.title ?? 'Product',
    price: product.price ?? 0,
    category: '',
    colors: [],
    inStock: true,
    images: product.imageCover ? [resolveImagePath(product.imageCover, 'Products')] : [],
  };
};

export const mapCartItem = (item: ApiCartItem): CartLineItem => {
  const product = mapCartProduct(item.product);
  return {
    itemId: String(item._id),
    product,
    color: item.color,
    quantity: item.quantity,
    price: Number(item.price ?? product.price ?? 0),
  };
};

export const cartItemKey = (item: Pick<CartLineItem, 'product' | 'color'>): string =>
  `${item.product.id}_${item.color ?? ''}`;

export interface CartData {
  items: CartLineItem[];
  itemKeys: string[];
  total: number;
}

export const mapCart = (cart: ApiCart | null): CartData => {
  const items = (cart?.cartItems ?? []).map(mapCartItem);
  const total = Number(
    cart?.totalCartPriceAfterDiscount ?? cart?.totalCartPrice ?? 0
  );
  return { items, itemKeys: items.map(cartItemKey), total };
};

export interface OrderItemView {
  id: string;
  productId: string;
  title: string;
  image?: string;
  color?: string;
  quantity: number;
  price: number;
}

export const mapOrderItem = (item: ApiOrderItem): OrderItemView => {
  const product =
    typeof item.product === 'object' && item.product ? item.product : null;
  return {
    id: String(item.product),
    productId: typeof item.product === 'string' ? item.product : String(item.product?._id ?? ''),
    title: product?.title ?? 'Product',
    image: product?.imageCover ? resolveImagePath(product.imageCover, 'Products') : undefined,
    color: item.color,
    quantity: item.quantity,
    price: Number(item.price ?? 0),
  };
};

export interface OrderView {
  id: string;
  placedAt: string;
  items: OrderItemView[];
  status: string;
  total: number;
  totalBeforeDiscount: number;
  shipping: number;
  tax: number;
  paymentMethod?: string;
  shippingAddress?: {
    details?: string;
    phone?: string;
    city?: string;
    postalCode?: string;
  };
}

export function mapOrder(order: ApiOrder): OrderView {
  const items = (order.cartItems ?? []).map(mapOrderItem);
  const rawTotal = order.totalOrderPriceAfterDiscount ?? order.totalOrderPrice ?? 0;
  const beforeDiscount = order.totalOrderPrice ?? 0;
  const shipping = Number(order.shippingPrice ?? SHIPPING_FEE);
  const tax = Number(order.taxPrice ?? Math.round(rawTotal * TAX_RATE));
  return {
    id: String(order._id),
    placedAt: order.createdAt ?? '',
    items,
    status: order.isDelivered ? 'delivered' : order.isPaid ? 'paid' : 'placed',
    total: rawTotal + shipping + tax,
    totalBeforeDiscount: beforeDiscount,
    shipping,
    tax,
    paymentMethod: order.paymentMethodType,
    shippingAddress: order.shippingAddress
      ? {
          details: order.shippingAddress.details,
          phone: order.shippingAddress.phone,
          city: order.shippingAddress.city,
          postalCode: order.shippingAddress.postalCode,
        }
      : undefined,
  };
}

export const mapOrderList = (orders: ApiOrder[]): OrderView[] => orders.map(mapOrder);