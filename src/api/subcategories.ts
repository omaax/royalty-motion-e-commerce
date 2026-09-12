import { http } from './client';
import type {
  ApiDocumentResponse,
  ApiListResponse,
  ApiSubCategory,
} from './types';

export async function getSubCategories(
  category?: string
): Promise<ApiSubCategory[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  const response = await http.get<ApiListResponse<ApiSubCategory>>(
    `/subcategories${query}`
  );
  return response.data ?? [];
}

export const createSubCategoryApi = (data: {
  name: string;
  category: string;
}): Promise<ApiSubCategory> =>
  http
    .post<ApiDocumentResponse<ApiSubCategory>>('/subcategories', data)
    .then((response) => (response.document ?? response.data) as ApiSubCategory);

export const updateSubCategoryApi = (
  id: string,
  data: { name: string }
): Promise<ApiSubCategory> =>
  http
    .put<ApiDocumentResponse<ApiSubCategory>>(`/subcategories/${id}`, data)
    .then((response) => (response.document ?? response.data) as ApiSubCategory);

export const deleteSubCategoryApi = (id: string) =>
  http.delete<void>(`/subcategories/${id}`);