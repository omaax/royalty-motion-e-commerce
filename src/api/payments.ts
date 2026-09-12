import { http } from './client';

export interface CheckoutSessionResult {
  session?: {
    url?: string;
    id?: string;
    payment_status?: string;
  };
  url?: string;
}

export const createCheckoutSession = (orderId: string): Promise<CheckoutSessionResult> =>
  http
    .post<CheckoutSessionResult>(`/payments/checkout-session/${orderId}`)
    .then((response) => {
      if (!response) return {};
      return response;
    });