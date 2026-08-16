import { useState } from 'react'
import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { PRIORITIES } from '../../mocks/personas'
import { OnboardingShell } from './Persona'
import type { PriorityId } from '../../types'

export default function Priorities() {
  const { navigate } = useRouter()
  const { setPriorities } = useApp()
  const [selected, setSelected] = useState<PriorityId[]>(['scenic', 'lower-cost'])

  const toggle = (id: PriorityId) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  const finish = () => {
    setPriorities(selected)
    navigate('home')
  }

  return (
    <OnboardingShell
      step={2}
      title="What matters most on a trip?"
      subtitle="We'll rank routes and offers around your priorities — including the 'Best for Me' sort."
      onNext={finish}
      nextDisabled={selected.length === 0}
      nextLabel="Start exploring"
    >
      <div className="flex flex-wrap gap-2.5">
        {PRIORITIES.map((p) => {
          const active = selected.includes(p.id)
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className="rounded-[999px] border px-4 py-2.5 text-[14px] font-semibold transition-all duration-200"
              style={{
                borderColor: active ? '#0B5FFF' : 'var(--color-line)',
                backgroundColor: active ? '#0B5FFF14' : 'var(--color-surface)',
                color: active ? '#0B5FFF' : 'var(--color-ink-2)',
              }}
            >
              <span className="mr-1">{p.icon}</span>
              {p.label}
            </button>
          )
        })}
      </div>
    </OnboardingShell>
  )
}
