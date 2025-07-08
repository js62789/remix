import { Outlet } from 'react-router-dom';
import { type ReactNode } from 'react';
import './root.css';

// The Layout will render even if an error was caught by an error boundary,
// so make sure nothing can break in here
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>My React Router App</title>
        <meta content="This app is the best" name="description" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
