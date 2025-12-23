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
          className="inline-flex items-center gap-1 rounded-full border border-border bg-bg-tertiary px-3 py-1"
        >
          <span className="text-text-primary">
            {labelForFilter(key, value)}
          </span>
        </span>
      ))}
    </section>
  );
}
