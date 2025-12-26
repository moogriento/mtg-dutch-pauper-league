import type { PropsWithChildren, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export function TableSolid(
  props: PropsWithChildren<HTMLAttributes<HTMLTableElement>>
) {
  const { className, ...rest } = props;

  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <table className={clsx('w-full', className)} {...rest} />
    </div>
  );
}

function SolidTh(
  props: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>> & {
    sortable?: boolean;
    sortOrder?: 'asc' | 'desc';
  }
) {
  const { sortOrder, sortable, ...rest } = props;

  const className = clsx(
    // Surface + borders
    'bg-gray-100 dark:bg-gray-900',
    'border-b border-gray-200 dark:border-gray-700',
    'border-r border-gray-200 dark:border-gray-700',

    // Typography & layout
    'px-4 py-2 text-left text-xs font-semibold',
    'text-gray-700 dark:text-gray-300',
    'relative select-none',

    // Sorting affordances
    {
      'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800': sortable,

      // Default (unsorted)
      "after:content-['⇅']": sortable && !sortOrder,
      'after:ml-2 after:text-[0.85em] after:opacity-40': sortable && !sortOrder,
      'after:text-gray-500 dark:after:text-gray-400': sortable && !sortOrder,
      'hover:after:opacity-70': sortable && !sortOrder,

      // Asc / Desc
      "after:content-['↑']": sortOrder === 'asc',
      "after:content-['↓']": sortOrder === 'desc',
      'after:ml-2 after:text-[0.85em] after:opacity-100': !!sortOrder,
      'after:text-blue-600 dark:after:text-blue-400': !!sortOrder,
    }
  );

  return <th className={className} {...rest} />;
}

function SolidTd(
  props: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>
) {
  const { className, ...rest } = props;

  return (
    <td
      className={clsx(
        'px-4 py-3 text-sm',
        'text-gray-700 dark:text-gray-300',
        'border-r border-gray-200 dark:border-gray-700',
        className
      )}
      {...rest}
    />
  );
}

function SolidTr(
  props: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>
) {
  return (
    <tr
      className={clsx(
        'border-b border-gray-200 dark:border-gray-700',
        'odd:bg-gray-50 even:bg-gray-100',
        'dark:odd:bg-gray-900 dark:even:bg-gray-800',
        'hover:bg-gray-200 dark:hover:bg-gray-700',
        'transition-colors'
      )}
      {...props}
    />
  );
}

function SolidTbody(
  props: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>
) {
  return <tbody {...props} />;
}

function SolidThead(
  props: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>
) {
  return <thead {...props} />;
}

TableSolid.Th = SolidTh;
TableSolid.Td = SolidTd;
TableSolid.Tr = SolidTr;
TableSolid.Tbody = SolidTbody;
TableSolid.Thead = SolidThead;

export function TableClean(
  props: PropsWithChildren<HTMLAttributes<HTMLTableElement>>
) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <table className="w-full" {...props} />
    </div>
  );
}

function CleanTh(
  props: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>> & {
    sortable?: boolean;
    sortOrder?: 'asc' | 'desc';
  }
) {
  const { className, sortOrder, sortable, ...rest } = props;
  const css = clsx(
    'bg-white dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600',
    'px-4 py-3 text-left text-sm font-normal text-gray-700 dark:text-gray-300 relative',
    {
      'cursor-pointer': sortable,
      "after:content-['⇅']": sortable && !sortOrder,
      'after:ml-2': sortable,
      'after:opacity-30': sortable,
      'after:text-[0.85em]': sortable,
      'hover:after:opacity-60': sortable,

      "after:content-['↑']": sortOrder === 'asc',
      "after:content-['↓']": sortOrder === 'desc',
      'after:opacity-100': !!sortOrder,
      'after:text-accent': !!sortOrder,
    },
    className
  );

  return <th className={css} {...rest} />;
}

function CleanTd(
  props: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>
) {
  const { className, ...rest } = props;
  const css = clsx(
    'px-4 py-3 text-sm text-gray-700 dark:text-gray-300',
    className
  );

  return <td className={css} {...rest}></td>;
}

function CleanTr(
  props: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>
) {
  return <tr className="hover:bg-gray-200 dark:hover:bg-gray-700" {...props} />;
}

function CleanTbody(
  props: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>
) {
  return (
    <tbody
      className="divide-y divide-gray-200 dark:divide-gray-700"
      {...props}
    />
  );
}

function CleanThead(
  props: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>
) {
  return <thead {...props} />;
}

TableClean.Th = CleanTh;
TableClean.Td = CleanTd;
TableClean.Tr = CleanTr;
TableClean.Tbody = CleanTbody;
TableClean.Thead = CleanThead;
