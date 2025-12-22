import type { EnrichedCard } from '../domain-models/deck';
import styles from './CardPreview.module.css';

export function CardPreview({
  card,
  onDismiss,
}: {
  card: EnrichedCard;
  onDismiss: () => void;
}) {
  const isDualSide = card.cardData.card_faces?.length > 0;

  return (
    <div
      className={styles.cardPreview}
      onMouseOut={onDismiss}
      onPointerDown={onDismiss}
    >
      {isDualSide ? (
        <>
          <img
            className={styles.image}
            src={card.cardData.card_faces[0].image_uris.normal}
            alt={card.name}
          />
          <img
            className={styles.image}
            src={card.cardData.card_faces[1].image_uris.normal}
            alt={card.name}
          />
        </>
      ) : (
        <img
          className={styles.image}
          src={card.cardData.image_uris?.normal}
          alt={card.name}
        />
      )}
    </div>
  );
}
