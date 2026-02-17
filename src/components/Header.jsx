
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="flex items-center justify-between w-full">
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70 dark:from-white dark:to-white/70 drop-shadow-sm">
                ☀️ Weather
            </h1>

            <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full hover:bg-white/10 dark:hover:bg-white/20 transition-colors duration-200 active:scale-95"
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                    <Moon className="w-5 h-5 text-slate-700" />
                )}
            </button>
        </header>
    );
}
