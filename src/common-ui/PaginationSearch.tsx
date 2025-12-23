import clsx from 'clsx';

function getPages(current: number, total: number, delta = 2): (number | '…')[] {
  const pages: (number | '…')[] = [];

  const rangeStart = Math.max(2, current - delta);
  const rangeEnd = Math.min(total - 1, current + delta);

  pages.push(1);

  if (rangeStart > 2) {
    pages.push('…');
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (rangeEnd < total - 1) {
    pages.push('…');
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
}

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function PaginationSearch({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPages(page, totalPages);

  return (
    <nav
      className="mt-6 flex items-center justify-between gap-2 text-sm"
      aria-label="Pagination"
    >
      {/* Previous */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="rounded border border-border px-3 py-2 hover:bg-bg-tertiary disabled:opacity-50"
      >
        ← Prev
      </button>

      {/* Page numbers (desktop only) */}
      <div className="hidden sm:flex items-center gap-1">
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className="px-2 text-text-muted">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
              className={clsx(
                'min-w-9 rounded border px-3 py-2',
                p === page
                  ? 'bg-accent text-white border-accent'
                  : 'border-border hover:bg-bg-tertiary'
              )}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="rounded border border-border px-3 py-2 hover:bg-bg-tertiary disabled:opacity-50"
      >
        Next →
      </button>
    </nav>
  );
}
