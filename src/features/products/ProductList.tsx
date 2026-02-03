import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/productTypes";
import { useTranslate } from "@tolgee/react";

interface ProductListProps {
  products: Product[];
  totalItems?: number;
}

export const ProductList = ({ products, totalItems }: ProductListProps) => {
  const { t } = useTranslate();

  return (
    <div className="min-h-screen bg-neutral-800">
      {/* Header section */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent mb-4">
            {t("products.title", "Tous les produits")}
          </h1>
          {totalItems && (
            <p className="text-neutral-400 text-lg">
              {t("products.total", "{count} produits disponibles", {
                count: totalItems,
              })}
            </p>
          )}
        </div>
      </div>

      {/* Products grid */}
      <div className="container mx-auto px-4 py-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏂</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {t("products.noProducts", "Aucun produit disponible")}
            </h2>
            <p className="text-neutral-400">
              {t(
                "products.noProductsDesc",
                "Reviens bientôt pour découvrir nos nouveautés !",
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
