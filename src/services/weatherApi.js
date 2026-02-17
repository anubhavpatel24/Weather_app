
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL || 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_URL = import.meta.env.VITE_GEOCODING_API_URL || 'https://geocoding-api.open-meteo.com/v1/search';

export async function verboseSearchCity(query) {
    if (!query || query.length < 2) return [];
    try {
        const response = await fetch(`${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
        const data = await response.json();
        if (!data.results) return [];

        return data.results.map(city => ({
            id: city.id,
            name: city.name,
            latitude: city.latitude,
            longitude: city.longitude,
            country: city.country,
            admin1: city.admin1,
            country_code: city.country_code,
        }));
    } catch (error) {
        console.error("Error searching city:", error);
        return [];
    }
}

export async function fetchWeatherData(lat, lon) {
    try {
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
            daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max',
            timezone: 'auto'
        });

        const response = await fetch(`${BASE_URL}?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch weather data');

        return await response.json();
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
}

// Helper to map WMO weather codes to descriptions and icon names
export function getWeatherDescription(code) {
    const codes = {
        0: { label: 'Clear sky', icon: 'sun' },
        1: { label: 'Mainly clear', icon: 'cloud-sun' },
        2: { label: 'Partly cloudy', icon: 'cloud-sun' },
        3: { label: 'Overcast', icon: 'cloud' },
        45: { label: 'Fog', icon: 'cloud-fog' },
        48: { label: 'Depositing rime fog', icon: 'cloud-fog' },
        51: { label: 'Light drizzle', icon: 'cloud-drizzle' },
        53: { label: 'Moderate drizzle', icon: 'cloud-drizzle' },
        55: { label: 'Dense drizzle', icon: 'cloud-drizzle' },
        56: { label: 'Light freezing drizzle', icon: 'cloud-drizzle' },
        57: { label: 'Dense freezing drizzle', icon: 'cloud-drizzle' },
        61: { label: 'Slight rain', icon: 'cloud-rain' },
        63: { label: 'Moderate rain', icon: 'cloud-rain' },
        65: { label: 'Heavy rain', icon: 'cloud-rain' },
        66: { label: 'Light freezing rain', icon: 'cloud-rain' },
        67: { label: 'Heavy freezing rain', icon: 'cloud-rain' },
        71: { label: 'Slight snow fall', icon: 'snowflake' },
        73: { label: 'Moderate snow fall', icon: 'snowflake' },
        75: { label: 'Heavy snow fall', icon: 'snowflake' },
        77: { label: 'Snow grains', icon: 'snowflake' },
        80: { label: 'Slight rain showers', icon: 'cloud-rain' },
        81: { label: 'Moderate rain showers', icon: 'cloud-rain' },
        82: { label: 'Violent rain showers', icon: 'cloud-rain' },
        85: { label: 'Slight snow showers', icon: 'snowflake' },
        86: { label: 'Heavy snow showers', icon: 'snowflake' },
        95: { label: 'Thunderstorm', icon: 'cloud-lightning' },
        96: { label: 'Thunderstorm with slight hail', icon: 'cloud-lightning' },
        99: { label: 'Thunderstorm with heavy hail', icon: 'cloud-lightning' },
    };
    return codes[code] || { label: 'Unknown', icon: 'help-circle' };
}
