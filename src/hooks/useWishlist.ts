import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '@/services/api/wishlistApi';
import { toast } from 'sonner';
import { useAuth } from './useAuth';

const WISHLIST_QUERY_KEY = ['wishlist'];

/**
 * Hook pour récupérer la wishlist de l'utilisateur connecté
 */
export const useWishlist = () => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: wishlistApi.getWishlist,
    staleTime: 1000 * 60 * 5, // Cache 5 minutes
    enabled: isAuthenticated, // Only fetch when user is authenticated
  });
};

/**
 * Hook pour ajouter un produit à la wishlist
 */
export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistApi.addToWishlist,
    onSuccess: () => {
      // Invalide le cache de la wishlist pour rafraîchir
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      toast.success('Produit ajouté aux favoris ! 💜');
    },
    onError: () => {
      toast.error('Impossible d\'ajouter aux favoris');
    },
  });
};

/**
 * Hook pour retirer un produit de la wishlist
 */
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistApi.removeFromWishlist,
    onSuccess: () => {
      // Invalide le cache de la wishlist pour rafraîchir
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      toast.success('Produit retiré des favoris');
    },
    onError: () => {
      toast.error('Impossible de retirer des favoris');
    },
  });
};

/**
 * Hook pour vérifier si un produit est dans la wishlist
 */
export const useIsInWishlist = (productId: number): boolean => {
  const { data: wishlist } = useWishlist();
  return wishlist?.some((product) => product.id === productId) ?? false;
};