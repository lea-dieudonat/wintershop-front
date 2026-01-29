import { useTranslate } from "@tolgee/react";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/utils/formatters";
import type { Cart } from "@/types/cartTypes";
import type { ShippingMethod } from "@/types/checkoutTypes";
import { SHIPPING_METHODS } from "@/types/checkoutTypes";

interface CheckoutSummaryProps {
  cart: Cart;
  shippingMethod: ShippingMethod | null;
  currentLanguage: string;
}

export const CheckoutSummary = ({
  cart,
  shippingMethod,
  currentLanguage,
}: CheckoutSummaryProps) => {
  const { t } = useTranslate();

  const subtotal = Number(cart.subtotal);
  const shippingCost = shippingMethod
    ? Number(
        SHIPPING_METHODS.find((method) => method.value === shippingMethod)
          ?.cost || 0,
      )
    : 0;
  const total = subtotal + shippingCost;

  return (
    <Card className="p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-4">
        {t("checkout.orderSummary", "Order Summary")}
      </h2>
      {/* Cart Items */}
      <div className="space-y-3 mb-6">
        {cart.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.product.name}</p>
              <p className="text-sm text-gray-600">
                {t("checkout.quantity", "Quantity")}: {item.quantity}
              </p>
            </div>
            <p className="font-medium text-gray-900">
              {formatPrice(Number(item.totalPrice), currentLanguage)}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing Details */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            {t("checkout.subtotal", "Subtotal")}
          </span>
          <span className="font-medium text-gray-900">
            {formatPrice(subtotal, currentLanguage)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            {t("checkout.shipping", "Shipping")}
          </span>
          {shippingMethod ? (
            <span className="font-medium text-gray-900">
              {shippingCost === 0
                ? t("checkout.free", "Free")
                : formatPrice(shippingCost, currentLanguage)}
            </span>
          ) : (
            <span className="font-medium text-gray-900">
              {t("checkout.selectShipping", "Select shipping method")}
            </span>
          )}
        </div>

        <div className="flex justify-between text-lg font-bold pt-2 mt-2 border-t">
          <span>{t("checkout.total", "Total")}</span>
          <span>{formatPrice(total, currentLanguage)}</span>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          {t(
            "checkout.paymentInfo",
            "You will be redirected to a secure payment gateway to complete your purchase.",
          )}
        </p>
      </div>
    </Card>
  );
};
