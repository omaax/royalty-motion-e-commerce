export interface ApiCategory {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
  _parent?: string;
}

export interface ApiShopBrand {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
}

export interface ApiSubCategory {
  _id: string;
  name: string;
  slug?: string;
  category: string | ApiCategory;
}

export interface ApiUser {
  _id: string;
  name: string;
  slug?: string;
  email: string;
  phone?: string;
  imgProfile?: string;
  role?: 'user' | 'admin';
  isActive?: boolean;
  active?: boolean;
  createdAt?: string;
}

export interface ApiReviewUser {
  _id: string;
  name: string;
}

export interface ApiReview {
  _id: string;
  title?: string;
  ratings?: number;
  user: string | ApiReviewUser;
  product?: string;
  createdAt?: string;
}

export interface ApiBrand {
  _id: string;
  name: string;
}

export interface ApiProduct {
  id?: string;
  _id?: string;
  title: string;
  slug?: string;
  description?: string;
  quantity?: number;
  sold?: number;
  price: number;
  priceAfterDiscount?: number;
  color?: string[];
  sizes?: string[];
  imageCover?: string;
  images?: string[];
  category: string | { _id?: string; name?: string };
  subCategories?: string[] | { _id?: string; name?: string }[];
  brand?: string | { _id?: string; name?: string };
  ratingsAverage?: number;
  ratingQuantity?: number;
  createdAt?: string;
}

export interface ApiProductDetail extends ApiProduct {
  reviews?: ApiReview[];
}

export interface ApiCartProduct {
  _id: string;
  title?: string;
  price?: number;
  imageCover?: string;
}

export interface ApiCartItem {
  _id: string;
  product: string | ApiCartProduct;
  color?: string;
  quantity: number;
  price: number;
}

export interface ApiCart {
  _id: string;
  cartItems: ApiCartItem[];
  totalCartPrice?: number;
  totalCartPriceAfterDiscount?: number;
}

export interface ApiCoupon {
  _id: string;
  name?: string;
  expire?: string;
  discount?: number;
}

export interface ApiWishlistItem {
  _id: string;
  product?: string | { _id?: string; title?: string; imageCover?: string; price?: number };
}

export interface ApiOrderItem {
  product: string | ApiCartProduct;
  price: number;
  color?: string;
  quantity: number;
}

export interface ApiShippingAddress {
  details?: string;
  phone?: string;
  city?: string;
  postalCode?: string;
}

export interface ApiOrder {
  _id: string;
  user?: string | { _id?: string; name?: string };
  cartItems: ApiOrderItem[];
  shippingAddress?: ApiShippingAddress;
  paymentMethodType?: 'cash' | 'card';
  isPaid: boolean;
  isDelivered: boolean;
  taxPrice?: number;
  shippingPrice?: number;
  totalOrderPrice?: number;
  totalOrderPriceAfterDiscount?: number;
  paidAt?: string;
  deliveredAt?: string;
  createdAt?: string;
}

export interface ApiListResponse<T> {
  message: string;
  page?: { currentPage?: number; numberOfPages?: number; limit?: number; next?: number };
  data: T[];
}

export interface ApiDocumentResponse<T> {
  message: string;
  document?: T;
  data?: T;
}

export interface ApiAuthResponse {
  message: string;
  token: string;
  user: ApiUser;
}

export interface ApiValidationIssue {
  msg: string;
  param?: string;
  location?: string;
  value?: unknown;
}

export interface ErrorPayload {
  message?: string;
  err?: { message?: string };
  errors?: ApiValidationIssue[];
}