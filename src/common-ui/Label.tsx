import clsx from 'clsx';
import type { HTMLAttributes, PropsWithChildren } from 'react';

export function Label(
  props: PropsWithChildren<HTMLAttributes<HTMLLabelElement>>
) {
  const { className, ...rest } = props;
  return (
    <label
      className={clsx(
        'block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1',
        className
      )}
      {...rest}
    />
  );
}
