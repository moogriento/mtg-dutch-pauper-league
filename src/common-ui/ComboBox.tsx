import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { Input } from './Input';

interface Props<T, K extends keyof T = keyof T, L extends keyof T = keyof T> {
  items: T[];
  itemKey: K;
  itemLabel: L;
  initialValue?: T[K] extends string | number ? T[K] : string | undefined;
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
  initialValue = undefined as unknown as Props<T, K, L>['initialValue'],
  onChange = () => {},
  placeholder = 'Search...',
  disabled = false,
}: Props<T, K, L>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialValue ?? '');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const comboboxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    String(item[itemLabel])
      .toLowerCase()
      .includes(searchQuery.toString().toLowerCase())
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
    if (disabled) {
      return;
    }

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
    const value = item[itemKey];
    onChange?.(value);
    setSearchQuery(item[itemLabel] as string);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full" ref={comboboxRef}>
      {/* Input with button */}
      <div className="relative">
        <div>
          <Input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => !disabled && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
          />
          <span className="absolute right-0 p-2">▼</span>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div
          className={clsx(
            'absolute z-10 mt-2 w-full overflow-hidden border',
            'bg-white dark:bg-gray-700',
            'border-gray-300 dark:border-gray-600',
            'text-gray-900 dark:text-gray-200',
            'text-sm shadow-sm'
          )}
        >
          <ul className="max-h-60 overflow-y-auto py-1">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={String(item[itemKey])}
                  onClick={() => handleSelect(item)}
                  className={clsx(
                    'px-4 py-2.5 cursor-pointer flex items-center justify-between',
                    'transition-colors',
                    'hover:bg-gray-100 dark:hover:bg-gray-600',
                    {
                      'bg-gray-100 dark:bg-gray-600':
                        highlightedIndex === index,
                      'font-medium':
                        String(searchQuery) === String(item[itemKey]),
                    }
                  )}
                >
                  <span>{String(item[itemLabel])}</span>
                  {String(searchQuery) === String(item[itemKey]) && <>✔</>}
                </li>
              ))
            ) : (
              <li className="px-4 py-2.5 text-gray-500 dark:text-gray-400">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
