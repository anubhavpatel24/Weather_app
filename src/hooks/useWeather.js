
import { useState, useEffect } from 'react';
import { fetchWeatherData, verboseSearchCity } from '../services/weatherApi';

export function useWeather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);

    // Default to a specific location (e.g., London) or try to get user location
    useEffect(() => {
        // Initial load
        fetchWeatherByCity('London');
    }, []);

    const fetchWeatherByCoords = async (lat, lon, cityInfo = null) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchWeatherData(lat, lon);
            setWeather(data);
            if (cityInfo) {
                setLocation(cityInfo);
            } else {
                // If we only have coords (e.g. from GPS), we might want to reverse geocode, 
                // but for now let's just use "Current Location" or wait for a city selection.
                // Or we could fetch city name from Open-Meteo if needed, but the search flow provides it.
                setLocation({ name: 'Current Location', country: '' });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherByCity = async (cityName) => {
        setLoading(true);
        setError(null);
        try {
            const results = await verboseSearchCity(cityName);
            if (results.length > 0) {
                const city = results[0];
                setLocation(city);
                await fetchWeatherByCoords(city.latitude, city.longitude, city);
            } else {
                setError('City not found');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const searchCity = async (query) => {
        return await verboseSearchCity(query);
    }

    return {
        weather,
        loading,
        error,
        location,
        fetchWeatherByCoords,
        fetchWeatherByCity,
        searchCity,
        setLocation // Exposed to manually set location from search results
    };
}
