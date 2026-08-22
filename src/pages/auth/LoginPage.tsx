import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { APP_NAME } from '../../constants/branding';
import { UserProfile } from '../../types';
import { AuthForm, AuthFormValues } from './AuthForm';

interface LoginPageProps {
  onLogin?: (session: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (values: AuthFormValues) => {
    onLogin?.({ name: '', email: values.email, address: '' });
    navigate('/');
  };
  return (
    <main className="min-h-screen bg-white text-black font-jakarta flex flex-col">
      <SEO
        title="Login"
        description="Sign in to your ROYALTY account to access your orders, wishlist, and profile."
      />
      <div className="flex items-center justify-between px-6 pt-6">
        <Link
          to="/"
          className="text-xs font-mono tracking-[0.24em] uppercase font-bold hover:opacity-60 transition-opacity"
        >
          {APP_NAME}
        </Link>

      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md">
          <div className="pb-6 mb-8 border-b border-black flex flex-col items-center text-center">
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-black uppercase">
              LOGIN
            </h2>
            <p className="mt-2 text-xs font-mono text-red-700 tracking-wider font-semibold">
              Welcome back to the circle.
            </p>
          </div>

          <AuthForm mode="login" onSubmit={handleSubmit} />

          <p className="pt-6 text-[10px] font-mono tracking-widest uppercase font-bold text-gray-400">
            New member?{' '}
            <Link to="/signup" className="underline hover:text-black transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};