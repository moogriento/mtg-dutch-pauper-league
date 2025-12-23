import { useCallback, useState } from 'react';

export function usePagination<T>({
  list,
  pageSize,
}: {
  list: Array<T>;
  pageSize: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(list.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const items = list.slice(start, end);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev >= totalPages) {
        return totalPages;
      }

      return prev + 1;
    });
  }, [totalPages]);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev <= 1) {
        return 1;
      }

      return prev - 1;
    });
  }, []);

  const handleGoToPage = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  return {
    totalItems: list.length,
    totalPages: totalPages,
    items,
    currentPage,
    nextPage: handleNextPage,
    previousPage: handlePreviousPage,
    goToPage: handleGoToPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}
