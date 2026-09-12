import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useOrder } from '../hooks/useOrders';
import { formatPrice } from '../api/mappers';
import { MotionLink } from '../components/MotionButton';
import { SEO } from '../components/SEO';
import { APP_NAME, APP_YEAR, APP_TAGLINE } from '../constants/branding';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isPending } = useOrder(id);

  if (isPending && !order) {
    return (
      <main className="px-6 lg:px-12 pt-10 pb-20">
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400 animate-pulse">
            Loading...
          </span>
        </div>
      </main>
    );
  }

  if (!order) {
    return <Navigate to="/shop" replace />;
  }

  const placedDate = new Date(order.placedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="px-6 lg:px-12 pt-10">
      <SEO
        title="Order Confirmed"
        description="Your ROYALTY order has been placed successfully. Thank you for your purchase."
      />
      <div className="max-w-2xl mx-auto py-16 space-y-10">
        {/* Success Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-600 stroke-[1.2]" />
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-black uppercase">
            ORDER CONFIRMED
          </h2>
          <p className="text-xs font-mono text-red-700 tracking-wider font-semibold">
            Your order has been placed successfully.
          </p>
        </div>

        {/* Order Details */}
        <section className="p-6 border border-gray-200 rounded-md space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400">
                Order ID
              </div>
              <div className="font-orbitron font-bold text-sm tracking-wide text-black">
                {order.id}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400">
                Date Placed
              </div>
              <div className="font-mono text-xs font-bold uppercase text-black">
                {placedDate}
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {order.items.map(({ id: itemId, title, image, color, quantity, price }) => (
              <div key={itemId} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                {image && (
                  <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <img src={image} alt={title} className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-orbitron font-bold text-xs tracking-wide uppercase text-black truncate">
                    {title}
                  </div>
                  {color && (
                    <span className="text-[10px] text-gray-400 uppercase font-mono">
                      {color}
                    </span>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="font-orbitron font-bold text-xs">
                    {formatPrice(price * quantity)}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400">x{quantity}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <span className="uppercase tracking-widest text-xs font-bold text-black">Total</span>
            <span className="font-orbitron font-bold text-lg">
              {formatPrice(order.total)}
            </span>
          </div>
        </section>

        {/* Shipping Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {order.shippingAddress && (
            <section className="p-5 border border-gray-200 rounded-md space-y-2">
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400">
                Shipping To
              </div>
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] text-gray-500 uppercase">
                  {order.shippingAddress.details}
                </div>
                <div className="font-mono text-[10px] text-gray-500 uppercase">
                  {order.shippingAddress.city}
                  {order.shippingAddress.postalCode ? `, ${order.shippingAddress.postalCode}` : ''}
                </div>
                <div className="font-mono text-[10px] text-gray-500 uppercase">
                  {order.shippingAddress.phone}
                </div>
              </div>
            </section>
          )}
          {order.paymentMethod && (
            <section className="p-5 border border-gray-200 rounded-md space-y-2">
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400">
                Payment Method
              </div>
              <div className="font-mono text-xs font-bold uppercase">
                {order.paymentMethod === 'cash' ? 'CASH ON DELIVERY' : 'CARD / ONLINE PAYMENT'}
              </div>
            </section>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <MotionLink
            to="/shop"
            variant="solid"
            className="w-full sm:w-auto font-jakarta uppercase font-semibold text-xs tracking-[0.18em] px-8 py-3 justify-center"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </MotionLink>
          <MotionLink
            to="/profile/orders"
            variant="ghost"
            className="w-full sm:w-auto font-mono text-[10px] tracking-widest uppercase px-8 py-3 justify-center"
          >
            <span>VIEW ORDER HISTORY</span>
          </MotionLink>
        </div>

        <p className="text-[10px] text-center text-gray-400 uppercase font-semibold tracking-widest pt-8">
          {APP_NAME} &copy; {APP_YEAR} &mdash; {APP_TAGLINE}
        </p>
      </div>
    </main>
  );
};