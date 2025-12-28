import clsx from 'clsx';

export function AppVersion({ className }: { className?: string }) {
  let version = (import.meta.env.VITE_APP_VERSION as string) ?? '';

  if (!version.startsWith('v')) {
    version = `v.${version}`;
  }

  return (
    <span
      className={clsx('text-xs text-gray-600 dark:text-gray-400', className)}
    >
      build {version}
    </span>
  );
}
