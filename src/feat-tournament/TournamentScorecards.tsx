import clsx from 'clsx';
import type { TournamentStats } from './useTournamentStats';

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'animate-pulse h-9 w-10 rounded bg-gray-200 dark:bg-gray-700',
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
    <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </div>
      <div
        className={clsx(
          'text-2xl font-bold text-gray-800 dark:text-gray-200 min-h-[36px]',
          {
            'text-lg': smallLabel,
            'text-3xl': !smallLabel,
          }
        )}
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
