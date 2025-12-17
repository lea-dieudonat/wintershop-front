import { apiClient } from './client';
import type { ProductsResponse } from '../../types/product';

export const productsApi = {
    getAll: async (): Promise<ProductsResponse> => {
        const { data } = await apiClient.get<ProductsResponse>('/products');
        return data;
    }
}