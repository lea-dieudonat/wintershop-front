import { ShoppingCart, Trash2 } from "lucide-react";
import { useTranslate } from "@tolgee/react";
import { CartItemRow } from "@/features/cart/CartItemRow";
import { CartSummary } from "@/features/cart/CartSummary";
import { useCart, useClearCart } from "@/hooks/useCarts";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyCart } from "@/features/cart/EmptyCart";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export const CartPage = () => {
  const { t } = useTranslate();
  const { data: cart, isLoading, isError } = useCart();
  const clearCart = useClearCart();
  const [showClearModal, setShowClearModal] = useState(false);

  const handleClearCart = () => {
    clearCart.mutate(undefined, {
      onSuccess: () => {
        toast.success(t("cart.cartCleared", "Cart cleared."), {
          description: t(
            "cart.cartClearedDesc",
            "All items have been removed from your cart."
          ),
        });
        setShowClearModal(false);
      },
      onError: () => {
        toast.error(t("cart.clearError", "Failed to clear cart."));
      },
    });
  };

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
      {cart && cart.items.length > 0 && (
        <Button
          variant="outline"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => setShowClearModal(true)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {t("cart.clearCart", "Clear Cart")}
        </Button>
      )}
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

      {/* Clear Cart Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title={t("cart.clearCartConfirmTitle", "Clear Cart")}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {t(
              "cart.clearCartConfirmMessage",
              "Are you sure you want to clear your cart? This action cannot be undone."
            )}
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowClearModal(false)}>
              {t("common.cancel", "Cancel")}
            </Button>
            <Button
              variant="danger"
              onClick={handleClearCart}
              isLoading={clearCart.isPending}
            >
              {t("cart.clearCart", "Clear Cart")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
