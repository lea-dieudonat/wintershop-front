import { useProducts } from '../hooks/useProducts';

export const ProductsPage = () => {
    const { data, isLoading, isError, error } = useProducts();
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl">Loading products...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-red-600">
                    Error loading products: {(error as Error).message}
                </p>
            </div>
        )
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.member.map((product) => (
                    <div 
                        key={product.id} 
                        className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-blue-600">
                                {new Intl.NumberFormat('fr-FR', {
                                    style: 'currency',
                                    currency: 'EUR'
                                }).format(Number(product.price))}
                            </span>
                            <span className="text-sm text-gray-500">
                                Stock: {product.stock}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                        Catégorie: {product.category.name}
                        </p>
                    </div>
                ))}
            </div>

            <p className='text-center mt-8 text-gray-600'>
                Total products: {data?.totalItems}
            </p>
        </div>
    );
};