// Base segments to avoid repeated literals
const BASE = {
  ORDERS: '/orders',
  CART: '/cart',
  PRODUCTS: '/products',
  AUTH: '/auth',
  WISHLIST: '/wishlist',
} as const;

export const API_ENDPOINTS = {
  // Orders
  ORDERS: BASE.ORDERS,
  ORDER: (id: number | string) => `${BASE.ORDERS}/${id}`,
  ORDER_CANCEL: (id: number | string) => `${BASE.ORDERS}/${id}/cancel`,
  ORDER_REFUND: (id: number | string) => `${BASE.ORDERS}/${id}/refund`,

  // Cart
  CART: BASE.CART,
  CART_ITEMS: `${BASE.CART}/items`,
  CART_ITEM: (itemId: number | string) => `${BASE.CART}/items/${itemId}`,

  // Products
  PRODUCTS: BASE.PRODUCTS,
  PRODUCT: (id: number | string) => `${BASE.PRODUCTS}/${id}`,

  // Auth
  LOGIN: '/login',
  LOGOUT: '/logout',
  ME: '/me',

  // Wishlist
  WISHLIST: BASE.WISHLIST,
  WISHLIST_ITEM: (productId: number | string) => `${BASE.WISHLIST}/${productId}`,
} as const;

// Optional named exports for cleaner imports
export const ORDERS = API_ENDPOINTS.ORDERS;
export const ORDER = API_ENDPOINTS.ORDER;
export const ORDER_CANCEL = API_ENDPOINTS.ORDER_CANCEL;
export const ORDER_REFUND = API_ENDPOINTS.ORDER_REFUND;

export const CART = API_ENDPOINTS.CART;
export const CART_ITEMS = API_ENDPOINTS.CART_ITEMS;
export const CART_ITEM = API_ENDPOINTS.CART_ITEM;

export const PRODUCTS = API_ENDPOINTS.PRODUCTS;
export const PRODUCT = API_ENDPOINTS.PRODUCT;

export const WISHLIST = API_ENDPOINTS.WISHLIST;
export const WISHLIST_ITEM = API_ENDPOINTS.WISHLIST_ITEM;

export const LOGIN = API_ENDPOINTS.LOGIN;
export const LOGOUT = API_ENDPOINTS.LOGOUT;
export const ME = API_ENDPOINTS.ME;
