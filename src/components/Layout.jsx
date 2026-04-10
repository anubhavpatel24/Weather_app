import { cn } from '../lib/utils';

export function Layout({ children, className }) {
  return (
    <div
      className={cn(
        'relative min-h-screen w-full overflow-x-hidden',
        'bg-slate-950 text-[var(--text)]',
        'light:bg-[#f4f7fb] dark:bg-slate-950'
      )}
    >
      {/* Ambient mesh */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-100 light:opacity-100 dark:opacity-90"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 0% -20%, var(--orb-1), transparent 50%),
              radial-gradient(ellipse 90% 70% at 100% 0%, var(--orb-2), transparent 45%),
              radial-gradient(ellipse 70% 50% at 50% 100%, var(--orb-3), transparent 50%)
            `,
          }}
        />
        <div
          className="absolute -left-32 top-1/4 h-[min(520px,50vh)] w-[min(520px,50vh)] rounded-full blur-[100px] animate-float opacity-60"
          style={{ background: 'var(--orb-1)' }}
        />
        <div
          className="absolute -right-24 bottom-1/4 h-[min(480px,45vh)] w-[min(480px,45vh)] rounded-full blur-[100px] animate-float opacity-50 [animation-delay:-3s]"
          style={{ background: 'var(--orb-2)' }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[min(400px,40vh)] w-[min(400px,40vh)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] animate-pulse-soft opacity-40"
          style={{ background: 'var(--orb-3)' }}
        />
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-overlay dark:opacity-[0.2] dark:mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-0 flex min-h-screen items-stretch justify-center px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <div
          className={cn(
            'glass-panel flex w-full max-w-lg flex-col gap-6 rounded-[2rem] p-6 sm:max-w-2xl sm:gap-8 sm:p-8 md:max-w-4xl md:rounded-[2.25rem] md:p-10',
            'animate-fade-in-up opacity-0 [animation-fill-mode:forwards]',
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
