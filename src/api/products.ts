import { http } from './client';
import type {
  ApiDocumentResponse,
  ApiListResponse,
  ApiProduct,
  ApiProductDetail,
} from './types';

export interface ProductFilters {
  name?: string;
  price?: string;
  priceAfterDiscount?: string;
  category?: string;
  subCategories?: string;
  brand?: string;
  color?: string;
  sort?: string;
  fields?: string;
  page?: number;
  limit?: number;
}

export async function getProducts(filters: ProductFilters = {}): Promise<ApiProduct[]> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === '') continue;
    params.set(key, String(value));
  }
  const query = params.toString();
  const response = await http.get<ApiListResponse<ApiProduct>>(`/products${query ? `?${query}` : ''}`);
  return response.data ?? [];
}

export const getProduct = (id: string): Promise<ApiProductDetail> =>
  http
    .get<ApiDocumentResponse<ApiProductDetail>>(`/products/${id}`)
    .then((response) => (response.document ?? response.data) as ApiProductDetail);

export interface ProductPayload {
  title: string;
  description?: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  category: string;
  imageCover?: File | string;
  images?: (File | string)[];
  color?: string[];
}

function buildProductForm(payload: ProductPayload): FormData {
  const form = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (entry !== undefined && entry !== null) {
          form.append(key, entry);
        }
      }
    } else {
      const typed = value as string | Blob | number;
      form.append(key, typed as Blob);
    }
  }
  return form;
}

export const createProductApi = (payload: ProductPayload) =>
  http.post<ApiDocumentResponse<ApiProduct>>('/products', buildProductForm(payload));

export const updateProductApi = (id: string, payload: ProductPayload) =>
  http.put<ApiDocumentResponse<ApiProduct>>(`/products/${id}`, buildProductForm(payload));

export const deleteProductApi = (id: string) => http.delete<void>(`/products/${id}`);