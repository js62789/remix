import { RouteObject } from 'react-router-dom';
import Root from './root';
import Index from './routes/_index';
import About from './routes/about';
import ErrorBoundary from './components/ErrorBoundary';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'about',
        element: <About />,
      },
      // Add more routes here as needed
    ],
  },
];

export default routes;
