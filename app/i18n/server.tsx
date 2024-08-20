import { createInstance } from 'i18next';
import i18next from './i18next.server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import config from './config'; // your i18n configuration file
import type { EntryContext } from '@remix-run/node';
import type { ReactNode } from 'react';

export async function createProvider(request: Request, remixContext: EntryContext) {
  const instance = createInstance();
  const lng = await i18next.getLocale(request);
  const ns = i18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(resourcesToBackend((lng: string, ns: string) => import(`../../public/locales/${lng}/${ns}.json`))) // Setup our backend
    .init({
      ...config, // spread the configuration
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render wants to use
    });

  const Provider = ({ children }: { children: ReactNode }) => (
    <I18nextProvider i18n={instance}>
      {children}
    </I18nextProvider>
  );

  return Provider;
}
