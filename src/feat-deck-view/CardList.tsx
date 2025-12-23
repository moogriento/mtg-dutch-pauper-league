import { useState } from 'react';
import type { EnrichedCard, ViewableDeck } from '../domain-models/deck';
import { CardPreview } from './CardPreview';
import clsx from 'clsx';

function Section({
  title,
  list,
  onCardAction,
  onCardDismiss,
}: {
  title: string;
  list: EnrichedCard[];
  onCardAction?: (params: { card: EnrichedCard; rect: DOMRect }) => void;
  onCardDismiss?: () => void;
}) {
  const total = list.reduce((sum, card) => sum + card.count, 0);

  if (total === 0) {
    return null;
  }

  const handleCardAction =
    (card: EnrichedCard) => (e: React.MouseEvent<HTMLSpanElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      onCardAction?.({ card, rect });
    };

  return (
    <>
      <tr className="">
        <th className="font-semibold text-left p-1 text-sm" colSpan={2}>
          {title} ({total})
        </th>
      </tr>
      {list.map((card, index) => (
        <tr key={card.id}>
          <td
            className={clsx('text-right p-1 text-sm', {
              'pb-4': index === list.length - 1,
            })}
          >
            {card.count}
          </td>
          <td
            className={clsx('p-1 text-sm', {
              'pb-4': index === list.length - 1,
            })}
          >
            <span
              onMouseEnter={handleCardAction(card)}
              onMouseLeave={onCardDismiss}
              onPointerDown={handleCardAction(card)}
              onPointerUp={onCardDismiss}
            >
              {card.name}
            </span>
          </td>
        </tr>
      ))}
    </>
  );
}

export function CardList({ viewableDeck }: { viewableDeck: ViewableDeck }) {
  const [preview, setPreview] = useState<{
    card: EnrichedCard;
    rect: DOMRect;
  } | null>(null);

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

  const handleCardAction = ({
    card,
    rect,
  }: {
    card: EnrichedCard;
    rect: DOMRect;
  }) => {
    setPreview({
      card,
      rect,
    });
  };

  const handleCardDismiss = () => {
    setPreview(null);
  };

  return (
    <div className="relative">
      {preview && <CardPreview card={preview.card} rect={preview.rect} />}
      <div className="md:columns-2">
        <table className="">
          <tbody className="">
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
            <Section
              title="Sideboard"
              list={viewableDeck.sideboard}
              onCardAction={handleCardAction}
              onCardDismiss={handleCardDismiss}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
