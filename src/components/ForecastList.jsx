
import { getWeatherDescription } from '../services/weatherApi';
import { Sun, Cloud, CloudRain, Snowflake, CloudLightning, CloudDrizzle, CloudFog } from 'lucide-react';

const iconMap = {
    'sun': Sun,
    'cloud-sun': Cloud,
    'cloud': Cloud,
    'cloud-rain': CloudRain,
    'cloud-drizzle': CloudDrizzle,
    'snowflake': Snowflake,
    'cloud-lightning': CloudLightning,
    'cloud-fog': CloudFog,
    'help-circle': Sun
};

const getIconComponent = (iconName) => iconMap[iconName] || Sun;

export function ForecastList({ daily }) {
    if (!daily) return null;

    const { time, weather_code, temperature_2m_max, temperature_2m_min } = daily;

    // We'll just show next 5 days
    const forecasts = time.slice(1, 6).map((date, index) => {
        // index + 1 because we sliced
        const i = index + 1;
        return {
            date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
            max: Math.round(temperature_2m_max[i]),
            min: Math.round(temperature_2m_min[i]),
            code: weather_code[i]
        };
    });

    return (
        <div className="mt-2 w-full">
            <h3 className="text-sm font-semibold mb-2 px-1 opacity-90">Forecast</h3>
            <div className="grid grid-cols-5 gap-1">
                {forecasts.map((day, idx) => {
                    const { icon } = getWeatherDescription(day.code);
                    const Icon = getIconComponent(icon);
                    return (
                        <div key={idx} className="flex flex-col items-center p-2 rounded-lg bg-white/30 dark:bg-black/20 border border-white/20 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
                            <span className="text-xs font-medium mb-1">{day.date}</span>
                            <Icon className="w-6 h-6 mb-1 opacity-90" />
                            <div className="flex flex-col items-center gap-0.5">
                                <span className="font-bold text-xs">{day.max}°</span>
                                <span className="text-xs opacity-70">{day.min}°</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
