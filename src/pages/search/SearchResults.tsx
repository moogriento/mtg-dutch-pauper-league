import {
  useLoaderData,
  useSearchParams,
  Link,
  type LoaderFunctionArgs,
} from 'react-router';
import { supabase } from '../../helper-api/supabase';
import type { DeckSearch } from '../../domain-models/deck';
import { H1 } from '../../common-ui/Headings';
import { PaginationSearch } from '../../common-ui/PaginationSearch';
import type { Tournament } from '../../domain-models/tournament';
import { AppliedFilters, type Filters } from '../../feat-search/AppliedFilters';
import { getDisplayRange } from '../../helper-pagination/formatter';
import { NoResults } from '../../feat-search/NoResults';

interface LoaderData {
  decks: DeckSearch[];
  page: number;
  totalResults: number;
  filters: Filters;
}

const PAGE_SIZE = 20;

export async function searchResultsLoader({
  request,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const cardName = searchParams.get('cardName');
  const minCardCount = searchParams.get('minCardCount');
  const tournament = searchParams.get('tournament');
  const archetype = searchParams.get('archetype');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const offset = (page - 1) * PAGE_SIZE;

  let cardCount = !cardName ? null : parseInt(minCardCount ?? '0', 10);

  if (cardName && !minCardCount) {
    cardCount = 1;
  }

  // TODO : normalize the dates!

  const promises = [
    supabase.rpc('get_decks_with_card_info', {
      tournament_id_text: tournament,
      p_start_date: startDate,
      p_archetype: archetype,
      p_end_date: endDate,
      card_name: cardName,
      min_count: cardCount,
      p_limit: PAGE_SIZE,
      p_offset: offset,
    }),
  ];

  if (tournament) {
    promises.push(
      supabase.from('tournament').select().eq('id', tournament).single() as any
    );
  }

  const [searchResult, tournamentResult] = await Promise.all(promises);

  if (searchResult.error) {
    throw new Response('Could not fetch decks', { status: 500 });
  }

  if (tournament && tournamentResult.error) {
    throw new Response('Could not fetch tournaments', { status: 500 });
  }

  if (tournament && !tournamentResult.data) {
    throw new Response('Invalid tournament', { status: 404 });
  }

  const decks = searchResult.data as DeckSearch[];
  const totalResults = decks && decks.length > 0 ? decks[0].total_count : 0;

  const filters = {
    cardName,
    minCount: cardCount,
    tournament: tournament ? (tournamentResult.data as Tournament).name : null,
    fromDate: startDate,
    toDate: endDate,
    archetype,
  };

  return { decks, page, totalResults, filters };
}

export function SearchResults() {
  const { decks, page, totalResults, filters } = useLoaderData<LoaderData>();
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
  };

  const { start, end } = getDisplayRange(page, PAGE_SIZE, totalResults);
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  return (
    <div className="my-8">
      <H1 className="mb-4">Search results</H1>

      <div className="my-2">
        {totalResults === 0 ? (
          <span className="text-sm">0 decks found where:</span>
        ) : (
          <span className="text-sm">
            {start} - {end} of {totalResults} decks sorted by tournament
            position where:
          </span>
        )}
        <AppliedFilters filters={filters} />
      </div>

      <div className="mt-4 mb-4">
        <PaginationSearch
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {totalResults === 0 && <NoResults />}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {decks.map((deck) => (
          <li
            key={deck.id}
            className="rounded-lg border border-border bg-bg-primary p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-text-primary">
                  {deck.archetype}
                </h3>
                <p className="text-xs text-text-secondary">
                  {deck.tournament_name}
                </p>
              </div>

              <span className="rounded bg-bg-tertiary px-2 py-1 text-xs font-medium">
                #{deck.standings_position}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              <div>
                <span className="text-text-secondary">Date</span>
                <div>
                  {new Date(deck.tournament_start_date).toLocaleDateString()}
                </div>
              </div>

              <div>
                <span className="text-text-secondary">Record</span>
                <div>
                  {deck.wins}-{deck.losses}-{deck.draws}
                </div>
              </div>

              {deck.card_count && (
                <div>
                  <span className="text-text-secondary">Cards</span>
                  <div>{deck.card_count}</div>
                </div>
              )}

              {deck.card_location !== 'none' && (
                <div>
                  <span className="text-text-secondary">Card found</span>
                  <div className="capitalize">{deck.card_location}</div>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                {deck.card_location === 'mainboard' && 'Mainboard'}
                {deck.card_location === 'sideboard' && 'Sideboard'}
                {deck.card_location === 'both' && 'Main & Side'}
              </span>

              <Link
                to={`/tournament/${deck.tournament_id}/deck/${deck.id}`}
                className="text-sm font-medium text-accent hover:underline"
              >
                View deck →
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="my-4">
        <PaginationSearch
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
