import { ProductCard } from './ProductCard';
import type { Product } from '../../types/product';

interface ProductListProps {
  products: Product[];
  totalItems?: number;
}

export const ProductList = ({ products, totalItems }: ProductListProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Produits</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalItems && (
        <p className="text-center mt-8 text-gray-600">
          Total de produits : {totalItems}
        </p>
      )}
    </div>
  );
};