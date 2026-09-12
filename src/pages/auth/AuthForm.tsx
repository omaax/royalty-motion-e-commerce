import React, { useState } from 'react';
import { z } from 'zod';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { MotionButton } from '../../components/MotionButton';

export type AuthMode = 'login' | 'signup';

export interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  mode: AuthMode;
  onSubmit?: (values: AuthFormValues) => void;
  loading?: boolean;
  serverErrors?: Record<string, string>;
  banner?: string | null;
  onClearServerError?: (field: string) => void;
}

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const signupSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

const inputClass =
  'w-full px-4 py-3 border text-xs font-mono tracking-widest uppercase focus:outline-none';

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  loading,
  serverErrors,
  banner,
  onClearServerError,
}) => {
  const isSignup = mode === 'signup';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const errors = { ...localErrors, ...(serverErrors ?? {}) };

  const clearError = (field: string) => {
    setLocalErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    onClearServerError?.(field);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalErrors({});
    onClearServerError?.('__banner__');

    const schema = isSignup ? signupSchema : loginSchema;
    const result = schema.safeParse({ name, email, password, confirm });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join('.');
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      }
      setLocalErrors(fieldErrors);
      return;
    }

    onSubmit?.({ name: isSignup ? name : undefined, email, password });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <AnimatePresence initial={false}>
        {isSignup && (
          <motion.div
            key="name"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <input
              type="text"
              placeholder="FULL NAME"
              autoFocus={Boolean(errors.name)}
              className={`${inputClass} ${errors.name ? 'border-red-700 focus:border-red-700' : 'border-gray-300 focus:border-black'}`}
              value={name}
              onChange={(e) => { setName(e.target.value); clearError('name'); }}
            />
            {errors.name && (
              <p className="mt-1 text-[10px] font-mono tracking-widest uppercase font-bold text-red-700">
                {errors.name}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <input
          type="email"
          placeholder="EMAIL ADDRESS"
          autoFocus={!isSignup && Boolean(errors.email)}
          className={`${inputClass} ${errors.email ? 'border-red-700 focus:border-red-700' : 'border-gray-300 focus:border-black'}`}
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
        />
        {errors.email && (
          <p className="mt-1 text-[10px] font-mono tracking-widest uppercase font-bold text-red-700">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="PASSWORD"
          autoFocus={!isSignup && Boolean(errors.password)}
          className={`${inputClass} ${errors.password ? 'border-red-700 focus:border-red-700' : 'border-gray-300 focus:border-black'}`}
          value={password}
          onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
        />
        {errors.password && (
          <p className="mt-1 text-[10px] font-mono tracking-widest uppercase font-bold text-red-700">
            {errors.password}
          </p>
        )}
      </div>

      <AnimatePresence initial={false}>
        {isSignup && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <input
              type="password"
              placeholder="CONFIRM PASSWORD"
              autoFocus={Boolean(errors.confirm)}
              className={`${inputClass} ${errors.confirm ? 'border-red-700 focus:border-red-700' : 'border-gray-300 focus:border-black'}`}
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); clearError('confirm'); }}
            />
            {errors.confirm && (
              <p className="mt-1 text-[10px] font-mono tracking-widest uppercase font-bold text-red-700">
                {errors.confirm}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {banner && !errors.__banner__ && (
        <p className="text-[10px] font-mono tracking-widest uppercase font-bold text-red-700 border border-red-700/30 bg-red-50 px-3 py-2">
          {banner}
        </p>
      )}

      <div className="flex justify-center">
        <MotionButton
          type="submit"
          variant="solid"
          disabled={loading}
          className="font-mono text-xs tracking-widest uppercase px-6 py-3"
        >
          <span>{loading ? 'PLEASE WAIT…' : isSignup ? 'CREATE ACCOUNT' : 'SIGN IN'}</span>
          <ArrowRight className="w-4 h-4" />
        </MotionButton>
      </div>
    </form>
  );
};