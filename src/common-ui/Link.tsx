import { Link as RouterLink, type LinkProps } from 'react-router';

export function Link(props: LinkProps) {
  return (
    <RouterLink
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
      {...props}
    />
  );
}
