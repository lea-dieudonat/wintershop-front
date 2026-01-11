import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '../services/api/ordersApi';
import type { CreateRefundRequest } from '../types/orderTypes';

// Liste des commandes
export const useOrders = () => {
    return useQuery({ 
        queryKey: ['orders'], 
        queryFn: ordersApi.getOrders 
    });
};

// Détails d'une commande
export const useOrder = (id: number) => {
    return useQuery({ 
        queryKey: ['order', id], 
        queryFn: () => ordersApi.getOrderById(id),
        enabled: !!id
    });
}

// Annuler une commande
export const useCancelOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (orderId: number) => ordersApi.cancelOrder(orderId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.setQueryData(['orders', data.id], data);
        }
    });
}

// Demander un remboursement
export const useRequestRefund = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ orderId, refundData }: { orderId: number; refundData: CreateRefundRequest }) => 
            ordersApi.requestRefund(orderId, refundData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.setQueryData(['orders', data.id], data);
        }
    });
}