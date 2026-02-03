import { useState } from "react";
import { useChangePassword } from "@/hooks/useUser";
import type { User } from "@/types/userTypes";
import { useTranslate } from "@tolgee/react";

interface SecuritySectionProps {
  user: User;
}

export const SecuritySection = ({ user }: SecuritySectionProps) => {
  const { t } = useTranslate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const changePasswordMutation = useChangePassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation côté client
    if (newPassword.length < 8) {
      setError(t("password.minLength"));
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(newPassword)) {
      setError(t("password.complexity"));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("password.mismatch"));
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        userId: user.id,
        data: {
          currentPassword,
          newPassword,
          confirmPassword,
        },
      });

      setSuccess(true);
      // Réinitialiser le formulaire
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Masquer le message de succès après 3 secondes
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      const error = err as {
        response?: {
          status?: number;
          data?: { violations?: Array<{ message: string }> };
        };
      };
      if (error.response?.status === 400) {
        setError(t("password.currentIncorrect"));
      } else if (error.response?.data?.violations) {
        const violations = error.response.data.violations;
        setError(violations.map((v) => v.message).join(", "));
      } else {
        setError(t("password.changeError"));
      }
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">{t("security.title")}</h2>

      <div className="max-w-md">
        <h3 className="text-lg font-medium mb-4">
          {t("security.changePassword")}
        </h3>

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
            {t("security.passwordChangedSuccess")}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("security.currentPassword")} *
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("security.newPassword")} *
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
            <p className="mt-1 text-sm text-gray-500">
              {t("security.passwordRequirements")}
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("security.confirmNewPassword")} *
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={changePasswordMutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {changePasswordMutation.isPending
                ? t("security.changingPassword")
                : t("security.changePassword")}
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            {t("security.securityTips")}
          </h4>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>{t("security.useUniquePassword")}</li>
            <li>{t("security.neverSharePassword")}</li>
            <li>{t("security.changePasswordRegularly")}</li>
            <li>{t("security.usePasswordManager")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
