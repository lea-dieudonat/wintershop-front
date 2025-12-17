import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../services/api/products';

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: productsApi.getAll,
    });
};