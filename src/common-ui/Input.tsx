import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;

  return (
    <input
      type="text"
      className={clsx(
        'w-full px-4 py-2.5 font-sans rounded-lg border transition-all focus:outline-none bg-bg-primary border-border text-text-primary focus:border-accent focus:shadow-hover-shadow',
        className
      )}
      {...rest}
    />
  );
}
