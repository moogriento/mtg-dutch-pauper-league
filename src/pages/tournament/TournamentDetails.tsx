import { useParams } from 'react-router';
import { TournamentScorecards } from '../../feat-tournament/TournamentScorecards';
import { Standings } from '../../feat-tournament/Standings';
import { MetaChart } from '../../feat-tournament/MetaChart';
import { useTournamentStats } from '../../feat-tournament/useTournamentStats';
import { MetaList } from '../../feat-tournament/MetaList';
import { usePageTitle } from '../../helper-page/usePageTitle';

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
    <div>
      <h1 className="title">{tournament.name}</h1>
      <p>Date: {new Date(tournament.start_date).toLocaleDateString()}</p>
      <TournamentScorecards stats={data.stats} />
      <h2 className="subtitle">Metagame Overview</h2>
      <MetaChart
        totalDecks={data.stats.totalDecks}
        archetypes={data.stats.archetypes}
      />
      <MetaList archetypes={data.stats.archetypes} />
      <Standings tournamentId={tournamentId!} />
    </div>
  );
}
