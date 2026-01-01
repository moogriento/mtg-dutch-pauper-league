import { act, renderHook } from '@testing-library/react';
import { usePagination } from './usePagination';

const list = [
  {
    id: 1,
    name: 'DPL Leg 1',
  },
  {
    id: 2,
    name: 'DPL Leg 2',
  },
  {
    id: 3,
    name: 'DPL Leg 3',
  },
  {
    id: 4,
    name: 'DPL Leg 4',
  },
];

const pageSize = 2;

describe('usePagination', () => {
  test('returns the paginated list, current page, total items, total pages', () => {
    const { result } = renderHook(() => usePagination({ list, pageSize }));

    expect(result.current.currentPage).toEqual(1);
    expect(result.current.totalItems).toEqual(4);
    expect(result.current.totalPages).toEqual(2);
    expect(result.current.items).toEqual([
      {
        id: 1,
        name: 'DPL Leg 1',
      },
      {
        id: 2,
        name: 'DPL Leg 2',
      },
    ]);
  });

  test('also works with non exact pages', () => {
    const { result } = renderHook(() => usePagination({ list, pageSize: 3 }));

    expect(result.current.currentPage).toEqual(1);
    expect(result.current.totalItems).toEqual(4);
    expect(result.current.totalPages).toEqual(2);
    expect(result.current.items).toEqual([
      {
        id: 1,
        name: 'DPL Leg 1',
      },
      {
        id: 2,
        name: 'DPL Leg 2',
      },
      {
        id: 3,
        name: 'DPL Leg 3',
      },
    ]);
  });

  test('returns if there is a next page or a previous page', () => {
    const { result } = renderHook(() => usePagination({ list, pageSize }));

    expect(result.current.currentPage).toEqual(1);
    expect(result.current.hasPrevPage).toEqual(false);
    expect(result.current.hasNextPage).toEqual(true);
  });

  test('returns a fn that moves to the next/prev page when invoked', async () => {
    const { result } = renderHook(() => usePagination({ list, pageSize }));

    expect(result.current.currentPage).toEqual(1);
    expect(result.current.items).toEqual([
      {
        id: 1,
        name: 'DPL Leg 1',
      },
      {
        id: 2,
        name: 'DPL Leg 2',
      },
    ]);
    expect(result.current.hasPrevPage).toEqual(false);
    expect(result.current.hasNextPage).toEqual(true);

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toEqual(2);
    expect(result.current.items).toEqual([
      {
        id: 3,
        name: 'DPL Leg 3',
      },
      {
        id: 4,
        name: 'DPL Leg 4',
      },
    ]);
    expect(result.current.hasNextPage).toEqual(false);
    expect(result.current.hasPrevPage).toEqual(true);

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toEqual(1);
    expect(result.current.items).toEqual([
      {
        id: 1,
        name: 'DPL Leg 1',
      },
      {
        id: 2,
        name: 'DPL Leg 2',
      },
    ]);
    expect(result.current.hasPrevPage).toEqual(false);
    expect(result.current.hasNextPage).toEqual(true);
  });

  test('returns a fn that jumps to a specific page', () => {
    const { result } = renderHook(() => usePagination({ list, pageSize: 1 }));

    expect(result.current.currentPage).toEqual(1);
    expect(result.current.items).toEqual([
      {
        id: 1,
        name: 'DPL Leg 1',
      },
    ]);

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toEqual(3);
    expect(result.current.items).toEqual([
      {
        id: 3,
        name: 'DPL Leg 3',
      },
    ]);
  });
});
