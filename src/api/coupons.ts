import { http } from './client';
import type { ApiCoupon } from './types';

export const getCoupons = (): Promise<ApiCoupon[]> =>
  http
    .get<{ message: string; data: ApiCoupon[] }>('/coupons')
    .then((response) => response.data ?? []);

export const createCouponApi = (data: { name: string; expire: string; discount: number }) =>
  http.post<{ data: ApiCoupon }>('/coupons', data);

export const deleteCouponApi = (id: string) => http.delete<void>(`/coupons/${id}`);