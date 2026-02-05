import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Zap } from "lucide-react";
import { useState } from "react";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import type { Product } from "@/types/productTypes";
import { formatPrice } from "@/utils/formatters";
import { useTranslate, useTolgee } from "@tolgee/react";
import { getProductTranslation } from "@/utils/translationHelper";
import snowboardImage from "@/assets/snowboard.avif";
import { ROUTES } from "@/router/routes";
import { useAddToCart } from "@/hooks/useCarts";

function ProductCard({ product }: { product: Product }) {
  const [isLiked, setIsLiked] = useState(false);
  const { t } = useTranslate();
  const tolgee = useTolgee(["language"]);
  const currentLanguage = tolgee.getLanguage();
  const { name } = getProductTranslation(product, currentLanguage);
  const addToCart = useAddToCart();

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart.mutate({
      productId: product.id,
      quantity: 1,
    });
  };

  return (
    <div className="group relative bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-primary-500 transition-all duration-300 transform hover:-translate-y-1">
      {/* Badge stock faible */}
      {isLowStock && (
        <div className="absolute top-4 left-4 bg-accent-500 text-neutral-900 px-3 py-1 rounded text-xs font-bold uppercase z-10">
          {t("product.hot")}
        </div>
      )}

      {/* Badge rupture */}
      {isOutOfStock && (
        <div className="absolute top-4 left-4 bg-neutral-800 text-neutral-400 px-3 py-1 rounded text-xs font-bold uppercase z-10">
          {t("product.outOfStock", "Rupture")}
        </div>
      )}

      {/* Image */}
      <Link
        to={ROUTES.PRODUCT_DETAILS(product.id)}
        className="block relative h-64 bg-neutral-800 overflow-hidden"
      >
        <img
          src={product.imageUrl || snowboardImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay au hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Bouton Quick Add au hover */}
        {!isOutOfStock && (
          <button
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            onClick={handleAddToCart}
            disabled={addToCart.isPending}
          >
            <ShoppingCart className="w-4 h-4" />
            {addToCart.isPending
              ? t("common.loading", "Loading...")
              : t("product.addToCart", "Ajouter")}
          </button>
        )}
      </Link>

      {/* Contenu */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-primary-400 text-xs font-semibold uppercase tracking-wider mb-1">
              {product.category.name}
            </p>
            <Link to={ROUTES.PRODUCT_DETAILS(product.id)}>
              <h3 className="text-white font-bold text-lg hover:text-primary-400 transition-colors">
                {name}
              </h3>
            </Link>
          </div>

          {/* Bouton favoris */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full transition-colors ${
              isLiked
                ? "text-secondary-500"
                : "text-neutral-500 hover:text-secondary-400"
            }`}
            aria-label={t("product.addToFavorites", "Ajouter aux favoris")}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Prix */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-white text-2xl font-bold">
            {formatPrice(product.price, currentLanguage)}
          </span>
        </div>

        {/* Stock */}
        <div className="mt-3">
          {isOutOfStock ? (
            <span className="text-neutral-500 text-xs font-medium">
              {t("product.outOfStock", "Rupture de stock")}
            </span>
          ) : isLowStock ? (
            <span className="text-accent-400 text-xs font-medium flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {t("product.onlyXLeft", "Plus que {count} en stock", {
                count: product.stock,
              })}
            </span>
          ) : (
            <span className="text-primary-400 text-xs font-medium flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {t("product.inStock", "En stock - Livraison rapide")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const { t } = useTranslate();
  const { data: products, isLoading, isError } = useFeaturedProducts();

  if (isLoading) {
    return (
      <section className="py-16 bg-neutral-800">
        <div className="container mx-auto px-4">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (isError || !products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-neutral-800">
      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">
            {t("home.featuredProducts.title", "Sélection du moment")}
          </h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            {t(
              "home.featuredProducts.subtitle",
              "Notre équipe de riders a sélectionné pour toi le meilleur matos du marché",
            )}
          </p>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to={ROUTES.PRODUCTS}
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-neutral-900 font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            {t("home.featuredProducts.viewAll", "Voir tous les produits")}
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
