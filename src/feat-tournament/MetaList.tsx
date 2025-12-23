import { useState } from 'react';
import type { ArchetypeStats } from './useTournamentStats';
import { usePagination } from '../helper-pagination/usePagination';
import { TableSolid } from '../common-ui/Tables';
import clsx from 'clsx';
import { Pagination } from '../common-ui/Pagination';

type SortKey = 'total' | 'winrate' | 'conversionrate';

export function MetaList({ archetypes }: { archetypes: ArchetypeStats[] }) {
  const [list, setList] = useState(archetypes);
  const [sortKey, setSortKey] = useState<SortKey>('total');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const {
    items,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination({ list, pageSize: 10 });

  const handleSort = (key: SortKey) => () => {
    let sortedList = [...list];
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';

    switch (key) {
      case 'total':
        sortedList.sort((a, b) => {
          return newOrder === 'asc'
            ? a.total_decks - b.total_decks
            : b.total_decks - a.total_decks;
        });
        break;
      case 'winrate':
        sortedList.sort((a, b) => {
          return newOrder === 'asc'
            ? (a.win_rate || 0) - (b.win_rate || 0)
            : (b.win_rate || 0) - (a.win_rate || 0);
        });
        break;
      case 'conversionrate':
        sortedList.sort((a, b) => {
          return newOrder === 'asc'
            ? (a.conversion_rate || 0) - (b.conversion_rate || 0)
            : (b.conversion_rate || 0) - (a.conversion_rate || 0);
        });
        break;
    }

    goToPage(1);
    setSortKey(key);
    setSortOrder(newOrder);
    setList(sortedList);
  };

  const getSortClass = (key: SortKey) => {
    if (sortKey !== key) {
      return undefined;
    }

    return sortOrder;
  };

  return (
    <div>
      <TableSolid>
        <TableSolid.Thead>
          <TableSolid.Tr>
            <TableSolid.Th>Archetype</TableSolid.Th>
            <TableSolid.Th
              sortable
              sortOrder={getSortClass('total')}
              onClick={handleSort('total')}
            >
              Total decks
            </TableSolid.Th>
            <TableSolid.Th
              sortable
              sortOrder={getSortClass('winrate')}
              onClick={handleSort('winrate')}
            >
              Win Rate
            </TableSolid.Th>
            <TableSolid.Th
              sortable
              sortOrder={getSortClass('conversionrate')}
              onClick={handleSort('conversionrate')}
            >
              Conversion Rate
            </TableSolid.Th>
          </TableSolid.Tr>
        </TableSolid.Thead>
        <TableSolid.Tbody>
          {items.map((item) => {
            const winRate = item.win_rate ?? 0;
            const conversionRate = item.conversion_rate ?? 0;

            return (
              <TableSolid.Tr key={item.archetype}>
                <TableSolid.Td className="text-text-primary">
                  {item.archetype}
                </TableSolid.Td>
                <TableSolid.Td className="font-mono text-text-secondary">
                  {item.total_decks}
                </TableSolid.Td>
                <TableSolid.Td
                  className={clsx('font-mono font-semibold', {
                    'text-success': winRate >= 51,
                    'text-neutral': winRate >= 50 && winRate < 51,
                    'text-error': winRate < 50,
                  })}
                >
                  {item.win_rate?.toFixed(1)}%
                </TableSolid.Td>
                <TableSolid.Td
                  className={clsx('font-mono font-semibold', {
                    'text-success': conversionRate >= 51,
                    'text-neutral': conversionRate >= 50 && conversionRate < 51,
                    'text-error': conversionRate < 50,
                  })}
                >
                  {item.conversion_rate?.toFixed(1)}%
                </TableSolid.Td>
              </TableSolid.Tr>
            );
          })}
        </TableSolid.Tbody>
      </TableSolid>

      {totalPages > 1 && (
        <Pagination
          onNext={nextPage}
          onPrev={previousPage}
          disableNext={!hasNextPage}
          disablePrev={!hasPrevPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
