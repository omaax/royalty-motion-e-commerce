import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Toast } from './components/Toast';
import { useToastMessage, dismissToast } from './lib/useToast';
import { useToken } from './lib/useToken';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then((m) => ({ default: m.ShopPage })));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage').then((m) => ({ default: m.CategoriesPage })));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage').then((m) => ({ default: m.CollectionsPage })));
const CollectionPage = lazy(() => import('./pages/CollectionPage').then((m) => ({ default: m.CollectionPage })));
const JournalPage = lazy(() => import('./pages/JournalPage').then((m) => ({ default: m.JournalPage })));
const CartPage = lazy(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then((m) => ({ default: m.CategoryPage })));
const WishlistPage = lazy(() => import('./pages/WishlistPage').then((m) => ({ default: m.WishlistPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage').then((m) => ({ default: m.OrderHistoryPage })));
const OrderDetailPage = lazy(() => import('./pages/OrderDetailPage').then((m) => ({ default: m.OrderDetailPage })));
const ProfileLayout = lazy(() => import('./components/profile/ProfileLayout').then((m) => ({ default: m.ProfileLayout })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));
const PaymentPage = lazy(() => import('./pages/PaymentPage').then((m) => ({ default: m.PaymentPage })));
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage').then((m) => ({ default: m.OrderConfirmationPage })));
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('./pages/auth/SignupPage').then((m) => ({ default: m.SignupPage })));

const AdminLayout = lazy(() => import('./app/admin/layout').then((m) => ({ default: m.default })));
const AdminDashboard = lazy(() => import('./app/admin/page').then((m) => ({ default: m.default })));
const AdminProductsPage = lazy(() => import('./app/admin/products/page').then((m) => ({ default: m.default })));
const AdminCategoriesPage = lazy(() => import('./app/admin/categories/page').then((m) => ({ default: m.default })));
const AdminUsersPage = lazy(() => import('./app/admin/users/page').then((m) => ({ default: m.default })));
const AdminUserDetailPage = lazy(() => import('./app/admin/users/[id]/page').then((m) => ({ default: m.default })));
const AdminPaymentsPage = lazy(() => import('./app/admin/payments/page').then((m) => ({ default: m.default })));

export default function App() {
  const toast = useToastMessage();
  const token = useToken();

  const paymentGuard = token ? <PaymentPage /> : <Navigate to="/login" replace />;
  const profileGuard = token ? <ProfileLayout /> : <Navigate to="/login" replace />;

  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400 animate-pulse">
              Loading...
            </span>
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:id" element={<CollectionPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment/:orderId" element={paymentGuard} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={profileGuard}>
              <Route index element={<ProfilePage />} />
              <Route path="orders" element={<OrderHistoryPage />} />
              <Route path="orders/:id" element={<OrderDetailPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="users/:id" element={<AdminUserDetailPage />} />
            <Route path="payments" element={<AdminPaymentsPage />} />
          </Route>
        </Routes>
      </Suspense>

      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  );
}