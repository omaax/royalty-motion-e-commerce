import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { subCategoryKeys } from '../api/queryKeys';
import {
  createSubCategoryApi,
  deleteSubCategoryApi,
  getSubCategories,
  updateSubCategoryApi,
} from '../api/subcategories';
import type { ApiSubCategory } from '../api/types';

export const useSubCategories = (category?: string) =>
  useQuery<ApiSubCategory[]>({
    queryKey: subCategoryKeys.list({ category: category ?? '' }),
    queryFn: async () => getSubCategories(category),
    enabled: Boolean(category),
  });

export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; category: string }) =>
      createSubCategoryApi(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: subCategoryKeys.lists() });
    },
  });
};

export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateSubCategoryApi(id, { name }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: subCategoryKeys.lists() });
    },
  });
};

export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSubCategoryApi(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: subCategoryKeys.lists() });
    },
  });
};