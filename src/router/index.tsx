import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { OrdersPage } from "../pages/OrdersPage";
import { ROUTES } from "./routes";

// TODO: Créer ces pages plus tard
// import { ProductDetailPage } from '../pages/ProductDetailPage';
// import { OrderDetailPage } from '../pages/OrderDetailPage';
// import { CartPage } from '../pages/CartPage';
// import { CheckoutPage } from '../pages/CheckoutPage';
// import { ProfilePage } from '../pages/ProfilePage';
// import { LoginPage } from '../pages/LoginPage';
// import { RegisterPage } from '../pages/RegisterPage';
// import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
      <Route path={ROUTES.ORDERS} element={<OrdersPage />} />
      {/* Routes à implémenter plus tard */}
      <Route path={ROUTES.HOME} element={<HomePage />} />
      {/* <Route path={ROUTES.PRODUCT_DETAILS(':id')} element={<ProductDetailPage />} />
            <Route path={ROUTES.ORDER_DETAILS(':id')} element={<OrderDetailPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};
