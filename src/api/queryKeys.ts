export const authKeys = {
  me: ['auth', 'me'] as const,
  all: ['auth'] as const,
};

export const profileKeys = {
  me: ['profile', 'me'] as const,
};

export const cartKeys = {
  own: ['cart', 'own'] as const,
};

export const wishlistKeys = {
  own: ['wishlist', 'own'] as const,
};

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...categoryKeys.lists(), filters] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
};

export const brandKeys = {
  all: ['brands'] as const,
  lists: () => [...brandKeys.all, 'list'] as const,
};

export const subCategoryKeys = {
  all: ['subcategories'] as const,
  lists: () => [...subCategoryKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...subCategoryKeys.lists(), filters] as const,
};

export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
};

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export const reviewKeys = {
  product: (productId: string) => ['reviews', productId] as const,
};

export const couponKeys = {
  all: ['coupons'] as const,
};

export const paymentKeys = {
  session: (orderId: string) => ['payment', 'session', orderId] as const,
};

export const brandedKeys = {
  brand: {
    all: ['brand'] as const,
    lists: () => [...brandedKeys.brand.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...brandedKeys.brand.lists(), filters] as const,
  },
};