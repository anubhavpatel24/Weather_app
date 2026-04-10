import { useState, useRef, useEffect } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

export function SearchBar({ onSearch, isSearching }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    import('../services/weatherApi').then((module) => {
      module.verboseSearchCity(debouncedQuery).then((results) => {
        setSuggestions(results);
        setShowSuggestions(true);
      });
    });
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    setQuery(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
    onSearch(city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  return (
    <div ref={wrapperRef} className="relative z-50 w-full">
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="city-search" className="sr-only">
          Search for a city
        </label>
        <input
          id="city-search"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Search any city…"
          className={cn(
            'h-14 w-full rounded-2xl pl-12 pr-4 text-[15px] font-medium',
            'bg-[var(--surface-elevated)] text-[var(--text)] placeholder:text-[var(--text-muted)]',
            'ring-1 ring-[var(--border)] transition-all duration-300',
            'hover:ring-[var(--border-strong)]',
            'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-transparent',
            'shadow-sm'
          )}
        />
        <div
          className="pointer-events-none absolute left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--text-muted)] ring-1 ring-[var(--border)]"
          aria-hidden
        >
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin text-[var(--accent)]" />
          ) : (
            <Search className="h-4 w-4" strokeWidth={2} />
          )}
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul
          className={cn(
            'absolute left-0 right-0 top-[calc(100%+0.5rem)] max-h-56 overflow-y-auto rounded-2xl py-1',
            'glass-panel shadow-2xl',
            'animate-fade-in opacity-0 [animation-fill-mode:forwards]'
          )}
          role="listbox"
        >
          {suggestions.map((city) => (
            <li key={city.id} role="option">
              <button
                type="button"
                onClick={() => handleSelect(city)}
                className={cn(
                  'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors',
                  'hover:bg-[var(--surface)] focus:bg-[var(--surface)] focus:outline-none'
                )}
              >
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                  strokeWidth={2}
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[var(--text)]">
                    {city.name}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-[var(--text-muted)]">
                    {city.admin1 ? `${city.admin1}, ` : ''}
                    {city.country}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
