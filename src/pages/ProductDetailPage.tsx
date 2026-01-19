import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslate } from "@tolgee/react";
import { useProduct } from "@/hooks/useProducts";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ProductDetail } from "@/features/products/ProductDetail";
import { Button } from "@/components/ui/Button";

export const ProductDetailPage = () => {
  const { t } = useTranslate();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: productData, isLoading, error } = useProduct(id!);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={t("errors.loadProduct", "Failed to load product.")}
        />
        <Button onClick={() => navigate(-1)} variant="outline" className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back", "Back")}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => navigate(-1)} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("common.back", "Back")}
      </Button>
      <ProductDetail product={productData} />
    </div>
  );
};
