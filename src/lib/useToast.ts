import { useSyncExternalStore } from 'react';

export interface ToastMessage {
  id: string;
  text: string;
}

const listeners = new Set<() => void>();
let current: ToastMessage | null = null;

function emit(): void {
  for (const listener of listeners) listener();
}

export function pushToast(text: string): void {
  current = { id: Date.now().toString(), text };
  emit();
}

export function dismissToast(): void {
  current = null;
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useToastMessage(): ToastMessage | null {
  return useSyncExternalStore(subscribe, () => current);
}