import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import { useEffect, useState, type ReactNode } from 'react';
import type { Socket } from 'socket.io-client';
import io from 'socket.io-client';

import { SocketProvider } from './context';
import './root.css';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

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

export default function App() {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io();
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('confirmation', (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <SocketProvider socket={socket}>
      <Outlet />
    </SocketProvider>
  );
}
