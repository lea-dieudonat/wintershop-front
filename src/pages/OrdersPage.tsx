import { useOrders } from "../hooks/useOrders";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { OrderList } from "../features/orders/OrderList";
import { useTranslate } from "@tolgee/react";

export const OrdersPage = () => {
  const { t } = useTranslate();
  const { data, isLoading, isError, error } = useOrders();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message={
          error instanceof Error ? error.message : t("errors.loadOrders")
        }
      />
    );
  }

  const orders = data?.items || [];

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">{t("orders.title")}</h1>
        <p className="text-gray-600 mt-2">{t("orders.description")}</p>
      </div>
      <OrderList orders={orders} />
    </div>
  );
};
