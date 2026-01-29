import { apiClient } from '@/services/api/clientApi';
import type { CheckoutInput, CheckoutSessionOutput } from '@/types/checkoutTypes';

export const checkoutApi = {
    /**
     * Create a checkout session.
     */
    createSession: async (checkoutInput: CheckoutInput): Promise<CheckoutSessionOutput> => {
        const response = await apiClient.post<CheckoutSessionOutput>('/checkout', checkoutInput);
        return response.data;
    },


}