import { useRouter } from '../lib/router'
import { useApp } from '../state/AppContext'
import { Avatar, Badge, Button, Card } from '../components/ui/primitives'
import { PERSONAS } from '../mocks/personas'

const BADGES = [
  { icon: '🧭', label: 'Explorer' },
  { icon: '📍', label: 'Local Guide' },
  { icon: '🗺️', label: 'Route Master' },
  { icon: '🍜', label: 'Food Expert' },
  { icon: '📷', label: 'Photographer' },
]

export default function Profile() {
  const { navigate } = useRouter()
  const { profile, trips, dark, toggleDark } = useApp()
  const personaLabels = profile.personas
    .map((id) => PERSONAS.find((p) => p.id === id)?.label)
    .filter(Boolean)

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-8 lg:px-8 lg:pt-6">
      <Card className="mb-5 p-5">
        <div className="flex items-center gap-4">
          <Avatar name={profile.name} size={64} />
          <div className="min-w-0 flex-1">
            <h1 className="text-h2 text-[var(--color-ink)]">{profile.name}</h1>
            <p className="text-[14px] text-[var(--color-muted)]">
              Adventurer · GeoJourney member
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {personaLabels.length ? (
                personaLabels.map((l) => (
                  <Badge key={l} tone="brand">
                    {l}
                  </Badge>
                ))
              ) : (
                <Badge tone="neutral">No persona set</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3 border-t border-[var(--color-line)] pt-4 text-center">
          {[
            { value: String(trips.length), label: 'Trips' },
            { value: '1,127', label: 'km' },
            { value: '34', label: 'Places' },
            { value: '12', label: 'Contributions' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-h3 text-[var(--color-ink)]">{s.value}</div>
              <div className="text-[12px] text-[var(--color-muted)]">{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-5 p-5">
        <h2 className="mb-3 text-h3 text-[var(--color-ink)]">Badges</h2>
        <div className="flex flex-wrap gap-3">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center gap-1 rounded-[16px] bg-[var(--color-surface-2)] px-4 py-3"
            >
              <span className="text-2xl">{b.icon}</span>
              <span className="text-[12px] font-semibold text-[var(--color-ink-2)]">{b.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-2">
        {[
          { label: 'My Trips', icon: '🧳', to: 'trips' as const },
          { label: 'Saved Places', icon: '🔖', to: 'saved' as const },
          { label: 'Expenses', icon: '💸', to: 'expenses' as const },
          { label: 'Journal', icon: '📔', to: 'journal' as const },
          { label: 'Settings', icon: '⚙️', to: 'settings' as const },
        ].map((row) => (
          <button
            key={row.label}
            onClick={() => navigate(row.to)}
            className="flex w-full items-center gap-3 rounded-[12px] px-3 py-3 text-left text-[15px] font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
          >
            <span>{row.icon}</span>
            {row.label}
            <span className="ml-auto text-[var(--color-muted)]">›</span>
          </button>
        ))}
        <div className="flex items-center gap-3 rounded-[12px] px-3 py-3 text-[15px] font-medium text-[var(--color-ink)]">
          <span>🌙</span>
          Dark mode
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="ml-auto h-6 w-11 rounded-full p-0.5 transition-colors"
            style={{ background: dark ? '#0B5FFF' : 'var(--color-line)' }}
          >
            <span
              className="block h-5 w-5 rounded-full bg-white transition-transform"
              style={{ transform: dark ? 'translateX(20px)' : 'none' }}
            />
          </button>
        </div>
      </Card>

      <Button variant="ghost" block className="mt-4" onClick={() => navigate('splash')}>
        Sign out (demo)
      </Button>
    </div>
  )
}
