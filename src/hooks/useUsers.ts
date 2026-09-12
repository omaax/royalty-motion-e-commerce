import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '../api/queryKeys';
import { mapUser } from '../api/mappers';
import {
  createUserApi,
  deleteUserApi,
  getUser,
  getUsers,
  updateUserApi,
  type CreateUserPayload,
  type UpdateUserPayload,
} from '../api/users';
import type { ApiUser } from '../api/types';

export const useAdminUsers = () =>
  useQuery<ApiUser[]>({
    queryKey: userKeys.lists(),
    queryFn: async () => getUsers().then((list) => list.map(mapUser)),
  });

export const useAdminUser = (id?: string) =>
  useQuery<ApiUser | undefined>({
    queryKey: userKeys.detail(id ?? ''),
    queryFn: async () => (id ? mapUser(await getUser(id)) : undefined),
    enabled: Boolean(id),
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => createUserApi(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) =>
      updateUserApi(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: userKeys.details() });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUserApi(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};