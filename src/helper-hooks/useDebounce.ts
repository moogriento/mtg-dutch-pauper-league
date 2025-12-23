import { useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(0);

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
