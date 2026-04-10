import { getWeatherDescription } from '../services/weatherApi';
import {
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
} from 'lucide-react';
import { cn } from '../lib/utils';

const iconMap = {
  sun: Sun,
  'cloud-sun': Cloud,
  cloud: Cloud,
  'cloud-rain': CloudRain,
  'cloud-drizzle': CloudDrizzle,
  snowflake: Snowflake,
  'cloud-lightning': CloudLightning,
  'cloud-fog': CloudFog,
  'help-circle': Sun,
};

const getIconComponent = (iconName) => iconMap[iconName] || Sun;

export function ForecastList({ daily }) {
  if (!daily) return null;

  const { time, weather_code, temperature_2m_max, temperature_2m_min } = daily;

  const forecasts = time.slice(1, 6).map((date, index) => {
    const i = index + 1;
    return {
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      max: Math.round(temperature_2m_max[i]),
      min: Math.round(temperature_2m_min[i]),
      code: weather_code[i],
    };
  });

  return (
    <section className="w-full">
      <div className="mb-4 flex items-end justify-between gap-4 px-0.5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Outlook
          </p>
          <h3 className="font-display mt-1 text-lg font-bold text-[var(--text)]">
            Next 5 days
          </h3>
        </div>
      </div>

      <div
        className={cn(
          'flex gap-3 overflow-x-auto pb-1 pt-0.5 no-scrollbar sm:grid sm:grid-cols-5 sm:overflow-visible',
          'snap-x snap-mandatory sm:snap-none'
        )}
      >
        {forecasts.map((day, idx) => {
          const { icon } = getWeatherDescription(day.code);
          const Icon = getIconComponent(icon);
          return (
            <div
              key={day.date + idx}
              className={cn(
                'flex min-w-[5.5rem] shrink-0 snap-center flex-col items-center gap-3 rounded-2xl p-4',
                'bg-[var(--surface)] ring-1 ring-[var(--border)]',
                'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-[var(--border-strong)]',
                'animate-fade-in-up opacity-0 [animation-fill-mode:forwards]',
                idx === 0 && 'stagger-1',
                idx === 1 && 'stagger-2',
                idx === 2 && 'stagger-3',
                idx === 3 && 'stagger-4',
                idx === 4 && 'stagger-5'
              )}
            >
              <div className="text-center">
                <span className="block text-xs font-bold uppercase tracking-wider text-[var(--text)]">
                  {day.date}
                </span>
                <span className="mt-0.5 block text-[10px] font-medium text-[var(--text-muted)]">
                  {day.fullDate}
                </span>
              </div>
              <Icon className="h-7 w-7 text-[var(--accent)]" strokeWidth={1.5} />
              <div className="flex flex-col items-center gap-0.5 tabular-nums">
                <span className="font-display text-base font-bold text-[var(--text)]">
                  {day.max}°
                </span>
                <span className="text-xs font-medium text-[var(--text-muted)]">{day.min}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
