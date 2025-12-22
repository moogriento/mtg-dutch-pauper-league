import { useParams } from 'react-router';
import { useGetCards } from '../../feat-deck-view/useGetCards';
import { CardList } from '../../feat-deck-view/CardList';
import { usePageTitle } from '../../helper-page/usePageTitle';

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
    <div>
      <h1>Deck Details</h1>
      <div>
        <h3>Mainboard</h3>

        <CardList viewableDeck={data} />
      </div>
    </div>
  );
}
