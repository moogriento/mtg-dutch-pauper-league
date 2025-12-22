import { useState } from 'react';
import type { EnrichedCard, ViewableDeck } from '../domain-models/deck';
import { CardPreview } from './CardPreview';

function Section({
  title,
  list,
  onCardAction,
  onCardDismiss,
}: {
  title: string;
  list: EnrichedCard[];
  onCardAction?: (card: EnrichedCard) => void;
  onCardDismiss?: (card: EnrichedCard) => void;
}) {
  const total = list.reduce((sum, card) => sum + card.count, 0);

  if (total === 0) {
    return null;
  }

  const handleCardAction = (card: EnrichedCard) => () => {
    onCardAction?.(card);
  };

  const handleCardDismiss = (card: EnrichedCard) => () => {
    onCardDismiss?.(card);
  };

  return (
    <>
      <tr>
        <th colSpan={2}>
          {title} ({total})
        </th>
      </tr>
      {list.map((card) => (
        <tr key={card.id}>
          <td>{card.count}</td>
          <td
            onMouseEnter={handleCardAction(card)}
            onMouseLeave={handleCardDismiss(card)}
            onPointerDown={handleCardAction(card)}
            onPointerUp={handleCardDismiss(card)}
          >
            {card.name}
          </td>
        </tr>
      ))}
    </>
  );
}

export function CardList({ viewableDeck }: { viewableDeck: ViewableDeck }) {
  const [hoveredCard, setHoveredCard] = useState<EnrichedCard | null>(null);

  const {
    creature,
    instant,
    sorcery,
    artifact,
    enchantment,
    land,
    planeswalker,
    other,
  } = viewableDeck.mainboard;

  const handleCardAction = (card: EnrichedCard) => {
    console.log('Hovered card:', card);
    setHoveredCard(card);
  };

  const handleCardDismiss = () => {
    // setHoveredCard(null);
  };

  return (
    <div>
      {hoveredCard && <CardPreview card={hoveredCard} />}
      <table>
        <tbody>
          <Section
            title="Creatures"
            list={creature}
            onCardAction={handleCardAction}
            onCardDismiss={handleCardDismiss}
          />
          <Section
            title="Instants"
            list={instant}
            onCardAction={handleCardAction}
            onCardDismiss={handleCardDismiss}
          />
          <Section
            title="Sorceries"
            list={sorcery}
            onCardAction={handleCardAction}
            onCardDismiss={handleCardDismiss}
          />
          <Section
            title="Enchantments"
            list={enchantment}
            onCardAction={handleCardAction}
            onCardDismiss={handleCardDismiss}
          />
          <Section
            title="Artifacts"
            list={artifact}
            onCardAction={handleCardAction}
            onCardDismiss={handleCardDismiss}
          />
          <Section
            title="Planeswalkers"
            list={planeswalker}
            onCardAction={handleCardAction}
            onCardDismiss={handleCardDismiss}
          />
          <Section
            title="Others"
            list={other}
            onCardAction={handleCardAction}
            onCardDismiss={handleCardDismiss}
          />
          <Section
            title="Lands"
            list={land}
            onCardAction={handleCardAction}
            onCardDismiss={handleCardDismiss}
          />
        </tbody>
      </table>
    </div>
  );
}
