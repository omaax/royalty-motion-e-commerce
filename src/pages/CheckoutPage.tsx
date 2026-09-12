import React, { useState, useCallback } from 'react';
import { z } from 'zod';
import { Navigate, useNavigate } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { FormField } from '../components/FormField';
import { OrderSummary } from '../components/shop/OrderSummary';
import { SEO } from '../components/SEO';
import { useCart } from '../hooks/useCart';
import { useCreateOrder } from '../hooks/useOrders';
import { useMe } from '../hooks/useAuth';
import { useToken } from '../lib/useToken';

const shippingSchema = z.object({
  details: z.string().min(1, 'Address details are required'),
  phone: z.string().min(1, 'Phone is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().optional(),
});

type ShippingForm = z.infer<typeof shippingSchema>;

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const token = useToken();
  const { items, isEmpty } = useCart();
  const { data: user } = useMe();
  const createOrder = useCreateOrder();

  const [shipping, setShipping] = useState<ShippingForm>({
    details: '',
    phone: user?.phone ?? '',
    city: '',
    postalCode: '',
  });
  const [paymentMethodType, setPaymentMethodType] = useState<'cash' | 'card'>('cash');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const updateShipping = useCallback(
    (field: keyof ShippingForm) => (value: string) => {
      setShipping((prev) => ({ ...prev, [field]: value }));
      clearError(field);
    },
    [clearError]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = shippingSchema.safeParse(shipping);
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

    setSubmitting(true);
    createOrder.mutate(
      {
        shippingAddress: {
          details: result.data.details,
          phone: result.data.phone,
          city: result.data.city,
          postalCode: result.data.postalCode || undefined,
        },
        paymentMethodType,
      },
      {
        onSuccess: (order) => {
          const orderId = String(order._id ?? '');
          setSubmitting(false);
          if (paymentMethodType === 'card') {
            navigate(`/payment/${orderId}`);
          } else {
            navigate(`/order-confirmation/${orderId}`);
          }
        },
        onError: () => setSubmitting(false),
      }
    );
  };

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isEmpty) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <main className="px-6 lg:px-12 pt-10">
      <SEO
        title="Checkout"
        description="Complete your order from ROYALTY — secure shipping and discreet delivery."
      />
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
        <div className="flex flex-col md:flex-row md:items-baseline gap-6">
          <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-tight text-black uppercase">
            CHECKOUT
          </h2>
          <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
            <div>Step 1 of 2 — Shipping ({items.length} items)</div>
            <div>Secure. Discreet. Delivered.</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
        {/* Shipping Form */}
        <div className="lg:col-span-8">
          <section className="p-6 border border-gray-200 rounded-md space-y-5">
            <h3 className="font-orbitron font-bold text-sm tracking-wider uppercase text-black flex items-center gap-2">
              <Truck className="w-4 h-4 stroke-[1.8]" />
              Shipping Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Address Details"
                placeholder="123 MAIN STREET, APT 4B"
                value={shipping.details}
                onChange={updateShipping('details')}
                required
                error={errors.details}
                className="sm:col-span-2"
              />
              <FormField
                label="Phone"
                type="tel"
                placeholder="+20 100 000 0000"
                value={shipping.phone}
                onChange={updateShipping('phone')}
                required
                error={errors.phone}
              />
              <FormField
                label="City"
                placeholder="CAIRO"
                value={shipping.city}
                onChange={updateShipping('city')}
                required
                error={errors.city}
              />
              <FormField
                label="Postal Code"
                placeholder="11511"
                value={shipping.postalCode ?? ''}
                onChange={updateShipping('postalCode')}
                error={errors.postalCode}
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section className="mt-6 p-6 border border-gray-200 rounded-md space-y-4">
            <h3 className="font-orbitron font-bold text-sm tracking-wider uppercase text-black">
              Payment Method
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-between gap-3 border p-4 rounded-md cursor-pointer transition-colors ${
                  paymentMethodType === 'cash' ? 'border-black' : 'border-gray-200'
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethodType === 'cash'}
                    onChange={() => setPaymentMethodType('cash')}
                    className="accent-black"
                  />
                  <span className="text-xs font-mono tracking-widest uppercase font-bold">
                    Cash on Delivery
                  </span>
                </span>
              </label>
              <label
                className={`flex items-center justify-between gap-3 border p-4 rounded-md cursor-pointer transition-colors ${
                  paymentMethodType === 'card' ? 'border-black' : 'border-gray-200'
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethodType === 'card'}
                    onChange={() => setPaymentMethodType('card')}
                    className="accent-black"
                  />
                  <span className="text-xs font-mono tracking-widest uppercase font-bold">
                    Card / Mobile Wallet
                  </span>
                </span>
              </label>
            </div>
          </section>
        </div>

        <OrderSummary
          cartItems={items}
          buttonLabel={submitting ? 'PLACING ORDER…' : 'CONTINUE TO PAYMENT'}
          backLinkTo="/cart"
          backLinkLabel="BACK TO CART"
          onSubmit={handleSubmit}
        />
      </form>
    </main>
  );
};