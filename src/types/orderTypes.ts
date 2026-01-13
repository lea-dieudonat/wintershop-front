// Types pour les statuts (au lieu d'enums)
export type OrderStatus = 
  | 'pending'
  | 'paid'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refund_requested'
  | 'refunded';

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
    imageUrl: string;
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
  shippingAddress: Address;
  billingAddress: Address;
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

// Demande de remboursement
export interface CreateRefundRequest {
  reason: string;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}