import { useSyncExternalStore } from 'react';
import { AUTH_EVENT, getToken } from './authStorage';

// Re-render any consumer whenever the token changes (login / logout /
// storage event from another tab). Keeps gating (NavBar, guards) reactive.
function subscribe(listener: () => void): () => void {
  const listenerRef = () => {
    // Only notify when the token actually changed to avoid loops.
    listener();
  };
  window.addEventListener(AUTH_EVENT, listenerRef);
  window.addEventListener('storage', listenerRef);
  return () => {
    window.removeEventListener(AUTH_EVENT, listenerRef);
    window.removeEventListener('storage', listenerRef);
  };
}

export function useToken(): string | null {
  return useSyncExternalStore(subscribe, getToken);
}