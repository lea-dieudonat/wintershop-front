import { formatPrice } from "@/utils/formatters";
import { getProductTranslation } from "@/utils/translationHelper";
import type { Product } from "@/types/productTypes";
import { useTranslate, useTolgee } from "@tolgee/react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslate();
  const tolgee = useTolgee(["language"]);
  const currentLanguage = tolgee.getLanguage();
  const { name, description } = getProductTranslation(product, currentLanguage);

  return (
    <Link
      to={`/products/${product.id}`}
      className="block hover:shadow-lg transition-shadow"
    >
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-700 mb-4">{description}</p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(product.price, currentLanguage)}
          </span>
          <span className="text-sm text-gray-500">
            {t("common.stock")}: {product.stock}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {t("common.category")}: {product.category.name}
        </p>
      </div>
    </Link>
  );
};
