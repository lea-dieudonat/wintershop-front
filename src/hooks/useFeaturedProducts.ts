import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api/clientApi';
import type { Product } from '@/types/productTypes';

interface FeaturedProductsResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  totalItems: number;
  member: Product[];
}

/**
 * Hook pour récupérer les produits mis en avant (featured)
 */
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: async (): Promise<Product[]> => {
      const response = await apiClient.get<FeaturedProductsResponse>('/featured-products');
      return response.data.member || [];
    },
    staleTime: 1000 * 60 * 5,
  });
};