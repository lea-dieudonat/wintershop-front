import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '@/services/api/cartApi';
import { useAuth } from '@/hooks/useAuth';
import type { Cart, AddToCartPayload, UpdateCartItemPayload, RemoveCartItemPayload  } from '@/types/cartTypes';

const CART_QUERY_KEY = ['cart'];

export const useCart = () => {
    const { isAuthenticated } = useAuth();
    
    return useQuery<Cart>({
        queryKey: CART_QUERY_KEY,
        queryFn: cartApi.getCart,
        enabled: isAuthenticated,
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
        mutationFn: (payload: RemoveCartItemPayload) => cartApi.removeCartItem(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
    });
}

export const useClearCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => cartApi.clearCart(),
        onSuccess: (updatedCart: Cart) => {
            queryClient.setQueryData(CART_QUERY_KEY, updatedCart);
        },
    });
}