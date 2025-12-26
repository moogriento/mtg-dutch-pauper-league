import { useState, useRef, useEffect } from 'react';
import { fetchCardsByName } from '../helper-api/scryfall';
import clsx from 'clsx';
import { useDebounce } from '../helper-hooks/useDebounce';
import { Input } from '../common-ui/Input';

export function ScryfallCardSearch({
  onChange,
  debounceMs = 300,
  minChars = 2,
}: {
  onChange?: (cardName: string) => void;
  debounceMs?: number;
  minChars?: number;
}) {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const isSelecting = useRef(false);
  const autocompleteRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<number | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const debouncedCardSearch = useDebounce(async (query: string) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Don't search if query is too short
    if (!query || query.length < minChars) {
      setSuggestions([]);
      setIsLoading(false);
      setIsOpen(false);
      return;
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setError(null);
    setIsOpen(true);

    try {
      const scryfallResults = await fetchCardsByName(query, {
        signal: abortControllerRef.current.signal,
      });

      // Check if component is still mounted and request wasn't cancelled
      if (!abortControllerRef.current.signal.aborted) {
        const results = scryfallResults.map((card) => card.name);

        setSuggestions(results);
        setHighlightedIndex(0);
        setIsLoading(false);
      }
    } catch (err) {
      setError('Failed to fetch cards');
      setIsLoading(false);
    }
  }, debounceMs);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cardName = event.target.value;
    setValue(cardName);
    debouncedCardSearch(cardName);
  };

  const handleSelect = (cardName: string) => {
    // Set selecting flag to prevent useEffect from triggering
    isSelecting.current = true;

    // Cancel any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setSuggestions([]);
    setIsOpen(false);
    setIsLoading(false);

    // Update value and call callbacks
    setValue(cardName);
    onChange?.(cardName);

    inputRef.current?.blur();
  };

  const handleClear = () => {
    // Cancel any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setValue('');
    setSuggestions([]);
    setIsOpen(false);
    setIsLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'ArrowDown' && suggestions.length > 0) {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (suggestions[highlightedIndex]) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const hasResults = suggestions.length > 0;

  return (
    <div className="relative w-full" ref={autocompleteRef}>
      <div>
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => value.length >= minChars && setIsOpen(true)}
            placeholder="e.g. Lightning Bolt"
          />

          {/* Right-side icons */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {isLoading && (
              <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-500 border-t-transparent rounded-full animate-spin" />
            )}

            {value && !isLoading && (
              <button
                onClick={handleClear}
                className="p-1 rounded transition-colors text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                aria-label="Clear"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            className={clsx(
              'absolute z-10 mt-2 w-full overflow-hidden border shadow-sm',
              'bg-white dark:bg-gray-700',
              'border-gray-300 dark:border-gray-600',
              'text-gray-900 dark:text-gray-200',
              'text-sm'
            )}
          >
            {error && (
              <div className="px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {!isLoading && !hasResults && value.length >= minChars && (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                No results found
              </div>
            )}

            {!error && suggestions.length > 0 && (
              <ul className="max-h-60 overflow-y-auto py-1">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    onClick={() => handleSelect(suggestion)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={clsx(
                      'px-4 py-2.5 cursor-pointer transition-colors',
                      'hover:bg-gray-100 dark:hover:bg-gray-600',
                      {
                        'bg-gray-100 dark:bg-gray-600':
                          highlightedIndex === index,
                      }
                    )}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
