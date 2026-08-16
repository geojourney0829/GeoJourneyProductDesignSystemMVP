import { useState } from 'react'
import { useApp } from '../../state/AppContext'
import { Button, Card, Chip, Input } from '../../components/ui/primitives'
import type { ExpenseCategory } from '../../types'

const CATEGORIES: { id: ExpenseCategory; label: string; icon: string }[] = [
  { id: 'fuel', label: 'Fuel', icon: '⛽' },
  { id: 'food', label: 'Food', icon: '🍽️' },
  { id: 'stay', label: 'Stay', icon: '🏨' },
  { id: 'toll', label: 'Toll', icon: '🛣️' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'misc', label: 'Misc', icon: '📦' },
]

export function ExpenseForm() {
  const { addExpense } = useApp()
  const [category, setCategory] = useState<ExpenseCategory>('fuel')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [description, setDescription] = useState('')

  const submit = () => {
    const value = Number(amount)
    if (!value || value <= 0) return
    addExpense({
      category,
      amount: value,
      date,
      description: description.trim() || CATEGORIES.find((c) => c.id === category)!.label,
    })
    setAmount('')
    setDescription('')
  }

  return (
    <Card className="p-4">
      <h3 className="mb-3 text-h3 text-[var(--color-ink)]">Add expense</h3>
      <div className="mb-3 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
            {c.icon} {c.label}
          </Chip>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Amount (₹)"
          type="number"
          inputMode="numeric"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
        />
        <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="mt-3">
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Fuel at Panvel"
        />
      </div>
      <Button block className="mt-4" onClick={submit} disabled={!amount}>
        Add expense
      </Button>
    </Card>
  )
}
