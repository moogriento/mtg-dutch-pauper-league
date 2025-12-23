import { useParams, Link } from 'react-router';
import { useGetCards } from '../../feat-deck-view/useGetCards';
import { CardList } from '../../feat-deck-view/CardList';
import { usePageTitle } from '../../helper-page/usePageTitle';
import { H1 } from '../../common-ui/Headings';

export function ViewDeckPage() {
  const { deckId } = useParams<{ deckId: string }>();

  const { data, isLoading } = useGetCards(Number(deckId));

  usePageTitle(`Deck details`);

  if (isLoading) {
    return <div>Loading deck details...</div>;
  }

  if (!data) {
    return <div>Deck not found.</div>;
  }

  return (
    <div className="mt-8">
      <div className="mb-4">
        <Link
          to={-1 as any}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
        >
          ← Back
        </Link>

        <nav className="text-sm text-text-secondary" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li>
              <Link
                to="/tournaments"
                className="hover:text-text-primary transition-colors"
              >
                Tournaments
              </Link>
              <span className="mx-1">/</span>
            </li>

            <li>
              <Link
                to={`/tournaments/1`}
                className="hover:text-text-primary transition-colors"
              >
                Pauper 123
              </Link>
              <span className="mx-1">/</span>
            </li>

            <li className="text-text-primary font-semibold">2522</li>
          </ol>
        </nav>
      </div>
      <H1 className="mb-4">Deck Details</H1>
      <p>Position: #12 Record: 1-1-1</p>

      <div>
        <CardList viewableDeck={data} />
      </div>
    </div>
  );
}
