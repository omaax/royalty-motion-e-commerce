import React, { useState } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { CartItem, ShippingInfo } from '../types';
import { FormField } from '../components/FormField';
import { OrderSummary } from '../components/shop/OrderSummary';

const shippingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
});

interface CheckoutPageProps {
  cartCount: number;
  cartItems: CartItem[];
  onShippingComplete: (shipping: ShippingInfo) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartCount,
  cartItems,
  onShippingComplete,
}) => {
  const navigate = useNavigate();
  const [shipping, setShipping] = useState<ShippingInfo>({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateShipping = (field: keyof ShippingInfo) => (value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

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

    onShippingComplete(shipping);
    navigate('/payment');
  };

  return (
    <main className="px-6 lg:px-12 pt-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
        <div className="flex flex-col md:flex-row md:items-baseline gap-6">
          <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-tight text-black uppercase">
            CHECKOUT
          </h2>
          <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
            <div>Step 1 of 2 — Shipping ({cartCount} items)</div>
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
                label="Full Name"
                placeholder="JOHN DOE"
                value={shipping.name}
                onChange={updateShipping('name')}
                required
                error={errors.name}
              />
              <FormField
                label="Email"
                type="email"
                placeholder="EMAIL@ADDRESS.COM"
                value={shipping.email}
                onChange={updateShipping('email')}
                required
                error={errors.email}
              />
              <FormField
                label="Street Address"
                placeholder="123 MAIN STREET"
                value={shipping.address}
                onChange={updateShipping('address')}
                required
                error={errors.address}
                className="sm:col-span-2"
              />
              <FormField
                label="City"
                placeholder="NEW YORK"
                value={shipping.city}
                onChange={updateShipping('city')}
                required
                error={errors.city}
              />
              <FormField
                label="State / Province"
                placeholder="NY"
                value={shipping.state}
                onChange={updateShipping('state')}
                required
                error={errors.state}
              />
              <FormField
                label="Zip / Postal Code"
                placeholder="10001"
                value={shipping.zip}
                onChange={updateShipping('zip')}
                required
                error={errors.zip}
              />
              <FormField
                label="Country"
                placeholder="UNITED STATES"
                value={shipping.country}
                onChange={updateShipping('country')}
                required
                error={errors.country}
              />
            </div>
          </section>
        </div>

        <OrderSummary
          cartItems={cartItems}
          buttonLabel="CONTINUE TO PAYMENT"
          backLinkTo="/cart"
          backLinkLabel="BACK TO CART"
          onSubmit={handleSubmit}
        />
      </form>
    </main>
  );
};
