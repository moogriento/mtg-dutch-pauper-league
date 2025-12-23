import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

interface Props<T, K extends keyof T = keyof T, L extends keyof T = keyof T> {
  items: T[];
  itemKey: K;
  itemLabel: L;
  value?: T[K] extends string | number ? T[K] : string | undefined;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: T[K]) => void;
}

export function Combobox<
  T,
  K extends keyof T = keyof T,
  L extends keyof T = keyof T
>({
  items = [] as T[],
  itemKey = 'id' as unknown as K,
  itemLabel = 'value' as unknown as L,
  value = undefined as unknown as Props<T, K, L>['value'],
  onChange = () => {},
  placeholder = 'Search...',
  disabled = false,
}: Props<T, K, L>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const comboboxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    String(item[itemLabel]).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset highlighted index when filtered items change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredItems[highlightedIndex]) {
          handleSelect(filteredItems[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (item: T) => {
    onChange?.(item[itemKey]);
    setSearchQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full" ref={comboboxRef}>
      {/* Input with button */}
      <div className="relative">
        <div
          className={clsx(
            'flex items-center rounded-lg border transition-all bg-bg-primary disabled:bg-bg-tertiary disabled:opacity-6 disabled:cursor-not-allowed',
            {
              'border-border': !isOpen,
              'border-accent': isOpen,
              'shadow-sm shadow-shadow': isOpen,
            }
          )}
        >
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => !disabled && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={value ? String(value) : placeholder}
            disabled={disabled}
            className="w-full px-4 pr-10 py-2.5 font-sans rounded-lg focus:outline-none bg-transparent text-text-primary disabled:cursor-not-allowed"
          />
          <button
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className="absolute right-2 p-1 rounded transition text-text-muted disabled:cursor-not-allowed hover:bg-bg-tertiary"
          >
            ▼
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-2 rounded-lg border overflow-hidden bg-bg-primary border-border shadow-shadow-card">
          <ul className="max-h-60 overflow-y-auto py-1">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={String(item[itemKey])}
                  onClick={() => handleSelect(item)}
                  className={clsx(
                    'px-4 py-2.5 font-sans cursor-pointer text-text-primary flex items-center justify-between transition-colors hover:bg-bg-tertiary',
                    {
                      'bg-bg-tertiary': highlightedIndex === index,
                      'text-accent': String(value) === String(item[itemKey]),
                    }
                  )}
                >
                  <span>{String(item[itemLabel])}</span>
                  {String(value) === String(item[itemKey]) && <>✔</>}
                </li>
              ))
            ) : (
              <li className="px-4 py-2.5 font-sans text-text-muted">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
