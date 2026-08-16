import { useEffect } from 'react'
import { useRouter } from '../lib/router'
import { useApp } from '../state/AppContext'
import { Button, Card } from '../components/ui/primitives'
import { EmptyState } from '../components/ui/states'
import { ExpenseRow } from '../components/cards'
import { ExpenseForm } from './trip/ExpenseForm'
import { money, sumExpenses } from '../lib/format'

export default function Expenses() {
  const { navigate } = useRouter()
  const { currentTrip, trips, openTrip } = useApp()

  const trip = currentTrip ?? trips[0]

  useEffect(() => {
    if (!currentTrip && trip) openTrip(trip.id)
  }, [currentTrip, trip, openTrip])

  if (!trip)
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState
          icon="💸"
          title="No trip to track"
          message="Open a trip to start logging expenses."
          action={<Button onClick={() => navigate('planner')}>Plan a trip</Button>}
        />
      </div>
    )

  const spent = sumExpenses(trip.expenses)
  const remaining = trip.budget - spent

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-8 lg:px-8 lg:pt-6">
      <h1 className="mb-1 text-h1 text-[var(--color-ink)]">Expenses</h1>
      <p className="mb-5 text-[15px] text-[var(--color-muted)]">Tracking {trip.name}</p>

      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          { label: 'Budget', value: money(trip.budget), tone: '#0B5FFF' },
          { label: 'Spent', value: money(spent), tone: '#4257D6' },
          { label: 'Remaining', value: money(remaining), tone: remaining < 0 ? '#EF4444' : '#16B978' },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <div className="text-[12px] font-semibold text-[var(--color-muted)]">{s.label}</div>
            <div className="mt-1 text-h3" style={{ color: s.tone }}>
              {s.value}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <ExpenseForm />
        <Card className="p-4">
          <h3 className="mb-2 text-h3 text-[var(--color-ink)]">History</h3>
          {trip.expenses.length === 0 ? (
            <EmptyState icon="💸" title="No expenses yet" message="Add your first expense." />
          ) : (
            trip.expenses.map((e) => <ExpenseRow key={e.id} expense={e} />)
          )}
        </Card>
      </div>
    </div>
  )
}
