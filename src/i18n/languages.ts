export interface Language {
    code: string;
    label: string;
    flag: string;
}

export const AVAILABLE_LANGUAGES: Language[] = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
];

export const DEFAULT_LANGUAGE = "en";