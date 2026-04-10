import { Moon, Sun, CloudSun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../lib/utils';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
            'bg-[var(--surface-elevated)] shadow-sm ring-1 ring-[var(--border)]',
            'text-[var(--accent)]'
          )}
        >
          <CloudSun className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="font-display text-lg font-bold tracking-tight text-[var(--text)] sm:text-xl">
            Atmos
          </p>
          <p className="truncate text-xs font-medium text-[var(--text-muted)] sm:text-sm">
            Calm, precise weather
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          'group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
          'bg-[var(--surface-elevated)] ring-1 ring-[var(--border)] transition-all duration-300',
          'hover:ring-[var(--border-strong)] hover:shadow-md',
          'active:scale-[0.97]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
        )}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span
          className={cn(
            'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            'bg-linear-to-br from-[var(--accent-glow)] to-transparent'
          )}
        />
        {isDark ? (
          <Sun className="relative h-5 w-5 text-amber-300" strokeWidth={1.75} />
        ) : (
          <Moon className="relative h-5 w-5 text-slate-600" strokeWidth={1.75} />
        )}
      </button>
    </header>
  );
}
