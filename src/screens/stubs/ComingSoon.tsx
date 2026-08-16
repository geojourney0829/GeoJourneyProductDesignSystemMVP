import { useRouter } from '../../lib/router'
import { Badge, Button } from '../../components/ui/primitives'

/**
 * Polished coming-soon screen for future modules.
 * Each future area is reachable (extension point documented in services/index.ts
 * and lib/router.tsx) but implemented in a later milestone.
 */
export function ComingSoon({
  icon,
  title,
  description,
  milestone = 'a later milestone',
}: {
  icon: string
  title: string
  description: string
  milestone?: string
}) {
  const { navigate } = useRouter()
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 grid h-16 w-16 place-items-center rounded-[20px] bg-[var(--color-surface-2)] text-3xl">
        {icon}
      </div>
      <Badge tone="indigo">Planned</Badge>
      <h1 className="mt-3 text-h1 text-[var(--color-ink)]">{title}</h1>
      <p className="mt-2 text-[15px] text-[var(--color-ink-2)]">{description}</p>
      <p className="mt-2 text-[13px] text-[var(--color-muted)]">
        Architected with a reserved extension point — arrives in {milestone}.
      </p>
      <div className="mt-6 flex gap-2">
        <Button variant="secondary" onClick={() => navigate('home')}>
          Back home
        </Button>
        <Button onClick={() => navigate('planner')}>Plan a trip</Button>
      </div>
    </div>
  )
}

export const Community = () => (
  <ComingSoon
    icon="👥"
    title="Community"
    description="Community map, contributor locations, reviews, discussions and travel stories."
  />
)
export const Journal = () => (
  <ComingSoon
    icon="📔"
    title="Journal"
    description="Auto-generated travel memories, photo timelines and shareable trip stories."
  />
)
export const Safety = () => (
  <ComingSoon
    icon="🛡️"
    title="Safety Center"
    description="Route alerts, emergency SOS mode, nearest hospital/police/fuel and offline safety info."
  />
)
export const Weather = () => (
  <ComingSoon
    icon="🌦️"
    title="Weather"
    description="Route forecasts, rain and storm alerts across your journey."
  />
)
export const Notifications = () => (
  <ComingSoon
    icon="🔔"
    title="Notifications"
    description="Trip reminders, price updates, weather, safety and AI insights."
  />
)
export const Saved = () => (
  <ComingSoon
    icon="🔖"
    title="Saved"
    description="A unified wishlist of saved places and offers across all your trips."
  />
)
export const Settings = () => (
  <ComingSoon
    icon="⚙️"
    title="Settings"
    description="Preferences, appearance, privacy, data export, account deletion and AI preferences."
  />
)
