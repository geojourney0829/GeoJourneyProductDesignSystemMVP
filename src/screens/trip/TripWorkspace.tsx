import { useState } from 'react'
import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { Badge, Button, Card } from '../../components/ui/primitives'
import { Tabs } from '../../components/ui/Tabs'
import { MapCanvas } from '../../components/ui/MapCanvas'
import { ScoreDial } from '../../components/ui/ScoreDial'
import { EmptyState } from '../../components/ui/states'
import {
  ExpenseRow,
  OfferCard,
  PlaceCard,
  TimelineItem,
  modeIcon,
} from '../../components/cards'
import { MapService, AIOrchestrator } from '../../services'
import { MUMBAI_GOA_ROUTES } from '../../mocks/mumbai-goa'
import { ExpenseForm } from './ExpenseForm'
import { money, km, formatDateRange, sumExpenses } from '../../lib/format'

type Tab = 'overview' | 'itinerary' | 'map' | 'saved' | 'expenses' | 'journal'

export default function TripWorkspace() {
  const { navigate } = useRouter()
  const { currentTrip } = useApp()
  const [tab, setTab] = useState<Tab>('overview')

  if (!currentTrip)
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState
          icon="🧳"
          title="No trip open"
          message="Plan or open a trip to see its workspace."
          action={<Button onClick={() => navigate('planner')}>Plan a trip</Button>}
        />
      </div>
    )

  const trip = currentTrip
  const spent = sumExpenses(trip.expenses)

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-10 lg:px-8 lg:pt-6">
      {/* Trip header */}
      <Card className="mb-5 overflow-hidden">
        <div className="relative h-40 w-full bg-[var(--color-surface-2)]">
          <img src={trip.image} alt={trip.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h1 className="text-h1">{trip.name}</h1>
            <div className="text-[13px] opacity-90">
              {modeIcon[trip.travelMode]} {trip.source} → {trip.destination} ·{' '}
              {formatDateRange(trip.startDate, trip.endDate)} · {km(trip.distanceKm)}
            </div>
          </div>
        </div>
      </Card>

      <div className="mb-5">
        <Tabs
          tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'itinerary', label: 'Itinerary' },
            { id: 'map', label: 'Map' },
            { id: 'saved', label: 'Saved' },
            { id: 'expenses', label: 'Expenses' },
            { id: 'journal', label: 'Journal' },
          ]}
          active={tab}
          onChange={(t) => setTab(t as Tab)}
        />
      </div>

      <div className="animate-fade">
        {tab === 'overview' && <Overview trip={trip} spent={spent} onNav={navigate} />}
        {tab === 'itinerary' && <Itinerary trip={trip} />}
        {tab === 'map' && (
          <MapCanvas
            route={MUMBAI_GOA_ROUTES[0]}
            pins={MapService.toPins(trip.savedPlaces)}
            height={380}
          />
        )}
        {tab === 'saved' && <Saved trip={trip} onNav={navigate} />}
        {tab === 'expenses' && <Expenses trip={trip} spent={spent} />}
        {tab === 'journal' && <Journal trip={trip} spent={spent} />}
      </div>
    </div>
  )
}

