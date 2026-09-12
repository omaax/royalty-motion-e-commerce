import { http } from './client';
import type { ApiAuthResponse, ApiDocumentResponse, ApiUser } from './types';

export const loginApi = (credentials: { email: string; password: string }) =>
  http.post<ApiAuthResponse>('/auth/login', credentials);

export const signupApi = (data: { name: string; email: string; password: string }) =>
  http.post<ApiAuthResponse>('/auth/signup', data);

export const getMeApi = () =>
  http
    .get<ApiDocumentResponse<ApiUser>>('/users/getMe')
    .then((response) => (response.document ?? response.data) as ApiUser);

export const updateProfileApi = (data: { name: string; email: string; phone?: string }) =>
  http
    .put<ApiDocumentResponse<ApiUser>>('/users/updateUserData', data)
    .then((response) => (response.document ?? response.data) as ApiUser);

export const updateMyPasswordApi = (data: {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}) =>
  http
    .put<ApiDocumentResponse<ApiUser>>('/users/updateUserPassword', data)
    .then((response) => (response.document ?? response.data) as ApiUser);

export const deactivateAccountApi = () => http.delete<void>('/users/deleteUser');