import { useTranslate } from "@tolgee/react";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ProductList } from "@/features/products/ProductList";
import { useProducts } from "@/hooks/useProducts";
import { useSearchParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { ROUTES } from "@/router/routes";

export const ProductsPage = () => {
  const { t } = useTranslate();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category") || undefined;
  const { data, isLoading, isError, error } = useProducts(category);

  const handleRemoveFilter = () => {
    navigate(ROUTES.PRODUCTS);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message={
          error?.message ||
          ` ${t("errors.loadProducts")}: ${(error as Error).message}`
        }
      />
    );
  }

  if (!data?.member) {
    return <ErrorMessage message={t("products.noProducts")} />;
  }

  return (
    <div>
      {category && (
        <div className="bg-neutral-900 border-b border-neutral-800 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 text-sm">
                {t("products.filterBy", "Filter by")}:
              </span>
              <button
                onClick={handleRemoveFilter}
                className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-500/30 transition-colors"
              >
                {category}
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      <ProductList products={data.member} totalItems={data.totalItems} />
    </div>
  );
};
