import type { TournamentStats } from './useTournamentStats';

function StatCard({
  label,
  value,
  smallLabel,
}: {
  label: string;
  value: React.ReactNode;
  smallLabel?: boolean;
}) {
  return (
    <div className="bg-bg-secondary border border-border rounded-lg p-6">
      <div className="text-sm text-text-secondary mb-2 font-medium">
        {label}
      </div>
      <div
        className={`text-accent font-semibold ${
          smallLabel ? 'text-lg' : 'text-3xl'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export function TournamentScorecards({ stats }: { stats: TournamentStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      <StatCard label="Total decks" value={stats.totalDecks} />
      <StatCard label="Unique archetypes" value={stats.totalUniqueArchetypes} />
      <StatCard
        label="Most played"
        value={stats.mostPlayedArchetype}
        smallLabel
      />
      <StatCard
        label="Best conversion"
        value={stats.bestConvertingArchetype}
        smallLabel
      />
    </div>
  );
}
