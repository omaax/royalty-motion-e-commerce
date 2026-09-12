import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { APP_NAME } from '../../constants/branding';
import { useSignup } from '../../hooks/useAuth';
import { useToken } from '../../lib/useToken';
import { getErrorInfo } from '../../api/client';
import { AuthForm, AuthFormValues } from './AuthForm';

export const SignupPage: React.FC = () => {
  const signup = useSignup();
  const token = useToken();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState<string | null>(null);

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (values: AuthFormValues) => {
    setServerErrors({});
    setBanner(null);
    signup.mutate(
      {
        name: values.name ?? '',
        email: values.email,
        password: values.password,
      },
      {
        onError: (error) => {
          const info = getErrorInfo(error);
          if (info.fieldErrors && Object.keys(info.fieldErrors).length) {
            setServerErrors(info.fieldErrors);
          } else {
            setBanner(info.message);
          }
        },
      }
    );
  };

  const clearServerError = (field: string) => {
    if (field === '__banner__') setBanner(null);
    setServerErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-white text-black font-jakarta flex flex-col">
      <SEO
        title="Sign Up"
        description="Create your ROYALTY account to join the circle — get first access to limited drops and exclusive collections."
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
              SIGN UP
            </h2>
            <p className="mt-2 text-xs font-mono text-red-700 tracking-wider font-semibold">
              Join the circle.
            </p>
          </div>

          <AuthForm
            mode="signup"
            onSubmit={handleSubmit}
            loading={signup.isPending}
            serverErrors={serverErrors}
            banner={banner}
            onClearServerError={clearServerError}
          />

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