import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  deactivateAccountApi,
  getMeApi,
  loginApi,
  signupApi,
  updateMyPasswordApi,
  updateProfileApi,
} from '../api/auth';
import { authKeys, profileKeys } from '../api/queryKeys';
import { mapUser } from '../api/mappers';
import { clearToken, setToken } from '../lib/authStorage';
import { clearGuestCart, clearGuestWishlist } from '../lib/guestCart';
import { queryClient, handleSessionExpired } from '../lib/queryClient';
import type { ApiUser } from '../api/types';

export const useMe = () =>
  useQuery<ApiUser | null>({
    queryKey: authKeys.me,
    queryFn: async () => {
      try {
        const user = await getMeApi();
        return mapUser(user);
      } catch (error) {
        handleSessionExpired(error);
        return null;
      }
    },
    enabled: Boolean(clearableToken()),
    staleTime: 60_000,
  });

function clearableToken(): string | null {
  try {
    return localStorage.getItem('cff.token');
  } catch {
    return null;
  }
}

export const useUser = useMe;

export const useUserRole = (): 'user' | 'admin' | null => {
  const { data: user } = useMe();
  return user?.role ?? null;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClientUpdater = useQueryClient();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setToken(data.token);
      queryClientUpdater.setQueryData(authKeys.me, mapUser(data.user));
      void queryClientUpdater.invalidateQueries({ queryKey: ['cart'] });
      void queryClientUpdater.invalidateQueries({ queryKey: ['wishlist'] });
      navigate('/');
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();
  const queryClientUpdater = useQueryClient();
  return useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      setToken(data.token);
      queryClientUpdater.setQueryData(authKeys.me, mapUser(data.user));
      navigate('/');
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  return () => {
    clearToken();
    clearGuestCart();
    clearGuestWishlist();
    queryClient.clear();
    navigate('/');
  };
};

export const useUpdateProfile = () => {
  const queryClientUpdater = useQueryClient();
  return useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (user) => {
      queryClientUpdater.setQueryData(authKeys.me, mapUser(user));
      void queryClientUpdater.invalidateQueries({ queryKey: profileKeys.me });
    },
  });
};

export const useChangePassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateMyPasswordApi,
    onSuccess: () => {
      clearToken();
      queryClient.clear();
      navigate('/');
    },
  });
};

export const useDeactivateAccount = () => useMutation({ mutationFn: deactivateAccountApi });