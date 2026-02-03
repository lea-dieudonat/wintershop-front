import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useTranslate } from "@tolgee/react";

export default function Footer() {
  const { t } = useTranslate();
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      {/* Section principale du footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Colonne 1 - À propos */}
          <div>
            <h3 className="text-primary-400 font-bold text-lg mb-4">
              WinterShop
            </h3>
            <p className="text-neutral-300 text-sm mb-4">
              {t(
                "footer.aboutDescription",
                "Your one-stop shop for all winter sports gear and apparel. Quality products for every adventure.",
              )}
            </p>
            {/* Réseaux sociaux */}
            <div className="flex gap-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-400 transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2 - Shop */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {t("footer.shop", "Shop")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t("footer.allProducts", "All Products")}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=snowboards"
                  className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t("footer.snowboards", "Snowboards")}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=skis"
                  className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t("footer.skis", "Skis")}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=boots"
                  className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t("footer.boots", "Boots")}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=accessories"
                  className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t("footer.accessories", "Accessories")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 - Informations */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {t("footer.information", "Information")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t("footer.about", "About")}
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t("footer.shippingReturns", "Shipping & Returns")}
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t("footer.faq", "FAQ")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t("footer.contact", "Contact")}
                </Link>
              </li>
              <li>
                <Link
                  to="/guide"
                  className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {t("footer.sizeGuide", "Size Guide")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 - Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {t("footer.newsletter", "Newsletter")}
            </h3>
            <p className="text-neutral-400 text-sm mb-4">
              {t(
                "footer.newsletterDescription",
                "Sign up to receive the latest deals and updates!",
              )}
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder", "your@email.com")}
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
              >
                {t("footer.subscribe", "Subscribe")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Barre du bas - Copyright & Légal */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} WinterShop.{" "}
              {t("footer.allRightsReserved", "All rights reserved.")}
            </p>
            <div className="flex gap-6">
              <Link
                to="/legal"
                className="text-neutral-500 hover:text-primary-400 transition-colors text-sm"
              >
                {t("footer.legalNotice", "Legal Notice")}
              </Link>
              <Link
                to="/privacy"
                className="text-neutral-500 hover:text-primary-400 transition-colors text-sm"
              >
                {t("footer.privacyPolicy", "Privacy Policy")}
              </Link>
              <Link
                to="/terms"
                className="text-neutral-500 hover:text-primary-400 transition-colors text-sm"
              >
                {t("footer.termsConditions", "Terms & Conditions")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bandeau accent optionnel en bas */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 h-1" />
    </footer>
  );
}
