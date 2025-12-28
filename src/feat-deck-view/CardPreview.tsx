import type { EnrichedCard } from '../domain-models/deck';

export function CardPreview({
  card,
  rect,
}: {
  card: EnrichedCard;
  rect: DOMRect;
}) {
  const left = rect.left + 64;
  const top = Math.min(
    rect.top,
    window.innerHeight - 350 // card height
  );

  const isDualSide =
    card.name.indexOf(' //') !== -1 && !card.cardData?.image_uris;

  return (
    <div
      className="fixed z-10 pointer-events-none min-h-[350px] overflow-hidden rounded-xl border"
      style={{ top, left }}
    >
      {isDualSide ? (
        <div className="flex ">
          <img
            className="md:w-[250px]"
            src={card.cardData.card_faces[0].image_uris.normal}
            alt={card.name}
          />
          <img
            className="w-[250px]"
            src={card.cardData.card_faces[1].image_uris.normal}
            alt={card.name}
          />
        </div>
      ) : (
        <img
          className="w-[250px]"
          src={card.cardData.image_uris?.normal}
          alt={card.name}
        />
      )}
    </div>
  );
}
