import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartKeys, orderKeys } from '../api/queryKeys';
import { mapOrder, mapOrderList } from '../api/mappers';
import {
  createOrderApi,
  getAdminOrders,
  getOrder,
  getOrders,
  type CreateOrderPayload,
} from '../api/orders';
import { useToken } from '../lib/useToken';

export const useOrders = () => {
  const token = useToken();
  return useQuery({
    queryKey: orderKeys.lists(),
    queryFn: async () => mapOrderList(await getOrders()),
    enabled: Boolean(token),
  });
};

export const useOrder = (id?: string) =>
  useQuery({
    queryKey: orderKeys.detail(id ?? ''),
    queryFn: async () => mapOrder(await getOrder(id as string)),
    enabled: Boolean(id),
  });

export const useAdminOrders = () => {
  const token = useToken();
  return useQuery({
    queryKey: orderKeys.list({ scope: 'admin' }),
    queryFn: getAdminOrders,
    enabled: Boolean(token),
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrderApi(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: cartKeys.own });
    },
  });
};