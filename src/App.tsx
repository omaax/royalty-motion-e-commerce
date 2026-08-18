import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CollectionPage } from './pages/CollectionPage';
import { JournalPage } from './pages/JournalPage';
import { CartPage } from './pages/CartPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { WishlistPage } from './pages/WishlistPage';
import { Toast } from './components/Toast';
import { ShopItem, CartItem, CartLineOptions, Order, UserProfile, ToastMessage } from './types';
import { ProfileLayout } from './components/profile/ProfileLayout';
import { ProfilePage } from './pages/ProfilePage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';

const ORDERS_STORAGE_KEY = 'cff.orders';
const PROFILE_STORAGE_KEY = 'cff.profile';

const loadOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'Guest Member',
  email: 'shopper@classicforward.com',
  address: '',
};

const loadProfile = (): UserProfile => {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<UserProfile>) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
};

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<ShopItem[]>([]);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [orders, setOrders] = useState<Order[]>(loadOrders);
  const [profile, setProfile] = useState<UserProfile>(loadProfile);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const handleAddToCart = (item: ShopItem, options?: CartLineOptions) => {
    const color = options?.color ?? item.colors[0];
    const size = options?.size ?? undefined;
    const key = size ? `${item.id}::${color}::${size}` : `${item.id}::${color}`;

    setCartItems((prev) => {
      const existing = prev.find((c) => c.key === key);
      if (existing) {
        return prev.map((c) =>
          c.key === key ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { key, item, quantity: 1, color, size }];
    });

    const variantLabel = size ? `${color} / ${size}` : color;
    setToast({
      id: Date.now().toString(),
      text: `Added "${item.title}"${variantLabel ? ` (${variantLabel})` : ''} to your shopping bag.`,
    });
  };

  const handleRemoveFromCart = (key: string) => {
    setCartItems((prev) => prev.filter((c) => c.key !== key));
  };

  const handleToggleWishlist = (item: ShopItem) => {
    const exists = wishlistItems.some((w) => w.id === item.id);
    setWishlistItems((prev) =>
      exists ? prev.filter((w) => w.id !== item.id) : [...prev, item]
    );
    setToast({
      id: Date.now().toString(),
      text: exists
        ? `Removed "${item.title}" from your wishlist.`
        : `Added "${item.title}" to your wishlist.`,
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const order: Order = {
      id: `CF-${Date.now().toString().slice(-6)}`,
      placedAt: new Date().toISOString(),
      items: cartItems,
      total: cartItems.reduce((acc, c) => acc + c.item.price * c.quantity, 0),
      status: 'Processing',
    };
    setOrders((prev) => [order, ...prev]);
    setToast({
      id: Date.now().toString(),
      text: `Order ${order.id} submitted successfully!`,
    });
    setCartItems([]);
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    setToast({
      id: Date.now().toString(),
      text: 'Profile updated successfully!',
    });
  };

  const totalCartCount = cartItems.reduce((acc, c) => acc + c.quantity, 0);
  const totalWishlistCount = wishlistItems.length;

  const wishlistIds = wishlistItems.map((w) => w.id);

  return (
    <>
      <Routes>
        <Route element={<Layout cartCount={totalCartCount} wishlistCount={totalWishlistCount} />}>
          <Route
            path="/"
            element={
              <HomePage cartCount={totalCartCount} wishlistCount={totalWishlistCount} />
            }
          />
          <Route
            path="/shop"
            element={
              <ShopPage
                onAddToCart={handleAddToCart}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route
            path="/collections/:id"
            element={
              <CollectionPage
                onAddToCart={handleAddToCart}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/wishlist" element={<WishlistPage wishlistItems={wishlistItems} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} />} />
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
          <Route
            path="/product/:id"
            element={
              <ProductDetailPage
                onAddToCart={handleAddToCart}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route
            path="/category/:slug"
            element={
              <CategoryPage
                onAddToCart={handleAddToCart}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfileLayout profile={profile} />}>
            <Route
              index
              element={
                <ProfilePage
                  profile={profile}
                  onUpdateProfile={handleUpdateProfile}
                  orders={orders}
                  wishlistCount={totalWishlistCount}
                />
              }
            />
            <Route path="orders" element={<OrderHistoryPage orders={orders} />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </>
  );
}