import { useEffect, type ReactNode } from 'react'
import { useApp } from '../../state/AppContext'

/* ---------------- BottomSheet (mobile) / Modal (desktop) ---------------- */
export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 animate-fade bg-black/40" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full animate-sheet-up rounded-t-[24px] bg-[var(--color-surface)] p-5 shadow-2xl sm:w-[440px] sm:animate-scale-in sm:rounded-[20px]"
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[var(--color-line)] sm:hidden" />
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-h3 text-[var(--color-ink)]">{title}</h3>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-surface-2)]"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

/* ---------------- Toasts ---------------- */
export function ToastHost() {
  const { toasts, dismissToast } = useApp()
  const tone: Record<string, string> = {
    success: '#16B978',
    info: '#0B5FFF',
    danger: '#EF4444',
  }
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => dismissToast(t.id)}
          className="pointer-events-auto flex animate-fade-up items-center gap-2.5 rounded-[12px] bg-[var(--color-ink)] px-4 py-3 text-[14px] font-medium text-white shadow-lg"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: tone[t.tone] }}
          />
          {t.message}
        </div>
      ))}
    </div>
  )
}
