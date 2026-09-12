export interface GuestCartItem {
  productId: string;
  quantity: number;
  color?: string;
}

export interface GuestWishlistItem {
  productId: string;
}

const KEY = {
  cart: 'cff.guestCart',
  wishlist: 'cff.guestWishlist',
};

export const GUEST_CART_EVENT = 'cff:guestCart';

function emitGuestCartChanged(): void {
  try {
    window.dispatchEvent(new Event(GUEST_CART_EVENT));
  } catch {
    // storage unavailable
  }
}

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    emitGuestCartChanged();
  } catch {
    // storage unavailable
  }
}

export function readGuestCart(): GuestCartItem[] {
  return read<GuestCartItem>(KEY.cart);
}

export const guestCartItemKey = (item: { productId: string; color?: string }): string =>
  `${item.productId}_${item.color ?? ''}`;

export function addGuestCartItem(
  productId: string,
  color?: string,
  quantity = 1
): GuestCartItem[] {
  const items = readGuestCart();
  const existing = items.find(
    (item) => item.productId === productId && (item.color ?? '') === (color ?? '')
  );
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ productId, color, quantity });
  }
  write(KEY.cart, items);
  return items;
}

export function updateGuestCartItem(key: string, quantity: number): GuestCartItem[] {
  const items = readGuestCart().filter((item) => guestCartItemKey(item) !== key);
  if (quantity > 0) {
    const [productId, color] = key.split('_');
    items.push({ productId, color, quantity });
  }
  write(KEY.cart, items);
  return items;
}

export function removeGuestCartItem(key: string): GuestCartItem[] {
  const items = readGuestCart().filter((item) => guestCartItemKey(item) !== key);
  write(KEY.cart, items);
  return items;
}

export function writeGuestCart(items: GuestCartItem[]): void {
  write(KEY.cart, items);
}

export function clearGuestCart(): void {
  try {
    localStorage.removeItem(KEY.cart);
    emitGuestCartChanged();
  } catch {
    // storage unavailable
  }
}

export function readGuestWishlist(): string[] {
  return read<GuestWishlistItem>(KEY.wishlist).map((item) => item.productId);
}

export function toggleGuestWishlist(productId: string): string[] {
  const ids = readGuestWishlist();
  const next = ids.includes(productId)
    ? ids.filter((id) => id !== productId)
    : [...ids, productId];
  write(
    KEY.wishlist,
    next.map((id) => ({ productId: id }))
  );
  return next;
}

export function writeGuestWishlist(productIds: string[]): void {
  write(
    KEY.wishlist,
    productIds.map((productId) => ({ productId }))
  );
}

export function clearGuestWishlist(): void {
  try {
    localStorage.removeItem(KEY.wishlist);
    emitGuestCartChanged();
  } catch {
    // storage unavailable
  }
}

export function mergeGuestCartIntoStorage(items: GuestCartItem[]): void {
  if (items.length === 0) return;
  for (const item of items) {
    addGuestCartItem(item.productId, item.color, item.quantity);
  }
}

export function mergeGuestWishlistIntoStorage(ids: string[]): void {
  if (ids.length === 0) return;
  const all = new Set<string>([...readGuestWishlist(), ...ids]);
  write(
    KEY.wishlist,
    [...all].map((productId) => ({ productId }))
  );
}