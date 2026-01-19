import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/services/api/productsApi';

const PRODUCTS_QUERY_KEY = ['products'];

export const useProducts = () => {
    return useQuery({
        queryKey: PRODUCTS_QUERY_KEY,
        queryFn: productsApi.getAll,
    });
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: [...PRODUCTS_QUERY_KEY, id],
        queryFn: () => productsApi.getById(id),
        enabled: !!id,
    });
};