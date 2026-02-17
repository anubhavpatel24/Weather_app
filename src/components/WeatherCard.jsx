
import { getWeatherDescription } from '../services/weatherApi';
import {
    Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Thermometer, CloudFog, CloudDrizzle, Snowflake, Eye, Gauge, Sunrise, Sunset
} from 'lucide-react';

const iconMap = {
    'sun': Sun,
    'cloud-sun': Cloud, // Lucide doesn't have cloud-sun combo exactly like FontAwesome, using Cloud or Sun mostly. Let's use generic Cloud for now or specific ones. 
    'cloud': Cloud,
    'cloud-rain': CloudRain,
    'cloud-drizzle': CloudDrizzle,
    'snowflake': Snowflake,
    'cloud-lightning': CloudLightning,
    'cloud-fog': CloudFog,
    'help-circle': Sun // Fallback
};

// Better icon mapping helper if needed
const getIconComponent = (iconName) => {
    return iconMap[iconName] || Sun;
}

export function WeatherCard({ current, location }) {
    if (!current || !location) return null;

    const { temperature_2m, relative_humidity_2m, weather_code, wind_speed_10m, apparent_temperature } = current;
    const { label, icon } = getWeatherDescription(weather_code);
    const WeatherIcon = getIconComponent(icon);

    return (
        <div className="flex flex-col items-center justify-center py-3 text-gray-800 dark:text-white animate-fade-in">
            <div className="text-center mb-2">
                <h2 className="text-2xl font-bold tracking-tight mb-0">{location.name}</h2>
                <p className="text-xs opacity-75">{location.country}</p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-3">
                <div className="p-2 rounded-full bg-white/30 dark:bg-white/5 shadow-lg backdrop-blur-sm">
                    <WeatherIcon className="w-16 h-16 text-indigo-500 dark:text-indigo-300 drop-shadow-md" />
                </div>
                <div className="flex flex-col items-start">
                    <div className="text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-gray-800 to-gray-600 dark:from-white dark:to-gray-300">
                        {Math.round(temperature_2m)}°
                    </div>
                    <p className="text-sm font-medium px-2 py-0.5 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md mt-1">
                        {label}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
                <StatCard icon={Wind} label="Wind" value={`${wind_speed_10m} km/h`} />
                <StatCard icon={Droplets} label="Humidity" value={`${relative_humidity_2m}%`} />
                <StatCard icon={Thermometer} label="Feels Like" value={`${Math.round(apparent_temperature)}°`} />
                {/* Placeholder for UV or Pressure if available, reusing wind for now as placeholder or could remove */}
                <StatCard icon={Eye} label="Visibility" value="10km" />
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value }) {
    return (
        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/5 backdrop-blur-sm transition-all hover:bg-white/50 dark:hover:bg-white/10">
            <Icon className="w-5 h-5 mb-1 opacity-70" />
            <span className="text-xs opacity-70">{label}</span>
            <span className="font-bold text-sm">{value}</span>
        </div>
    );
}
