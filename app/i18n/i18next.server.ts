import { resolve } from 'node:path';
import { RemixI18Next } from 'remix-i18next/server';
import config from './config'; // your i18n configuration file

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: config.supportedLngs,
    fallbackLanguage: config.fallbackLng,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...config,
    backend: {
      loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
    },
  },
});

export default i18next;
