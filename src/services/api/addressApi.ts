import { apiClient } from '@/services/api/clientApi';
import type { Address, AddressInput, AddressesResponse } from '@/types/addressTypes';

export const addressApi = {
    /**
     * Get all addresses for the authenticated user.
     */
    getAll: async(): Promise<Address[]> => {
        try {
            const response = await apiClient.get<AddressesResponse>('/addresses');
            return response.data['hydra:member'] || [];
        } catch (error) {
            console.error('Failed to fetch addresses:', error);
            return [];
        }
    },

    /**
     * Get a single address by ID.
     */
    getById: async(id: number): Promise<Address> => {
        const response = await apiClient.get<Address>(`/addresses/${id}`);
        return response.data;
    },

    /**
     * Create a new address.
     */
    create: async(addressInput: AddressInput): Promise<Address> => {
        const response = await apiClient.post<Address>('/addresses', addressInput);
        return response.data;
    },

    /**
     * Update an existing address
     */
    update: async(id: number, data: Partial<AddressInput>): Promise<Address> => {
        const response = await apiClient.put<Address>(`/addresses/${id}`, data);
        return response.data;
    },
    
    /**
     * Delete an address.
     */
    delete: async(id: number): Promise<void> => {
        await apiClient.delete<void>(`/addresses/${id}`);
    },
}