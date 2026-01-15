import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { useTranslate } from "@tolgee/react";

export const HomePage = () => {
  const { t } = useTranslate();
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          {t("home.title")} ⛷️
        </h1>
        <p className="text-xl text-gray-600 mb-8">{t("home.description")}</p>
        <div className="flex justify-center gap-4">
          <Link
            to={ROUTES.PRODUCTS}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
          >
            {t("home.shopNow")}
          </Link>
          <Link
            to={ROUTES.ORDERS}
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition-colors font-semibold"
          >
            {t("home.viewOrders")}
          </Link>
        </div>
      </div>

      {/* Section features */}
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-4xl mb-4">🎿</div>
          <h3 className="text-lg font-semibold mb-2">
            {t("home.features.ski.title")}
          </h3>
          <p className="text-gray-600">{t("home.features.ski.description")}</p>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-4">❄️</div>
          <h3 className="text-lg font-semibold mb-2">
            {t("home.features.winterGear.title")}
          </h3>
          <p className="text-gray-600">
            {t("home.features.winterGear.description")}
          </p>
        </div>

        <div className="text-center">
          <div className="text-4xl mb-4">🏂</div>
          <h3 className="text-lg font-semibold mb-2">
            {t("home.features.snowboard.title")}
          </h3>
          <p className="text-gray-600">
            {t("home.features.snowboard.description")}
          </p>
        </div>
      </div>
    </div>
  );
};
