import { http } from './client';
import type { ApiDocumentResponse, ApiListResponse, ApiOrder } from './types';

export interface OrderFilters {
  page?: number;
  limit?: number;
}

export async function getOrders(filters: OrderFilters = {}): Promise<ApiOrder[]> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === '') continue;
    params.set(key, String(value));
  }
  const query = params.toString();
  const response = await http.get<ApiListResponse<ApiOrder>>(`/orders${query ? `?${query}` : ''}`);
  return response.data ?? [];
}

export const getOrder = (id: string): Promise<ApiOrder> =>
  http
    .get<ApiDocumentResponse<ApiOrder>>(`/orders/${id}`)
    .then((response) => (response.document ?? response.data) as ApiOrder);

export const getAdminOrders = (): Promise<ApiOrder[]> =>
  http.get<ApiListResponse<ApiOrder>>('/orders/admin').then((response) => response.data ?? []);

export interface CreateOrderPayload {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
    postalCode?: string;
  };
  paymentMethodType: 'cash' | 'card';
}

export const createOrderApi = (payload: CreateOrderPayload): Promise<ApiOrder> =>
  http
    .post<ApiDocumentResponse<ApiOrder>>('/orders', payload)
    .then((response) => (response.document ?? response.data) as ApiOrder);