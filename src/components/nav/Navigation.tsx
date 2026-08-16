import { useRouter, type RouteName } from '../../lib/router'
import Logo from '../../brand/Logo'
import { Avatar } from '../ui/primitives'
import { useApp } from '../../state/AppContext'

const MOBILE_NAV: { id: RouteName; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'explore', label: 'Explore', icon: '🧭' },
  { id: 'trips', label: 'Trips', icon: '🧳' },
  { id: 'community', label: 'Community', icon: '👥' },
  { id: 'profile', label: 'Profile', icon: '👤' },
]

const DESKTOP_NAV: { id: RouteName; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'explore', label: 'Explore', icon: '🧭' },
  { id: 'planner', label: 'Plan Trip', icon: '✨' },
  { id: 'trips', label: 'Trips', icon: '🧳' },
  { id: 'community', label: 'Community', icon: '👥' },
  { id: 'saved', label: 'Saved', icon: '🔖' },
  { id: 'expenses', label: 'Expenses', icon: '💸' },
  { id: 'journal', label: 'Journal', icon: '📔' },
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

export function MobileBottomNav() {
  const { route, navigate } = useRouter()
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-[var(--color-line)] bg-[var(--color-surface)]/95 backdrop-blur lg:hidden">
      {MOBILE_NAV.map((item) => {
        const active = route.name === item.id
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className="flex flex-1 flex-col items-center gap-0.5 py-2.5"
            style={{ color: active ? '#0B5FFF' : 'var(--color-muted)' }}
          >
            <span className="text-lg" style={{ transform: active ? 'scale(1.08)' : 'none' }}>
              {item.icon}
            </span>
            <span className="text-[11px] font-semibold">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export function DesktopSidebar() {
  const { route, navigate } = useRouter()
  const { profile } = useApp()
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[248px] flex-col border-r border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-5 lg:flex">
      <button onClick={() => navigate('home')} className="mb-6 px-2 text-left">
        <Logo variant="wordmark" size={30} />
      </button>
      <button
        onClick={() => navigate('planner')}
        className="mb-4 flex h-11 items-center justify-center gap-2 rounded-[12px] font-semibold text-white transition-all hover:brightness-110"
        style={{ background: 'linear-gradient(135deg,#0B5FFF,#4257D6)' }}
      >
        ✨ Plan My Trip
      </button>
      <nav className="flex flex-1 flex-col gap-0.5">
        {DESKTOP_NAV.map((item) => {
          const active = route.name === item.id
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[15px] font-medium transition-colors"
              style={{
                backgroundColor: active ? '#0B5FFF14' : 'transparent',
                color: active ? '#0B5FFF' : 'var(--color-ink-2)',
              }}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>
      <button
        onClick={() => navigate('profile')}
        className="mt-2 flex items-center gap-3 rounded-[12px] border border-[var(--color-line)] p-2.5 text-left"
      >
        <Avatar name={profile.name} size={36} />
        <div className="min-w-0">
          <div className="truncate text-[14px] font-semibold text-[var(--color-ink)]">
            {profile.name}
          </div>
          <div className="text-[12px] text-[var(--color-muted)]">View profile</div>
        </div>
      </button>
    </aside>
  )
}

export function TopBar({ title, showBack }: { title?: string; showBack?: boolean }) {
  const { back, canGoBack, navigate } = useRouter()
  const { profile } = useApp()
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-background)]/90 px-4 py-3 backdrop-blur lg:hidden">
      {showBack && canGoBack ? (
        <button
          onClick={back}
          aria-label="Back"
          className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-surface)] text-[var(--color-ink)] shadow-sm"
        >
          ←
        </button>
      ) : (
        <button onClick={() => navigate('home')}>
          <Logo variant="symbol" size={30} />
        </button>
      )}
      <div className="flex-1 truncate text-h3 text-[var(--color-ink)]">{title}</div>
      <button
        onClick={() => navigate('notifications')}
        aria-label="Notifications"
        className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-surface)] shadow-sm"
      >
        🔔
      </button>
      <button onClick={() => navigate('profile')} aria-label="Profile">
        <Avatar name={profile.name} size={34} />
      </button>
    </header>
  )
}
