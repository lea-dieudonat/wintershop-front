import { Link } from "react-router-dom";
import { OrderStatusBadge } from "../../components/ui/OrderStatusBadge";
import { formatPrice, formatDate } from "../../utils/formatters";
import { ROUTES } from "../../router/routes";
import type { OrderListItem } from "../../types/order";

interface OrderCardProps {
  order: OrderListItem;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Link
      to={`${ROUTES.ORDERS}/${order.id}`}
      className="block border rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-200 bg-white"
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Order #{order.reference}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Informations principales */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Articles:</span>
          <span className="font-medium">{order.itemCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Total:</span>
          <span className="text-xl font-bold text-blue-600">
            {formatPrice(order.totalAmount)}
          </span>
        </div>
      </div>
      {/* Indicateur visuel de lien */}
      <div className="mt-4 pt-4 border-t flex items-center text-blue-600 text-sm">
        <span>Voir les détails</span>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
};
