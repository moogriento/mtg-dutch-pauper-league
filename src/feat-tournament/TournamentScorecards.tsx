import clsx from 'clsx';
import type { TournamentStats } from './useTournamentStats';

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'animate-pulse h-9 w-10 rounded bg-border/60 dark:bg-border',
        className
      )}
    />
  );
}

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

export function TournamentScorecards({
  stats,
  loading,
}: {
  stats: TournamentStats;
  loading?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      <StatCard
        label="Total decks"
        value={loading ? <Skeleton /> : stats.totalDecks}
      />
      <StatCard
        label="Unique archetypes"
        value={loading ? <Skeleton /> : stats.totalUniqueArchetypes}
      />
      <StatCard
        label="Most played"
        value={
          loading ? <Skeleton className="w-36" /> : stats.mostPlayedArchetype
        }
        smallLabel
      />
      <StatCard
        label="Best conversion"
        value={
          loading ? (
            <Skeleton className="w-36" />
          ) : (
            stats.bestConvertingArchetype
          )
        }
        smallLabel
      />
    </div>
  );
}
