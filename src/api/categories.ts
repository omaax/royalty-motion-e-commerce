import { http } from './client';
import type {
  ApiCategory,
  ApiDocumentResponse,
  ApiListResponse,
  ApiShopBrand,
} from './types';

export interface CategoryFilters {
  name?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export async function getCategories(filters: CategoryFilters = {}): Promise<ApiCategory[]> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === '') continue;
    params.set(key, String(value));
  }
  const query = params.toString();
  const response = await http.get<ApiListResponse<ApiCategory>>(
    `/categories${query ? `?${query}` : ''}`
  );
  return response.data ?? [];
}

export const getCategory = (id: string): Promise<ApiCategory> =>
  http
    .get<ApiDocumentResponse<ApiCategory>>(`/categories/${id}`)
    .then((response) => (response.document ?? response.data) as ApiCategory);

export const createCategoryApi = (data: { name: string }) =>
  http
    .post<ApiDocumentResponse<ApiCategory>>('/categories', data)
    .then((response) => (response.document ?? response.data) as ApiCategory);

export const updateCategoryApi = (id: string, data: { name: string }) =>
  http
    .put<ApiDocumentResponse<ApiCategory>>(`/categories/${id}`, data)
    .then((response) => (response.document ?? response.data) as ApiCategory);

export const deleteCategoryApi = (id: string) => http.delete<void>(`/categories/${id}`);

export async function getBrands(): Promise<ApiShopBrand[]> {
  const response = await http.get<ApiListResponse<ApiShopBrand>>('/brands');
  return response.data ?? [];
}