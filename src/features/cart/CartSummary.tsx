import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useTranslate, useTolgee } from "@tolgee/react";
import { formatPrice } from "@/utils/formatters";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/router/routes";
import type { Cart } from "@/types/cartTypes";

interface CartSummaryProps {
  cart: Cart;
}

export const CartSummary = ({ cart }: CartSummaryProps) => {
  const { t } = useTranslate();
  const tolgee = useTolgee(["language"]);
  const currentLanguage = tolgee.getLanguage();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT);
  };

  return (
    <Card padding="lg" className="sticky top-4">
      <h2 className="text-lg font-semibold mb-4">
        {t("cart.summary.title", "Order Summary")}
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>{t("cart.summary.items", "Items")}</span>
          <span>{cart.totalItems}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>{t("cart.summary.subtotal", "Subtotal")}</span>
          <span>{formatPrice(Number(cart.subtotal), currentLanguage)}</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-semibold text-lg">
          <span>{t("cart.summary.total", "Total")}</span>
          <span>{formatPrice(Number(cart.subtotal), currentLanguage)}</span>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleCheckout}
        disabled={cart.totalItems === 0}
      >
        <ShoppingBag className="w-5 h-5 mr-2" />
        {t("cart.summary.checkout", "Proceed to Checkout")}
      </Button>
    </Card>
  );
};
