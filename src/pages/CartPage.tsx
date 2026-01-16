import { ShoppingCart } from "lucide-react";
import { useTranslate } from "@tolgee/react";
import { CartItemRow } from "@/features/cart/CartItemRow";
import { CartSummary } from "@/features/cart/CartSummary";
import { useCart } from "@/hooks/useCarts";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyCart } from "@/features/cart/EmptyCart";

export const CartPage = () => {
  const { t } = useTranslate();
  const { data: cart, isLoading, isError } = useCart();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">
          {t("common.error", "An error occurred")}
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-3">
        <ShoppingCart className="w-6 h-6" />
        {t("cart.title", "Shopping Cart")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {cart.items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        {/* Cart Summary */}
        <div>
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};
