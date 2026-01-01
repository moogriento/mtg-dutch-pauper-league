import { createBrowserRouter } from 'react-router';
import { RootLayout } from './RootLayout';
import { RouteError } from './RouteError';
import { Page404 } from './Page404';
import { InitialLoader } from './InitialLoader';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      hydrateFallbackElement: <InitialLoader />,
      children: [
        {
          errorElement: <RouteError />,
          children: [
            {
              path: '/',
              lazy: () =>
                import('../pages/overview/Overview').then((module) => ({
                  Component: module.OverviewPage,
                })),
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
            {
              path: 'advanced',
              lazy: () =>
                import('../pages/search/SearchPage').then((module) => ({
                  Component: module.SearchPage,
                })),
            },
            {
              path: 'search',
              lazy: () =>
                import('../pages/search/SearchResults').then((module) => ({
                  Component: module.SearchResults,
                  loader: module.searchResultsLoader,
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
  ],
  {
    basename: import.meta.env.VITE_BASE_URL,
  }
);

export default router;
