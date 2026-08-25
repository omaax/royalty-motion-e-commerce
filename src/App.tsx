import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Toast } from './components/Toast';
import { ShopItem, CartItem, CartLineOptions, Order, UserProfile, ToastMessage, ShippingInfo, PaymentInfo } from './types';
import { ProfileLayout } from './components/profile/ProfileLayout';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(m => ({ default: m.ShopPage })));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage').then(m => ({ default: m.CategoriesPage })));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage').then(m => ({ default: m.CollectionsPage })));
const CollectionPage = lazy(() => import('./pages/CollectionPage').then(m => ({ default: m.CollectionPage })));
const JournalPage = lazy(() => import('./pages/JournalPage').then(m => ({ default: m.JournalPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then(m => ({ default: m.CategoryPage })));
const WishlistPage = lazy(() => import('./pages/WishlistPage').then(m => ({ default: m.WishlistPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage').then(m => ({ default: m.OrderHistoryPage })));
const OrderDetailPage = lazy(() => import('./pages/OrderDetailPage').then(m => ({ default: m.OrderDetailPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const PaymentPage = lazy(() => import('./pages/PaymentPage').then(m => ({ default: m.PaymentPage })));
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage').then(m => ({ default: m.OrderConfirmationPage })));
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('./pages/auth/SignupPage').then(m => ({ default: m.SignupPage })));

const AdminLayout = lazy(() => import('./app/admin/layout').then(m => ({ default: m.default })));
const AdminDashboard = lazy(() => import('./app/admin/page').then(m => ({ default: m.default })));
const AdminProductsPage = lazy(() => import('./app/admin/products/page').then(m => ({ default: m.default })));
const AdminUsersPage = lazy(() => import('./app/admin/users/page').then(m => ({ default: m.default })));
const AdminUserDetailPage = lazy(() => import('./app/admin/users/[id]/page').then(m => ({ default: m.default })));
const AdminPaymentsPage = lazy(() => import('./app/admin/payments/page').then(m => ({ default: m.default })));

const ORDERS_STORAGE_KEY = 'cff.orders';
const PROFILE_STORAGE_KEY = 'cff.profile';
const USER_STORAGE_KEY = 'cff.user';

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

const loadUser = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
};

export default function App() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<ShopItem[]>([]);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [orders, setOrders] = useState<Order[]>(loadOrders);
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [user, setUser] = useState<UserProfile | null>(loadUser);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_STORAGE_KEY);
  }, [user]);

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

  const handleUpdateQuantity = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((c) => (c.key === key ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
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

  const handleShippingComplete = (shipping: ShippingInfo) => {
    setShippingInfo(shipping);
  };

  const handlePlaceOrder = (shipping: ShippingInfo, payment: PaymentInfo): string | null => {
    if (cartItems.length === 0) return null;
    const order: Order = {
      id: `CF-${Date.now().toString().slice(-6)}`,
      placedAt: new Date().toISOString(),
      items: cartItems,
      total: cartItems.reduce((acc, c) => acc + c.item.price * c.quantity, 0),
      status: 'Processing',
      shipping,
      payment,
    };
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    setToast({
      id: Date.now().toString(),
      text: `Order ${order.id} submitted successfully!`,
    });
    return order.id;
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    setToast({
      id: Date.now().toString(),
      text: 'Profile updated successfully!',
    });
  };

  const handleLogin = (session: UserProfile) => {
    setUser(session);
    setProfile((prev) => ({
      ...prev,
      name: session.name || prev.name,
      email: session.email,
    }));
    setToast({
      id: Date.now().toString(),
      text: `Welcome, ${session.name || session.email}. Access granted!`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setToast({
      id: Date.now().toString(),
      text: 'You have been signed out.',
    });
  };

  const totalCartCount = cartItems.reduce((acc, c) => acc + c.quantity, 0);
  const totalWishlistCount = wishlistItems.length;

  const wishlistIds = useMemo(() => new Set(wishlistItems.map((w) => w.id)), [wishlistItems]);

  return (
    <>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400 animate-pulse">Loading...</span></div>}>
      <Routes>
        <Route element={<Layout cartCount={totalCartCount} wishlistCount={totalWishlistCount} isLoggedIn={!!user} onLogout={handleLogout} />}>
          <Route
            path="/"
            element={
              <HomePage cartCount={totalCartCount} wishlistCount={totalWishlistCount} isLoggedIn={!!user} onLogout={handleLogout} />
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
                onUpdateQuantity={handleUpdateQuantity}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cartCount={totalCartCount}
                cartItems={cartItems}
                onShippingComplete={handleShippingComplete}
              />
            }
          />
          <Route
            path="/payment"
            element={
              shippingInfo ? (
                <PaymentPage
                  cartCount={totalCartCount}
                  cartItems={cartItems}
                  shipping={shippingInfo}
                  onPlaceOrder={handlePlaceOrder}
                />
              ) : (
                <Navigate to="/checkout" replace />
              )
            }
          />
          <Route
            path="/order-confirmation/:id"
            element={
              <OrderConfirmationPage orders={orders} />
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
                onLogout={handleLogout}
                orders={orders}
                wishlistCount={totalWishlistCount}
              />
            }
          />
            <Route path="orders" element={<OrderHistoryPage orders={orders} />} />
            <Route path="orders/:id" element={<OrderDetailPage orders={orders} />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="users/:id" element={<AdminUserDetailPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
        </Route>
      </Routes>
      </Suspense>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </>
  );
}