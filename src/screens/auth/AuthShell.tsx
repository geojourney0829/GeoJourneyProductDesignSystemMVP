import type { ReactNode } from 'react'
import Logo from '../../brand/Logo'

/** Shared split layout for auth screens. Reuses design tokens only. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div
        className="relative hidden flex-col justify-between p-10 text-white lg:flex"
        style={{ background: 'linear-gradient(160deg,#0B5FFF 0%,#0849CC 55%,#4257D6 100%)' }}
      >
        <Logo variant="inverse" size={40} />
        <div>
          <h2 className="text-display max-w-sm">Plan the journey, not just the destination.</h2>
          <p className="mt-3 max-w-sm text-white/80">
            Discover, compare, plan, save, travel and remember — all in one place.
          </p>
        </div>
        <div className="flex gap-6 text-white/80">
          <span>🧭 Discover</span>
          <span>⚖️ Compare</span>
          <span>📔 Remember</span>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-6 lg:hidden">
            <Logo variant="wordmark" size={30} />
          </div>
          <h1 className="text-h1 text-[var(--color-ink)]">{title}</h1>
          <p className="mt-1 text-[15px] text-[var(--color-muted)]">{subtitle}</p>
          <div className="mt-6">{children}</div>
          {footer && <div className="mt-6 text-center text-[14px] text-[var(--color-ink-2)]">{footer}</div>}
        </div>
      </div>
    </div>
  )
}
