import { apiClient } from "@/services/api/clientApi";
import type { Cart, AddToCartPayload, UpdateCartItemPayload, RemoveCartItemPayload } from "@/types/cartTypes";
import { CART, CART_ITEMS } from "@/lib/apiEndpoints";

export const cartApi = {
    getCart: async (): Promise<Cart> => {
        const response = await apiClient.get<Cart>(CART);
        return response.data;
    },
    addToCart: async (payload: AddToCartPayload): Promise<Cart> => {
        const response = await apiClient.post<Cart>(CART_ITEMS, payload);
        return response.data;
    },
    updateCartItem: async (payload: UpdateCartItemPayload): Promise<Cart> => {
        const response = await apiClient.patch<Cart>(`${CART_ITEMS}/${payload.itemId}`, {
            productId: payload.productId,
            quantity: payload.quantity,
        });
        return response.data;
    },
    removeCartItem: async (payload: RemoveCartItemPayload): Promise<Cart> => {
        const response = await apiClient.delete<Cart>(`${CART_ITEMS}/${payload.itemId}`, {
            data: {
                productId: payload.productId,
            },
        });
        return response.data;
    },
    clearCart: async (): Promise<Cart> => {
        const response = await apiClient.delete<Cart>(CART);
        return response.data;
    }
};
