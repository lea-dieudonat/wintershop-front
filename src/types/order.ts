// Types pour les statuts (au lieu d'enums)
export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type RefundStatus = 
  | 'requested'
  | 'approved'
  | 'rejected'
  | 'refunded';

// Interfaces
export interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
  };
  quantity: number;
  unitPrice: string;
  totalPrice: string;
}

export interface RefundRequest {
  id: number;
  reason: string;
  status: RefundStatus;
  requestedAt: string;
  processedAt: string | null;
  adminComment: string | null;
}

export interface Order {
  id: number;
  reference: string;
  status: OrderStatus;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shippingAddress: {
    id: number;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  billingAddress: {
    id: number;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  refundRequest: RefundRequest | null;
}

// Pour la liste (version allégée)
export interface OrderListItem {
  id: number;
  reference: string;
  status: OrderStatus;
  totalAmount: string;
  createdAt: string;
  itemCount: number;
}

// Réponse API pour la liste
export interface OrdersListResponse {
  'hydra:member': OrderListItem[];
  'hydra:totalItems': number;
}

// Demande de remboursement
export interface CreateRefundRequest {
  reason: string;
}