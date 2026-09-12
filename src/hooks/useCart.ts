import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartKeys } from '../api/queryKeys';
import { cartItemKey, mapCart } from '../api/mappers';
import { pushToast } from '../lib/useToast';
import {
  addToCartApi,
  clearCartApi,
  getCartApi,
  removeCartItemApi,
  updateCartItemApi,
} from '../api/cart';
import {
  addGuestCartItem,
  readGuestCart,
  removeGuestCartItem,
  updateGuestCartItem,
} from '../lib/guestCart';
import { useGuestCartVersion } from '../lib/useGuestCartVersion';
import { useToken } from '../lib/useToken';
import { useProductsList } from './useProducts';
import { useToggleWishlist } from './useWishlist';
import type { CartLineItem } from '../types';

export interface CartState {
  items: CartLineItem[];
  total: number;
  isEmpty: boolean;
  isGuest: boolean;
}

const EMPTY = { items: [], itemKeys: [], total: 0 };

export const useCart = (): CartState & { itemKeys: string[] } => {
  const token = useToken();
  const isLoggedIn = Boolean(token);
  const guestVersion = useGuestCartVersion();

  const logged = useQuery({
    queryKey: cartKeys.own,
    queryFn: async () => {
      const cart = await getCartApi();
      return cart ? mapCart(cart) : { ...EMPTY };
    },
    enabled: isLoggedIn,
    initialData: { ...EMPTY },
  });

  const { data: products } = useProductsList({}, { enabled: !isLoggedIn });

  const guest = useMemo(() => {
    if (isLoggedIn) return { ...EMPTY };
    void guestVersion;
    const items: CartLineItem[] = [];
    let total = 0;
    for (const entry of readGuestCart()) {
      const product = products?.find((p) => p.id === entry.productId);
      if (!product) continue;
      items.push({
        itemId: `${entry.productId}_${entry.color ?? ''}`,
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          colors: product.colors,
          inStock: product.inStock,
          images: product.images,
          description: product.description,
        },
        color: entry.color,
        quantity: entry.quantity,
        price: product.price * entry.quantity,
      });
    }
    const itemKeys = items.map(cartItemKey);
    total = items.reduce((sum, item) => sum + item.price, 0);
    return { items, itemKeys, total };
  }, [isLoggedIn, products, guestVersion]);

  const data = isLoggedIn ? logged.data : guest;

  return {
    items: data.items,
    itemKeys: data.itemKeys,
    total: data.total,
    isEmpty: data.items.length === 0,
    isGuest: !isLoggedIn,
  };
};

export const useCartCount = (): number => {
  const { items } = useCart();
  return items.length;
};

// ---- logged-in mutations ----

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => {
      pushToast('Added to cart.');
      void queryClient.invalidateQueries({ queryKey: cartKeys.own });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      updateCartItemApi(itemId, quantity),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cartKeys.own });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => removeCartItemApi(itemId),
    onSuccess: () => {
      pushToast('Removed from cart.');
      void queryClient.invalidateQueries({ queryKey: cartKeys.own });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearCartApi,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cartKeys.own });
    },
  });
};

// ---- guest helpers ----

export const useGuestCartActions = () => {
  void useGuestCartVersion();
  return {
    add: (product: { id: string; color?: string }, quantity = 1) => {
      addGuestCartItem(product.id, product.color, quantity);
    },
    updateQuantity: (key: string, quantity: number) => {
      updateGuestCartItem(key, quantity);
    },
    remove: (key: string) => {
      removeGuestCartItem(key);
    },
    clear: () => {
      try {
        localStorage.removeItem('cff.guestCart');
        window.dispatchEvent(new Event('cff:guestCart'));
      } catch {
        // storage unavailable
      }
    },
  };
};

// ---- shared shop actions (used by grids / product cards) ----

export const useShopActions = () => {
  const token = useToken();
  const isLoggedIn = Boolean(token);
  const addToCart = useAddToCart();
  const guestActions = useGuestCartActions();
  const toggleWishlist = useToggleWishlist();

  const onAddToCart = (
    item: { id: string; color?: string },
    quantity = 1
  ): void => {
    if (isLoggedIn) {
      addToCart.mutate({
        productId: item.id,
        color: item.color,
        quantity,
      });
    } else {
      guestActions.add(item, quantity);
    }
  };

  return {
    isLoggedIn,
    onAddToCart,
    onToggleWishlist: toggleWishlist,
  };
};