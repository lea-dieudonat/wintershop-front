import { useParams, Link } from "react-router-dom";
import { useOrder } from "../hooks/useOrders";
import { ROUTES } from "../router/routes";
import { useTranslate, useTolgee } from "@tolgee/react";
import { formatPrice, formatDate } from "../utils/formatters";
import { OrderStatusBadge } from "../components/ui/OrderStatusBadge";

export const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrder(Number(id!));
  const { t } = useTranslate();
  const tolgee = useTolgee(["language"]);
  const currentLanguage = tolgee.getLanguage();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">{t("common.loading", "Loading...")}</div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">
          {t("common.error", "An error occurred")}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          to={ROUTES.ORDERS}
        >
          {t("common.back")}
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {t("orders.reference", { number: order.reference })}
            </h1>
            <p className="text-gray-600">
              {t("common.createdAt", {
                date: formatDate(order.createdAt, currentLanguage),
              })}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {t("orders.details.title")}
        </h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b pb-4 last:border-b-0"
            >
              <img
                src={item.product?.imageUrl || "/placeholder.jpg"}
                alt={item.product?.name || "Product"}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.product?.name}</h3>
                <p className="text-gray-600">
                  {t("orders.details.quantity")}: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {formatPrice(
                    Number(item.unitPrice) * item.quantity,
                    currentLanguage
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  {formatPrice(Number(item.unitPrice), currentLanguage)} x{" "}
                  {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>{t("orders.total")}</span>
            <span>{formatPrice(order.totalAmount, currentLanguage)}</span>
          </div>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Billing Address */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t("orders.details.billingAddress")}
          </h2>
          <div className="text-gray-700">
            <p>{order.billingAddress.street}</p>
            <p>
              {order.billingAddress.postalCode} {order.billingAddress.city}
            </p>
            <p>{order.billingAddress.country}</p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t("orders.details.shippingAddress")}
          </h2>
          <div className="text-gray-700">
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.postalCode} {order.shippingAddress.city}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t("orders.details.actions")}
        </h2>
        <div className="flex gap-4">
          {order.status === "pending" && (
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              {t("orders.details.cancelOrder")}
            </button>
          )}
          {order.status === "delivered" && !order.refundRequest && (
            <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
              {t("orders.details.requestRefund")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
