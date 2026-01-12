import { Tolgee, DevTools } from '@tolgee/react';
import { FormatIcu } from '@tolgee/format-icu';

import fr from './locales/fr.json';
import en from './locales/en.json';

export const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatIcu())
  .init({
    language: 'en',
    fallbackLanguage: 'en',
    availableLanguages: ['en', 'fr'],
    staticData: {
      fr,
      en,
    },
    apiUrl: import.meta.env.DEV ? undefined : undefined,
    apiKey: import.meta.env.DEV ? undefined : undefined,
  });