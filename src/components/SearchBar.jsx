
import { useState, useRef, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useWeather } from '../hooks/useWeather'; // We'll just use the search function if exposed, or pass it as prop

export function SearchBar({ onSearch, isSearching }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const wrapperRef = useRef(null);

    // Simple debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);

    // Fetch suggestions
    useEffect(() => {
        if (debouncedQuery.length < 2) {
            setSuggestions([]);
            return;
        }

        // We need to access the search function. 
        // Ideally this component should receive a search function prop or use the hook directly if it was just for suggestions.
        // Let's assume onSearch is the final action, passing a separate prop for fetching suggestions might be better
        // or we can import the service directly here for autocomplete.
        import('../services/weatherApi').then(module => {
            module.verboseSearchCity(debouncedQuery).then(results => {
                setSuggestions(results);
                setShowSuggestions(true);
            });
        });

    }, [debouncedQuery]);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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
    }

    return (
        <div ref={wrapperRef} className="relative w-full z-50">
            <form onSubmit={handleSubmit} className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search city..."
                    className={cn(
                        "w-full h-10 pl-10 pr-3 rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-md",
                        "border border-white/30 dark:border-white/10",
                        "text-sm text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-sm group-hover:bg-white/30 dark:group-hover:bg-black/30"
                    )}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </div>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 mt-1 bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-lg border border-white/20 shadow-xl max-h-48 overflow-y-auto divide-y divide-white/10 dark:divide-white/5">
                    {suggestions.map((city) => (
                        <li
                            key={city.id}
                            onClick={() => handleSelect(city)}
                            className="px-3 py-2 hover:bg-white/40 dark:hover:bg-white/10 cursor-pointer transition-colors text-gray-800 dark:text-gray-200 flex flex-col"
                        >
                            <span className="text-sm font-medium">{city.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{city.admin1 ? `${city.admin1}, ` : ''}{city.country}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
