import { Link, type LoaderFunctionArgs, useLoaderData } from 'react-router';
import { useGetCards } from '../../feat-deck-view/useGetCards';
import { CardList } from '../../feat-deck-view/CardList';
import { usePageTitle } from '../../feat-navigation/usePageTitle';
import { H1 } from '../../common-ui/Headings';
import { supabase } from '../../helper-api/supabase';
import type { DeckDetails } from '../../domain-models/deck';
import { CardListSkeleton } from '../../feat-deck-view/CardListSkeleton';

export async function viewDeckLoader({ params }: LoaderFunctionArgs) {
  const { tournamentId, deckId } = params;

  if (!tournamentId || !deckId) {
    throw new Response('Not Found', { status: 404 });
  }

  const { data, error } = await supabase
    .from('deck')
    .select(
      `
    id,
    archetype,
    decklist,
    deck_obj,
    ...standings!inner(
      wins,
      losses,
      draws,
      position,
      ...tournament!inner(
        tournament_id:id,
        tournament_name:name,
        tournament_start_date:start_date
      )
    )
    `
    )
    .eq('id', deckId)
    .single();

  if (error || !data) {
    throw new Response('Not Found', { status: 404 });
  }

  return { deck: data as DeckDetails };
}

export function ViewDeckPage() {
  const { deck } = useLoaderData<{ deck: DeckDetails }>();
  usePageTitle(`Deck details - ${deck.id}`);
  const { data: viewableCards, isLoading } = useGetCards(deck);

  return (
    <div className="mt-8">
      <div className="mb-4">
        <nav className="text-sm text-gray-600 dark:text-gray-400 md:flex">
          <div className="hidden md:block mr-8">
            <Link
              to={-1 as any}
              className="inline-flex items-center gap-1 hover:underline"
            >
              ← Back
            </Link>
          </div>

          <div className="sm:hidden">
            <Link
              to={`/tournament/${deck.tournament_id}`}
              className="inline-flex items-center gap-1 hover:underline"
            >
              ← {deck.tournament_name}
            </Link>
          </div>

          <ol className="flex flex-wrap items-center gap-1 md:gap-2">
            <li className="flex items-center gap-1">
              <Link
                to="/"
                className="hover:text-text-primary transition-colors hover:underline"
              >
                Tournaments
              </Link>
              <span className="hidden sm:inline">»</span>
            </li>

            <li className="flex items-center gap-1 min-w-0">
              <Link
                to={`/tournament/${deck.tournament_id}`}
                className="hover:text-text-primary transition-colors truncate max-w-[12rem] sm:max-w-none hover:underline"
                title={deck.tournament_name}
              >
                {deck.tournament_name}
              </Link>
              <span className="hidden sm:inline">»</span>
            </li>

            <li
              className="font-semibold text-text-primary truncate max-w-[8rem] sm:max-w-none"
              title={String(deck.id)}
              aria-current="page"
            >
              {deck.id}
            </li>
          </ol>
        </nav>
      </div>
      <H1 className="mb-4">Deck Details</H1>

      <dl className="grid grid-cols-1 sm:grid-cols-[max-content_1fr] gap-x-6 gap-y-2 mb-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Tournament
        </dt>
        <dd className="text-sm text-gray-700 dark:text-gray-300">
          {deck.tournament_name}
        </dd>

        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Date
        </dt>
        <dd className="text-sm text-gray-700 dark:text-gray-300">
          {new Date(deck.tournament_start_date).toLocaleDateString()}
        </dd>

        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Archetype
        </dt>
        <dd className="text-sm text-gray-700 dark:text-gray-300">
          {deck.archetype}
        </dd>

        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Position
        </dt>
        <dd className="text-sm text-gray-700 dark:text-gray-300">
          #{deck.position}
        </dd>

        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Record
        </dt>
        <dd className="text-sm text-gray-700 dark:text-gray-300">
          {deck.wins} wins - {deck.losses} losses - {deck.draws} draws
        </dd>
      </dl>

      <div className="mb-4">
        {isLoading && <CardListSkeleton />}
        {!isLoading && viewableCards && (
          <CardList viewableDeck={viewableCards} />
        )}
      </div>
    </div>
  );
}
