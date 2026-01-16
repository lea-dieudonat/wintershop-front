import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/services/api/ordersApi';
import type { Order, CreateRefundRequest } from '@/types/orderTypes';
import { toast } from 'sonner';
import { useTranslate } from '@tolgee/react';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/apiTypes';
import { handleApiError } from '@/utils/errorHandler';

const ORDERS_QUERY_KEY = ['orders'];
const ORDER_QUERY_KEY = (id: number) => ['order', id];

// Liste des commandes
export const useOrders = () => {
    return useQuery({ 
        queryKey: ORDERS_QUERY_KEY, 
        queryFn: ordersApi.getOrders 
    });
};

// Détails d'une commande
export const useOrder = (id: number) => {
    return useQuery<Order>({ 
        queryKey: ORDER_QUERY_KEY(id), 
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
            queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
            queryClient.setQueryData(ORDER_QUERY_KEY(orderId), data);
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
            queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY(orderId) });
            toast.success(t("orders.refund.success", "Refund requested successfully."));
        },
        onError: (error: AxiosError<ApiErrorResponse>) => 
            handleApiError(error, t, "orders.refund.error")
    });
}