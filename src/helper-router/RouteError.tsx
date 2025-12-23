import { useRouteError } from 'react-router';
import { Page404 } from './Page404';
import { Page500 } from './Page500';

export function RouteError() {
  const error = useRouteError();

  if ((error as any).status === 404) {
    return <Page404 />;
  }

  return <Page500 />;
}
