import { useTolgee } from "@tolgee/react";
import { AVAILABLE_LANGUAGES } from "../../i18n/languages";

export function LanguageSelector() {
  const tolgee = useTolgee(["language"]);
  const currentLanguage = tolgee.getLanguage();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    tolgee.changeLanguage(event.target.value);
  };

  return (
    <select
      value={currentLanguage}
      onChange={handleLanguageChange}
      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="{t('languageSelector.label')}"
    >
      {AVAILABLE_LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.label}
        </option>
      ))}
    </select>
  );
}
