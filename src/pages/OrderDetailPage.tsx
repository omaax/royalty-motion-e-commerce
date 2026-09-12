import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { colorHex, formatPrice, normalizeColorName } from '../api/mappers';
import { useOrder } from '../hooks/useOrders';

const STATUS_STYLES: Record<string, string> = {
  placed: 'text-gray-500 border-gray-300',
  paid: 'text-black border-black',
  delivered: 'text-green-700 border-green-700',
};

const statusLabel = (status: string): string =>
  status === 'paid' ? 'PAID' : status === 'delivered' ? 'DELIVERED' : 'PLACED';

const formatDate = (iso: string): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isPending } = useOrder(id);

  if (isPending && !order) {
    return (
      <div className="py-24 text-center">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400 animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  if (!order) {
    return <Navigate to="/profile/orders" replace />;
  }

  const placedDate = formatDate(order.placedAt);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/profile/orders"
            className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400 hover:text-black transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            ORDER HISTORY
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="font-orbitron font-bold text-sm tracking-wider uppercase text-black">
              Order #{order.id.slice(-6)}
            </h2>
            <span
              className={`text-[9px] font-mono tracking-[0.2em] uppercase font-bold border px-2 py-0.5 rounded ${STATUS_STYLES[order.status] ?? STATUS_STYLES.placed}`}
            >
              {statusLabel(order.status)}
            </span>
          </div>
          <div className="text-[10px] font-mono tracking-[0.15em] uppercase text-gray-500 mt-1">
            Placed on {placedDate}
          </div>
        </div>
      </div>

      {/* Items */}
      <section className="p-6 border border-gray-200 rounded-md space-y-5">
        <h3 className="font-orbitron font-bold text-sm tracking-wider uppercase text-black">
          Items
        </h3>
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
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      style={{ backgroundColor: colorHex(color) }}
                      className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300"
                    />
                    <span className="text-[10px] text-gray-500 uppercase font-mono">
                      {normalizeColorName(color)}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-[11px] text-gray-500 font-jakarta shrink-0">
                {formatPrice(price)} &times; {quantity}
              </div>
              <div className="font-orbitron font-bold text-xs shrink-0 w-20 text-right">
                {formatPrice(price * quantity)}
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

      {/* Shipping & Payment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {order.shippingAddress && (
          <section className="p-5 border border-gray-200 rounded-md space-y-2">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400">
              Shipping To
            </div>
            <div className="space-y-0.5">
              <div className="font-mono text-xs font-bold uppercase">
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
    </div>
  );
};