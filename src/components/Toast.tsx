import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="bg-black text-white px-4 py-3 rounded-md shadow-2xl flex items-center gap-3 border border-gray-800">
        <Check className="w-4 h-4 text-emerald-400 stroke-[2.5] flex-shrink-0" />
        <span className="font-jakarta text-xs font-medium tracking-wide uppercase">
          {toast.text}
        </span>
      </div>
    </div>
  );
};
