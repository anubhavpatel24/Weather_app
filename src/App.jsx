
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastList } from './components/ForecastList';
import { useWeather } from './hooks/useWeather';
import { Loader2, AlertCircle } from 'lucide-react';

function App() {
  const { weather, loading, error, location, fetchWeatherByCity, searchCity } = useWeather();

  const handleSearch = (city) => {
    fetchWeatherByCity(city.name);
  };

  return (
    <Layout>
      <Header />

      <div className="flex flex-col gap-4 w-full">
        <SearchBar onSearch={handleSearch} isSearching={loading} />

        {error && (
          <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {loading && !weather && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 animate-spin text-white/50" />
            <p className="mt-4 text-white/50">Loading weather data...</p>
          </div>
        )}

        {!loading && !error && weather && (
          <div className="animate-fade-in">
            <WeatherCard current={weather.current} location={location} />
            <ForecastList daily={weather.daily} />
          </div>
        )}

        {!loading && !error && !weather && (
          <div className="text-center py-12 text-white/50">
            <p>Search for a city to see the weather.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
