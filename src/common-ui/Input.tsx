import clsx from 'clsx';
import { type InputHTMLAttributes, forwardRef } from 'react';

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="text"
      className={clsx(
        'w-full px-3 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500',
        className
      )}
      {...props}
    />
  );
});
