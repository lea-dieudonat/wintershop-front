import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addressApi } from '@/services/api/addressApi';
import type { AddressInput } from '@/types/addressTypes';

const ADDRESSES_KEY = "addresses";

/**
 * Hook to fetch all addresses.
 */
export const useAddresses = () => {
    return useQuery({
        queryKey: [ADDRESSES_KEY],
        queryFn: addressApi.getAll,
        retry: 1,
        staleTime: 1000 * 30, // 30 seconds
    });
}

/**
 * Hook to fetch a single address by ID.
 */
export const useAddress = (id: number) => {
    return useQuery({
        queryKey: [ADDRESSES_KEY, id],
        queryFn: () => addressApi.getById(id),
        enabled: !!id,
    });
}

/**
 * Hook to create a new address.
 */
export const useCreateAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (addressInput: AddressInput) => addressApi.create(addressInput),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ADDRESSES_KEY] });
        },
    });
}

/**
 * Hook to update an existing address.
 */
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AddressInput> }) => 
      addressApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [ADDRESSES_KEY] });
      queryClient.invalidateQueries({ queryKey: [ADDRESSES_KEY, variables.id] });
    },
  });
};

/**
 * Hook to delete an address.
 */
export const useDeleteAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => addressApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ADDRESSES_KEY] });
        },
    });
}