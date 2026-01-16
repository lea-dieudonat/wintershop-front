import { apiClient } from '@/services/api/clientApi';
import type { Order, OrderListItem, CreateRefundRequest } from '@/types/orderTypes';
import { normalizeCollection, type CollectionPayload } from '@/lib/api-helpers';
import { ORDERS, ORDER, ORDER_CANCEL, ORDER_REFUND } from '@/lib/apiEndpoints';

export const ordersApi = {
    // Récupérer la liste des commandes
    getOrders: async () => {
        const response = await apiClient.get<CollectionPayload<OrderListItem>>(ORDERS);
        return normalizeCollection(response.data);
    },
    
    // Récupérer les détails d'une commande
    getOrderById: async (orderId: number): Promise<Order> => {
        const response = await apiClient.get<Order>(ORDER(orderId));
        return response.data;
    },

    // Annuler une commande
    cancelOrder: async (orderId: number): Promise<Order> => {
        const response = await apiClient.patch<Order>(ORDER_CANCEL(orderId), null, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    },

    // Demander un remboursement
    requestRefund: async (id: number, refundData: CreateRefundRequest): Promise<Order> => {
        const response = await apiClient.post<Order>(ORDER_REFUND(id), refundData);
        return response.data;
    },
}