import { formatPrice } from "../../utils/formatters";
import type { Product } from "../../types/productTypes";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-blue-600">
          {formatPrice(product.price)}
        </span>
        <span className="text-sm text-gray-500">Stock: {product.stock}</span>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Catégorie: {product.category.name}
      </p>
    </div>
  );
};
