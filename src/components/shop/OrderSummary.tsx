import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { CartItem } from '../../types';
import { MotionButton } from '../MotionButton';
import { COLOR_HEX } from '../../constants/shop';
import { APP_NAME, APP_YEAR } from '../../constants/branding';

interface OrderSummaryProps {
  cartItems: CartItem[];
  buttonLabel: string;
  backLinkTo: string;
  backLinkLabel: string;
  onSubmit: (e: React.FormEvent) => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  buttonLabel,
  backLinkTo,
  backLinkLabel,
  onSubmit,
}) => {
  const totalCartPrice = cartItems.reduce(
    (acc, c) => acc + c.item.price * c.quantity,
    0
  );

  return (
    <aside className="lg:col-span-4">
      <div className="p-6 border border-gray-200 rounded-md space-y-5 sticky top-10">
        <h3 className="font-orbitron font-bold text-sm tracking-wider uppercase text-black">
          Order Summary
        </h3>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {cartItems.map(({ key, item, quantity, color, size }) => (
            <div key={key} className="flex items-center gap-3">
              {item.images[0] && (
                <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-contain" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-orbitron font-bold text-[10px] tracking-wide uppercase text-black truncate">
                  {item.title}
                </div>
                {(color || size) && (
                  <div className="flex items-center gap-1 mt-0.5">
                    {color && (
                      <span
                        style={{ backgroundColor: COLOR_HEX[color as keyof typeof COLOR_HEX] ?? '#999' }}
                        className="w-2 h-2 rounded-full inline-block border border-gray-300"
                      />
                    )}
                    <span className="text-[9px] text-gray-400 uppercase font-mono">
                      {[color, size].filter(Boolean).join(' / ')}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[10px] font-mono text-gray-400">x{quantity}</span>
                  <span className="font-orbitron font-bold text-[10px]">
                    ${(item.price * quantity).toLocaleString('en-US')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-3">
          <div className="flex items-center justify-between text-sm font-jakarta font-bold">
            <span className="uppercase tracking-widest text-xs text-gray-500">Subtotal</span>
            <span className="font-orbitron font-bold text-base">
              ${totalCartPrice.toLocaleString('en-US')} USD
            </span>
          </div>
          <div className="flex items-center justify-between text-sm font-jakarta">
            <span className="uppercase tracking-widest text-xs text-gray-500">Shipping</span>
            <span className="font-mono text-xs text-gray-400">FREE</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
            <span className="uppercase tracking-widest text-xs font-bold text-black">Total</span>
            <span className="font-orbitron font-bold text-lg">
              ${totalCartPrice.toLocaleString('en-US')} USD
            </span>
          </div>
        </div>

        <MotionButton
          type="submit"
          variant="solid"
          className="w-full font-jakarta uppercase font-semibold text-xs tracking-[0.18em] py-3"
        >
          <span>{buttonLabel}</span>
          <ChevronRight className="w-4 h-4 stroke-[2]" />
        </MotionButton>

        <Link
          to={backLinkTo}
          className="block text-right text-[10px] font-mono tracking-widest uppercase text-gray-400 hover:text-black transition-colors -mt-2"
        >
          <ArrowLeft className="w-3.5 h-3.5 inline-block mr-1" />
          {backLinkLabel}
        </Link>

        <p className="text-[10px] text-center text-gray-400 uppercase font-semibold tracking-widest">
          {APP_NAME} &copy; {APP_YEAR} &mdash; Secure Checkout
        </p>
      </div>
    </aside>
  );
};
