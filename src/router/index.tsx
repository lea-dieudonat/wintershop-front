import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { OrdersPage } from "../pages/OrdersPage";
import { ROUTES } from "./routes";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

// TODO: Créer ces pages plus tard
// import { ProductDetailPage } from '../pages/ProductDetailPage';
// import { OrderDetailPage } from '../pages/OrderDetailPage';
// import { CartPage } from '../pages/CartPage';
// import { CheckoutPage } from '../pages/CheckoutPage';
// import { ProfilePage } from '../pages/ProfilePage';
// import { RegisterPage } from '../pages/RegisterPage';
// import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
      {/* Protected Routes */}
      <Route
        path={ROUTES.ORDERS}
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      {/* Routes à implémenter plus tard */}

      {/* <Route path={ROUTES.PRODUCT_DETAILS(':id')} element={<ProductDetailPage />} />
            <Route path={ROUTES.ORDER_DETAILS(':id')} element={<OrderDetailPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};
