import { supabase } from '../helper-api/supabase';
import { useQuery } from '../helper-query/useQuery';
import { H2 } from '../common-ui/Headings';
import { TableClean } from '../common-ui/Tables';
import { Link } from '../common-ui/Link';

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

  return (
    <div className="mt-8 mb-4">
      <H2>Standings</H2>
      <TableClean>
        <TableClean.Thead>
          <TableClean.Tr>
            <TableClean.Th>#</TableClean.Th>
            <TableClean.Th>Archetype</TableClean.Th>
            <TableClean.Th className="hidden md:table-cell">Wins</TableClean.Th>
            <TableClean.Th className="hidden md:table-cell">
              Losses
            </TableClean.Th>
            <TableClean.Th className="hidden md:table-cell">
              Draws
            </TableClean.Th>
            <TableClean.Th className="md:hidden">Record</TableClean.Th>
            <TableClean.Th>View Deck</TableClean.Th>
          </TableClean.Tr>
        </TableClean.Thead>
        <TableClean.Tbody>
          {data?.map((standing) => (
            <TableClean.Tr key={standing.deck_id}>
              <TableClean.Td className="md:text-right md:w-[56px]">
                {standing.position}
              </TableClean.Td>
              <TableClean.Td>{standing.archetype}</TableClean.Td>
              <TableClean.Td className="hidden md:table-cell">
                {standing.wins}
              </TableClean.Td>
              <TableClean.Td className="hidden md:table-cell">
                {standing.losses}
              </TableClean.Td>
              <TableClean.Td className="hidden md:table-cell">
                {standing.draws}
              </TableClean.Td>
              <TableClean.Td className="md:hidden">
                {standing.wins} - {standing.losses} - {standing.draws}
              </TableClean.Td>
              <TableClean.Td>
                <Link
                  to={`/tournament/${tournamentId}/deck/${standing.deck_id}`}
                >
                  View deck
                </Link>
              </TableClean.Td>
            </TableClean.Tr>
          ))}
        </TableClean.Tbody>
      </TableClean>
    </div>
  );
}
