import { http } from './client';
import type { ApiCart, ApiDocumentResponse } from './types';

export const getCartApi = () =>
  http
    .get<ApiDocumentResponse<ApiCart>>('/cart')
    .then<ApiCart | null>((data) => (data.document ?? data.data) as ApiCart)
    .catch((error) => {
      // An empty cart is represented by a 404 from the backend.
      if (error instanceof Error && 'status' in error && (error as { status: number }).status === 404) {
        return null;
      }
      throw error;
    });

export const addToCartApi = (data: { productId: string; color?: string; quantity?: number }) =>
  http
    .post<ApiDocumentResponse<ApiCart>>('/cart', data)
    .then((response) => (response.document ?? response.data) as ApiCart);

export const updateCartItemApi = (itemId: string, quantity: number) =>
  http
    .put<ApiDocumentResponse<ApiCart>>(`/cart/${itemId}`, { quantity })
    .then((response) => (response.document ?? response.data) as ApiCart);

export const removeCartItemApi = (itemId: string) =>
  http
    .delete<ApiDocumentResponse<ApiCart>>(`/cart/${itemId}`)
    .then((response) => (response.document ?? response.data) as ApiCart);

export const clearCartApi = () => http.delete<void>('/cart');

export const applyCouponApi = (name: string) =>
  http
    .put<ApiDocumentResponse<ApiCart>>('/cart/applyCoupon', { name })
    .then((response) => (response.document ?? response.data) as ApiCart);