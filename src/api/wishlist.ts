import { http } from './client';
import type { ApiDocumentResponse, ApiWishlistItem } from './types';

export const getWishlistApi = () =>
  http
    .get<ApiDocumentResponse<ApiWishlistItem[]>>('/wishlist')
    .then((response) => {
      const raw = response.document ?? response.data ?? (null as unknown);
      return Array.isArray(raw) ? raw : [];
    })
    .then((items) => items.filter((item) => item._id));

export const addToWishlistApi = (productId: string) =>
  http
    .post<ApiDocumentResponse<ApiWishlistItem[]>>('/wishlist', { productId })
    .then((response) => (response.document ?? response.data) as ApiWishlistItem[]);

export const removeFromWishlistApi = (productId: string) =>
  http
    .delete<ApiDocumentResponse<ApiWishlistItem[]>>(`/wishlist/${productId}`)
    .then((response) => (response.document ?? response.data) as ApiWishlistItem[]);

export const getWishlistItemIdsApi = () =>
  getWishlistApi().then((items) =>
    items
      .map((item) =>
        typeof item.product === 'string' ? item.product : item.product?._id
      )
      .filter((id): id is string => Boolean(id))
  );