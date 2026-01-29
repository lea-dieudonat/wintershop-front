import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { OrderDetailPage } from "@/pages/OrderDetailPage";
import { CartPage } from "@/pages/CartPage";
import { ROUTES } from "@/router/routes";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { CheckoutPage } from "../pages/CheckoutPage";

// TODO: Créer ces pages plus tard
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
      <Route
        path={ROUTES.ORDER_DETAILS(":id")}
        element={
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.CART}
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PRODUCT_DETAILS(":id")}
        element={<ProductDetailPage />}
      />
      <Route
        path={ROUTES.CHECKOUT}
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      {/* Routes à implémenter plus tard */}

      {/* 
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};
