import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@tolgee/react";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCarts";

export const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: cart } = useCart();
  const totalItemsInCart =
    cart?.items.reduce((sum: number, item) => sum + item.quantity, 0) || 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to={ROUTES.HOME} className="text-xl font-bold">
            WinterShop ⛷️
          </Link>

          {/* Menu Section */}
          <div className="flex items-center space-x-6">
            <Link
              to={ROUTES.PRODUCTS}
              className="hover:text-blue-400 transition-colors"
            >
              {t("nav.products")}
            </Link>

            {/* Liens utilisateur */}
            {isAuthenticated ? (
              <>
                <Link to={ROUTES.CART} className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {totalItemsInCart > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItemsInCart > 99 ? "99+" : totalItemsInCart}
                    </span>
                  )}
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="hover:text-blue-400 transition-colors flex items-center whitespace-nowrap"
                  >
                    {user?.firstName} {user?.lastName} ▼
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <div>
                        <Link
                          to={ROUTES.PROFILE}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          👤 {t("nav.profile")}
                        </Link>
                        <Link
                          to={ROUTES.CART}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          🛒 {t("nav.cart")}
                        </Link>
                        <Link
                          to={ROUTES.ORDERS}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {t("nav.orders")}
                        </Link>
                      </div>
                      <hr className="my-1 border-gray-300" />
                      <div>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          {t("nav.logout")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
              >
                {t("nav.login")}
              </Link>
            )}

            <div className="flex items-center space-x-4">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
