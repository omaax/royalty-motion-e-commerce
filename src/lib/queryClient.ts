import { QueryClient } from '@tanstack/react-query';
import { clearToken } from './authStorage';
import type { ApiError } from '../api/client';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (failureCount, error) => {
        if (error instanceof Error && 'status' in error) {
          const status = (error as ApiError).status;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 2;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

/**
 * Tear down the auth session after a 401 that means the token is gone
 * (invalid/expired), so the UI returns to the logged-out state.
 */
export function handleSessionExpired(error: unknown): void {
  if (error instanceof Error && 'status' in error && (error as ApiError).status === 401) {
    clearToken();
    void queryClient.invalidateQueries({ queryKey: ['auth'] });
  }
}