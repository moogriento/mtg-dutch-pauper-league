import { createBrowserRouter } from 'react-router';
import { OverviewPage } from '../pages/overview/Overview';
import { RootLayout } from './RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      {
        path: 'tournament/:tournamentId',
        lazy: () =>
          import('../pages/tournament/TournamentDetails').then((module) => ({
            Component: module.TournamentDetailsPage,
          })),
      },
      {
        path: 'tournament/:tournamentId/deck/:deckId',
        lazy: () =>
          import('../pages/deck/ViewDeckPage').then((module) => ({
            Component: module.ViewDeckPage,
          })),
      },
    ],
  },
]);

export default router;
