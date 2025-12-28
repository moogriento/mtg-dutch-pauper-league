import { useState } from 'react';
import type { EnrichedCard, ViewableDeck } from '../domain-models/deck';
import clsx from 'clsx';
import { NoImagePlaceholder } from './NoImagePlaceholder';

function CardImage({ card }: { card: EnrichedCard }) {
  const hasScryfallData = !!card.cardData;
  const isDualSide =
    card.name.indexOf(' //') !== -1 && !card.cardData?.image_uris;

  if (!hasScryfallData) {
    return (
      <NoImagePlaceholder
        card={card}
        className="mx-auto w-full max-w-[300px] sm:max-w-[250px]"
      />
    );
  }

  if (!isDualSide) {
    return (
      <div className="relative overflow-hidden rounded-xl">
        <img
          className="mx-auto w-full max-w-[300px] sm:max-w-[250px]"
          src={card.cardData.image_uris?.normal}
          alt={card.name}
        />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 border bg-black/70 text-sm px-2 py-1 font-medium text-white">
          {card.count}x
        </div>
      </div>
    );
  }

  const front = card.cardData.card_faces[0].image_uris?.normal;
  const back = card.cardData.card_faces[1].image_uris?.normal;

  const [flipped, setFlipped] = useState(false);

  return (
    <div className="group relative mx-auto w-fit [perspective:1000px] overflow-hidden rounded-xl">
      {/* Flip button */}
      <button
        onClick={() => setFlipped((v) => !v)}
        className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity absolute right-2 top-2 z-10 rounded bg-black/70 px-2 py-1 text-xs text-white hover:bg-black"
      >
        Flip card
      </button>

      {/* Card */}
      <div
        className={clsx(
          'relative transition-transform duration-500 ease-in-out',
          '[transform-style:preserve-3d]',
          flipped && '[transform:rotateY(180deg)]'
        )}
      >
        {/* Front */}
        <img
          src={front}
          alt={`${card.name} front`}
          className="block w-full max-w-[300px] sm:max-w-[250px]
                     [backface-visibility:hidden]"
        />

        {/* Back */}
        <img
          src={back}
          alt={`${card.name} back`}
          className="absolute inset-0 w-full max-w-[300px] sm:max-w-[250px]
                     [transform:rotateY(180deg)]
                     [backface-visibility:hidden]"
        />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 border bg-black/70 text-sm px-2 py-1 font-medium text-white">
        {card.count}x
      </div>
    </div>
  );
}

function Section({ title, list }: { title: string; list: EnrichedCard[] }) {
  const [expanded, setExpanded] = useState(true);
  const total = list.reduce((sum, card) => sum + card.count, 0);

  if (total === 0) return null;

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
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-1 my-4 px-1">
          {list.map((card) => (
            <CardImage key={card.id} card={card} />
          ))}
        </div>
      )}
    </section>
  );
}

export function CardListImages({
  viewableDeck,
}: {
  viewableDeck: ViewableDeck;
}) {
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

  return (
    <div className="space-y-4">
      <Section title="Creatures" list={creature} />
      <Section title="Instants" list={instant} />
      <Section title="Sorceries" list={sorcery} />
      <Section title="Enchantments" list={enchantment} />
      <Section title="Artifacts" list={artifact} />
      <Section title="Planeswalkers" list={planeswalker} />
      <Section title="Others" list={other} />
      <Section title="Lands" list={land} />
      <Section title="Sideboard" list={viewableDeck.sideboard} />
    </div>
  );
}
