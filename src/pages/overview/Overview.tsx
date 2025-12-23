import { Link } from 'react-router';
import type { Tournament } from '../../domain-models/tournament';
import { supabase } from '../../helper-api/supabase';
import { useQuery } from '../../helper-query/useQuery';
import { usePagination } from '../../helper-pagination/usePagination';
import { H2 } from '../../common-ui/Headings';
import { Pagination } from '../../common-ui/Pagination';

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

  const {
    items,
    currentPage,
    totalPages,
    nextPage,
    hasNextPage,
    previousPage,
    hasPrevPage,
  } = usePagination({ list: data ?? [], pageSize: 5 });

  return (
    <div>
      <section className="text-primary py-12 px-4 md:px-8 rounded-b-lg mt-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 font-heading">
            Dutch Pauper League <br />
            Meta Overview
          </h1>
          <p className="text-md md:text-lg">
            <span className="italic">A wanna try</span> site to check the meta
            distribution per tournament leg.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-8">
        <H2 className="mb-4">Past tournaments</H2>
        <table className="min-w-full border border-border rounded-lg overflow-hidden">
          <thead className="bg-bg-secondary">
            <tr>
              <th className="text-left px-4 py-2 border-b border-border">
                Leg
              </th>
              <th className="text-left px-4 py-2 border-b border-border">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((tournament) => (
              <tr
                key={tournament.id}
                className="hover:bg-bg-tertiary transition text-sm"
              >
                <td className="px-4 py-2 border-b border-border">
                  <Link
                    className="hover:underline"
                    to={`/tournament/${tournament.id}`}
                  >
                    {tournament.name}
                  </Link>
                </td>
                <td className="px-4 py-2 border-b border-border">
                  {new Date(tournament.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
    </div>
  );
}
