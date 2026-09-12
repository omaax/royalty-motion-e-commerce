import { useSyncExternalStore } from 'react';
import { GUEST_CART_EVENT } from './guestCart';

let version = 0;

// Bump so `useCart` / `useWishlist` recompute guest state after local actions.
function subscribe(listener: () => void): () => void {
  const handler = () => {
    version += 1;
    listener();
  };
  window.addEventListener(GUEST_CART_EVENT, handler);
  return () => window.removeEventListener(GUEST_CART_EVENT, handler);
}

function getSnapshot(): number {
  return version;
}

export function useGuestCartVersion(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}