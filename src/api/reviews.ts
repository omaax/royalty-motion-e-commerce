import { http } from './client';
import type { ApiDocumentResponse, ApiListResponse, ApiReview } from './types';

export interface ReviewFilters {
  page?: number;
  limit?: number;
}

export async function getProductReviews(
  productId: string,
  filters: ReviewFilters = {}
): Promise<ApiReview[]> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === '') continue;
    params.set(key, String(value));
  }
  const query = params.toString();
  const response = await http.get<ApiListResponse<ApiReview>>(
    `/products/${productId}/reviews${query ? `?${query}` : ''}`
  );
  return response.data ?? [];
}

export interface CreateReviewPayload {
  title: string;
  ratings: number;
  user: string;
  product: string;
}

export const createReviewApi = (productId: string, payload: CreateReviewPayload) =>
  http
    .post<ApiDocumentResponse<ApiReview>>(`/products/${productId}/reviews`, payload)
    .then((response) => (response.document ?? response.data) as ApiReview);

export const deleteReviewApi = (orderId: string) => http.delete<void>(`/products/${orderId}/reviews`);