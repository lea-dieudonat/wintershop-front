import { useNavigate } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";
import { useTranslate } from "@tolgee/react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/router/routes";

export const CheckoutCancelPage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <XCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />

        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          {t("checkout.cancel.title", "Payment Cancelled")}
        </h1>

        <p className="text-gray-600 mb-6">
          {t(
            "checkout.cancel.message",
            "Your payment was cancelled. Your cart items are still saved.",
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate(ROUTES.CART)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("checkout.cancel.backToCart", "Back to Cart")}
          </Button>
          <Button variant="outline" onClick={() => navigate(ROUTES.PRODUCTS)}>
            {t("checkout.cancel.continueShopping", "Continue Shopping")}
          </Button>
        </div>
      </div>
    </div>
  );
};
