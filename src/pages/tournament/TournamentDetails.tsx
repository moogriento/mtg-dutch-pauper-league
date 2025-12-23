import { useParams } from 'react-router';
import { TournamentScorecards } from '../../feat-tournament/TournamentScorecards';
import { Standings } from '../../feat-tournament/Standings';
import { MetaChart } from '../../feat-tournament/MetaChart';
import { useTournamentStats } from '../../feat-tournament/useTournamentStats';
import { MetaList } from '../../feat-tournament/MetaList';
import { usePageTitle } from '../../helper-page/usePageTitle';
import { H1, H2 } from '../../common-ui/Headings';

export function TournamentDetailsPage() {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  // TODO: validate tournamentId presence

  const { data, isLoading } = useTournamentStats(tournamentId!);
  const { tournament } = data;
  usePageTitle(`Tournament: ${tournament?.name}`);

  if (isLoading) {
    return <div>Loading tournament details...</div>;
  }

  if (!tournament) {
    return <div>Tournament not found</div>;
  }

  return (
    <div className="mt-8">
      <H1>{tournament.name}</H1>
      <p>Played on: {new Date(tournament.start_date).toLocaleDateString()}</p>
      <TournamentScorecards stats={data.stats} />
      <H2 className="mb-8">Metagame Overview</H2>
      <div className="mb-8">
        <MetaChart
          totalDecks={data.stats.totalDecks}
          archetypes={data.stats.archetypes}
        />
      </div>

      <MetaList archetypes={data.stats.archetypes} />
      <Standings tournamentId={tournamentId!} />
    </div>
  );
}
