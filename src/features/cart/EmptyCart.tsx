import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { useTranslate } from "@tolgee/react";

export const EmptyCart = () => {
  const { t } = useTranslate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        {t("cart.empty.title", "Your cart is empty")}
      </h2>
      <p className="text-gray-500 mb-6">
        {t(
          "cart.empty.description",
          "Browse our products and add items to your cart."
        )}
      </p>
      <Link
        to={ROUTES.PRODUCTS}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
      >
        {t("cart.empty.shopNow", "Shop Now")}
      </Link>
    </div>
  );
};
