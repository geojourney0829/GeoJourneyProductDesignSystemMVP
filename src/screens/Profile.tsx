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
  const { profile, user, authStatus, trips, wishlist, dark, toggleDark, logout } = useApp()

  const displayName = user?.name ?? profile.name
  const personaIds = user?.personas ?? profile.personas
  const personaLabels = personaIds
    .map((id) => PERSONAS.find((p) => p.id === id)?.label)
    .filter(Boolean)

  if (authStatus === 'signed-out') {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-[20px] bg-[var(--color-surface-2)] text-3xl">
          👤
        </div>
        <h1 className="text-h2 text-[var(--color-ink)]">Sign in to GeoJourney</h1>
        <p className="mt-2 text-[15px] text-[var(--color-ink-2)]">
          Save places, track trips and contribute to the community.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" onClick={() => navigate('login')}>
            Sign in
          </Button>
          <Button onClick={() => navigate('signup')}>Create account</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-8 lg:px-8 lg:pt-6">
      {/* Hero card */}
      <Card className="mb-5 p-5">
        <div className="flex items-start gap-4">
          <Avatar name={displayName} size={64} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-h2 text-[var(--color-ink)]">{displayName}</h1>
              {user?.verified && <Badge tone="cyan">✓ Verified</Badge>}
              {authStatus === 'guest' && <Badge tone="neutral">Guest</Badge>}
            </div>
            {user?.bio ? (
              <p className="mt-1 text-[14px] text-[var(--color-ink-2)]">{user.bio}</p>
            ) : (
              <p className="mt-1 text-[14px] text-[var(--color-muted)]">
                Adventurer · GeoJourney member
              </p>
            )}
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
          {authStatus === 'authenticated' && (
            <button
              onClick={() => navigate('edit-profile')}
              className="shrink-0 rounded-[10px] border border-[var(--color-line)] px-3 py-1.5 text-[13px] font-semibold text-[var(--color-ink-2)] hover:bg-[var(--color-surface-2)]"
            >
              Edit
            </button>
          )}
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3 border-t border-[var(--color-line)] pt-4 text-center">
          {[
            { value: String(trips.length), label: 'Trips' },
            { value: String(wishlist.length), label: 'Saved' },
            { value: String(user?.contributions ?? 0), label: 'Contributed' },
            { value: String(user?.helpfulVotes ?? 0), label: 'Helpful' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-h3 text-[var(--color-ink)]">{s.value}</div>
              <div className="text-[12px] text-[var(--color-muted)]">{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Badges */}
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

      {/* Nav links */}
      <Card className="p-2">
        {[
          { label: 'My Trips', icon: '🧳', to: 'trips' as const },
          { label: 'Saved Places', icon: '🔖', to: 'saved' as const },
          { label: 'Expenses', icon: '💸', to: 'expenses' as const },
          { label: 'Community Map', icon: '👥', to: 'community' as const },
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

      {authStatus === 'authenticated' ? (
        <Button variant="ghost" block className="mt-4" onClick={logout}>
          Sign out
        </Button>
      ) : (
        <Button variant="ghost" block className="mt-4" onClick={() => navigate('login')}>
          Sign in
        </Button>
      )}
    </div>
  )
}
