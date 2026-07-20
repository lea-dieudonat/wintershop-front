import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { useTranslate } from "@tolgee/react";
import loginBackground from "@/assets/login.avif";

export const RegisterPage = () => {
  const { t } = useTranslate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("register.error.passwordMismatch"));
      return;
    }

    setLoading(true);
    try {
      await register({ email, password, firstName, lastName });
      navigate(ROUTES.HOME, { replace: true });
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      setError(
        status === 409
          ? t("register.error.emailExists")
          : t("register.error.generic")
      );
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 -z-10" />

      {/* Register Form Container */}
      <div
        className="max-w-md w-full space-y-8 p-8 rounded-lg shadow-2xl"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.90)" }}
      >
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("register.title")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t("register.description")}
          </p>
        </div>
        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* First name */}
            <div>
              <label htmlFor="firstName" className="sr-only">
                {t("register.firstName.label")}
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t("register.firstName.placeholder")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            {/* Last name */}
            <div>
              <label htmlFor="lastName" className="sr-only">
                {t("register.lastName.label")}
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t("register.lastName.placeholder")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t("common.password.placeholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                {t("register.confirmPassword.label")}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t("register.confirmPassword.placeholder")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t("register.submitting") : t("register.submit")}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            {t("register.haveAccount")}{" "}
            <Link
              to={ROUTES.LOGIN}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {t("register.loginLink")}
            </Link>
          </div>

          {/* Back to Home Link */}
          <div className="text-center">
            <Link
              to={ROUTES.HOME}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              {t("register.back")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
