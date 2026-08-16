import { useState } from 'react'
import { useRouter } from '../../lib/router'
import { Button, Card, Chip, Input } from '../../components/ui/primitives'
import type { TravelMode } from '../../types'
import { modeIcon } from '../../components/cards'

const PROMPTS = [
  'Plan a 3-day Goa trip under ₹15,000.',
  'Plan a scenic bike trip from Mumbai to Goa.',
  'Plan a photography-focused road trip.',
  'Plan a food-first weekend.',
]

const MODES: TravelMode[] = ['bike', 'car', 'train', 'flight', 'bus']

export default function Planner() {
  const { navigate } = useRouter()
  const [prompt, setPrompt] = useState(PROMPTS[1])
  const [mode, setMode] = useState<TravelMode>('bike')
  const [tripType, setTripType] = useState<'one-way' | 'round' | 'multi'>('round')

  const generate = () => navigate('generating', { prompt })

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-8 lg:px-8 lg:pt-6">
      <h1 className="mb-1 text-h1 text-[var(--color-ink)]">Plan your trip</h1>
      <p className="mb-5 text-[15px] text-[var(--color-muted)]">
        Describe your trip in words, or fill the details below.
      </p>

      {/* AI natural-language prompt */}
      <div
        className="mb-6 rounded-[20px] p-5"
        style={{ background: 'var(--color-ai-soft)' }}
      >
        <div className="mb-2 flex items-center gap-2 text-h3" style={{ color: '#7C4DFF' }}>
          ✨ Ask GeoJourney AI
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          className="w-full resize-none rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface)] p-3 text-[15px] text-[var(--color-ink)] outline-none focus:border-[#7C4DFF]"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {PROMPTS.map((p) => (
            <Chip key={p} active={prompt === p} color="#7C4DFF" onClick={() => setPrompt(p)}>
              {p}
            </Chip>
          ))}
        </div>
        <Button variant="ai" size="lg" className="mt-4" block onClick={generate}>
          ✨ Generate with AI
        </Button>
      </div>

      {/* Structured fields */}
      <Card className="p-5">
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input label="Starting point" defaultValue="Mumbai" icon="🟢" />
          <Input label="Destination" defaultValue="Goa" icon="📍" />
          <Input label="Travel date" type="date" defaultValue="2026-10-18" />
          <Input label="Return date" type="date" defaultValue="2026-10-20" />
        </div>

        <div className="mb-4">
          <span className="mb-2 block text-[13px] font-semibold text-[var(--color-ink-2)]">Trip type</span>
          <div className="flex gap-2">
            {(['one-way', 'round', 'multi'] as const).map((t) => (
              <Chip key={t} active={tripType === t} onClick={() => setTripType(t)}>
                {t === 'one-way' ? 'One-way' : t === 'round' ? 'Round trip' : 'Multi-city'}
              </Chip>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <span className="mb-2 block text-[13px] font-semibold text-[var(--color-ink-2)]">Travel mode</span>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <Chip key={m} active={mode === m} onClick={() => setMode(m)}>
                {modeIcon[m]} {m}
              </Chip>
            ))}
          </div>
        </div>

        <Input label="Budget (₹)" type="number" defaultValue={15000} icon="💰" />

        <Button size="lg" block className="mt-5" onClick={generate}>
          Build my trip
        </Button>
      </Card>
    </div>
  )
}
