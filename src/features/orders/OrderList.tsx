import { OrderCard } from "./OrderCard";
import type { OrderListItem } from "../../types/orderTypes";

interface OrderListProps {
  orders: OrderListItem[];
}

export const OrderList = ({ orders }: OrderListProps) => {
  // Si pas de commandes
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Orders Found
        </h3>
        <p className="text-gray-500">
          You have not placed any orders yet. Start shopping to see your orders
          here.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
