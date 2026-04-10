import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastList } from './components/ForecastList';
import { useWeather } from './hooks/useWeather';
import { Loader2, AlertCircle, Compass } from 'lucide-react';
import { cn } from './lib/utils';

function App() {
  const { weather, loading, error, location, fetchWeatherByCity } = useWeather();

  const handleSearch = (city) => {
    fetchWeatherByCity(city.name);
  };

  return (
    <Layout>
      <Header />

      <div className="flex w-full flex-col gap-6 sm:gap-8">
        <SearchBar onSearch={handleSearch} isSearching={loading} />

        {error && (
          <div
            role="alert"
            className={cn(
              'flex items-start gap-4 rounded-2xl p-4 sm:p-5',
              'bg-red-500/10 ring-1 ring-red-500/25',
              'animate-fade-in'
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
              <AlertCircle className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-red-200 light:text-red-900">
                Something went wrong
              </p>
              <p className="mt-1 text-sm text-red-200/80 light:text-red-800/90">{error}</p>
            </div>
          </div>
        )}

        {loading && !weather && (
          <div
            className="flex flex-col items-center justify-center gap-5 py-16 sm:py-20"
            aria-busy="true"
            aria-live="polite"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-xl"
                style={{ background: 'var(--accent-glow)' }}
              />
              <Loader2
                className="relative h-12 w-12 animate-spin text-[var(--accent)]"
                strokeWidth={1.5}
              />
            </div>
            <div className="text-center">
              <p className="font-display text-base font-semibold text-[var(--text)]">
                Gathering skies…
              </p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Pulling the latest forecast</p>
            </div>
          </div>
        )}

        {!loading && !error && weather && (
          <div className="flex flex-col gap-8 sm:gap-10">
            <WeatherCard current={weather.current} location={location} />
            <ForecastList daily={weather.daily} />
          </div>
        )}

        {!loading && !error && !weather && (
          <div
            className={cn(
              'flex flex-col items-center justify-center gap-4 rounded-[1.75rem] py-16 text-center',
              'bg-[var(--surface)] ring-1 ring-[var(--border)] sm:py-20'
            )}
          >
            <div
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-2xl',
                'bg-[var(--surface-elevated)] text-[var(--accent)] ring-1 ring-[var(--border)]'
              )}
            >
              <Compass className="h-8 w-8" strokeWidth={1.25} />
            </div>
            <div className="max-w-xs px-4">
              <p className="font-display text-lg font-bold text-[var(--text)]">No data yet</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                Search for a city above — we’ll paint the forecast in seconds.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
