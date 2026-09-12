import { getToken } from '../lib/authStorage';
import type { ErrorPayload } from './types';

export const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export interface ApiErrorOptions {
  status: number;
  message: string;
  fieldErrors?: Record<string, string>;
  raw?: unknown;
}

export class ApiError extends Error {
  status: number;
  fieldErrors: Record<string, string>;
  raw?: unknown;

  constructor({ message, status, fieldErrors, raw }: ApiErrorOptions) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors ?? {};
    this.raw = raw;
  }
}

export interface ErrorInfo {
  message: string;
  fieldErrors?: Record<string, string>;
}

/** Normalize a thrown value from a try/catch (string | Error | unknown) into ErrorInfo. */
export const getErrorInfo = (error: unknown): ErrorInfo => {
  if (error instanceof ApiError) {
    return { message: error.message, fieldErrors: error.fieldErrors };
  }
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: 'Something went wrong. Please try again.' };
};

function readPayload(response: Response): Promise<ErrorPayload | null> {
  return response.json().catch(() => null);
}

export function extractErrorInfo(
  status: number,
  payload: ErrorPayload | null
): { message: string; fieldErrors?: Record<string, string> } {
  const fieldErrors: Record<string, string> = {};

  if (payload?.errors && Array.isArray(payload.errors)) {
    // express-validator: errors are { msg, param, location, value }
    for (const issue of payload.errors) {
      if (issue.param && issue.msg) {
        fieldErrors[issue.param] = fieldErrors[issue.param] ?? issue.msg;
      }
    }
  }

  if (
    status === 400 &&
    payload?.message?.startsWith('E11000') &&
    payload.message?.includes('email')
  ) {
    return { message: 'Validation failed', fieldErrors: { email: 'An account with that email already exists.' } };
  }

  if (payload?.message) {
    return { message: payload.message, fieldErrors: Object.keys(fieldErrors).length ? fieldErrors : undefined };
  }

  if (payload?.err?.message) {
    return { message: payload.err.message, fieldErrors: Object.keys(fieldErrors).length ? fieldErrors : undefined };
  }

  return { message: defaultStatusMessage(status), fieldErrors: Object.keys(fieldErrors).length ? fieldErrors : undefined };
}

function defaultStatusMessage(status: number): string {
  switch (status) {
    case 400:
      return 'Bad request. Please check your input.';
    case 401:
      return 'Please log in to continue.';
    case 403:
      return 'You are not allowed to do that.';
    case 404:
      return 'Not found.';
    case 409:
      return 'That already exists.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = HttpMethod.GET, body, headers: extraHeaders } = options;

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...extraHeaders,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers,
    body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const payload = await readPayload(response);
    const { message, fieldErrors } = extractErrorInfo(response.status, payload);
    throw new ApiError({ status: response.status, message, fieldErrors, raw: payload });
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function requestForm<T>(url: string, data: Record<string, unknown>): Promise<T> {
  const form = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) {
      continue;
    }
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (entry !== undefined && entry !== null) {
          form.append(key, entry);
        }
      }
    } else {
      form.append(key, value as string | Blob);
    }
  }
  return request<T>(url, { method: HttpMethod.POST, body: form });
}

export const http = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, body?: unknown) => request<T>(url, { method: HttpMethod.POST, body }),
  put: <T>(url: string, body?: unknown) => request<T>(url, { method: HttpMethod.PUT, body }),
  patch: <T>(url: string, body?: unknown) => request<T>(url, { method: HttpMethod.PATCH, body }),
  delete: <T>(url: string) => request<T>(url, { method: HttpMethod.DELETE }),
  form: requestForm,
};