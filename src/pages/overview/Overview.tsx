import { Link } from 'react-router';
import type { Tournament } from '../../domain-models/tournament';
import { supabase } from '../../helper-api/supabase';
import { useQuery } from '../../helper-query/useQuery';
import { usePagination } from '../../helper-pagination/usePagination';

export function OverviewPage() {
  const { data } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tournament')
        .select()
        .order('start_date', {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      return data as Tournament[];
    },
  });

  const { items } = usePagination({ list: data ?? [], pageSize: 5 });

  return (
    <div>
      <h1>Dutch pauper league</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Leg</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((tournament) => (
              <tr key={tournament.id}>
                <td>
                  <Link to={`/tournament/${tournament.id}`}>
                    {tournament.name}
                  </Link>
                </td>
                <td>{new Date(tournament.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
}
