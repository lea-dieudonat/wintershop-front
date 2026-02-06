import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { Home, ArrowLeft, ShoppingBag } from "lucide-react";
import { useTranslate } from "@tolgee/react";

export const NotFoundPage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-800 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full blur-3xl opacity-20 animate-pulse" />
          </div>
          <div className="relative">
            <h1 className="text-[150px] md:text-[200px] font-black leading-none bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 bg-clip-text text-transparent animate-gradient">
              404
            </h1>
          </div>
        </div>

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="text-6xl animate-bounce">🏔️</div>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          {t("notFound.title", "Oups ! Piste introuvable")}
        </h2>

        {/* Description */}
        <p className="text-neutral-300 text-lg mb-8 max-w-2xl mx-auto">
          {t(
            "notFound.description",
            "On dirait que tu t'es perdu en hors-piste ! Cette page n'existe pas ou a été déplacée.",
          )}
        </p>

        {/* Suggestions */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-8 max-w-md mx-auto">
          <h3 className="text-white font-bold mb-4 text-left">
            {t("notFound.suggestions", "Quelques pistes pour te retrouver :")}
          </h3>
          <ul className="text-neutral-400 text-left space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
              <span>
                {t(
                  "notFound.suggestion1",
                  "Vérifie l'URL dans la barre d'adresse",
                )}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-secondary-400 rounded-full mt-2 flex-shrink-0" />
              <span>
                {t(
                  "notFound.suggestion2",
                  "Utilise la barre de recherche pour trouver un produit",
                )}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0" />
              <span>
                {t(
                  "notFound.suggestion3",
                  "Retourne à la page d'accueil",
                )}
              </span>
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg transition-colors border border-neutral-800"
          >
            <ArrowLeft className="w-5 h-5" />
            {t("notFound.goBack", "Retour")}
          </button>

          <Link
            to={ROUTES.HOME}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-lg transition-colors border border-neutral-800"
          >
            <Home className="w-5 h-5" />
            {t("notFound.home", "Accueil")}
          </Link>

          <Link
            to={ROUTES.PRODUCTS}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-400 text-neutral-900 font-bold rounded-lg transition-all transform hover:scale-105"
          >
            <ShoppingBag className="w-5 h-5" />
            {t("notFound.shop", "Boutique")}
          </Link>
        </div>

        {/* Fun fact ou easter egg */}
        <div className="text-neutral-500 text-sm">
          <p className="mb-2">💡 {t("notFound.funFact", "Le saviez-vous ?")}</p>
          <p className="text-neutral-600">
            {t(
              "notFound.fact",
              "Les snowboarders parcourent en moyenne 25km par jour sur les pistes !",
            )}
          </p>
        </div>
      </div>

      {/* CSS pour l'animation du gradient */}
      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};
