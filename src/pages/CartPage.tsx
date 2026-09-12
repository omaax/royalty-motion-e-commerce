import React, { useMemo } from 'react';
import { ShoppingBag, Trash2, ChevronRight, ArrowRight, Minus, Plus } from 'lucide-react';
import { MotionLink } from '../components/MotionButton';
import { colorHex, formatPrice, normalizeColorName } from '../api/mappers';
import { SEO } from '../components/SEO';
import { APP_NAME, APP_TAGLINE, APP_YEAR } from '../constants/branding';
import { useCart, useRemoveFromCart, useUpdateCartItem, useGuestCartActions } from '../hooks/useCart';

export const CartPage: React.FC = () => {
  const { items, itemKeys, isEmpty, isGuest } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();
  const guestActions = useGuestCartActions();
  const cartCount = items.length;

  const totalCartPrice = useMemo(
    () => items.reduce((acc, c) => acc + c.price, 0),
    [items]
  );

  const changeQuantity = (key: string, delta: number) => {
    const index = itemKeys.indexOf(key);
    const cartLine = items[index];
    if (!cartLine) return;
    const nextQuantity = cartLine.quantity + delta;
    if (nextQuantity <= 0) {
      removeItem(key);
      return;
    }
    if (isGuest) {
      guestActions.updateQuantity(key, nextQuantity);
    } else {
      updateCartItem.mutate({ itemId: cartLine.itemId, quantity: nextQuantity });
    }
  };

  const removeItem = (key: string) => {
    const index = itemKeys.indexOf(key);
    const cartLine = items[index];
    if (isGuest) {
      guestActions.remove(key);
    } else if (cartLine) {
      removeFromCart.mutate(cartLine.itemId);
    }
  };

  return (
    <main className="px-6 lg:px-12 pt-10">
        <SEO
          title="Shopping Bag"
          description="Review your selected items from ROYALTY — futuristic streetwear and accessories ready for checkout."
        />
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

        {isEmpty ? (
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
              {items.map((line, index) => {
                const key = itemKeys[index];
                return (
                <div
                  key={key}
                  className="p-4 border border-gray-200 rounded-md flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {line.product.images[0] && (
                      <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded overflow-hidden shrink-0 flex items-center justify-center p-1">
                        <img src={line.product.images[0]} alt={line.product.title} loading="lazy" width={64} height={64} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                        {line.product.category}
                      </div>
                      <h3 className="font-orbitron font-bold text-xs tracking-wide uppercase text-black truncate">
                        {line.product.title}
                      </h3>
                      {(line.color) && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            style={{ backgroundColor: colorHex(line.color) }}
                            className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300"
                          />
                          <span className="text-[10px] text-gray-500 uppercase font-mono">
                            {normalizeColorName(line.color)}
                          </span>
                        </div>
                      )}
                      <p className="text-[11px] text-gray-500 font-jakarta mt-0.5">
                        {formatPrice(line.product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => changeQuantity(key, -1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3 stroke-[2]" />
                        </button>
                        <span className="font-mono text-xs font-bold min-w-6 text-center">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => changeQuantity(key, 1)}
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
                      {formatPrice(line.price)}
                    </span>
                    <button
                      onClick={() => removeItem(key)}
                      className="text-gray-400 hover:text-black p-1 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
                );
              })}
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
                    {formatPrice(totalCartPrice)}
                  </span>
                </div>
                <MotionLink
                  to="/checkout"
                  variant="solid"
                  className="w-full font-jakarta uppercase font-semibold text-xs tracking-[0.18em] py-3 justify-center"
                >
                  <span>CHECKOUT NOW</span>
                  <ChevronRight className="w-4 h-4 stroke-[2]" />
                </MotionLink>
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