import type { HTMLAttributes, PropsWithChildren } from 'react';

interface HeadingProps
  extends PropsWithChildren<HTMLAttributes<HTMLHeadingElement>> {}

export function H1(props: HeadingProps) {
  const { className, ...rest } = props;

  return (
    <h1 className={`text-xl font-bold font-heading ${className}`} {...rest} />
  );
}

export function H2(props: HeadingProps) {
  const { className, ...rest } = props;

  return (
    <h1 className={`text-lg font-bold font-heading ${className}`} {...rest} />
  );
}

export function H3(props: HeadingProps) {
  const { className, ...rest } = props;

  return (
    <h1 className={`text-md font-bold font-heading ${className}`} {...rest} />
  );
}
