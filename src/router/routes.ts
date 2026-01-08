export const ROUTES = {
    // Pages publiques
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',

    // Produits
    PRODUCTS: '/products',
    PRODUCT_DETAILS: (id: number | string) => `/products/${id}`,

    // Panier
    CART: '/cart',
    CHECKOUT: '/checkout',

    // Commandes
    ORDERS: '/orders',
    ORDER_DETAILS: (id: number | string) => `/orders/${id}`,

    // Profil
    PROFILE: '/profile',
    PROFILE_ADDRESSES: '/profile/addresses',

    // 404
    NOT_FOUND: '/404',
} as const;