import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/services/api/productsApi';

const PRODUCTS_QUERY_KEY = ['products'];

export const useProducts = (category?: string) => {
    return useQuery({
        queryKey: [...PRODUCTS_QUERY_KEY, category],
        queryFn: () => productsApi.getAll(category),
    });
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: [...PRODUCTS_QUERY_KEY, id],
        queryFn: () => productsApi.getById(id),
        enabled: !!id,
    });
};