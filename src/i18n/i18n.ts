import { Tolgee, DevTools } from '@tolgee/react';
import { FormatIcu } from '@tolgee/format-icu';
import { DEFAULT_LANGUAGE, AVAILABLE_LANGUAGES } from './languages';

import fr from './locales/fr.json';
import en from './locales/en.json';

const getSavedLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('language');
    if (saved && AVAILABLE_LANGUAGES.some(lang => lang.code === saved)) {
      return saved;
    }
  }
  return DEFAULT_LANGUAGE;
};

export const tolgee = Tolgee()
  .use(import.meta.env.DEV ? DevTools() : FormatIcu())
  .use(FormatIcu())
  .init({
    language: getSavedLanguage(),
    fallbackLanguage: DEFAULT_LANGUAGE,
    availableLanguages: AVAILABLE_LANGUAGES.map(lang => lang.code),
    staticData: {
      fr,
      en,
    },
  });

tolgee.on('language', (language) => {
  localStorage.setItem('language', language.value);
});