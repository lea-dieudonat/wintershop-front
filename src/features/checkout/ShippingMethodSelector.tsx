import { useTranslate } from "@tolgee/react";
import { Truck, Zap, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/utils/formatters";
import {
  ShippingMethod,
  SHIPPING_METHODS,
  type ShippingMethodOption,
} from "@/types/checkoutTypes";

interface ShippingMethodSelectorProps {
  selectedMethod: ShippingMethod | null;
  onSelectMethod: (method: ShippingMethod) => void;
  currentLanguage: string;
}

const getMethodIcon = (method: ShippingMethod) => {
  switch (method) {
    case ShippingMethod.STANDARD:
      return Truck;
    case ShippingMethod.EXPRESS:
      return Zap;
    case ShippingMethod.RELAY_POINT:
      return MapPin;
    default:
      return Truck;
  }
};

export const ShippingMethodSelector = ({
  selectedMethod,
  onSelectMethod,
  currentLanguage,
}: ShippingMethodSelectorProps) => {
  const { t } = useTranslate();

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold text-gray-900">
        {t("checkout.selectShippingMethod", "Select Shipping Method")}
      </label>

      <div className="space-y-3">
        {SHIPPING_METHODS.map((method: ShippingMethodOption) => {
          const Icon = getMethodIcon(method.value);
          const isSelected = selectedMethod === method.value;
          const isFree = Number(method.cost) === 0;

          return (
            <label
              key={method.value}
              className={`block cursor-pointer transition-all ${
                isSelected
                  ? "ring-2 ring-blue-500"
                  : "hover:ring-2 hover:ring-gray-300"
              }`}
            >
              <Card
                className={`flex items-center p-4 ${
                  isSelected ? "bg-blue-50" : "bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={method.value}
                    checked={isSelected}
                    onChange={() => onSelectMethod(method.value)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <Icon className="w-6 h-6 text-gray-700 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        {t(
                          `checkout.shippingMethod.${method.value}`,
                          method.label,
                        )}
                      </span>
                      <span className="font-bold text-gray-900">
                        {isFree ? (
                          <span className="text-green-600">
                            {t("checkout.free", "Free")}
                          </span>
                        ) : (
                          formatPrice(Number(method.cost), currentLanguage)
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t(
                        `checkout.deliveryTime.${method.value}`,
                        method.deliveryTime,
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </label>
          );
        })}
      </div>
    </div>
  );
};
