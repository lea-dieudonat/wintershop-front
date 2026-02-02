import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import PersonalInfoSection from "@/features/profile/PersonalInfoSection";

type TabType = "info" | "addresses" | "orders" | "security";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("info");

  // TODO: Récupérer l'ID du user depuis le contexte d'authentification
  const userId = 1; // Temporaire
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          Erreur lors du chargement du profil
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "info" as TabType, label: "Informations personnelles" },
    { id: "addresses" as TabType, label: "Mes adresses" },
    { id: "orders" as TabType, label: "Mes commandes" },
    { id: "security" as TabType, label: "Sécurité" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Mon profil</h1>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div>
        {activeTab === "info" && <PersonalInfoSection user={user} />}

        {activeTab === "addresses" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Mes adresses</h2>
            <p>Contenu à venir...</p>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Mes commandes</h2>
            <p>Contenu à venir...</p>
          </div>
        )}

        {activeTab === "security" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Sécurité</h2>
            <p>Contenu à venir...</p>
          </div>
        )}
      </div>
    </div>
  );
};
