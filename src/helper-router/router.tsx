import { createBrowserRouter } from 'react-router';
import { OverviewPage } from '../pages/overview/Overview';
import { RootLayout } from './RootLayout';
import { RouteError } from './RouteError';
import { Page404 } from './Page404';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          {
            path: '/',
            element: <OverviewPage />,
          },
          {
            path: 'tournament/:tournamentId',
            lazy: () =>
              import('../pages/tournament/TournamentDetails').then(
                (module) => ({
                  Component: module.TournamentDetailsPage,
                  loader: module.tournamentPageLoader,
                })
              ),
          },
          {
            path: 'tournament/:tournamentId/deck/:deckId',
            lazy: () =>
              import('../pages/deck/ViewDeckPage').then((module) => ({
                Component: module.ViewDeckPage,
                loader: module.viewDeckLoader,
              })),
          },
        ],
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]);

export default router;
