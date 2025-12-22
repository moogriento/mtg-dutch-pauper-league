import { useState } from 'react';
import type { ArchetypeStats } from './useTournamentStats';
import styles from './MetaList.module.css';

type SortKey = 'total' | 'winrate' | 'conversionrate';

export function MetaList({ archetypes }: { archetypes: ArchetypeStats[] }) {
  const [list, setList] = useState(archetypes);
  const [sortKey, setSortKey] = useState<SortKey>('total');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

    setSortKey(key);
    setSortOrder(newOrder);
    setList(sortedList);
  };

  const getSortClass = (key: SortKey) => {
    if (sortKey !== key) {
      return '';
    }

    return sortOrder === 'asc' ? 'sort-asc' : 'sort-desc';
  };

  const getValueClass = (value: number | undefined) => {
    if (value === undefined) {
      return '';
    }

    if (value >= 51) {
      return styles.positive;
    }

    if (value >= 50) {
      return styles.neutral;
    }

    return styles.negative;
  };

  return (
    <div className={styles['archetype-table']}>
      <table>
        <thead>
          <tr>
            <th>Archetype</th>
            <th
              className={`sortable ${getSortClass('total')}`}
              onClick={handleSort('total')}
            >
              Total decks
            </th>
            <th
              className={`sortable ${getSortClass('winrate')}`}
              onClick={handleSort('winrate')}
            >
              Win Rate
            </th>
            <th
              className={`sortable ${getSortClass('conversionrate')}`}
              onClick={handleSort('conversionrate')}
            >
              Conversion Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <tr key={item.archetype}>
                <td className={styles.archetypeName}>{item.archetype}</td>
                <td className={styles.columnStat}>{item.total_decks}</td>
                <td className={getValueClass(item.win_rate)}>
                  {item.win_rate?.toFixed(1)}%
                </td>
                <td className={getValueClass(item.conversion_rate)}>
                  {item.conversion_rate?.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
