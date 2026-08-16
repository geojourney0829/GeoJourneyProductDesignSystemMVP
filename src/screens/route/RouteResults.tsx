import { useEffect, useState } from 'react'
import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { RouteService, MapService } from '../../services'
import { MapCanvas } from '../../components/ui/MapCanvas'
import { ScoreDial, ScoreBar } from '../../components/ui/ScoreDial'
import { Badge, Button, Card } from '../../components/ui/primitives'
import { RouteCard, PlaceCard } from '../../components/cards'
import { CardSkeleton, ErrorState } from '../../components/ui/states'
import { Sheet } from '../../components/ui/overlays'
import { DISCOVERY_PLACES } from '../../mocks/mumbai-goa'
import type { Place, RouteOption } from '../../types'

const alertTone: Record<string, 'warning' | 'danger'> = {
  low: 'warning',
  medium: 'warning',
  high: 'danger',
}

export default function RouteResults() {
  const { navigate } = useRouter()
  const { savePlace } = useApp()
  const [routes, setRoutes] = useState<RouteOption[] | null>(null)
  const [error, setError] = useState(false)
  const [selectedId, setSelectedId] = useState<string>('')
  const [sheetPlace, setSheetPlace] = useState<Place | null>(null)

  const load = () => {
    setError(false)
    setRoutes(null)
    RouteService.getRoutes('Mumbai', 'Goa')
      .then((r) => {
        setRoutes(r)
        setSelectedId(r[0].id)
      })
      .catch(() => setError(true))
  }

  useEffect(load, [])

  const selected = routes?.find((r) => r.id === selectedId) ?? routes?.[0]

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-8 lg:px-8 lg:pt-6">
      <h1 className="mb-1 text-h1 text-[var(--color-ink)]">Mumbai → Goa</h1>
      <p className="mb-4 text-[15px] text-[var(--color-muted)]">
        Choose a route and discover what's along the way.
      </p>

      {error ? (
        <ErrorState message="We couldn't calculate routes right now." onRetry={load} />
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* Map + intelligence */}
          <div>
            {selected ? (
              <MapCanvas
                route={selected}
                pins={MapService.toPins(DISCOVERY_PLACES.slice(0, 4))}
                onPinClick={setSheetPlace}
                height={340}
                className="mb-4"
              />
            ) : (
              <div className="mb-4 h-[340px] gj-skeleton rounded-[20px]" />
            )}

            {selected && (
              <Card className="p-5">
                <div className="flex items-center gap-5">
                  <ScoreDial value={selected.score.overall} />
                  <div className="flex-1 space-y-2.5">
                    <ScoreBar label="Safety" value={selected.score.safety} />
                    <ScoreBar label="Road Quality" value={selected.score.roadQuality} />
                    <ScoreBar label="Weather" value={selected.score.weather} />
                    <ScoreBar label="Traffic" value={selected.score.traffic} />
                  </div>
                </div>

                {selected.alerts.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {selected.alerts.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center gap-2 rounded-[12px] px-3 py-2.5 text-[13px]"
                        style={{ backgroundColor: a.severity === 'high' ? '#EF444414' : '#F59E0B14' }}
                      >
                        <Badge tone={alertTone[a.severity]}>⚠ {a.severity}</Badge>
                        <span className="text-[var(--color-ink-2)]">
                          {a.label} · {a.location}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Route options */}
          <div>
            <h2 className="mb-3 text-h3 text-[var(--color-ink)]">Route options</h2>
            <div className="space-y-3">
              {routes
                ? routes.map((r) => (
                    <RouteCard
                      key={r.id}
                      route={r}
                      active={r.id === selectedId}
                      onSelect={(x) => setSelectedId(x.id)}
                    />
                  ))
                : [0, 1, 2].map((i) => <CardSkeleton key={i} />)}
            </div>
            <Button block size="lg" className="mt-4" onClick={() => navigate('compare')}>
              Compare all ways to travel
            </Button>
          </div>
        </div>
      )}

      {/* Along the way */}
      <section className="mt-8">
        <h2 className="mb-3 text-h2 text-[var(--color-ink)]">Along the way</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {DISCOVERY_PLACES.slice(0, 4).map((p) => (
            <PlaceCard key={p.id} place={p} onSave={savePlace} onOpen={setSheetPlace} />
          ))}
        </div>
      </section>

      {/* Place detail sheet */}
      <Sheet open={!!sheetPlace} onClose={() => setSheetPlace(null)} title={sheetPlace?.name}>
        {sheetPlace && (
          <div>
            <img
              src={sheetPlace.image}
              alt={sheetPlace.name}
              className="mb-3 h-44 w-full rounded-[14px] object-cover"
            />
            <p className="text-[15px] text-[var(--color-ink-2)]">{sheetPlace.description}</p>
            <div className="mt-4 flex gap-2">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  savePlace(sheetPlace)
                  setSheetPlace(null)
                }}
              >
                🔖 Save to trip
              </Button>
              <Button className="flex-1" onClick={() => setSheetPlace(null)}>
                Directions
              </Button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  )
}
