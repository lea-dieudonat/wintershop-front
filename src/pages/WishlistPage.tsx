import { useTranslate } from "@tolgee/react";
import { useWishlist } from "@/hooks/useWishlist";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ProductCard } from "@/features/products/ProductCard";
import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { Heart } from "lucide-react";

export const WishlistPage = () => {
  const { t } = useTranslate();
  const { data: wishlist, isLoading, isError } = useWishlist();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          {t("wishlist.error", "Impossible de charger la wishlist")}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-800">
      {/* Header section */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-10 h-10 text-secondary-500 fill-current" />
            <h1 className="text-4xl md:text-5xl font-black text-white">
              {t("wishlist.title", "Ma liste de souhaits")}
            </h1>
          </div>
          <p className="text-neutral-400 text-lg">
            {wishlist && wishlist.length > 0
              ? t(
                  "wishlist.count",
                  `${wishlist.length} produit(s) dans votre liste`,
                  { count: wishlist.length },
                )
              : t(
                  "wishlist.empty.subtitle",
                  "Ajoutez vos produits préférés pour les retrouver facilement",
                )}
          </p>
        </div>
      </div>

      {/* Products grid */}
      <div className="container mx-auto px-4 py-8">
        {wishlist && wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-16">
            <div className="mb-8">
              <Heart className="w-24 h-24 text-neutral-700 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {t("wishlist.empty.title", "Votre liste est vide")}
            </h2>
            <p className="text-neutral-400 mb-8">
              {t(
                "wishlist.empty.description",
                "Parcourez notre catalogue et ajoutez vos produits favoris !",
              )}
            </p>
            <Link
              to={ROUTES.PRODUCTS}
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-neutral-900 font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
            >
              {t("wishlist.empty.cta", "Découvrir nos produits")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
