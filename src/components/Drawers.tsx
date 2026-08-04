import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingBag, X, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { DrawerType, ShopItem, CartItem, CollectionItem, JournalItem } from '../types';
import { SHOP_PRODUCTS } from '../data/shopData';

interface DrawersProps {
  activeDrawer: DrawerType;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (item: ShopItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onCheckout: () => void;
}

export const SHOP_ITEMS: ShopItem[] = SHOP_PRODUCTS;


export const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: 'series-01',
    code: 'SERIES 01',
    title: 'SYNTHETIC HORIZONS',
    description:
      'Ultra-durable weather-sealed fabrics with minimalist silhouette architecture.',
  },
  {
    id: 'series-02',
    code: 'SERIES 02',
    title: 'KINETIC FORM',
    description:
      'Ergonomic streetwear designed for maximum mobility and temperature equilibrium.',
  },
  {
    id: 'series-03',
    code: 'SERIES 03',
    title: 'MONOCHROME ZERO',
    description:
      'Pure black and white structural tailoring crafted from 100% recycled polymers.',
  },
];

export const JOURNAL_ITEMS: JournalItem[] = [
  {
    id: 'dispatch-01',
    date: 'AUG 2026',
    title: 'THE ARCHITECTURE OF NEXT-GEN TEXTILES',
    readTime: '4 MIN READ',
  },
  {
    id: 'dispatch-02',
    date: 'JUL 2026',
    title: 'CIRCULAR DESIGN IN HIGH-END APPAREL',
    readTime: '6 MIN READ',
  },
  {
    id: 'dispatch-03',
    date: 'JUN 2026',
    title: 'MINIMALISM AS A FUNCTIONAL STATEMENT',
    readTime: '3 MIN READ',
  },
];

export const Drawers: React.FC<DrawersProps> = ({
  activeDrawer,
  onClose,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onCheckout,
}) => {
  if (!activeDrawer) return null;

  const getDrawerHeaderTitle = () => {
    switch (activeDrawer) {
      case 'shop':
        return 'Catalog';
      case 'collections':
        return 'Archive 2026';
      case 'journal':
        return 'Editorial';
      case 'cart':
        return 'Shopping Bag';
      default:
        return '';
    }
  };

  const totalCartCount = cartItems.reduce((acc, c) => acc + c.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (acc, c) => acc + c.item.price * c.quantity,
    0
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Dimmed backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-xs cursor-pointer"
        />

        {/* Right side white drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          style={{
            width: '100%',
            maxWidth: 'var(--drawer-max)',
            padding: 'var(--drawer-pad)',
          }}
          className="relative z-10 bg-white h-full border-l border-gray-200 shadow-2xl flex flex-col justify-between overflow-y-auto"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <h2 className="font-orbitron font-bold text-lg tracking-wider uppercase text-black">
                {getDrawerHeaderTitle()}
              </h2>
              <button
                onClick={onClose}
                className="p-1 text-gray-500 hover:text-black transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* SHOP DRAWER CONTENT */}
            {activeDrawer === 'shop' && (
              <div className="space-y-6">
                <p className="text-xs uppercase font-semibold text-gray-400 tracking-widest">
                  Featured Garments
                </p>
                <div className="space-y-4">
                  {SHOP_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border border-gray-200 rounded-md hover:border-black transition-colors flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {item.image && (
                          <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded overflow-hidden shrink-0 flex items-center justify-center p-1">
                            <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                          </div>
                        )}
                        <div className="truncate">
                          <span className="text-[9px] font-semibold tracking-widest uppercase text-gray-400 block">
                            {item.tag}
                          </span>
                          <h3 className="font-orbitron font-bold text-xs tracking-wide uppercase text-black truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-600 font-jakarta mt-0.5">
                            ${item.price} USD
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="flex items-center gap-1 border border-black px-3 py-1.5 rounded text-xs font-medium uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors cursor-pointer shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        ADD
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COLLECTIONS DRAWER CONTENT */}
            {activeDrawer === 'collections' && (
              <div className="space-y-6">
                <p className="text-xs uppercase font-semibold text-gray-400 tracking-widest">
                  Season Lineup
                </p>
                <div className="space-y-4">
                  {COLLECTION_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-gray-200 rounded-md hover:border-black transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                          {item.code}
                        </span>
                      </div>
                      <h3 className="font-orbitron font-bold text-sm tracking-wide uppercase text-black">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 font-jakarta leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* JOURNAL DRAWER CONTENT */}
            {activeDrawer === 'journal' && (
              <div className="space-y-6">
                <p className="text-xs uppercase font-semibold text-gray-400 tracking-widest">
                  Latest Dispatches
                </p>
                <div className="space-y-4">
                  {JOURNAL_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-gray-200 rounded-md hover:border-black transition-colors space-y-2 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                        <span>{item.date}</span>
                        <span>{item.readTime}</span>
                      </div>
                      <h3 className="font-orbitron font-bold text-sm tracking-wide uppercase text-black group-hover:underline">
                        {item.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CART DRAWER CONTENT */}
            {activeDrawer === 'cart' && (
              <div className="space-y-6">
                {cartItems.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 text-gray-400">
                    <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
                    <p className="text-xs uppercase font-semibold tracking-widest">
                      Your shopping bag is empty.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs uppercase font-semibold text-gray-400 tracking-widest">
                      Selected Items ({totalCartCount})
                    </p>
                    <div className="space-y-3">
                      {cartItems.map(({ item, quantity }) => (
                        <div
                          key={item.id}
                          className="p-3 border border-gray-200 rounded-md flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {item.image && (
                              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded overflow-hidden shrink-0 flex items-center justify-center p-1">
                                <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                              </div>
                            )}
                            <div className="truncate">
                              <h3 className="font-orbitron font-bold text-xs tracking-wide uppercase text-black truncate">
                                {item.title}
                              </h3>
                              <p className="text-[11px] text-gray-500 font-jakarta mt-0.5">
                                ${item.price} USD &times; {quantity}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-bold text-xs">
                              ${item.price * quantity}
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
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Area */}
          <div className="pt-6 border-t border-gray-200 mt-6">
            {activeDrawer === 'cart' && cartItems.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-jakarta font-bold">
                  <span className="uppercase tracking-widest text-xs text-gray-500">
                    Subtotal
                  </span>
                  <span className="font-orbitron font-bold text-base">
                    ${totalCartPrice} USD
                  </span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full bg-black text-white hover:bg-gray-900 py-3 rounded-md font-jakarta uppercase font-semibold text-xs tracking-[0.18em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>CHECKOUT NOW</span>
                  <ChevronRight className="w-4 h-4 stroke-[2]" />
                </button>
              </div>
            ) : (
              <p className="text-[10px] text-center text-gray-400 uppercase font-semibold tracking-widest">
                LGPSM &copy; 2026 &mdash; FUTURE FORWARD FASHION
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
