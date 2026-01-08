import { useOrders } from "../hooks/useOrders";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { OrderList } from "../features/orders/OrderList";

export const OrdersPage = () => {
  const { data, isLoading, isError, error } = useOrders();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message={
          error instanceof Error ? error.message : "An unknown error occurred"
        }
      />
    );
  }

  const orders = data?.["hydra:member"] || [];

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <p className="text-gray-600 mt-2">
          Review your past orders and their statuses.
        </p>
      </div>
      <OrderList orders={orders} />
    </div>
  );
};
