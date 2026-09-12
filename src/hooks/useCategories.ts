import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { brandKeys, categoryKeys } from '../api/queryKeys';
import {
  createCategoryApi,
  deleteCategoryApi,
  getBrands,
  getCategories,
  updateCategoryApi,
} from '../api/categories';
import type { ApiCategory, ApiShopBrand } from '../api/types';

export const useCategories = () =>
  useQuery<ApiCategory[]>({
    queryKey: categoryKeys.lists(),
    queryFn: async () => getCategories(),
  });

export const useBrands = () =>
  useQuery<ApiShopBrand[]>({
    queryKey: brandKeys.lists(),
    queryFn: async () => getBrands(),
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) => createCategoryApi(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateCategoryApi(id, { name }),
    onSuccess: (_data, { id }) => {
      void queryClient.invalidateQueries({ queryKey: categoryKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategoryApi(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};