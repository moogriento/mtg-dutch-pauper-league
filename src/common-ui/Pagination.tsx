interface Props {
  onPrev: () => void;
  onNext: () => void;
  currentPage: number;
  totalPages: number;
  disablePrev?: boolean;
  disableNext?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  disableNext,
  disablePrev,
  onNext,
  onPrev,
}: Props) {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        className="px-3 py-1 border border-border rounded hover:bg-bg-tertiary"
        onClick={onPrev}
        disabled={disablePrev}
      >
        ‹ Prev
      </button>
      <span className="text-sm mx-4">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-3 py-1 border border-border rounded hover:bg-bg-tertiary"
        onClick={onNext}
        disabled={disableNext}
      >
        Next ›
      </button>
    </div>
  );
}
