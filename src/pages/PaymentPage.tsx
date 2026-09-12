import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CreditCard, Loader2, ArrowLeft } from 'lucide-react';
import { createCheckoutSession } from '../api/payments';
import { getErrorInfo } from '../api/client';
import { SEO } from '../components/SEO';

export const PaymentPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    createCheckoutSession(orderId)
      .then((result) => {
        if (cancelled) return;
        const sessionUrl = result.session?.url ?? result.url;
        if (sessionUrl) {
          window.location.assign(sessionUrl);
        } else {
          setError('The payment session could not be created. Please try again.');
          setLoading(false);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(getErrorInfo(err).message);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return (
    <main className="px-6 lg:px-12 pt-10 pb-16">
      <SEO
        title="Payment"
        description="Secure payment for your ROYALTY order — complete your purchase."
      />
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
        <div className="flex flex-col md:flex-row md:items-baseline gap-6">
          <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-tight text-black uppercase">
            PAYMENT
          </h2>
          <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
            <div>Secure payment processing</div>
            <div>You will be redirected to the secure checkout.</div>
          </div>
        </div>
      </div>

      <div className="pt-12 max-w-lg mx-auto text-center space-y-6">
        {loading && (
          <div className="flex flex-col items-center gap-4 text-gray-500">
            <Loader2 className="w-10 h-10 stroke-[1.2] animate-spin" />
            <p className="text-xs font-mono uppercase tracking-widest">
              Redirecting to secure payment...
            </p>
          </div>
        )}

        {error && (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3">
              <CreditCard className="w-10 h-10 stroke-[1.2] text-red-600" />
              <p className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
                {error}
              </p>
            </div>
            <Link
              to="/profile/orders"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-black transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to my orders
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};