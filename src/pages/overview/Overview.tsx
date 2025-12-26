import type { Tournament } from '../../domain-models/tournament';
import { supabase } from '../../helper-api/supabase';
import { useQuery } from '../../helper-query/useQuery';
import { usePagination } from '../../helper-pagination/usePagination';
import { H2 } from '../../common-ui/Headings';
import { Pagination } from '../../common-ui/Pagination';
import { TableSolid } from '../../common-ui/Tables';
import { Link } from '../../common-ui/Link';

function Skeleton() {
  return (
    <TableSolid className="animate-pulse">
      <TableSolid.Thead>
        <tr>
          <TableSolid.Th>Tournament</TableSolid.Th>
          <TableSolid.Th>Played on</TableSolid.Th>
        </tr>
      </TableSolid.Thead>
      <TableSolid.Tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableSolid.Tr key={index}>
            <TableSolid.Td>
              <div className="h-5 w-80 rounded bg-gray-200 dark:bg-gray-700" />
            </TableSolid.Td>
            <TableSolid.Td>
              <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
            </TableSolid.Td>
          </TableSolid.Tr>
        ))}
      </TableSolid.Tbody>
    </TableSolid>
  );
}

export function OverviewPage() {
  const { data, isLoading } = useQuery({
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
        <div className="max-w-4xl mx-auto text-center max-w-[600px]">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 font-heading">
            Dutch Pauper League Meta Overview
          </h1>
          <p className="text-md md:text-lg">
            <span className="italic">A wanna try</span> site to check the meta
            distribution per tournament leg. <br />
            Data comes from topdeck.gg. The formula to calcualte the archtypes
            might not be 100% reliable, so it's always better to double check
            with the actual deck content
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-8 mb-8">
        <H2 className="mb-4">Past tournaments</H2>

        {isLoading && <Skeleton />}
        {!isLoading && (
          <TableSolid>
            <TableSolid.Thead>
              <tr>
                <TableSolid.Th>Tournament</TableSolid.Th>
                <TableSolid.Th>Played on</TableSolid.Th>
              </tr>
            </TableSolid.Thead>
            <TableSolid.Tbody>
              {items.map((tournament) => (
                <TableSolid.Tr key={tournament.id}>
                  <TableSolid.Td>
                    <Link to={`/tournament/${tournament.id}`}>
                      {tournament.name}
                    </Link>
                  </TableSolid.Td>
                  <TableSolid.Td>
                    {new Date(tournament.created_at).toLocaleDateString()}
                  </TableSolid.Td>
                </TableSolid.Tr>
              ))}
            </TableSolid.Tbody>
          </TableSolid>
        )}
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
