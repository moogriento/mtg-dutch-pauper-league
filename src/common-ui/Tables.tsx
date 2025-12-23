import type { PropsWithChildren, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export function TableSolid(
  props: PropsWithChildren<HTMLAttributes<HTMLTableElement>>
) {
  return (
    <div className="bg-bg-secondary border border-border rounded-lg my-2 overflow-hidden">
      <table className="border-collapse w-full" {...props} />
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
    'bg-bg-tertiary hover:bg-border p-2 text-left font-semibold text-text-primary text-sm border-b border-border select-none relative',
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
    }
  );

  return <th className={className} {...rest} />;
}

function SolidTd(
  props: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>
) {
  const { className, ...rest } = props;
  const css = clsx('p-2 border-border text-sm', className);

  return <td className={css} {...rest}></td>;
}

function SolidTr(
  props: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>
) {
  return (
    <tr
      className="hover:bg-bg-tertiary [&:not(:last-child)_td]:border-b"
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
  return <table className="border-collapse w-full" {...props} />;
}

function CleanTh(
  props: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>> & {
    sortable?: boolean;
    sortOrder?: 'asc' | 'desc';
  }
) {
  const { sortOrder, sortable, ...rest } = props;
  const className = clsx(
    'hover:bg-border px-[1rem] py-[0.75rem] text-left font-medium text-text-primary text-sm border-b border-border relative',
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
    }
  );

  return <th className={className} {...rest} />;
}

function CleanTd(
  props: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>
) {
  const { className, ...rest } = props;
  const css = clsx('px-[1rem] py-[0.75rem] border-border text-sm', className);

  return <td className={css} {...rest}></td>;
}

function CleanTr(
  props: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>
) {
  return (
    <tr
      className="hover:bg-bg-tertiary [&:not(:last-child)_td]:border-b"
      {...props}
    />
  );
}

function CleanTbody(
  props: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>
) {
  return <tbody {...props} />;
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
