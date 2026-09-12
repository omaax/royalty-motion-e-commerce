import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { productKeys } from '../api/queryKeys';
import { mapProduct } from '../api/mappers';
import {
  createProductApi,
  deleteProductApi,
  getProduct,
  getProducts,
  type ProductFilters,
  type ProductPayload,
  updateProductApi,
} from '../api/products';
import type { ApiProduct, ApiProductDetail } from '../api/types';
import type { ShopItem } from '../types';

export const useProductsList = (
  filters: ProductFilters = {},
  options?: Partial<Omit<UseQueryOptions<ShopItem[], Error>, 'queryKey' | 'queryFn'>>
) =>
  useQuery<ShopItem[]>({
    queryKey: productKeys.list(filters as unknown as Record<string, unknown>),
    queryFn: async () => {
      const list = await getProducts(filters);
      return (list ?? []).map(mapProduct);
    },
    placeholderData: keepPreviousData,
    ...options,
  });

export const useProducts = useProductsList;

export const useProduct = (id?: string) =>
  useQuery<ShopItem>({
    queryKey: productKeys.detail(id ?? ''),
    queryFn: async () => {
      const detail = await getProduct(id as string);
      return mapProduct(detail as ApiProductDetail);
    },
    enabled: Boolean(id),
    placeholderData: keepPreviousData,
  });

export const useAdminProducts = () =>
  useQuery<ApiProduct[]>({
    queryKey: productKeys.all,
    queryFn: async () => getProducts({ limit: 100 }),
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProductPayload) => createProductApi(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProductPayload }) =>
      updateProductApi(id, payload),
    onSuccess: (_data, { id }) => {
      void queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProductApi(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};