import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { TournamentScorecards } from '../../feat-tournament/TournamentScorecards';
import { Standings } from '../../feat-tournament/Standings';
import { MetaChart } from '../../feat-tournament/MetaChart';
import { useTournamentStats } from '../../feat-tournament/useTournamentStats';
import { MetaList } from '../../feat-tournament/MetaList';
import { usePageTitle } from '../../feat-navigation/usePageTitle';
import { H1, H2 } from '../../common-ui/Headings';
import { supabase } from '../../helper-api/supabase';
import type { Tournament } from '../../domain-models/tournament';

export async function tournamentPageLoader({ params }: LoaderFunctionArgs) {
  const { tournamentId } = params;

  if (!tournamentId) {
    throw new Response('Not Found', { status: 404 });
  }

  const { data, error } = await supabase
    .from('tournament')
    .select()
    .eq('id', tournamentId)
    .single();

  if (error || !data) {
    throw new Response('Not Found', { status: 404 });
  }

  return { tournament: data as Tournament };
}

export function TournamentDetailsPage() {
  const { tournament } = useLoaderData<{ tournament: Tournament }>();
  usePageTitle(`Tournament: ${tournament.name}`);
  const { data, isLoading } = useTournamentStats(tournament.id);

  return (
    <div className="mt-8">
      <H1>{tournament.name}</H1>
      <p className="mb-4 text-sm">
        Played on: {new Date(tournament.start_date).toLocaleDateString()}
      </p>
      <TournamentScorecards loading={isLoading} stats={data.stats} />
      <H2 className="mb-8">Metagame Overview</H2>
      <div className="mb-8">
        <MetaChart
          loading={isLoading}
          totalDecks={data.stats.totalDecks}
          archetypes={data.stats.archetypes}
        />
      </div>

      <MetaList loading={isLoading} archetypes={data.stats.archetypes} />
      <Standings tournamentId={tournament.id} />
    </div>
  );
}
