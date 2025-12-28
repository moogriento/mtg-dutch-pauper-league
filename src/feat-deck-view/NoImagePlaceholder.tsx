import clsx from 'clsx';
import type { EnrichedCard } from '../domain-models/deck';

export function NoImagePlaceholder({
  card,
  className,
}: {
  card: EnrichedCard;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'w-64 h-[360px] bg-neutral-900 dark:bg-black rounded-xl shadow-xl p-2 relative',
        className
      )}
    >
      <div className="w-full h-full bg-neutral-100 dark:bg-gray-500 rounded-lg flex flex-col p-2">
        <div className="flex items-center bg-neutral-300 dark:bg-gray-400 dark:text-black rounded border px-2 py-1 text-sm font-medium">
          {card.name}
        </div>

        <div className="mt-2 h-32 bg-neutral-300 dark:bg-gray-400 rounded border border-neutral-700 flex items-center justify-center text-xs text-neutral-600 dark:text-black text-center">
          Could not retrieve card details from scryfall.
        </div>

        <div className="mt-2 h-6 bg-neutral-300 dark:bg-gray-400 rounded px-2 py-1 text-xs font-semibold text-white border border-neutral-800"></div>

        {/* Rules box */}
        <div className="mt-2 flex-1 bg-neutral-300 dark:bg-gray-400 rounded border border-neutral-700 p-2 text-xs leading-tight" />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 border bg-black/70 text-sm px-2 py-1 font-medium text-white">
        {card.count}x
      </div>
    </div>
  );
}
