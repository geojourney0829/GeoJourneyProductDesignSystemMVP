import { useRouter } from '../lib/router'
import { useApp } from '../state/AppContext'
import { Button, Card, Input, SectionTitle } from '../components/ui/primitives'
import { PlaceCard, TripCard } from '../components/cards'
import { DISCOVERY_PLACES } from '../mocks/mumbai-goa'
import { WeatherStrip } from './partials/WeatherStrip'

export default function Home() {
  const { navigate } = useRouter()
  const { profile, trips, openTrip } = useApp()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-8 lg:px-8 lg:pt-6">
      {/* Greeting */}
      <div className="mb-5 hidden lg:block">
        <h1 className="text-h1 text-[var(--color-ink)]">
          {greeting}, {profile.name}
        </h1>
        <p className="text-[15px] text-[var(--color-muted)]">Where are we heading next?</p>
      </div>
      <div className="mb-4 lg:hidden">
        <h1 className="text-h2 text-[var(--color-ink)]">
          {greeting}, {profile.name}
        </h1>
      </div>

      {/* Destination search */}
      <Card className="mb-5 p-4">
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <div className="flex-1">
            <Input placeholder="Search a destination, e.g. Goa" icon="🔍" />
          </div>
          <Button size="lg" onClick={() => navigate('planner')}>
            Plan My Trip
          </Button>
        </div>
      </Card>

      {/* AI planner card */}
      <div
        className="mb-6 cursor-pointer rounded-[20px] p-5 transition-all hover:-translate-y-0.5"
        style={{ background: 'var(--color-ai-soft)' }}
        onClick={() => navigate('planner')}
      >
        <div>
          <div className="flex items-start gap-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] text-xl text-white"
              style={{ background: 'linear-gradient(135deg,#7C4DFF,#4257D6)' }}
            >
              ✨
            </span>
            <div className="flex-1">
              <h2 className="text-h3" style={{ color: '#7C4DFF' }}>
                Plan the whole journey with AI
              </h2>
              <p className="mt-1 text-[15px] text-[var(--color-ink-2)]">
                Tell GeoJourney your destination, dates, budget and travel style.
              </p>
              <Button
                variant="ai"
                size="sm"
                className="mt-3"
                onClick={() => navigate('planner')}
              >
                Try AI Planner
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-6 grid grid-cols-4 gap-3">
        {[
          { icon: '🧭', label: 'Explore', to: 'explore' as const },
          { icon: '⚖️', label: 'Compare', to: 'compare' as const },
          { icon: '🧳', label: 'Trips', to: 'trips' as const },
          { icon: '💸', label: 'Expenses', to: 'expenses' as const },
        ].map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.to)}
            className="flex flex-col items-center gap-2 rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] py-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="text-xl">{a.icon}</span>
            <span className="text-[13px] font-semibold text-[var(--color-ink-2)]">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Recent trips */}
      <section className="mb-7">
        <SectionTitle
          title="Recent trips"
          action={
            <button
              className="text-[14px] font-semibold text-[#0B5FFF]"
              onClick={() => navigate('trips')}
            >
              See all
            </button>
          }
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onOpen={(t) => {
                openTrip(t.id)
                navigate('trip')
              }}
            />
          ))}
        </div>
      </section>

      {/* Weather */}
      <section className="mb-7">
        <SectionTitle title="Weather along your route" />
        <WeatherStrip />
      </section>

      {/* Recommended */}
      <section>
        <SectionTitle
          title="Recommended for you"
          action={
            <button
              className="text-[14px] font-semibold text-[#0B5FFF]"
              onClick={() => navigate('explore')}
            >
              Explore
            </button>
          }
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {DISCOVERY_PLACES.slice(0, 6).map((p) => (
            <PlaceCard key={p.id} place={p} onOpen={() => navigate('explore')} />
          ))}
        </div>
      </section>
    </div>
  )
}
