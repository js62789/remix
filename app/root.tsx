import {
  isRouteErrorResponse,
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { type ReactNode } from 'react';
import { useChangeLanguage } from 'remix-i18next/react';
import './root.css';
import i18next from './i18n/i18next.server';

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: 'common',
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => ([
  {
    title: 'My Remix App',
  },
  {
    name: 'description',
    content: 'This app is the best',
  },
]);

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    locale: await i18next.getLocale(request),
  });
}

// The Layout will render even if an error was caught by an error boundary,
// so make sure nothing can break in here
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status}
          {' '}
          {error.statusText}
        </h1>
        <p>
          {error.data}
        </p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>
          {error.message}
        </p>
        <p>The stack trace is:</p>
        <pre>
          {error.stack}
        </pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default function App() {
  const { locale } = useLoaderData<typeof loader>();

  useChangeLanguage(locale);

  return (
    <Outlet />
  );
}
