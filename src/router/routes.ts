const CHECKOUT_BASE = '/checkout';
const ORDERS_BASE = '/orders';
const PRODUCTS_BASE = '/products';
const PROFILE_BASE = '/profile';

export const ROUTES = {
    // Pages publiques
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',

    // Produits
    PRODUCTS: PRODUCTS_BASE,
    PRODUCT_DETAILS: (id: number | string) => `${PRODUCTS_BASE}/${id}`,

    // Panier
    CART: '/cart',
    CHECKOUT: CHECKOUT_BASE,
    CHECKOUT_SUCCESS: `${CHECKOUT_BASE}/success`,
    CHECKOUT_CANCEL: `${CHECKOUT_BASE}/cancel`,

    // Commandes
    ORDERS: ORDERS_BASE,
    ORDER_DETAILS: (id: number | string) => `${ORDERS_BASE}/${id}`,

    // Profil
    PROFILE: PROFILE_BASE,
    PROFILE_ADDRESSES: `${PROFILE_BASE}/addresses`,

    // 404
    NOT_FOUND: '/404',
} as const;