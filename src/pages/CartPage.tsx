import React from 'react';
import { ShoppingBag, Trash2, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CartPageProps {
  cartCount: number;
  cartItems: CartItem[];
  onRemoveFromCart: (itemId: string) => void;
  onCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cartCount,
  cartItems,
  onRemoveFromCart,
  onCheckout,
}) => {
  const navigate = useNavigate();

  const totalCartPrice = cartItems.reduce(
    (acc, c) => acc + c.item.price * c.quantity,
    0
  );

  return (
    <main className="px-6 lg:px-12 pt-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black">
          <div className="flex flex-col md:flex-row md:items-baseline gap-6">
            <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-black uppercase">
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
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-2 bg-black text-white text-xs font-mono tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>CONTINUE SHOPPING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="p-4 border border-gray-200 rounded-md flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {item.image && (
                      <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded overflow-hidden shrink-0 flex items-center justify-center p-1">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                        {item.category}
                      </div>
                      <h3 className="font-orbitron font-bold text-xs tracking-wide uppercase text-black truncate">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-jakarta mt-0.5">
                        ${item.price.toLocaleString('en-US')} USD &times; {quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-orbitron font-bold text-xs">
                      ${(item.price * quantity).toLocaleString('en-US')}
                    </span>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
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
                <button
                  onClick={onCheckout}
                  className="w-full bg-black text-white hover:bg-gray-900 py-3 rounded-md font-jakarta uppercase font-semibold text-xs tracking-[0.18em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>CHECKOUT NOW</span>
                  <ChevronRight className="w-4 h-4 stroke-[2]" />
                </button>
                <p className="text-[10px] text-center text-gray-400 uppercase font-semibold tracking-widest">
                  LGPSM &copy; 2026 &mdash; FUTURE FORWARD FASHION
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
  );
};