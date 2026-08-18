import React, { useState } from 'react';
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
}

const inputClass =
  'w-full px-4 py-3 border border-gray-300 text-xs font-mono tracking-widest uppercase focus:outline-none focus:border-black';

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const isSignup = mode === 'signup';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup && password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
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
              className={inputClass}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <input
        type="email"
        placeholder="EMAIL ADDRESS"
        className={inputClass}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="PASSWORD"
        className={inputClass}
        required
        minLength={isSignup ? 8 : undefined}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

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
              className={inputClass}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-[10px] font-mono tracking-widest uppercase font-bold text-red-700">{error}</p>
      )}

      <MotionButton type="submit" variant="solid" className="font-mono text-xs tracking-widest uppercase px-6 py-3">
        <span>{isSignup ? 'CREATE ACCOUNT' : 'SIGN IN'}</span>
        <ArrowRight className="w-4 h-4" />
      </MotionButton>
    </form>
  );
};