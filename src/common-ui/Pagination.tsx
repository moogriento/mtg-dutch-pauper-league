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
    <div className="mt-4 flex justify-center items-center gap-2 text-sm">
      <button
        onClick={onPrev}
        disabled={disablePrev}
        className="px-3 py-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
      >
        « Prev
      </button>

      <span className="mx-4">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={disableNext}
        className="px-3 py-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
      >
        Next »
      </button>
    </div>
  );
}
