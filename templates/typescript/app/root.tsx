import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from '@remix-run/react';
import { cssBundleHref } from '@remix-run/css-bundle';
import './root.css';
import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html>
      <head>
        <link
          href="data:image/x-icon;base64,AA"
          rel="icon"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world!</h1>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
