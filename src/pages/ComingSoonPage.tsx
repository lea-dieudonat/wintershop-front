import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { Construction, ArrowLeft, Home } from "lucide-react";
import { useTranslate } from "@tolgee/react";

interface ComingSoonPageProps {
  title?: string;
  description?: string;
  featureName?: string;
}

export const ComingSoonPage = ({
  title = "Fonctionnalité en cours de développement",
  description = "Cette page sera bientôt disponible. Nous travaillons dur pour vous offrir la meilleure expérience possible !",
  featureName,
}: ComingSoonPageProps) => {
  const { t } = useTranslate();

  return (
    <div className="min-h-screen bg-neutral-800 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-neutral-900 p-8 rounded-full border-2 border-neutral-800">
              <Construction className="w-16 h-16 text-accent-400" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">
          {featureName ? `${featureName}` : title}
        </h1>

        {/* Description */}
        <p className="text-neutral-300 text-lg mb-8 max-w-xl mx-auto">
          {description}
        </p>

        {/* Progress indicators (optionnel, stylé) */}
        <div className="mb-8">
          <div className="flex justify-center gap-2">
            <div
              className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-3 h-3 bg-secondary-500 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-3 h-3 bg-accent-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>

        {/* Features preview (optionnel) */}
        {featureName && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h2 className="text-white font-bold mb-3 text-left">
              {t("comingSoon.featuresPreviewTitle")}
            </h2>
            <ul className="text-neutral-400 text-left space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-400 rounded-full" />
                {t("comingSoon.features.intuitiveInterface")}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary-400 rounded-full" />
                {t("comingSoon.features.advancedFeatures")}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-400 rounded-full" />
                {t("comingSoon.features.optimizedUserExperience")}
              </li>
            </ul>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg transition-colors border border-neutral-800"
          >
            <ArrowLeft className="w-5 h-5" />
            {t("common.back")}
          </button>

          <Link
            to={ROUTES.HOME}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-400 text-neutral-900 font-bold rounded-lg transition-all transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            {t("common.home")}
          </Link>
        </div>

        {/* Info supplémentaire */}
        <p className="text-neutral-500 text-sm mt-8">
          {t("comingSoon.contactUs")}{" "}
          <a
            href="mailto:contact@wintershop.com"
            className="text-primary-400 hover:text-primary-300 underline"
          >
            contact@wintershop.com
          </a>
        </p>
      </div>
    </div>
  );
};

// Composants spécifiques pour chaque page
export const AboutPage = () => {
  const { t } = useTranslate();
  return (
    <ComingSoonPage
      featureName={t("about.title", "À propos de WinterShop")}
      description={t(
        "about.description",
        "Découvrez bientôt notre histoire, nos valeurs et notre passion pour les sports d'hiver !",
      )}
    />
  );
};

export const ContactPage = () => {
  const { t } = useTranslate();
  return (
    <ComingSoonPage
      featureName={t("contact.title", "Contactez-nous")}
      description={t(
        "contact.description",
        "Un formulaire de contact intuitif sera bientôt disponible. En attendant, écrivez-nous à contact@wintershop.com",
      )}
    />
  );
};

export const FAQPage = () => {
  const { t } = useTranslate();
  return (
    <ComingSoonPage
      featureName={t("faq.title", "FAQ")}
      description={t(
        "faq.description",
        "Toutes les réponses à vos questions seront bientôt disponibles ici !",
      )}
    />
  );
};

export const ShippingPage = () => {
  const { t } = useTranslate();
  return (
    <ComingSoonPage
      featureName={t("shipping.title", "Livraison & Retours")}
      description={t(
        "shipping.description",
        "Informations détaillées sur nos conditions de livraison et de retour à venir !",
      )}
    />
  );
};

export const LegalPage = () => {
  const { t } = useTranslate();
  return (
    <ComingSoonPage
      featureName={t("legal.title", "Mentions légales")}
      description={t(
        "legal.description",
        "Les mentions légales complètes seront bientôt publiées.",
      )}
    />
  );
};

export const PrivacyPage = () => {
  const { t } = useTranslate();
  return (
    <ComingSoonPage
      featureName={t("privacy.title", "Politique de confidentialité")}
      description={t(
        "privacy.description",
        "Notre politique de protection des données sera bientôt disponible.",
      )}
    />
  );
};

export const TermsPage = () => {
  const { t } = useTranslate();
  return (
    <ComingSoonPage
      featureName={t("terms.title", "Conditions Générales de Vente")}
      description={t(
        "terms.description",
        "Nos CGV seront bientôt consultables ici.",
      )}
    />
  );
};
