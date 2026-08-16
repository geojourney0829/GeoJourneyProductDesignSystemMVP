import { useRouter } from '../lib/router'
import { useApp } from '../state/AppContext'
import { Button } from '../components/ui/primitives'
import { TripCard } from '../components/cards'
import { EmptyState } from '../components/ui/states'

export default function Trips() {
  const { navigate } = useRouter()
  const { trips, openTrip } = useApp()

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-8 lg:px-8 lg:pt-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-h1 text-[var(--color-ink)]">Your trips</h1>
        <Button size="sm" onClick={() => navigate('planner')}>
          ✨ New trip
        </Button>
      </div>

      {trips.length === 0 ? (
        <EmptyState
          icon="🧳"
          title="No trips yet"
          message="Plan your first journey with GeoJourney."
          action={<Button onClick={() => navigate('planner')}>Plan a trip</Button>}
        />
      ) : (
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
      )}
    </div>
  )
}
