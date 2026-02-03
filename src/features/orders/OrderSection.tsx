import { useOrders } from "@/hooks/useOrders";
import { OrderList } from "./OrderList";
import { useTranslate } from "@tolgee/react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const OrderSection = () => {
  const { t } = useTranslate();
  const { data, isLoading, isError } = useOrders();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">{t("orders.title")}</h2>
        <div className="text-center py-8 text-red-600">
          {t("orders.error.loading")}
        </div>
      </div>
    );
  }

  const orders = data?.items || [];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">{t("orders.title")}</h2>
      <OrderList orders={orders} />
    </div>
  );
};
