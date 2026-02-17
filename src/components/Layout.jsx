
import { cn } from '../lib/utils';

export function Layout({ children, className }) {
    return (
        <div className="min-h-screen w-full transition-colors duration-200 bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex items-center justify-center p-4">
            <div className={cn(
                "w-full max-w-md md:max-w-4xl lg:max-w-5xl min-h-screen glass rounded-3xl p-4 md:p-6 flex flex-col gap-3 transition-all duration-300",
                "dark:glass-dark dark:text-white",
                className
            )}>
                {children}
            </div>
        </div>
    );
}
