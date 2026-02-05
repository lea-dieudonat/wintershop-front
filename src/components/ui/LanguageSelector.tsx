import { useTolgee } from "@tolgee/react";
import { AVAILABLE_LANGUAGES } from "@/i18n/languages";
import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

export function LanguageSelector() {
  const tolgee = useTolgee(["language"]);
  const currentLanguage = tolgee.getLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = AVAILABLE_LANGUAGES.find(
    (lang) => lang.code === currentLanguage,
  );

  // Fermeture au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (langCode: string) => {
    tolgee.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton actuel */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-neutral-300 hover:text-primary-400 transition-colors rounded-lg hover:bg-neutral-800"
        aria-label="Changer de langue"
      >
        <Globe className="w-5 h-5" />
        <span className="text-2xl">{currentLang?.flag}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl py-1 overflow-hidden">
          {AVAILABLE_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
                lang.code === currentLanguage
                  ? "bg-neutral-800 text-primary-400"
                  : "text-neutral-300 hover:bg-neutral-800 hover:text-primary-400"
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
