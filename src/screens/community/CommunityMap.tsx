import { useState } from 'react'
import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { MapCanvas } from '../../components/ui/MapCanvas'
import { Badge, Button, Card, Rating } from '../../components/ui/primitives'
import { EmptyState } from '../../components/ui/states'
import { COMMUNITY_CATEGORIES } from '../../mocks/community'
import type { CommunityCategory } from '../../types'

const CATEGORY_COLORS: Record<CommunityCategory, string> = {
  food: '#F59E0B',
  scenic: '#10BEEA',
  'hidden-gem': '#7C4DFF',
  hotel: '#4257D6',
  fuel: '#64748B',
  attraction: '#0B5FFF',
  safety: '#16B978',
}

type ViewMode = 'map' | 'list'

export default function CommunityMap() {
  const { navigate } = useRouter()
  const { communityLocations } = useApp()
  const [activeCategory, setActiveCategory] = useState<CommunityCategory | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('map')

  const filtered = activeCategory
    ? communityLocations.filter((l) => l.communityCategory === activeCategory)
    : communityLocations

  const pins = filtered.map((loc) => ({
    x: loc.lng,
    y: loc.lat,
    place: loc,
  }))

  const toggleCategory = (id: CommunityCategory) =>
    setActiveCategory((prev) => (prev === id ? null : id))

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-8 lg:px-8 lg:pt-6">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-h2 text-[var(--color-ink)]">Community Map</h1>
          <p className="text-[14px] text-[var(--color-muted)]">
            {filtered.length} place{filtered.length !== 1 ? 's' : ''} shared by travelers
          </p>
        </div>
        <button
          onClick={() => navigate('add-location')}
          className="flex shrink-0 h-10 items-center gap-1.5 rounded-[12px] px-4 text-[14px] font-semibold text-white transition-all hover:brightness-110"
          style={{ background: '#16B978' }}
        >
          <span>＋</span> Add
        </button>
      </div>

      {/* Category filter */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1.5">
        <button
          onClick={() => setActiveCategory(null)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[999px] border px-3.5 py-1.5 text-[13px] font-semibold transition-all"
          style={{
            borderColor: !activeCategory ? '#0B5FFF' : 'var(--color-line)',
            backgroundColor: !activeCategory ? '#0B5FFF14' : 'var(--color-surface)',
            color: !activeCategory ? '#0B5FFF' : 'var(--color-ink-2)',
          }}
        >
          🌍 All
        </button>
        {COMMUNITY_CATEGORIES.map((cat) => {
          const active = activeCategory === cat.id
          const color = CATEGORY_COLORS[cat.id]
          return (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-[999px] border px-3.5 py-1.5 text-[13px] font-semibold transition-all"
              style={{
                borderColor: active ? color : 'var(--color-line)',
                backgroundColor: active ? `${color}18` : 'var(--color-surface)',
                color: active ? color : 'var(--color-ink-2)',
              }}
            >
              {cat.icon} {cat.label}
            </button>
          )
        })}
      </div>

      {/* View toggle */}
      <div className="mb-4 flex gap-1 rounded-[12px] bg-[var(--color-surface-2)] p-1">
        {(['map', 'list'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className="flex-1 rounded-[10px] py-2 text-[13px] font-semibold transition-all"
            style={{
              backgroundColor: viewMode === mode ? 'var(--color-surface)' : 'transparent',
              color: viewMode === mode ? 'var(--color-ink)' : 'var(--color-muted)',
              boxShadow: viewMode === mode ? '0 1px 4px rgba(15,23,42,0.08)' : 'none',
            }}
          >
            {mode === 'map' ? '🗺️ Map' : '☰ List'}
          </button>
        ))}
      </div>

      {/* Map */}
      {viewMode === 'map' && (
        <div className="mb-5">
          <MapCanvas
            pins={pins}
            onPinClick={(place) => navigate('place-detail', { id: place.id })}
            height={320}
          />
          <p className="mt-2 text-center text-[12px] text-[var(--color-muted)]">
            Tap a pin to see place details
          </p>
        </div>
      )}

      {/* Location cards */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="📍"
          title="No places here yet"
          message="Be the first to add a location in this category."
          action={
            <Button onClick={() => navigate('add-location')}>Add a place</Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((loc) => (
            <Card
              key={loc.id}
              interactive
              onClick={() => navigate('place-detail', { id: loc.id })}
              className="flex gap-3 p-3"
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[12px] bg-[var(--color-surface-2)]">
                <img src={loc.image} alt={loc.name} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-start gap-2">
                  <h3 className="flex-1 text-[15px] font-semibold leading-snug text-[var(--color-ink)]">
                    {loc.name}
                  </h3>
                  {loc.contributorVerified && <Badge tone="cyan">✓</Badge>}
                </div>
                <Rating value={loc.rating} count={loc.reviewCount} />
                <div className="mt-1 flex flex-wrap gap-1">
                  {loc.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[var(--color-surface-2)] px-2 py-0.5 text-[11px] text-[var(--color-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-1.5 text-[12px] text-[var(--color-muted)]">
                  by {loc.contributor} · {loc.distanceKm} km away
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

