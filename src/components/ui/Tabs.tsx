export function Tabs<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: T; label: string; icon?: string }[]
  active: T
  onChange: (id: T) => void
}) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-[12px] bg-[var(--color-surface-2)] p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className="flex-1 whitespace-nowrap rounded-[9px] px-3.5 py-2 text-[14px] font-semibold transition-all duration-200"
          style={{
            backgroundColor: active === t.id ? 'var(--color-surface)' : 'transparent',
            color: active === t.id ? '#0B5FFF' : 'var(--color-ink-2)',
            boxShadow: active === t.id ? '0 1px 4px rgba(15,23,42,0.08)' : 'none',
          }}
        >
          {t.icon && <span className="mr-1">{t.icon}</span>}
          {t.label}
        </button>
      ))}
    </div>
  )
}
