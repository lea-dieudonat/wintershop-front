import { apiClient } from './clientApi';
import type { ProductsResponse } from '../../types/productTypes';

export const productsApi = {
    getAll: async (): Promise<ProductsResponse> => {
        const { data } = await apiClient.get<ProductsResponse>('/products');
        return data;
    }
}