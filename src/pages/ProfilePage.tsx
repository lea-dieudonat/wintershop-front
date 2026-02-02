import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";
import PersonalInfoSection from "@/features/profile/PersonalInfoSection";
import AddressSection from "@/features/address/addressSection";
import { useTranslate } from "@tolgee/react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type TabType = "info" | "addresses" | "orders" | "security";

export const ProfilePage = () => {
  const { t } = useTranslate();
  const [activeTab, setActiveTab] = useState<TabType>("info");
  const { user: authUser } = useAuth();

  const { data: user, isLoading } = useUser(authUser?.id || 0);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          {t("profile.error.loading")}
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "info" as TabType, label: t("profile.tabs.info") },
    { id: "addresses" as TabType, label: t("profile.tabs.addresses") },
    { id: "orders" as TabType, label: t("profile.tabs.orders") },
    { id: "security" as TabType, label: t("profile.tabs.security") },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">{t("profile.title")}</h1>

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

        {activeTab === "addresses" && <AddressSection />}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {t("profile.tabs.orders")}
            </h2>
            <p>{t("profile.content.coming_soon")}</p>
          </div>
        )}

        {activeTab === "security" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {t("profile.tabs.security")}
            </h2>
            <p>{t("profile.content.coming_soon")}</p>
          </div>
        )}
      </div>
    </div>
  );
};
