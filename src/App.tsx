import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { CollectionsPage } from './components/CollectionsPage';
import { JournalPage } from './components/JournalPage';
import { CartPage } from './components/CartPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Toast } from './components/Toast';
import { ShopItem, CartItem, ToastMessage } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<ToastMessage | null>(null);

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
  };

  const totalCartCount = cartItems.reduce((acc, c) => acc + c.quantity, 0);

  return (
    <>
      <Routes>
        <Route element={<Layout cartCount={totalCartCount} />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/shop"
            element={<ShopPage onAddToCart={handleAddToCart} />}
          />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cartCount={totalCartCount}
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                onCheckout={handleCheckout}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </>
  );
}