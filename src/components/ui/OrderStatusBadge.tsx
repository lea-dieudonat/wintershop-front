import type { OrderStatus } from "@/types/orderTypes";
import { useTranslate } from "@tolgee/react";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const getStatusStyles = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "paid":
      return "bg-emerald-100 text-emerald-800";
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
    case "refund_requested":
      return "bg-orange-100 text-orange-800";
    case "refunded":
      return "bg-teal-100 text-teal-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const { t } = useTranslate();
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
        status
      )}`}
    >
      {t(`orders.status.${status}`)}
    </span>
  );
};
