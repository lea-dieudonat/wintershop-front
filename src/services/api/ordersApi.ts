import { apiClient } from './clientApi';
import type { Order, OrderListItem, CreateRefundRequest } from '../../types/orderTypes';
import { normalizeCollection, type CollectionPayload } from '../../lib/api-helpers';

export const ordersApi = {
    // Récupérer la liste des commandes
    getOrders: async () => {
        const response = await apiClient.get<CollectionPayload<OrderListItem>>('/orders');
        return normalizeCollection(response.data);
    },
    
    // Récupérer les détails d'une commande
    getOrderById: async (orderId: number): Promise<Order> => {
        const response = await apiClient.get<Order>(`/orders/${orderId}`);
        return response.data;
    },

    // Annuler une commande
    cancelOrder: async (orderId: number): Promise<Order> => {
        const response = await apiClient.patch<Order>(`/orders/${orderId}/cancel`, null, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    },

    // Demander un remboursement
    requestRefund: async (id: number, refundData: CreateRefundRequest): Promise<Order> => {
        const response = await apiClient.post<Order>(`/orders/${id}/refund`, refundData);
        return response.data;
    },
}