function Overview({
  trip,
  spent,
  onNav,
}: {
  trip: NonNullable<ReturnType<typeof useApp>['currentTrip']>
  spent: number
  onNav: (n: 'route' | 'compare' | 'expenses') => void
}) {
  const remaining = trip.budget - spent
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="p-5">
        <h3 className="mb-3 text-h3 text-[var(--color-ink)]">Budget</h3>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-h1 text-[var(--color-ink)]">{money(spent)}</div>
            <div className="text-[13px] text-[var(--color-muted)]">
              of {money(trip.budget)} · {money(remaining)} left
            </div>
          </div>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--color-surface-2)]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(100, (spent / trip.budget) * 100)}%`,
              backgroundColor: spent > trip.budget ? '#EF4444' : '#16B978',
            }}
          />
        </div>
        <div
          className="mt-3 flex items-start gap-2 rounded-[10px] px-3 py-2 text-[13px]"
          style={{ background: 'var(--color-ai-soft)', color: '#7C4DFF' }}
        >
          ✨ {AIOrchestrator.budgetInsight(spent, trip.budget)}
        </div>
      </Card>

      {trip.plan && (
        <Card className="flex items-center gap-4 p-5">
          <ScoreDial value={trip.plan.routeScore} size={84} />
          <div>
            <h3 className="text-h3 text-[var(--color-ink)]">Route</h3>
            <p className="text-[13px] text-[var(--color-muted)]">{trip.plan.routeSummary}</p>
            <Button variant="secondary" size="sm" className="mt-2" onClick={() => onNav('route')}>
              View route
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-5">
        <h3 className="mb-2 text-h3 text-[var(--color-ink)]">Saved items</h3>
        <p className="text-[14px] text-[var(--color-muted)]">
          {trip.savedPlaces.length} places · {trip.savedOffers.length} offers
        </p>
        <Button variant="secondary" size="sm" className="mt-3" onClick={() => onNav('compare')}>
          Add from Compare
        </Button>
      </Card>

      <Card className="p-5">
        <h3 className="mb-2 text-h3 text-[var(--color-ink)]">Quick stats</h3>
        <div className="flex flex-wrap gap-2">
          <Badge tone="cyan">{km(trip.distanceKm)}</Badge>
          <Badge tone="indigo">3 days</Badge>
          <Badge tone="green">{trip.expenses.length} expenses</Badge>
        </div>
      </Card>
    </div>
  )
}

function Itinerary({ trip }: { trip: NonNullable<ReturnType<typeof useApp>['currentTrip']> }) {
  if (!trip.plan)
    return <EmptyState icon="🗺️" title="No itinerary" message="This trip has no generated itinerary." />
  return (
    <div className="space-y-4">
      {trip.plan.days.map((day) => (
        <Card key={day.day} className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <span className="text-[12px] font-semibold text-[#0B5FFF]">DAY {day.day}</span>
              <h3 className="text-h3 text-[var(--color-ink)]">{day.title}</h3>
            </div>
            <span className="text-[13px] text-[var(--color-muted)]">{km(day.distanceKm)}</span>
          </div>
          {day.stops.map((s, i) => (
            <TimelineItem key={i} time={s.time} label={s.label} last={i === day.stops.length - 1} />
          ))}
        </Card>
      ))}
    </div>
  )
}

function Saved({
  trip,
  onNav,
}: {
  trip: NonNullable<ReturnType<typeof useApp>['currentTrip']>
  onNav: (n: 'explore' | 'compare') => void
}) {
  if (trip.savedPlaces.length === 0 && trip.savedOffers.length === 0)
    return (
      <EmptyState
        icon="🔖"
        title="Nothing saved yet"
        message="Save places from Explore or offers from Compare to build your trip."
        action={<Button onClick={() => onNav('explore')}>Explore places</Button>}
      />
    )
  return (
    <div className="space-y-5">
      {trip.savedPlaces.length > 0 && (
        <div>
          <h3 className="mb-3 text-h3 text-[var(--color-ink)]">Places</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {trip.savedPlaces.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </div>
      )}
      {trip.savedOffers.length > 0 && (
        <div>
          <h3 className="mb-3 text-h3 text-[var(--color-ink)]">Offers</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {trip.savedOffers.map((o) => (
              <OfferCard key={o.id} offer={o} onView={() => onNav('compare')} onSave={() => {}} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Expenses({
  trip,
  spent,
}: {
  trip: NonNullable<ReturnType<typeof useApp>['currentTrip']>
  spent: number
}) {
  const remaining = trip.budget - spent
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Budget', value: money(trip.budget), tone: '#0B5FFF' },
            { label: 'Spent', value: money(spent), tone: '#4257D6' },
            {
              label: 'Remaining',
              value: money(remaining),
              tone: remaining < 0 ? '#EF4444' : '#16B978',
            },
          ].map((s) => (
            <Card key={s.label} className="p-3.5 text-center">
              <div className="text-[12px] font-semibold text-[var(--color-muted)]">{s.label}</div>
              <div className="mt-1 text-[18px] font-bold" style={{ color: s.tone }}>
                {s.value}
              </div>
            </Card>
          ))}
        </div>
        <ExpenseForm />
      </div>

      <Card className="p-4">
        <h3 className="mb-2 text-h3 text-[var(--color-ink)]">Expenses</h3>
        {trip.expenses.length === 0 ? (
          <EmptyState icon="💸" title="No expenses yet" message="Add your first expense to start tracking." />
        ) : (
          <div>
            {trip.expenses.map((e) => (
              <ExpenseRow key={e.id} expense={e} />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

function Journal({
  trip,
  spent,
}: {
  trip: NonNullable<ReturnType<typeof useApp>['currentTrip']>
  spent: number
}) {
  return (
    <Card className="p-6 text-center">
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Distance', value: km(trip.distanceKm) },
          { label: 'Days', value: '3' },
          { label: 'Places', value: String(trip.savedPlaces.length || 34) },
          { label: 'Spent', value: money(spent || 12840) },
        ].map((s) => (
          <div key={s.label}>
            <div className="text-h2 text-[var(--color-ink)]">{s.value}</div>
            <div className="text-[12px] text-[var(--color-muted)]">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="mx-auto max-w-md text-[15px] text-[var(--color-ink-2)]">
        "{trip.name}" — a memory in the making. Auto-generated travel stories, photos and route
        recaps arrive in a later milestone.
      </p>
      <div className="mt-4 flex justify-center gap-2">
        <Button variant="secondary" size="sm">
          Create travel story
        </Button>
        <Button variant="secondary" size="sm">
          Export report
        </Button>
      </div>
    </Card>
  )
}
