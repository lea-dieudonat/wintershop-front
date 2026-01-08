import { apiClient } from '../api/client';
import type { Order, OrdersListResponse, CreateRefundRequest } from '../../types/order';

export const ordersApi = {
    // Récupérer la liste des commandes
    getOrders: async (): Promise<OrdersListResponse> => {
        const response = await apiClient.get<OrdersListResponse>('/orders');
        return response.data;
    },
    
    // Récupérer les détails d'une commande
    getOrderById: async (orderId: number): Promise<Order> => {
        const response = await apiClient.get<Order>(`/orders/${orderId}`);
        return response.data;
    },

    // Annuler une commande
    cancelOrder: async (orderId: number): Promise<Order> => {
        const response = await apiClient.post<Order>(`/orders/${orderId}/cancel`);
        return response.data;
    },

    // Demander un remboursement
    requestRefund: async (id: number, refundData: CreateRefundRequest): Promise<Order> => {
        const response = await apiClient.post<Order>(`/orders/${id}/refunds`, refundData);
        return response.data;
    },
}