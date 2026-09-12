import { http } from './client';
import type {
  ApiDocumentResponse,
  ApiListResponse,
  ApiUser,
} from './types';

export interface UserFilters {
  name?: string;
  email?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export async function getUsers(filters: UserFilters = {}): Promise<ApiUser[]> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === '') continue;
    params.set(key, String(value));
  }
  const query = params.toString();
  const response = await http.get<ApiListResponse<ApiUser>>(`/users${query ? `?${query}` : ''}`);
  return response.data ?? [];
}

export const getUser = (id: string): Promise<ApiUser> =>
  http
    .get<ApiDocumentResponse<ApiUser>>(`/users/${id}`)
    .then((response) => (response.document ?? response.data) as ApiUser);

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export const createUserApi = (payload: CreateUserPayload): Promise<ApiUser> =>
  http
    .post<ApiDocumentResponse<ApiUser>>('/users', payload)
    .then((response) => (response.document ?? response.data) as ApiUser);

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  role?: 'user' | 'admin';
}

export const updateUserApi = (id: string, payload: UpdateUserPayload): Promise<ApiUser> =>
  http
    .put<ApiDocumentResponse<ApiUser>>(`/users/${id}`, payload)
    .then((response) => (response.document ?? response.data) as ApiUser);

export const deleteUserApi = (id: string): Promise<void> => http.delete<void>(`/users/${id}`);