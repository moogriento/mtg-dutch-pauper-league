import { Link } from 'react-router';
import { supabase } from '../helper-api/supabase';
import { useQuery } from '../helper-query/useQuery';
import styles from './Standings.module.css';
import { usePagination } from '../helper-pagination/usePagination';

export function Standings({ tournamentId }: { tournamentId: string }) {
  const { data } = useQuery({
    queryKey: ['standings', 'dutch-pauper-league-9-leg-2025'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('standings')
        .select(
          `
          position,
          player_id,
          deck_id,
          wins,
          losses,
          draws,
          ...deck!inner(
            archetype
          )
          `
        )
        .eq('tournament_id', tournamentId)
        .order('position', {
          ascending: true,
        });

      if (error) {
        throw error;
      }

      return data;
    },
  });

  const {
    items,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination({ list: data ?? [], pageSize: 20 });

  return (
    <div>
      <div className={styles['standings-table']}>
        <h2 className="subtitle">Standings</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Archetype</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Draws</th>
              <th>View Deck</th>
            </tr>
          </thead>
          <tbody>
            {items.map((standing) => (
              <tr key={standing.deck_id}>
                <td>{standing.position}</td>
                <td>{standing.archetype}</td>
                <td>{standing.wins}</td>
                <td>{standing.losses}</td>
                <td>{standing.draws}</td>
                <td>
                  <Link
                    to={`/tournament/${tournamentId}/deck/${standing.deck_id}`}
                  >
                    View deck
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={previousPage} disabled={!hasPrevPage}>
          Prev
        </button>
        Page {currentPage} of {totalPages}
        <button onClick={nextPage} disabled={!hasNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
