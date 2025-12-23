import clsx from 'clsx';
import type { HTMLAttributes, PropsWithChildren } from 'react';

export function Label(
  props: PropsWithChildren<HTMLAttributes<HTMLLabelElement>>
) {
  const { className, ...rest } = props;
  return (
    <label
      className={clsx(
        'block font-sans text-sm font-medium mb-2 text-text-secondary',
        className
      )}
      {...rest}
    />
  );
}
