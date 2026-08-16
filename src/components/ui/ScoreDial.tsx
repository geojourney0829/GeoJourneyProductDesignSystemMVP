/** Circular route-score dial. Color communicates band + numeric label (not color alone). */
export function ScoreDial({
  value,
  size = 96,
  label = 'Route Score',
}: {
  value: number
  size?: number
  label?: string
}) {
  const stroke = 8
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value))
  const dash = (pct / 100) * c
  const color = pct >= 85 ? '#16B978' : pct >= 70 ? '#10BEEA' : '#F59E0B'
  return (
    <div className="inline-flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--color-line)" strokeWidth={stroke} fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c}`}
            style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.22,1,0.36,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-score" style={{ color }}>
            {pct}
          </span>
          <span className="text-[11px] font-medium text-[var(--color-muted)]">/100</span>
        </div>
      </div>
      <span className="mt-1.5 text-[13px] font-semibold text-[var(--color-ink-2)]">{label}</span>
    </div>
  )
}

/** Horizontal labeled meter for sub-scores. */
export function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 85 ? '#16B978' : value >= 70 ? '#10BEEA' : '#F59E0B'
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[13px]">
        <span className="text-[var(--color-ink-2)]">{label}</span>
        <span className="font-semibold text-[var(--color-ink)]">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-2)]">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: color, transition: 'width 0.8s ease' }}
        />
      </div>
    </div>
  )
}
