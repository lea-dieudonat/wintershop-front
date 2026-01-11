import type { OrderStatus } from "../../types/orderTypes";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const getStatusStyles = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "processing":
      return "bg-purple-100 text-purple-800";
    case "shipped":
      return "bg-indigo-100 text-indigo-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: OrderStatus): string => {
  const labels: Record<OrderStatus, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status];
};

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
        status
      )}`}
    >
      {getStatusLabel(status)}
    </span>
  );
};
