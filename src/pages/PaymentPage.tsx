import React, { useState, useCallback } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { CartItem, ShippingInfo, PaymentInfo } from '../types';
import { MotionLink } from '../components/MotionButton';
import { FormField } from '../components/FormField';
import { OrderSummary } from '../components/shop/OrderSummary';

const paymentSchema = z.object({
  cardLast4: z.string().min(4, 'Card number is required'),
  expiry: z.string().min(5, 'Expiry date is required').regex(/^\d{2}\/\d{2}$/, 'Use MM/YY format'),
  cvv: z.string().min(3, 'CVV is required').max(4, 'CVV must be 4 digits or less'),
});

interface PaymentPageProps {
  cartCount: number;
  cartItems: CartItem[];
  shipping: ShippingInfo;
  onPlaceOrder: (shipping: ShippingInfo, payment: PaymentInfo) => string | null;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  cartCount,
  cartItems,
  shipping,
  onPlaceOrder,
}) => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState<PaymentInfo>({
    cardLast4: '',
    expiry: '',
  });
  const [cvv, setCvv] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const formatCardNumber = useCallback((value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }, []);

  const handleCardNumberChange = useCallback((value: string) => {
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
    const last4 = value.replace(/\D/g, '').slice(-4);
    setPayment((prev) => ({ ...prev, cardLast4: last4 }));
    clearError('cardLast4');
  }, [formatCardNumber, clearError]);

  const handleExpiryChange = useCallback((value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    setPayment((prev) => ({ ...prev, expiry: formatted }));
    clearError('expiry');
  }, [clearError]);

  const handleCvvChange = useCallback((value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    setCvv(digits);
    clearError('cvv');
  }, [clearError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = paymentSchema.safeParse({ ...payment, cvv });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join('.');
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    const orderId = onPlaceOrder(shipping, payment);
    if (orderId) {
      navigate(`/profile/orders/${orderId}`);
    }
  };

  return (
    <main className="px-6 lg:px-12 pt-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
        <div className="flex flex-col md:flex-row md:items-baseline gap-6">
          <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-tight text-black uppercase">
            PAYMENT
          </h2>
          <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
            <div>Step 2 of 2 — Payment ({cartCount} items)</div>
            <div>Secure. Discreet. Delivered.</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
        {/* Payment Form */}
        <div className="lg:col-span-8 space-y-8">
          {/* Shipping Summary */}
          <section className="p-6 border border-gray-200 rounded-md space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-orbitron font-bold text-sm tracking-wider uppercase text-black">
                Shipping To
              </h3>
              <MotionLink
                to="/checkout"
                variant="ghost"
                className="font-mono text-[10px] tracking-widest uppercase px-3 py-1"
              >
                <span>EDIT</span>
              </MotionLink>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold uppercase">
              <div className="text-gray-500">{shipping.name}</div>
              <div className="text-gray-500 text-right">{shipping.email}</div>
              <div className="text-gray-500 col-span-2">{shipping.address}</div>
              <div className="text-gray-500">
                {shipping.city}, {shipping.state} {shipping.zip}
              </div>
              <div className="text-gray-500 text-right">{shipping.country}</div>
            </div>
          </section>

          {/* Payment Information */}
          <section className="p-6 border border-gray-200 rounded-md space-y-5">
            <h3 className="font-orbitron font-bold text-sm tracking-wider uppercase text-black flex items-center gap-2">
              <CreditCard className="w-4 h-4 stroke-[1.8]" />
              Payment Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Card Number"
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={handleCardNumberChange}
                required
                error={errors.cardLast4}
                className="sm:col-span-2"
              />
              <FormField
                label="Expiry Date"
                placeholder="MM/YY"
                value={payment.expiry}
                onChange={handleExpiryChange}
                required
                error={errors.expiry}
              />
              <FormField
                label="CVV"
                type="password"
                placeholder="***"
                value={cvv}
                onChange={handleCvvChange}
                required
                error={errors.cvv}
              />
            </div>
            <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-widest">
              This is a mock payment form. No real payment will be processed.
            </p>
          </section>
        </div>

        <OrderSummary
          cartItems={cartItems}
          buttonLabel="PLACE ORDER"
          backLinkTo="/checkout"
          backLinkLabel="BACK TO SHIPPING"
          onSubmit={handleSubmit}
        />
      </form>
    </main>
  );
};
