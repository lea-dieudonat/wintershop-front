import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { useTranslate } from "@tolgee/react";

export const LoginPage = () => {
  const { t } = useTranslate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.HOME;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError("Failed to login. Please check your credentials and try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("login.title")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t("login.description")}
          </p>
        </div>
        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">
                {t("common.email.label")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t("common.email.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="sr-only">
                {t("common.password.label")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t("common.password.placeholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          {/* Help */}
          <div className="text-sm text-center text-gray-600">
            <p className="mb-2">{t("login.testCredentials")}</p>
            <p className="font-mono bg-gray-100 p-2 rounded">
              test@wintershop.com / Password123
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t("login.loggingIn") : t("login.login")}
            </button>
          </div>

          {/* Back to Home Link */}
          <div className="text-center">
            <Link
              to={ROUTES.HOME}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              {t("login.back")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
