import { apiClient } from '@/services/api/clientApi';
import type { Product } from '@/types/productTypes';
import { normalizeCollection, type CollectionPayload } from '@/lib/api-helpers';
import { WISHLIST, WISHLIST_ITEM } from '@/lib/apiEndpoints';

export const wishlistApi = {
    // Récupérer la wishlist de l'utilisateur
    getWishlist: async (): Promise<Product[]> => {
        const response = await apiClient.get<CollectionPayload<Product>>(WISHLIST);
        const { items } = normalizeCollection(response.data);
        return items;
    },

    // Ajouter un produit à la wishlist
    addToWishlist: async (productId: number): Promise<Product[]> => {
        const response = await apiClient.post<CollectionPayload<Product>>(WISHLIST_ITEM(productId));
        const { items } = normalizeCollection(response.data);
        return items;
    },

    // Retirer un produit de la wishlist
    removeFromWishlist: async (productId: number): Promise<void> => {
        await apiClient.delete(WISHLIST_ITEM(productId));
    },
};
