import { createElement } from 'react';
import { getWeatherDescription } from '../services/weatherApi';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  CloudFog,
  CloudDrizzle,
  Snowflake,
  Gauge,
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

export function WeatherCard({ current, location }) {
  if (!current || !location) return null;

  const {
    temperature_2m,
    relative_humidity_2m,
    weather_code,
    wind_speed_10m,
    apparent_temperature,
    pressure_msl,
    cloud_cover,
  } = current;
  const { label, icon } = getWeatherDescription(weather_code);
  const MainIcon = iconMap[icon] || Sun;

  const locationLine = [location.admin1, location.country].filter(Boolean).join(' · ') || location.country;

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-[1.75rem] ring-1 ring-[var(--border)]',
        'bg-[var(--surface-elevated)]/80 shadow-lg',
        'animate-fade-in-up opacity-0 [animation-fill-mode:forwards]'
      )}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
        style={{ background: 'var(--accent-glow)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full blur-3xl opacity-50"
        style={{ background: 'var(--orb-2)' }}
        aria-hidden
      />

      <div className="relative grid gap-8 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Now
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            {location.name}
          </h2>
          {locationLine ? (
            <p className="mt-1 text-sm text-[var(--text-muted)]">{locationLine}</p>
          ) : null}

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--text)] ring-1 ring-[var(--border)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)]" />
            {label}
          </div>
        </div>

        <div className="flex flex-row items-center gap-6 sm:flex-col sm:items-end sm:gap-2">
          <div
            className={cn(
              'flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl sm:h-32 sm:w-32',
              'bg-[var(--surface)] ring-1 ring-[var(--border)]',
              'shadow-inner'
            )}
          >
            <MainIcon
              className="h-16 w-16 text-[var(--accent)] sm:h-[4.5rem] sm:w-[4.5rem]"
              strokeWidth={1.25}
            />
          </div>
          <div className="flex flex-1 flex-col sm:items-end">
            <span
              className={cn(
                'font-display text-6xl font-extrabold leading-none tracking-tight',
                'text-gradient-accent tabular-nums sm:text-7xl'
              )}
            >
              {Math.round(temperature_2m)}°
            </span>
            <span className="mt-1 text-sm font-medium text-[var(--text-muted)]">
              Feels {Math.round(apparent_temperature)}°
            </span>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-3 border-t border-[var(--border)] p-6 sm:grid-cols-4 sm:gap-4 sm:p-8">
        <StatCard icon={Wind} label="Wind" value={`${wind_speed_10m} km/h`} />
        <StatCard icon={Droplets} label="Humidity" value={`${relative_humidity_2m}%`} />
        <StatCard
          icon={Gauge}
          label="Pressure"
          value={
            pressure_msl != null ? `${Math.round(pressure_msl)} hPa` : '—'
          }
        />
        <StatCard
          icon={Cloud}
          label="Clouds"
          value={cloud_cover != null ? `${Math.round(cloud_cover)}%` : '—'}
        />
      </div>
    </section>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div
      className={cn(
        'group flex flex-col gap-2 rounded-2xl p-4',
        'bg-[var(--surface)] ring-1 ring-[var(--border)]',
        'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-[var(--border-strong)]'
      )}
    >
      <div className="flex items-center gap-2 text-[var(--text-muted)]">
        {createElement(icon, {
          className:
            'h-4 w-4 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110',
          strokeWidth: 2,
        })}
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <span className="font-display text-lg font-bold tabular-nums text-[var(--text)]">{value}</span>
    </div>
  );
}
