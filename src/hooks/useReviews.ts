import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewKeys } from '../api/queryKeys';
import { mapReview } from '../api/mappers';
import {
  createReviewApi,
  getProductReviews,
  type CreateReviewPayload,
} from '../api/reviews';
import type { ReviewView } from '../api/mappers';

export const useProductReviews = (productId?: string) =>
  useQuery<ReviewView[]>({
    queryKey: reviewKeys.product(productId ?? ''),
    queryFn: async () => {
      const list = await getProductReviews(productId as string);
      return (list ?? []).map(mapReview);
    },
    enabled: Boolean(productId),
  });

export const useCreateReview = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => createReviewApi(productId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reviewKeys.product(productId) });
    },
  });
};