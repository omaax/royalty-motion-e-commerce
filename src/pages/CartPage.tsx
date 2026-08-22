import React from 'react';
import { ShoppingBag, Trash2, ChevronRight, ArrowRight, Minus, Plus } from 'lucide-react';
import { CartItem } from '../types';
import { MotionButton, MotionLink } from '../components/MotionButton';
import { COLOR_HEX } from '../constants/shop';
import { APP_NAME, APP_TAGLINE, APP_YEAR } from '../constants/branding';

interface CartPageProps {
  cartCount: number;
  cartItems: CartItem[];
  onRemoveFromCart: (key: string) => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cartCount,
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity,
  onCheckout,
}) => {
  const totalCartPrice = cartItems.reduce(
    (acc, c) => acc + c.item.price * c.quantity,
    0
  );

  return (
    <main className="px-6 lg:px-12 pt-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
          <div className="flex flex-col md:flex-row md:items-baseline gap-6">
            <h2 className="font-serif text-3xl md:text-6xl font-bold tracking-tight text-black uppercase">
              SHOPPING BAG
            </h2>
            <div className="text-xs font-mono text-red-700 tracking-wider font-semibold leading-relaxed">
              <div>Selected items ({cartCount})</div>
              <div>Forged. Sealed. Ready for delivery.</div>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
            <ShoppingBag className="w-12 h-12 stroke-[1.2]" />
            <p className="text-xs uppercase font-semibold tracking-widest">
              Your shopping bag is empty.
            </p>
            <MotionLink
              to="/shop"
              className="font-mono text-xs tracking-widest uppercase px-6 py-2"
            >
              <span>CONTINUE SHOPPING</span>
              <ArrowRight className="w-4 h-4" />
            </MotionLink>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map(({ key, item, quantity, color, size }) => (
                <div
                  key={key}
                  className="p-4 border border-gray-200 rounded-md flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {item.images[0] && (
                      <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded overflow-hidden shrink-0 flex items-center justify-center p-1">
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                        {item.category}
                      </div>
                      <h3 className="font-orbitron font-bold text-xs tracking-wide uppercase text-black truncate">
                        {item.title}
                      </h3>
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
                      <p className="text-[11px] text-gray-500 font-jakarta mt-0.5">
                        ${item.price.toLocaleString('en-US')} USD
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => onUpdateQuantity(key, -1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3 stroke-[2]" />
                        </button>
                        <span className="font-mono text-xs font-bold min-w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(key, 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 stroke-[2]" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-orbitron font-bold text-xs">
                      ${(item.price * quantity).toLocaleString('en-US')}
                    </span>
                    <button
                      onClick={() => onRemoveFromCart(key)}
                      className="text-gray-400 hover:text-black p-1 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-4">
              <div className="p-6 border border-gray-200 rounded-md space-y-5">
                <h3 className="font-orbitron font-bold text-sm tracking-wider uppercase text-black">
                  Order Summary
                </h3>
                <div className="flex items-center justify-between text-sm font-jakarta font-bold">
                  <span className="uppercase tracking-widest text-xs text-gray-500">
                    Subtotal
                  </span>
                  <span className="font-orbitron font-bold text-base">
                    ${totalCartPrice.toLocaleString('en-US')} USD
                  </span>
                </div>
                <MotionButton
                  variant="solid"
                  onClick={onCheckout}
                  className="w-full font-jakarta uppercase font-semibold text-xs tracking-[0.18em] py-3"
                >
                  <span>CHECKOUT NOW</span>
                  <ChevronRight className="w-4 h-4 stroke-[2]" />
                </MotionButton>
                <p className="text-[10px] text-center text-gray-400 uppercase font-semibold tracking-widest">
                  {APP_NAME} &copy; {APP_YEAR} &mdash; {APP_TAGLINE}
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
  );
};