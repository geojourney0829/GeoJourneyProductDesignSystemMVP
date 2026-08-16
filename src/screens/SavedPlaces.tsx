import { useRouter } from '../lib/router'
import { useApp } from '../state/AppContext'
import { Card, Rating } from '../components/ui/primitives'
import { EmptyState } from '../components/ui/states'

export default function SavedPlaces() {
  const { navigate } = useRouter()
  const { wishlist, toggleWishlist, addWishlistToTrip } = useApp()

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-8 lg:px-8 lg:pt-6">
      <div className="mb-5">
        <h1 className="text-h2 text-[var(--color-ink)]">Saved Places</h1>
        <p className="text-[14px] text-[var(--color-muted)]">
          {wishlist.length} place{wishlist.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {wishlist.length === 0 ? (
        <EmptyState
          icon="🔖"
          title="Nothing saved yet"
          message="Tap the heart on any community place to save it here."
          action={
            <button
              onClick={() => navigate('community')}
              className="rounded-[12px] px-5 py-2.5 text-[14px] font-semibold text-white transition-all hover:brightness-110"
              style={{ background: '#0B5FFF' }}
            >
              Explore Community Map
            </button>
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {wishlist.map((place) => (
            <Card key={place.id} className="flex gap-3 p-3">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[12px] bg-[var(--color-surface-2)]">
                <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold leading-snug text-[var(--color-ink)]">
                  {place.name}
                </h3>
                {place.rating > 0 && <Rating value={place.rating} count={place.reviewCount} />}
                <div className="mt-1 flex flex-wrap gap-1">
                  {place.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[var(--color-surface-2)] px-2 py-0.5 text-[11px] text-[var(--color-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-2.5 flex gap-2">
                  <button
                    onClick={() => addWishlistToTrip(place)}
                    className="rounded-[8px] bg-[var(--color-surface-2)] px-3 py-1.5 text-[12px] font-semibold text-[var(--color-ink-2)] transition-colors hover:bg-[var(--color-line)]"
                  >
                    🧳 Add to Trip
                  </button>
                  <button
                    onClick={() => toggleWishlist(place)}
                    className="rounded-[8px] px-3 py-1.5 text-[12px] font-semibold transition-colors hover:bg-[var(--color-surface-2)]"
                    style={{ color: '#EF4444' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
