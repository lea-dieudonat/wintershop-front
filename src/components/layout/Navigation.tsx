import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@tolgee/react";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Heart,
  User,
  Package,
  LogOut,
  Settings,
} from "lucide-react";
import { useCart } from "@/hooks/useCarts";
import logo from "@/assets/logo.png";

export const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: cart } = useCart();
  const totalItemsInCart =
    cart?.items?.reduce((sum: number, item) => sum + item.quantity, 0) || 0;

  // Fermeture du dropdown au clic extérieur
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
    <nav className="bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800 shadow-lg sticky top-0 z-50 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="WinterShop Logo"
              className="h-10 w-10 group-hover:scale-110 transition-transform"
            />
            <span className="text-xl font-black bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">
              WinterShop
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to={ROUTES.HOME}
              className="text-neutral-300 hover:text-primary-400 transition-colors font-medium"
            >
              {t("nav.home", "Accueil")}
            </Link>

            <Link
              to={ROUTES.PRODUCTS}
              className="text-neutral-300 hover:text-primary-400 transition-colors font-medium"
            >
              {t("nav.products", "Boutique")}
            </Link>

            {/* Future: Catégories en dropdown */}
            {/* <div className="relative group">
              <button className="text-neutral-300 hover:text-primary-400 transition-colors font-medium">
                Catégories ▾
              </button>
              <div className="absolute hidden group-hover:block...">
                Snowboards, Skis, etc.
              </div>
            </div> */}

            {/* Future: Promos, Nouveautés, etc. */}
            <Link
              to="/new"
              className="text-accent-400 hover:text-accent-300 transition-colors font-bold"
            >
              {t("nav.new", "Nouveautés")}
            </Link>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector />

            {isAuthenticated ? (
              <>
                {/* Wishlist (future) */}
                <button
                  className="relative p-2 text-neutral-300 hover:text-secondary-400 transition-colors"
                  title={t("nav.wishlist", "Liste de souhaits")}
                >
                  <Heart className="w-6 h-6" />
                  {/* Badge pour le nombre d'items dans la wishlist */}
                  {/* <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span> */}
                </button>

                {/* Cart */}
                <Link
                  to={ROUTES.CART}
                  className="relative p-2 text-neutral-300 hover:text-primary-400 transition-colors"
                  title={t("nav.cart", "Panier")}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {totalItemsInCart > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent-500 text-neutral-900 text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                      {totalItemsInCart > 99 ? "99+" : totalItemsInCart}
                    </span>
                  )}
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 p-2 text-neutral-300 hover:text-primary-400 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl py-2 overflow-hidden">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-neutral-800">
                        <p className="text-white font-semibold">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-neutral-400 text-sm truncate">
                          {user?.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          to={ROUTES.PROFILE}
                          className="flex items-center gap-3 px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-primary-400 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>{t("nav.profile", "Mon profil")}</span>
                        </Link>

                        <Link
                          to={ROUTES.ORDERS}
                          className="flex items-center gap-3 px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-primary-400 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Package className="w-4 h-4" />
                          <span>{t("nav.orders", "Mes commandes")}</span>
                        </Link>

                        {/* Future: Settings */}
                        <button
                          className="w-full flex items-center gap-3 px-4 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-primary-400 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>{t("nav.settings", "Paramètres")}</span>
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-neutral-800 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-neutral-800 hover:text-red-300 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t("nav.logout", "Déconnexion")}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Non-authenticated users */
              <Link
                to={ROUTES.LOGIN}
                className="bg-accent-500 hover:bg-accent-400 text-neutral-900 font-bold px-6 py-2 rounded-lg transition-all transform hover:scale-105"
              >
                {t("nav.login", "Connexion")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
