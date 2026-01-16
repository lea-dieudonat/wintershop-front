import { apiClient } from '@/services/api/clientApi';
import type { ProductsResponse } from '@/types/productTypes';
import { PRODUCTS } from '@/lib/apiEndpoints';

export const productsApi = {
    getAll: async (): Promise<ProductsResponse> => {
        const { data } = await apiClient.get<ProductsResponse>(PRODUCTS);
        return data;
    }
}