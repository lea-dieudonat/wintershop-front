import { formatPrice } from "@/utils/formatters";
import { getProductTranslation } from "@/utils/translationHelper";
import type { Product } from "@/types/productTypes";
import { useTranslate, useTolgee } from "@tolgee/react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Zap } from "lucide-react";
import { useState } from "react";
import snowboardImage from "@/assets/snowboard.avif";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslate();
  const tolgee = useTolgee(["language"]);
  const currentLanguage = tolgee.getLanguage();
  const { name, description } = getProductTranslation(product, currentLanguage);
  const [isLiked, setIsLiked] = useState(false);

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group relative bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-primary-500 transition-all duration-300 transform hover:-translate-y-1">
      {/* Badge stock faible */}
      {isLowStock && (
        <div className="absolute top-4 left-4 bg-accent-500 text-neutral-900 px-3 py-1 rounded text-xs font-bold uppercase z-10">
          {t("product.lowStock", "Stocks limités")}
        </div>
      )}

      {/* Badge rupture de stock */}
      {isOutOfStock && (
        <div className="absolute top-4 left-4 bg-neutral-800 text-neutral-400 px-3 py-1 rounded text-xs font-bold uppercase z-10">
          {t("product.outOfStock", "Rupture")}
        </div>
      )}

      {/* Image */}
      <Link
        to={`/products/${product.id}`}
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
            onClick={(e) => {
              e.preventDefault();
              // TODO: Ajouter logique du panier
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            {t("product.addToCart", "Ajouter")}
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
            <Link to={`/products/${product.id}`}>
              <h3 className="text-white font-bold text-lg hover:text-primary-400 transition-colors line-clamp-2">
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

        {/* Description */}
        <p className="text-neutral-400 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        {/* Prix */}
        <div className="flex items-baseline gap-2 mb-3">
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
              {t("product.onlyXLeft", "Only {count} left in stock", {
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
};
