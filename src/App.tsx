import React, { useState } from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { ImageRevealBackground, BG_IMAGE_1 } from './components/ImageRevealBackground';
import { CornerBracket, CheckerboardGrid, WireframeGlobe } from './components/SVGIcons';
import { Drawers } from './components/Drawers';
import { ShopPage } from './components/ShopPage';
import { Toast } from './components/Toast';
import { DrawerType, ShopItem, CartItem, ToastMessage } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'shop' | 'collections' | 'about' | 'contact'>('home');
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const handleOpenDrawer = (type: DrawerType) => {
    setActiveDrawer(type);
  };

  const handleCloseDrawer = () => {
    setActiveDrawer(null);
  };

  const handleAddToCart = (item: ShopItem) => {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });

    setToast({
      id: Date.now().toString(),
      text: `Added "${item.title}" to your shopping bag.`,
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const handleCheckout = () => {
    setToast({
      id: Date.now().toString(),
      text: 'Order submitted successfully!',
    });
    setCartItems([]);
    setActiveDrawer(null);
  };

  const totalCartCount = cartItems.reduce((acc, c) => acc + c.quantity, 0);

  // If active page is 'shop', render the ShopPage component
  if (activePage === 'shop') {
    return (
      <>
        <ShopPage
          onNavigateHome={() => setActivePage('home')}
          onNavigatePage={(page) => {
            if (page === 'collections' || page === 'about' || page === 'contact') {
              handleOpenDrawer('collections');
            } else {
              setActivePage(page);
            }
          }}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onOpenCart={() => handleOpenDrawer('cart')}
          activeNavTab="shop"
        />

        <Drawers
          activeDrawer={activeDrawer}
          onClose={handleCloseDrawer}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />

        <Toast toast={toast} onDismiss={() => setToast(null)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-jakarta flex flex-col justify-between relative overflow-hidden selection:bg-black selection:text-white">
      {/* Interactive Desktop Spotlight Image Reveal Background */}
      <ImageRevealBackground />

      {/* 1. Header (z-20) */}
      <header
        style={{
          paddingInline: 'var(--pad-x)',
          paddingTop: 'var(--header-pt)',
          paddingBottom: 'var(--section-gap)',
        }}
        className="relative z-20 flex items-center justify-between w-full"
      >
        {/* Logo (left) */}
        <button
          onClick={() => setActivePage('home')}
          className="font-orbitron font-black text-black tracking-[0.15em] flex items-start hover:opacity-80 transition-opacity cursor-pointer text-left"
          style={{ fontSize: 'var(--logo)' }}
        >
          <span>LGPSM</span>
          <span
            className="-mt-0.5 ml-0.5 inline-block font-bold"
            style={{ fontSize: 'var(--logo-deg)' }}
          >
            ˚
          </span>
        </button>

        {/* Nav (right) */}
        <nav
          className="flex items-center font-jakarta font-medium uppercase tracking-[0.2em]"
          style={{
            fontSize: 'var(--nav)',
            gap: 'var(--gap-nav)',
          }}
        >
          <button
            onClick={() => setActivePage('shop')}
            className="hover:opacity-50 transition-opacity cursor-pointer font-bold"
          >
            SHOP
          </button>
          <button
            onClick={() => handleOpenDrawer('collections')}
            className="hover:opacity-50 transition-opacity cursor-pointer"
          >
            COLLECTIONS
          </button>
          <button
            onClick={() => handleOpenDrawer('journal')}
            className="hover:opacity-50 transition-opacity cursor-pointer"
          >
            JOURNAL
          </button>

          <span className="text-gray-300 select-none">|</span>

          <button
            onClick={() => handleOpenDrawer('cart')}
            className="hover:opacity-50 transition-opacity cursor-pointer flex items-center"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag
              className="stroke-[1.5]"
              style={{
                width: 'var(--icon)',
                height: 'var(--icon)',
              }}
            />
            {totalCartCount > 0 && (
              <span className="bg-black text-white text-[10px] w-4 h-4 rounded-full inline-flex items-center justify-center font-bold ml-1">
                {totalCartCount}
              </span>
            )}
          </button>
        </nav>
      </header>

      {/* 2. Main Hero Section (flex-1, z-10) */}
      <main
        style={{
          paddingInline: 'var(--pad-x)',
          paddingBlock: 'var(--main-py)',
        }}
        className="relative z-10 flex-1 flex flex-col justify-between w-full"
      >
        <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row lg:items-end justify-between w-full my-auto">
          {/* Left Block (Vertically Centered / Stacked) */}
          <div className="flex flex-col items-start space-y-3 max-w-4xl">
            {/* Top-Left Corner Bracket */}
            <CornerBracket
              position="TL"
              style={{
                width: 'var(--corner)',
                height: 'var(--corner)',
              }}
              className="text-black mb-1"
            />

            {/* Headline */}
            <h1
              className="font-orbitron font-extrabold uppercase tracking-[0.08em] leading-[1.05] text-black"
              style={{ fontSize: 'var(--headline)' }}
            >
              <div>FUTURE</div>
              <div>FORWARD</div>
              <div className="flex items-baseline flex-wrap">
                <span>FASHION</span>
                <CheckerboardGrid className="ml-3 inline-block align-baseline translate-y-[2px]" />
              </div>
            </h1>

            {/* Bottom-Left Corner Bracket */}
            <CornerBracket
              position="BL"
              style={{
                width: 'var(--corner)',
                height: 'var(--corner)',
              }}
              className="text-black mt-1"
            />

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => setActivePage('shop')}
                style={{
                  paddingInline: 'var(--btn-px)',
                  paddingBlock: 'var(--btn-py)',
                  gap: 'var(--btn-gap)',
                  fontSize: 'var(--body)',
                }}
                className="border border-gray-400 rounded-md font-jakarta uppercase tracking-[0.18em] font-semibold text-black hover:bg-black hover:text-white hover:border-black transition-all group flex items-center cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowUpRight className="w-4 h-4 stroke-[1.8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Lower Feature Block (Bottom Aligned on Desktop) */}
          <div className="lg:self-end">
            <div
              style={{
                minWidth: 'var(--feature-min)',
                padding: 'var(--feature-pad)',
              }}
              className="relative border border-transparent flex flex-col items-start gap-4"
            >
              {/* Corner Brackets at Absolute Corners of framed box */}
              <CornerBracket
                position="TL"
                style={{ width: 'var(--corner)', height: 'var(--corner)' }}
                className="absolute top-0 left-0 text-black"
              />
              <CornerBracket
                position="TR"
                style={{ width: 'var(--corner)', height: 'var(--corner)' }}
                className="absolute top-0 right-0 text-black"
              />
              <CornerBracket
                position="BL"
                style={{ width: 'var(--corner)', height: 'var(--corner)' }}
                className="absolute bottom-0 left-0 text-black"
              />
              <CornerBracket
                position="BR"
                style={{ width: 'var(--corner)', height: 'var(--corner)' }}
                className="absolute bottom-0 right-0 text-black"
              />

              {/* Wireframe Globe SVG */}
              <WireframeGlobe className="text-black" />

              {/* Tagline */}
              <div
                className="font-jakarta font-semibold uppercase tracking-[0.18em] text-black leading-tight"
                style={{ fontSize: 'var(--body)' }}
              >
                <div>BEYOND TRENDS.</div>
                <div>BUILT FOR TOMORROW.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile static image section (below hero for < lg viewports) */}
        <div className="mt-12 lg:hidden w-full">
          <div className="border border-gray-200 rounded-lg overflow-hidden aspect-[4/5] sm:aspect-[16/9] relative">
            <img
              src={BG_IMAGE_1}
              alt="LGPSM Future Forward Fashion"
              className="w-full h-full object-cover bg-white"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </main>

      {/* 3. Drawers & Toast Notifications */}
      <Drawers
        activeDrawer={activeDrawer}
        onClose={handleCloseDrawer}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}

