import React from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen, ArrowRight, ChevronRight } from 'lucide-react';
import { MotionLink } from '../components/MotionButton';
import { colorHex, formatPrice, normalizeColorName } from '../api/mappers';
import { useOrders } from '../hooks/useOrders';

const STATUS_STYLES: Record<string, string> = {
  placed: 'text-gray-500 border-gray-300',
  paid: 'text-black border-black',
  delivered: 'text-green-700 border-green-700',
};

const formatDate = (iso: string): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

const statusLabel = (status: string): string =>
  status === 'paid' ? 'PAID' : status === 'delivered' ? 'DELIVERED' : 'PLACED';

export const OrderHistoryPage: React.FC = () => {
  const { data: orders = [], isPending } = useOrders();

  if (isPending && orders.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 text-gray-400 border border-gray-200 rounded-md">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-300 animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

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
        <Link
          key={order.id}
          to={`/profile/orders/${order.id}`}
          className="block border border-gray-200 rounded-md overflow-hidden hover:border-black transition-colors"
        >
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-orbitron font-bold text-sm tracking-wider uppercase text-black">
                Order #{order.id.slice(-6)}
              </h3>
              <span
                className={`text-[9px] font-mono tracking-[0.2em] uppercase font-bold border px-2 py-0.5 rounded ${
                  STATUS_STYLES[order.status] ?? STATUS_STYLES.placed
                }`}
              >
                {statusLabel(order.status)}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-gray-500">
                {formatDate(order.placedAt)}
              </span>
              <span className="font-orbitron font-bold text-sm">
                {formatPrice(order.total)}
              </span>
            </div>
          </header>

          <ul className="divide-y divide-gray-100">
            {order.items.map(({ id: itemId, title, image, color, quantity, price }) => (
              <li key={itemId} className="px-5 py-3 flex items-center gap-4">
                {image && (
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <img src={image} alt={title} className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-orbitron font-bold text-xs tracking-wide uppercase text-black truncate">
                    {title}
                  </h4>
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
                <div className="font-orbitron font-bold text-xs shrink-0 w-16 text-right">
                  {formatPrice(price * quantity)}
                </div>
              </li>
            ))}
          </ul>

          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-end">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-400 flex items-center gap-1 group-hover:text-black transition-colors">
              VIEW DETAILS
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};