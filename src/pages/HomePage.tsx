import { useTranslate } from "@tolgee/react";
import HeroSection from "@/components/layout/Herosection";

export const HomePage = () => {
  const { t } = useTranslate();
  return (
    <div>
      <HeroSection />
      <div className="container mx-auto px-4">
        {/* Section features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🎿</div>
            <h3 className="text-lg font-semibold mb-2">
              {t("home.features.ski.title")}
            </h3>
            <p className="text-gray-600">
              {t("home.features.ski.description")}
            </p>
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
    </div>
  );
};
