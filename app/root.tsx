import { Outlet, useRouteError, isRouteErrorResponse, Scripts, ScrollRestoration, Meta, Links, MetaFunction } from 'react-router';
import { type ReactNode } from 'react';
import './root.css';

export const meta: MetaFunction = () => [
  { title: 'My React Router App' },
  { name: 'description', content: 'This app is the best' },
];

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

export default function Root() {
  return (
    <Outlet />
  );
}
