export interface CartProduct {
    id: number;
    name: string;
    price: string;
    stock: number;
    image: string | null;
}

export interface CartItem {
    id: number;
    product: CartProduct;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
}

export interface Cart {
    id: number;
    items: CartItem[];
    totalItems: number;
    subtotal: string;
    createdAt: string;
    updatedAt: string;
}

export interface AddToCartPayload {
    productId: number;
    quantity: number;
}

export interface UpdateCartItemPayload {
    itemId: number;
    productId: number;
    quantity: number;
}

export interface RemoveCartItemPayload {
    itemId: number;
    productId: number;
}
