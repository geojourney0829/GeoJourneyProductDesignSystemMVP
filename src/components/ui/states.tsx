import type { ReactNode } from 'react'
import { Button } from './primitives'

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`gj-skeleton rounded-[12px] ${className}`} />
}

export function CardSkeleton() {
  return (
    <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
      <Skeleton className="mb-3 h-36 w-full" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

export function EmptyState({
  icon = '🧭',
  title,
  message,
  action,
}: {
  icon?: string
  title: string
  message: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-[var(--color-line)] bg-[var(--color-surface)] px-6 py-14 text-center">
      <div className="mb-3 grid h-14 w-14 place-items-center rounded-full bg-[var(--color-surface-2)] text-2xl">
        {icon}
      </div>
      <h3 className="text-h3 text-[var(--color-ink)]">{title}</h3>
      <p className="mt-1 max-w-xs text-[15px] text-[var(--color-muted)]">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: {
  title?: string
  message: string
  onRetry?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] px-6 py-12 text-center">
      <div
        className="mb-3 grid h-14 w-14 place-items-center rounded-full text-2xl"
        style={{ backgroundColor: '#EF444418' }}
      >
        ⚠️
      </div>
      <h3 className="text-h3 text-[var(--color-ink)]">{title}</h3>
      <p className="mt-1 max-w-xs text-[15px] text-[var(--color-muted)]">{message}</p>
      {onRetry && (
        <div className="mt-5">
          <Button variant="secondary" onClick={onRetry}>
            Try again
          </Button>
        </div>
      )}
    </div>
  )
}
