import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useTranslate } from "@tolgee/react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/router/routes";
import { useQueryClient } from "@tanstack/react-query";

export const CheckoutSuccessPage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Invalider le cache du panier (il devrait être vide maintenant)
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  }, [queryClient]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          {t("checkout.success.title", "Payment Successful!")}
        </h1>

        <p className="text-gray-600 mb-6">
          {t(
            "checkout.success.message",
            "Thank you for your order. You will receive a confirmation email shortly.",
          )}
        </p>

        {sessionId && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">
              {t("checkout.success.sessionId", "Session ID")}
            </p>
            <p className="text-xs text-gray-400 font-mono break-all mt-1">
              {sessionId}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate(ROUTES.ORDERS)}>
            {t("checkout.success.viewOrders", "View My Orders")}
          </Button>
          <Button variant="outline" onClick={() => navigate(ROUTES.PRODUCTS)}>
            {t("checkout.success.continueShopping", "Continue Shopping")}
          </Button>
        </div>
      </div>
    </div>
  );
};
