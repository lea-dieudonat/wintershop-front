import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Zap } from "lucide-react";
import { useState } from "react";
import snowboardImage from "@/assets/snowboard.avif";

//TODO Type pour un produit (à adapter selon API)
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: "new" | "sale" | "hot";
  inStock: boolean;
}

//TODO Données de démo - à remplacer par un appel API
const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Burton Custom X",
    price: 599,
    originalPrice: 799,
    image: snowboardImage,
    category: "Snowboard",
    badge: "sale",
    inStock: true,
  },
  {
    id: "2",
    name: "Faction Prodigy 2.0",
    price: 549,
    image: snowboardImage,
    category: "Ski",
    badge: "new",
    inStock: true,
  },
  {
    id: "3",
    name: "ThirtyTwo TM-2",
    price: 299,
    originalPrice: 399,
    image: snowboardImage,
    category: "Boots",
    badge: "hot",
    inStock: true,
  },
  {
    id: "4",
    name: "Anon M4 Toric",
    price: 179,
    image: snowboardImage,
    category: "Masques",
    badge: "new",
    inStock: true,
  },
];

function ProductCard({ product }: { product: Product }) {
  const [isLiked, setIsLiked] = useState(false);

  const getBadgeStyles = () => {
    switch (product.badge) {
      case "sale":
        return "bg-accent-500 text-neutral-900";
      case "new":
        return "bg-primary-500 text-white";
      case "hot":
        return "bg-secondary-500 text-white";
      default:
        return "";
    }
  };

  const getBadgeText = () => {
    switch (product.badge) {
      case "sale":
        return "PROMO";
      case "new":
        return "NEW";
      case "hot":
        return "TOP";
      default:
        return "";
    }
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="group relative bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-primary-500 transition-all duration-300 transform hover:-translate-y-1">
      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute top-4 left-4 ${getBadgeStyles()} px-3 py-1 rounded text-xs font-bold uppercase z-10`}
        >
          {getBadgeText()}
        </div>
      )}

      {/* Badge réduction */}
      {discount > 0 && (
        <div className="absolute top-4 right-4 bg-neutral-900/90 backdrop-blur-sm text-accent-400 px-3 py-1 rounded text-sm font-bold z-10">
          -{discount}%
        </div>
      )}

      {/* Image */}
      <Link
        to={`/products/${product.id}`}
        className="block relative h-64 bg-neutral-800 overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay au hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Bouton Quick Add au hover */}
        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <ShoppingCart className="w-4 h-4" />
          Ajouter
        </button>
      </Link>

      {/* Contenu */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-primary-400 text-xs font-semibold uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <Link to={`/products/${product.id}`}>
              <h3 className="text-white font-bold text-lg hover:text-primary-400 transition-colors">
                {product.name}
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
            aria-label="Ajouter aux favoris"
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Prix */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-white text-2xl font-bold">
            {product.price}€
          </span>
          {product.originalPrice && (
            <span className="text-neutral-500 text-sm line-through">
              {product.originalPrice}€
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="mt-3">
          {product.inStock ? (
            <span className="text-primary-400 text-xs font-medium flex items-center gap-1">
              <Zap className="w-3 h-3" />
              En stock - Livraison rapide
            </span>
          ) : (
            <span className="text-neutral-500 text-xs">Rupture de stock</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-neutral-800">
      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">
            Sélection du moment
          </h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Notre équipe de riders a sélectionné pour toi le meilleur matos du
            marché
          </p>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-neutral-900 font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            Voir tous les produits
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
