export interface Filters {
  tournament: string | null;
  fromDate: string | null;
  toDate: string | null;
  archetype: string | null;
  cardName: string | null;
  minCount: number | null;
}

type AppliedFiltersProps = {
  filters: Filters;
};

function labelForFilter(key: string, value: any) {
  switch (key) {
    case 'tournament':
      return `Tournament: ${value}`;
    case 'fromDate':
      return `From: ${value}`;
    case 'toDate':
      return `To: ${value}`;
    case 'archetype':
      return `Archetype: ${value}`;
    case 'cardName':
      return `Card: ${value}`;
    case 'minCount':
      return `≥ ${value} copies`;
    default:
      return `${key}: ${value}`;
  }
}

export function AppliedFilters({ filters }: AppliedFiltersProps) {
  const entries = Object.entries(filters).filter(
    ([, value]) => value !== undefined && value !== '' && value !== null
  );

  if (entries.length === 0) return null;

  return (
    <section className="mb-4 flex flex-wrap items-center gap-2 text-sm">
      {entries.map(([key, value]) => (
        <span
          key={key}
          className="inline-flex items-center gap-1 rounded border border-gray-300 bg-gray-100 px-2 py-0.5 dark:border-gray-600 dark:bg-gray-800"
        >
          <span className="text-gray-700 dark:text-gray-200">
            {labelForFilter(key, value)}
          </span>
        </span>
      ))}
    </section>
  );
}
