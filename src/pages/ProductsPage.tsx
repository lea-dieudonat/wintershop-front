import { ErrorMessage } from '../components/ui/ErrorMessage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ProductList } from '../features/products/ProductList';
import { useProducts } from '../hooks/useProducts';

export const ProductsPage = () => {
    const { data, isLoading, isError, error } = useProducts();
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <ErrorMessage message={error?.message || `An error occurred while fetching products: ${(error as Error).message}`} />;
    }

    if (!data?.member) {
        return <ErrorMessage message="No products found." />;
    }
    
    return <ProductList products={data.member} totalItems={data.totalItems} />;
};