import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { wishlistKeys } from '../api/queryKeys';
import {
  addToWishlistApi,
  getWishlistApi,
  getWishlistItemIdsApi,
  removeFromWishlistApi,
} from '../api/wishlist';
import { readGuestWishlist, toggleGuestWishlist } from '../lib/guestCart';
import { useGuestCartVersion } from '../lib/useGuestCartVersion';
import { useToken } from '../lib/useToken';
import { pushToast } from '../lib/useToast';
import { useProductsList } from './useProducts';
import type { ShopItem } from '../types';

export const useWishlistIds = (): string[] => {
  const token = useToken();
  const isLoggedIn = Boolean(token);
  const guestVersion = useGuestCartVersion();

  const logged = useQuery({
    queryKey: wishlistKeys.own,
    queryFn: getWishlistItemIdsApi,
    enabled: isLoggedIn,
    initialData: [],
  });

  const guest = useMemo(() => {
    void guestVersion;
    return readGuestWishlist();
  }, [guestVersion, isLoggedIn]);

  return isLoggedIn ? (logged.data ?? []) : guest;
};

export interface WishlistState {
  ids: string[];
  products: ShopItem[];
  isGuest: boolean;
  isEmpty: boolean;
}

export const useWishlist = (): WishlistState => {
  const token = useToken();
  const isLoggedIn = Boolean(token);
  const guestVersion = useGuestCartVersion();

  const logged = useQuery({
    queryKey: wishlistKeys.own,
    queryFn: async () => getWishlistApi(),
    enabled: isLoggedIn,
    initialData: [],
  });

  const { data: allProducts } = useProductsList(
    {},
    { enabled: !isLoggedIn }
  );

  return useMemo(() => {
    if (isLoggedIn) {
      const items = logged.data ?? [];
      const ids = items
        .map((item) =>
          typeof item.product === 'string' ? item.product : item.product?._id
        )
        .filter((id): id is string => Boolean(id));
      const products: ShopItem[] = items
        .filter((item) => typeof item.product === 'object' && item.product)
        .map((item) => {
          const p = item.product as { _id?: string; title?: string; imageCover?: string; price?: number };
          return {
            id: String(p._id ?? ''),
            title: p.title ?? 'Product',
            price: Number(p.price ?? 0),
            category: '',
            colors: [],
            inStock: true,
            images: p.imageCover ? [p.imageCover] : [],
          };
        });
      return { ids, products, isGuest: false, isEmpty: ids.length === 0 };
    }

    void guestVersion;
    const ids = readGuestWishlist();
    const products: ShopItem[] = (allProducts ?? []).filter((p) =>
      ids.includes(p.id)
    );
    return { ids, products, isGuest: true, isEmpty: ids.length === 0 };
  }, [isLoggedIn, logged.data, allProducts, guestVersion]);
};

export const useToggleWishlist = () => {
  const token = useToken();
  const isLoggedIn = Boolean(token);
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: addToWishlistApi,
    onSuccess: () => {
      pushToast('Added to wishlist.');
      void queryClient.invalidateQueries({ queryKey: wishlistKeys.own });
    },
  });

  const remove = useMutation({
    mutationFn: removeFromWishlistApi,
    onSuccess: () => {
      pushToast('Removed from wishlist.');
      void queryClient.invalidateQueries({ queryKey: wishlistKeys.own });
    },
  });

  const ids = useWishlistIds();

  const toggle = (target: string | { id: string }): void => {
    const productId = typeof target === 'string' ? target : target.id;
    if (!isLoggedIn) {
      toggleGuestWishlist(productId);
      return;
    }
    if (ids.includes(productId)) {
      remove.mutate(productId);
    } else {
      add.mutate(productId);
    }
  };

  return toggle;
};