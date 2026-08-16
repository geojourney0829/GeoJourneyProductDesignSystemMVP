import { useEffect, useRef, useState } from 'react'
import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { AIOrchestrator, AI_STATE_SEQUENCE } from '../../services'
import Logo from '../../brand/Logo'
import type { AIState } from '../../types'

export default function Generating() {
  const { navigate, route } = useRouter()
  const { profile, createTripFromPlan } = useApp()
  const [active, setActive] = useState<AIState>('generating')
  const [label, setLabel] = useState('Understanding your request')
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    AIOrchestrator.generatePlan(route.params?.prompt ?? '', profile, (s, l) => {
      setActive(s)
      setLabel(l)
    }).then((plan) => {
      createTripFromPlan(plan)
      setTimeout(() => navigate('generated-trip'), 500)
    })
  }, [navigate, profile, createTripFromPlan, route.params])

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8">
        <span
          className="absolute inset-0 -m-4 animate-ping rounded-full opacity-30"
          style={{ background: '#7C4DFF' }}
        />
        <span
          className="relative grid h-20 w-20 place-items-center rounded-[24px] text-3xl text-white"
          style={{ background: 'linear-gradient(135deg,#7C4DFF,#4257D6)' }}
        >
          ✨
        </span>
      </div>

      <h1 className="text-h2" style={{ color: '#7C4DFF' }}>
        {label}…
      </h1>
      <p className="mt-2 text-[15px] text-[var(--color-muted)]">
        GeoJourney AI is building your journey
      </p>

      <div className="mt-8 w-full max-w-xs space-y-2.5">
        {AI_STATE_SEQUENCE.map((step) => {
          const seqIndex = AI_STATE_SEQUENCE.findIndex((s) => s.state === active)
          const myIndex = AI_STATE_SEQUENCE.findIndex((s) => s.state === step.state)
          const done = myIndex < seqIndex || active === 'result'
          const current = step.state === active
          return (
            <div
              key={step.state}
              className="flex items-center gap-3 rounded-[12px] border px-3.5 py-2.5 text-left text-[14px] transition-all"
              style={{
                borderColor: current ? '#7C4DFF' : 'var(--color-line)',
                backgroundColor: current ? '#7C4DFF0d' : 'var(--color-surface)',
                opacity: done || current ? 1 : 0.5,
              }}
            >
              <span
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] text-white"
                style={{ background: done ? '#16B978' : current ? '#7C4DFF' : 'var(--color-line)' }}
              >
                {done ? '✓' : ''}
              </span>
              <span className="text-[var(--color-ink-2)]">{step.label}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-8 opacity-40">
        <Logo variant="symbol" size={24} />
      </div>
    </div>
  )
}
