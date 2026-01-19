import { useState } from "react";
import { useTranslate } from "@tolgee/react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import type { ProductDetail as ProductDetailType } from "@/types/productTypes";
import { useAddToCart } from "@/hooks/useCarts";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatters";
import { Card } from "@/components/ui/Card";

interface ProductDetailProps {
  product: ProductDetailType;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const { t } = useTranslate();
  const addToCart = useAddToCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      await addToCart.mutateAsync({
        productId: product.id,
        quantity,
      });

      toast.success(t("cart.addedToCart", "Product added to cart!"), {
        description: t("cart.productAddedDesc", {
          defaultValue: "{quantity} x {name}",
          quantity,
          name: product.name,
        }),
      });
    } catch {
      toast.error(t("cart.addError", "Failed to add product to cart."));
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const isOutOfStock = product.stock === 0;
  const isQuantityMaxed = quantity >= product.stock;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            {t("product.noImage", "No image available")}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col">
        <div className="mb-2">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category.name}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <div className="text-3xl font-bold text-blue-600 mb-6">
          {formatPrice(Number(product.price), "en")}
        </div>

        <Card className="mb-6">
          <p className="text-gray-700 whitespace-pre-line">
            {product.description}
          </p>
        </Card>

        {/* Stock info */}
        <div className="mb-6">
          {isOutOfStock ? (
            <span className="text-red-600 font-semibold">
              {t("product.outOfStock", "Out of Stock")}
            </span>
          ) : product.stock <= 5 ? (
            <span className="text-orange-600 font-semibold">
              {t("product.lowStock", {
                defaultValue: "Only {{stock}} left in stock!",
                stock: product.stock,
              })}
            </span>
          ) : (
            <span className="text-green-600 font-semibold">
              {t("product.inStock", "In Stock")}
            </span>
          )}
        </div>

        {/* Quantity Selector */}
        {!isOutOfStock && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("product.quantity", "Quantity")}
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t(
                    "product.decreaseQuantity",
                    "Decrease quantity"
                  )}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-semibold">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  disabled={isQuantityMaxed}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t(
                    "product.increaseQuantity",
                    "Increase quantity"
                  )}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {isQuantityMaxed && (
                <span className="text-sm text-gray-500">
                  {t("product.maxQuantity", "Maximum quantity reached")}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock || addToCart.isPending}
          isLoading={addToCart.isPending}
          className="w-full md:w-auto"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {t("product.addToCart", "Add to Cart")}
        </Button>
      </div>
    </div>
  );
};
