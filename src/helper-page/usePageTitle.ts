import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function usePageTitle(title: string) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);
}
