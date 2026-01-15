import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '../services/api/ordersApi';
import type { Order, CreateRefundRequest } from '../types/orderTypes';
import { toast } from 'sonner';
import { useTranslate } from '@tolgee/react';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '../types/apiTypes';
import { handleApiError } from '../utils/errorHandler';

// Liste des commandes
export const useOrders = () => {
    return useQuery({ 
        queryKey: ['orders'], 
        queryFn: ordersApi.getOrders 
    });
};

// Détails d'une commande
export const useOrder = (id: number) => {
    return useQuery<Order>({ 
        queryKey: ['order', id], 
        queryFn: () => ordersApi.getOrderById(id),
        enabled: !!id
    });
}

// Annuler une commande
export const useCancelOrder = () => {
    const { t } = useTranslate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (orderId: number) => ordersApi.cancelOrder(orderId),
        onSuccess: (data, orderId) => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.setQueryData(['order', orderId], data);
            toast.success(t("orders.cancel.success", "Order cancelled successfully."));
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
            handleApiError(error, t, "orders.cancel.error");
        }
    });
}

// Demander un remboursement
export const useRequestRefund = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslate();
    
    return useMutation({
        mutationFn: ({ orderId, refundData }: { orderId: number; refundData: CreateRefundRequest }) => 
            ordersApi.requestRefund(orderId, refundData),
        onSuccess: (_data, {orderId}) => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['order', orderId] });
            toast.success(t("orders.refund.success", "Refund requested successfully."));
        },
        onError: (error: AxiosError<ApiErrorResponse>) => 
            handleApiError(error, t, "orders.refund.error")
    });
}