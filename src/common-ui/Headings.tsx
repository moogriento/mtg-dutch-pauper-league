import type { HTMLAttributes, PropsWithChildren } from 'react';

interface HeadingProps
  extends PropsWithChildren<HTMLAttributes<HTMLHeadingElement>> {}

export function H1(props: HeadingProps) {
  const { className, ...rest } = props;

  return (
    <h1
      className={`text-2xl font-normal text-gray-800 dark:text-gray-200 mb-2 ${className}`}
      {...rest}
    />
  );
}

export function H2(props: HeadingProps) {
  const { className, ...rest } = props;

  return (
    <h2
      className={`text-xl, font-normal text-gray-800 dark:text-gray-200 mb-2 ${className}`}
      {...rest}
    />
  );
}

export function H3(props: HeadingProps) {
  const { className, ...rest } = props;

  return (
    <h3
      className={`text-lg font-normal text-gray-800 dark:text-gray-200 mb-2 ${className}`}
      {...rest}
    />
  );
}
