import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { APP_NAME } from '../../constants/branding';
import { UserProfile } from '../../types';
import { AuthForm, AuthFormValues } from './AuthForm';

interface SignupPageProps {
  onLogin?: (session: UserProfile) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (values: AuthFormValues) => {
    onLogin?.({ name: values.name ?? '', email: values.email, address: '' });
    navigate('/');
  };
  return (
    <main className="min-h-screen bg-white text-black font-jakarta flex flex-col">
      <div className="flex items-center justify-between px-6 pt-6">
        <Link
          to="/"
          className="text-xs font-mono tracking-[0.24em] uppercase font-bold hover:opacity-60 transition-opacity"
        >
          {APP_NAME}
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase font-bold text-gray-400 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to shop
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md">
          <div className="pb-6 mb-8 border-b border-black flex flex-col items-center text-center">
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-black uppercase">
              SIGN UP
            </h2>
            <p className="mt-2 text-xs font-mono text-red-700 tracking-wider font-semibold">
              Join the circle.
            </p>
          </div>

          <AuthForm mode="signup" onSubmit={handleSubmit} />

          <p className="pt-6 text-[10px] font-mono tracking-widest uppercase font-bold text-gray-400">
            Already a member?{' '}
            <Link to="/login" className="underline hover:text-black transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};