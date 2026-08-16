import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { Badge, Button, Card, Chip } from '../../components/ui/primitives'
import { ScoreDial } from '../../components/ui/ScoreDial'
import { TimelineItem } from '../../components/cards'
import { EmptyState } from '../../components/ui/states'
import { money, km, sumExpenses } from '../../lib/format'
import { modeIcon } from '../../components/cards'

export default function GeneratedTrip() {
  const { navigate } = useRouter()
  const { currentTrip, toast } = useApp()
  const plan = currentTrip?.plan

  if (!plan)
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState
          icon="✨"
          title="No generated trip yet"
          message="Head to the planner to generate your journey."
          action={<Button onClick={() => navigate('planner')}>Open planner</Button>}
        />
      </div>
    )

  const estimated = sumExpenses(
    plan.estimatedExpenses.map((e) => ({
      id: e.category,
      category: e.category,
      amount: e.amount,
      date: '',
      description: '',
    })),
  )

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-10 lg:px-8 lg:pt-6">
      {/* Hero summary */}
      <Card className="mb-5 overflow-hidden">
        <div
          className="p-5 text-white"
          style={{ background: 'linear-gradient(135deg,#0B5FFF,#4257D6)' }}
        >
          <Badge tone="ai">✨ AI generated</Badge>
          <h1 className="mt-2 text-h1">
            {plan.source} → {plan.destination}
          </h1>
          <p className="mt-1 text-white/85">{plan.summary}</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[14px]">
            <span>📅 3 days</span>
            <span>
              {modeIcon[plan.travelMode]} {plan.travelMode}
            </span>
            <span>📏 {km(plan.distanceKm)}</span>
            <span>💰 {money(estimated)} est.</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 p-5">
          <div>
            <h2 className="text-h3 text-[var(--color-ink)]">Route intelligence</h2>
            <p className="text-[14px] text-[var(--color-muted)]">{plan.routeSummary}</p>
            <Button variant="secondary" size="sm" className="mt-3" onClick={() => navigate('route')}>
              View route & map
            </Button>
          </div>
          <ScoreDial value={plan.routeScore} />
        </div>
      </Card>

      {/* Itinerary preview */}
      <h2 className="mb-3 text-h2 text-[var(--color-ink)]">Your itinerary</h2>
      <div className="mb-5 space-y-4">
        {plan.days.map((day) => (
          <Card key={day.day} className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <span className="text-[12px] font-semibold text-[#0B5FFF]">DAY {day.day}</span>
                <h3 className="text-h3 text-[var(--color-ink)]">{day.title}</h3>
              </div>
              <span className="text-[13px] text-[var(--color-muted)]">{km(day.distanceKm)}</span>
            </div>
            <div>
              {day.stops.map((s, i) => (
                <TimelineItem
                  key={i}
                  time={s.time}
                  label={s.label}
                  last={i === day.stops.length - 1}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Refine actions */}
      <h2 className="mb-3 text-h2 text-[var(--color-ink)]">Refine</h2>
      <div className="mb-6 flex flex-wrap gap-2">
        {['Change Budget', 'Make More Scenic', 'Make More Affordable', 'Add Food Stops'].map((a) => (
          <Chip key={a} color="#7C4DFF" onClick={() => toast(`AI: "${a}" — regenerating (demo)`, 'info')}>
            ✨ {a}
          </Chip>
        ))}
      </div>

      {/* Notes */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <NoteCard title="Packing" icon="🎒" items={plan.packingSuggestions} tone="#4257D6" />
        <NoteCard title="Weather notes" icon="🌦️" items={plan.weatherNotes} tone="#10BEEA" />
        <NoteCard title="Safety notes" icon="🛡️" items={plan.safetyNotes} tone="#16B978" />
        <NoteCard
          title="Budget breakdown"
          icon="💰"
          items={plan.estimatedExpenses.map((e) => `${e.category}: ${money(e.amount)}`)}
          tone="#0B5FFF"
        />
      </div>

      {/* Primary CTAs */}
      <div className="sticky bottom-20 flex gap-2 lg:bottom-4">
        <Button variant="secondary" size="lg" className="flex-1" onClick={() => navigate('compare')}>
          Compare ways
        </Button>
        <Button
          size="lg"
          className="flex-1"
          onClick={() => {
            toast('Trip added to your workspace')
            navigate('trip')
          }}
        >
          Build this trip
        </Button>
      </div>
    </div>
  )
}

function NoteCard({
  title,
  icon,
  items,
  tone,
}: {
  title: string
  icon: string
  items: string[]
  tone: string
}) {
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center gap-2 font-semibold" style={{ color: tone }}>
        <span>{icon}</span>
        {title}
      </div>
      <ul className="space-y-1.5 text-[14px] capitalize text-[var(--color-ink-2)]">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span style={{ color: tone }}>•</span>
            {it}
          </li>
        ))}
      </ul>
    </Card>
  )
}
