import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslate, useTolgee } from "@tolgee/react";
import { formatPrice } from "@/utils/formatters";
import { useUpdateCartItem, useRemoveCartItem } from "@/hooks/useCarts";
import type { CartItem } from "@/types/cartTypes";

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow = ({ item }: CartItemRowProps) => {
  const { t } = useTranslate();
  const tolgee = useTolgee(["language"]);
  const currentLanguage = tolgee.getLanguage();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateCartItem.mutate({
        itemId: item.id,
        productId: item.product.id,
        quantity: item.quantity - 1,
      });
    }
  };

  const handleIncreaseQuantity = () => {
    updateCartItem.mutate({
      itemId: item.id,
      productId: item.product.id,
      quantity: item.quantity + 1,
    });
  };

  const handleRemoveItem = () => {
    removeCartItem.mutate({ itemId: item.id, productId: item.product.id });
  };

  const isUpdating = updateCartItem.isPending;
  const isRemoving = removeCartItem.isPending;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        {item.product.image ? (
          <img
            src={item.product.image}
            alt={item.product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400 text-xs">
            {t("cart.item.noImage", "No Image")}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
        <p className="text-sm text-gray-600">
          {formatPrice(Number(item.unitPrice), currentLanguage)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDecreaseQuantity}
          disabled={isUpdating || item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="w-8 text-center font-medium">{item.quantity}</span>

        <Button
          variant="outline"
          size="sm"
          onClick={handleIncreaseQuantity}
          disabled={isUpdating || item.quantity >= item.product.stock}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Total Price Row */}
      <div className="w-24 text-right font-semibold">
        {formatPrice(Number(item.totalPrice), currentLanguage)}
      </div>

      {/* Remove Item Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemoveItem}
        disabled={isRemoving}
        isLoading={isRemoving}
        aria-label={t("cart.item.remove", "Remove item")}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );
};
