import { useMemo, useState } from 'react'
import { useApp } from '../state/AppContext'
import { Chip } from '../components/ui/primitives'
import { PlaceCard } from '../components/cards'
import { DISCOVERY_PLACES } from '../mocks/mumbai-goa'
import type { PlaceCategory } from '../types'

const FILTERS: { id: PlaceCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'viewpoint', label: 'Scenic' },
  { id: 'cafe', label: 'Cafés' },
  { id: 'dhaba', label: 'Dhabas' },
  { id: 'beach', label: 'Beaches' },
  { id: 'waterfall', label: 'Waterfalls' },
  { id: 'fuel', label: 'Fuel' },
]

export default function Explore() {
  const { savePlace } = useApp()
  const [filter, setFilter] = useState<PlaceCategory | 'all'>('all')

  const places = useMemo(
    () => (filter === 'all' ? DISCOVERY_PLACES : DISCOVERY_PLACES.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-8 lg:px-8 lg:pt-6">
      <h1 className="mb-1 text-h1 text-[var(--color-ink)]">Explore</h1>
      <p className="mb-4 text-[15px] text-[var(--color-muted)]">
        Discover places along the Mumbai → Goa belt.
      </p>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <Chip key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)} color="#10BEEA">
            {f.label}
          </Chip>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {places.map((p) => (
          <PlaceCard key={p.id} place={p} onSave={savePlace} />
        ))}
      </div>
    </div>
  )
}
