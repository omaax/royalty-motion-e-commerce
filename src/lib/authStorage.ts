const TOKEN_KEY = 'cff.token';
export const AUTH_EVENT = 'cff:auth';

function emitAuthChanged(): void {
  try {
    window.dispatchEvent(new Event(AUTH_EVENT));
  } catch {
    // storage unavailable
  }
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    emitAuthChanged();
  } catch {
    // storage unavailable
  }
}

export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    emitAuthChanged();
  } catch {
    // storage unavailable
  }
}