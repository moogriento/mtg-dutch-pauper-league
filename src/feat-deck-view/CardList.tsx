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
  onCardAction?: (params: { card: EnrichedCard; rect: DOMRect }) => void;
  onCardDismiss?: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const total = list.reduce((sum, card) => sum + card.count, 0);

  if (total === 0) return null;

  const handleCardAction =
    (card: EnrichedCard) => (e: React.MouseEvent<HTMLSpanElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      onCardAction?.({ card, rect });
    };

  return (
    <section className="overflow-hidden border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3
                   bg-gray-50 hover:bg-gray-100
                   dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {total}
          </span>
        </div>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      {/* Content */}
      {expanded && (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {list.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-2
                         hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.count}x
                </span>

                <button
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  onMouseEnter={handleCardAction(card)}
                  onMouseLeave={onCardDismiss}
                  onPointerDown={handleCardAction(card)}
                  onPointerUp={onCardDismiss}
                >
                  {card.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
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

      <div className="space-y-4">
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
      </div>
    </div>
  );
}
