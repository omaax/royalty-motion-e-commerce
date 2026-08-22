import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Order } from '../types';
import { COLOR_HEX } from '../constants/shop';

interface OrderDetailPageProps {
  orders: Order[];
}

const STATUS_STYLES: Record<Order['status'], string> = {
  Processing: 'text-gray-500 border-gray-300',
  Shipped: 'text-black border-black',
  Delivered: 'text-gray-500 border-gray-300',
  Cancelled: 'text-red-700 border-red-700',
};

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ orders }) => {
  const { id } = useParams<{ id: string }>();
  const order = orders.find((o) => o.id === id);

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
              {order.id}
            </h2>
            <span
              className={`text-[9px] font-mono tracking-[0.2em] uppercase font-bold border px-2 py-0.5 rounded ${STATUS_STYLES[order.status]}`}
            >
              {order.status}
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
          {order.items.map(({ key, item, quantity, color, size }) => (
            <div key={key} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
              {item.images[0] && (
                <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded overflow-hidden shrink-0 flex items-center justify-center p-1">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-contain" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                  {item.category}
                </div>
                <div className="font-orbitron font-bold text-xs tracking-wide uppercase text-black truncate">
                  {item.title}
                </div>
                {(color || size) && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {color && (
                      <span
                        style={{ backgroundColor: COLOR_HEX[color as keyof typeof COLOR_HEX] ?? '#999' }}
                        className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300"
                      />
                    )}
                    <span className="text-[10px] text-gray-500 uppercase font-mono">
                      {[color, size].filter(Boolean).join(' • ')}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-[11px] text-gray-500 font-jakarta shrink-0">
                ${item.price.toLocaleString('en-US')} &times; {quantity}
              </div>
              <div className="font-orbitron font-bold text-xs shrink-0 w-16 text-right">
                ${(item.price * quantity).toLocaleString('en-US')}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <span className="uppercase tracking-widest text-xs font-bold text-black">Total</span>
          <span className="font-orbitron font-bold text-lg">
            ${order.total.toLocaleString('en-US')} USD
          </span>
        </div>
      </section>

      {/* Shipping & Payment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {order.shipping && (
          <section className="p-5 border border-gray-200 rounded-md space-y-2">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400">
              Shipping To
            </div>
            <div className="space-y-0.5">
              <div className="font-mono text-xs font-bold uppercase">{order.shipping.name}</div>
              <div className="font-mono text-[10px] text-gray-500 uppercase">{order.shipping.address}</div>
              <div className="font-mono text-[10px] text-gray-500 uppercase">
                {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
              </div>
              <div className="font-mono text-[10px] text-gray-500 uppercase">{order.shipping.country}</div>
            </div>
          </section>
        )}
        {order.payment && (
          <section className="p-5 border border-gray-200 rounded-md space-y-2">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400">
              Payment Method
            </div>
            <div className="space-y-0.5">
              <div className="font-mono text-xs font-bold uppercase">
                CARD ending in {order.payment.cardLast4}
              </div>
              <div className="font-mono text-[10px] text-gray-500 uppercase">
                Expires {order.payment.expiry}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
