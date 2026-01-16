import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '@/services/api/cartApi';
import type { Cart, AddToCartPayload, UpdateCartItemPayload  } from '@/types/cartTypes';

const CART_QUERY_KEY = ['cart'];

export const useCart = () => {
    return useQuery<Cart>({
        queryKey: CART_QUERY_KEY,
        queryFn: cartApi.getCart,
    });
}

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: AddToCartPayload) => cartApi.addToCart(payload),
        onSuccess: (updatedCart: Cart) => {
            queryClient.setQueryData(CART_QUERY_KEY, updatedCart)
        },
    });
}

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateCartItemPayload) => cartApi.updateCartItem(payload),
        onSuccess: (updatedCart: Cart) => {
            queryClient.setQueryData(CART_QUERY_KEY, updatedCart);
        },
    });
}

export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: number) => cartApi.removeCartItem(itemId),
        onSuccess: (updatedCart: Cart) => {
            queryClient.setQueryData(CART_QUERY_KEY, updatedCart);
        },
    });
}