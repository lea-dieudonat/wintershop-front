import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

export const Navigation = () => {
    return (
        <nav className="bg-gray-800 text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <Link to={ROUTES.HOME} className="text-xl font-bold">
                        WinterShop ⛷️
                    </Link>

                    {/* Menu Section */}
                    <div className="flex space-x-6">
                        <Link 
                            to={ROUTES.PRODUCTS} 
                            className="hover:text-blue-400 transition-colors">
                            Products
                        </Link>
                        <Link
                            to={ROUTES.ORDERS} 
                            className="hover:text-blue-400 transition-colors">
                            Orders
                        </Link>
                        {/* Liens secondaires */}
                        <div className="flex space-x-4">
                            <Link 
                                to={ROUTES.CART} 
                                className="hover:text-blue-400 transition-colors">
                                🛒 Cart
                            </Link>
                            <Link 
                                to={ROUTES.PROFILE} 
                                className="hover:text-blue-400 transition-colors">
                                👤 Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};