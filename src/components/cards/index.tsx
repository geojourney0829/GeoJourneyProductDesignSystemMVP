import type { Expense, Offer, Place, RouteOption, Trip } from '../../types'
import { Badge, Button, Card, Rating } from '../ui/primitives'
import { money, km, formatDateRange, relativeChecked } from '../../lib/format'

const modeIcon: Record<string, string> = {
  car: '🚗',
  bike: '🏍️',
  train: '🚆',
  flight: '✈️',
  bus: '🚌',
  walking: '🚶',
  ev: '⚡',
  local: '🚕',
}
const catIcon: Record<string, string> = {
  restaurant: '🍽️',
  cafe: '☕',
  dhaba: '🍛',
  hotel: '🏨',
  fuel: '⛽',
  ev: '🔌',
  hospital: '🏥',
  viewpoint: '🌄',
  beach: '🏖️',
  waterfall: '💦',
  temple: '🛕',
  historical: '🏛️',
  'hidden-gem': '💎',
}
const expenseIcon: Record<string, string> = {
  fuel: '⛽',
  food: '🍽️',
  stay: '🏨',
  toll: '🛣️',
  shopping: '🛍️',
  misc: '📦',
}

/* ---------------- OfferCard (comparison) ---------------- */
export function OfferCard({
  offer,
  onView,
  onSave,
  highlight,
}: {
  offer: Offer
  onView: (o: Offer) => void
  onSave: (o: Offer) => void
  highlight?: boolean
}) {
  return (
    <Card
      className={`overflow-hidden ${highlight ? 'ring-2 ring-[#0B5FFF]' : ''}`}
    >
      {offer.image && (
        <div className="h-32 w-full bg-[var(--color-surface-2)]">
          <img src={offer.image} alt={offer.title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-muted)]">
              {offer.mode && <span>{modeIcon[offer.mode]}</span>}
              {offer.provider} · {offer.providerType}
            </div>
            <h3 className="truncate text-h3 text-[var(--color-ink)]">{offer.title}</h3>
          </div>
          {offer.badge && <Badge tone={highlight ? 'brand' : 'green'}>{offer.badge}</Badge>}
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[var(--color-ink-2)]">
          <Rating value={offer.rating} count={offer.reviewCount} />
          <span>⏱ {offer.duration}</span>
          <span className="capitalize">
            {offer.cancellation === 'free' ? '✓ Free cancellation' : `${offer.cancellation}`}
          </span>
        </div>

        {offer.amenities.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {offer.amenities.slice(0, 4).map((a) => (
              <span
                key={a}
                className="rounded-[8px] bg-[var(--color-surface-2)] px-2 py-1 text-[12px] text-[var(--color-ink-2)]"
              >
                {a}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-end justify-between">
          <div>
            <div className="text-h2 text-[var(--color-ink)]">{money(offer.price, offer.currency)}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-muted)]">
              <Badge tone="neutral">Demo/Test Data</Badge>
              {relativeChecked(offer.retrievedAt)}
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => onSave(offer)} className="flex-1">
            🔖 Save
          </Button>
          <Button size="sm" onClick={() => onView(offer)} className="flex-1">
            View Deal ↗
          </Button>
        </div>
      </div>
    </Card>
  )
}

/* ---------------- PlaceCard ---------------- */
export function PlaceCard({
  place,
  onSave,
  onOpen,
}: {
  place: Place
  onSave?: (p: Place) => void
  onOpen?: (p: Place) => void
}) {
  return (
    <Card interactive className="overflow-hidden" onClick={() => onOpen?.(place)}>
      <div className="relative h-36 w-full bg-[var(--color-surface-2)]">
        <img src={place.image} alt={place.name} className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute left-2 top-2">
          <Badge tone="cyan">
            {catIcon[place.category]} {place.category.replace('-', ' ')}
          </Badge>
        </span>
        {onSave && (
          <button
            aria-label={`Save ${place.name}`}
            onClick={(e) => {
              e.stopPropagation()
              onSave(place)
            }}
            className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[var(--color-ink)] shadow"
          >
            🔖
          </button>
        )}
      </div>
      <div className="p-3">
        <h3 className="truncate text-[16px] font-semibold text-[var(--color-ink)]">{place.name}</h3>
        <div className="mt-1 flex items-center justify-between text-[13px] text-[var(--color-muted)]">
          <Rating value={place.rating} count={place.reviewCount} />
          <span>{km(place.distanceKm)}</span>
        </div>
      </div>
    </Card>
  )
}

/* ---------------- TripCard ---------------- */
export function TripCard({ trip, onOpen }: { trip: Trip; onOpen: (t: Trip) => void }) {
  return (
    <Card interactive className="overflow-hidden" onClick={() => onOpen(trip)}>
      <div className="relative h-32 w-full bg-[var(--color-surface-2)]">
        <img src={trip.image} alt={trip.name} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 text-white">
          <div className="text-[16px] font-bold">{trip.name}</div>
          <div className="text-[12px] opacity-90">
            {modeIcon[trip.travelMode]} {trip.source} → {trip.destination} ·{' '}
            {formatDateRange(trip.startDate, trip.endDate)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-3 text-[13px] text-[var(--color-ink-2)]">
        <span>{km(trip.distanceKm)}</span>
        <span>{money(trip.budget, trip.currency)} budget</span>
      </div>
    </Card>
  )
}

/* ---------------- RouteCard ---------------- */
export function RouteCard({
  route,
  active,
  onSelect,
}: {
  route: RouteOption
  active?: boolean
  onSelect: (r: RouteOption) => void
}) {
  const band = route.score.overall >= 85 ? 'green' : route.score.overall >= 70 ? 'cyan' : 'warning'
  return (
    <Card
      interactive
      onClick={() => onSelect(route)}
      className={`p-4 ${active ? 'ring-2 ring-[#0B5FFF]' : ''}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-h3 text-[var(--color-ink)]">{route.label}</h3>
          {active && <Badge tone="brand">Selected</Badge>}
        </div>
        <Badge tone={band as 'green'}>{route.score.overall}/100</Badge>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[var(--color-ink-2)]">
        <span>📏 {km(route.distanceKm)}</span>
        <span>⏱ {route.durationLabel}</span>
        <span>⛽ {money(route.fuelCost)}</span>
        <span>🛣 {money(route.tollCost)}</span>
      </div>
      {route.alerts.length > 0 && (
        <div className="mt-2 flex items-center gap-1.5 text-[12px]" style={{ color: '#F59E0B' }}>
          ⚠️ {route.alerts[0].label} · {route.alerts[0].location}
        </div>
      )}
    </Card>
  )
}

/* ---------------- ExpenseCard ---------------- */
export function ExpenseRow({ expense }: { expense: Expense }) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--color-line)] py-3 last:border-0">
      <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[var(--color-surface-2)] text-base">
        {expenseIcon[expense.category]}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-medium text-[var(--color-ink)]">
          {expense.description}
        </div>
        <div className="text-[12px] capitalize text-[var(--color-muted)]">
          {expense.category} · {new Date(expense.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
        </div>
      </div>
      <div className="text-[15px] font-semibold text-[var(--color-ink)]">{money(expense.amount)}</div>
    </div>
  )
}

/* ---------------- TimelineItem ---------------- */
export function TimelineItem({
  time,
  label,
  last,
}: {
  time: string
  label: string
  last?: boolean
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#0B5FFF' }} />
        {!last && <span className="w-0.5 flex-1 bg-[var(--color-line)]" />}
      </div>
      <div className="pb-4">
        <div className="text-[12px] font-semibold text-[var(--color-muted)]">{time}</div>
        <div className="text-[15px] text-[var(--color-ink)]">{label}</div>
      </div>
    </div>
  )
}

export { modeIcon, catIcon, expenseIcon }
