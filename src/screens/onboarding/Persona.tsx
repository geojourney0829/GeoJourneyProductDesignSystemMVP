import { useState } from 'react'
import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { PERSONAS } from '../../mocks/personas'
import { Button } from '../../components/ui/primitives'
import type { PersonaId } from '../../types'

export default function Persona() {
  const { navigate } = useRouter()
  const { setPersonas } = useApp()
  const [selected, setSelected] = useState<PersonaId[]>([])

  const toggle = (id: PersonaId) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  const next = () => {
    setPersonas(selected)
    navigate('onboarding-priorities')
  }

  return (
    <OnboardingShell
      step={1}
      title="What kind of traveler are you?"
      subtitle="Pick all that fit — GeoJourney tailors routes, stays and recommendations to you."
      onNext={next}
      nextDisabled={selected.length === 0}
    >
      <div className="grid grid-cols-2 gap-3">
        {PERSONAS.map((p) => {
          const active = selected.includes(p.id)
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className="flex flex-col items-start gap-1 rounded-[16px] border p-4 text-left transition-all duration-200"
              style={{
                borderColor: active ? '#0B5FFF' : 'var(--color-line)',
                backgroundColor: active ? '#0B5FFF0d' : 'var(--color-surface)',
              }}
            >
              <span className="text-2xl">{p.emoji}</span>
              <span className="font-semibold text-[var(--color-ink)]">{p.label}</span>
              <span className="text-[12px] text-[var(--color-muted)]">{p.blurb}</span>
            </button>
          )
        })}
      </div>
    </OnboardingShell>
  )
}

export function OnboardingShell({
  step,
  title,
  subtitle,
  children,
  onNext,
  nextDisabled,
  nextLabel = 'Continue',
}: {
  step: number
  title: string
  subtitle: string
  children: React.ReactNode
  onNext: () => void
  nextDisabled?: boolean
  nextLabel?: string
}) {
  const { navigate } = useRouter()
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-6">
      <div className="mb-6 flex items-center gap-2">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="h-1.5 flex-1 rounded-full transition-colors"
            style={{ backgroundColor: i < step ? '#0B5FFF' : 'var(--color-line)' }}
          />
        ))}
      </div>
      <div className="animate-fade-up">
        <h1 className="text-h1 text-[var(--color-ink)]">{title}</h1>
        <p className="mt-2 text-[15px] text-[var(--color-ink-2)]">{subtitle}</p>
      </div>
      <div className="mt-6 flex-1">{children}</div>
      <div className="mt-8 flex flex-col gap-2">
        <Button block size="lg" onClick={onNext} disabled={nextDisabled}>
          {nextLabel}
        </Button>
        <Button block variant="ghost" onClick={() => navigate('home')}>
          Skip for now
        </Button>
      </div>
    </div>
  )
}
