import React from 'react';
import { PackageOpen, ArrowRight } from 'lucide-react';
import { Order } from '../types';
import { MotionLink } from '../components/MotionButton';
import { COLOR_HEX } from '../constants/shop';

interface OrderHistoryPageProps {
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
    month: 'short',
    day: 'numeric',
  });

export const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 text-gray-400 border border-gray-200 rounded-md">
        <PackageOpen className="w-12 h-12 stroke-[1.2]" />
        <p className="text-xs uppercase font-semibold tracking-widest">
          No orders yet.
        </p>
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-300">
          Your order history will appear here after checkout.
        </p>
        <MotionLink
          to="/shop"
          className="font-mono text-xs tracking-widest uppercase px-6 py-2"
        >
          <span>START SHOPPING</span>
          <ArrowRight className="w-4 h-4" />
        </MotionLink>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <article key={order.id} className="border border-gray-200 rounded-md overflow-hidden">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-orbitron font-bold text-sm tracking-wider uppercase text-black">
                {order.id}
              </h3>
              <span
                className={`text-[9px] font-mono tracking-[0.2em] uppercase font-bold border px-2 py-0.5 rounded ${STATUS_STYLES[order.status]}`}
              >
                {order.status}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-gray-500">
                {formatDate(order.placedAt)}
              </span>
              <span className="font-orbitron font-bold text-sm">
                ${order.total.toLocaleString('en-US')}
              </span>
            </div>
          </header>

          <ul className="divide-y divide-gray-100">
            {order.items.map(({ key, item, quantity, color, size }) => (
              <li key={key} className="px-5 py-3 flex items-center gap-4">
                {item.images[0] && (
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                    {item.category}
                  </div>
                  <h4 className="font-orbitron font-bold text-xs tracking-wide uppercase text-black truncate">
                    {item.title}
                  </h4>
                  {(color || size) && (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {color ? (
                        <span
                          style={{ backgroundColor: COLOR_HEX[color as keyof typeof COLOR_HEX] ?? '#999' }}
                          className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300"
                        />
                      ) : null}
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
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
};