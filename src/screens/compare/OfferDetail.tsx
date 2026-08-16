import { useState } from 'react'
import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { Badge, Button, Card, Rating } from '../../components/ui/primitives'
import { EmptyState } from '../../components/ui/states'
import { Sheet } from '../../components/ui/overlays'
import { TRANSPORT_OFFERS, HOTEL_OFFERS } from '../../mocks/offers'
import { money, relativeChecked } from '../../lib/format'

const ALL = [...TRANSPORT_OFFERS, ...HOTEL_OFFERS]

export default function OfferDetail() {
  const { route, navigate } = useRouter()
  const { saveOffer } = useApp()
  const [redirect, setRedirect] = useState(false)
  const offer = ALL.find((o) => o.id === route.params?.id)

  if (!offer)
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <EmptyState
          title="Offer not found"
          message="This demo offer is no longer available."
          action={<Button onClick={() => navigate('compare')}>Back to compare</Button>}
        />
      </div>
    )

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-10 lg:px-8 lg:pt-6">
      <Card className="overflow-hidden">
        {offer.image && (
          <img src={offer.image} alt={offer.title} className="h-56 w-full object-cover" />
        )}
        <div className="p-5">
          <div className="mb-2 flex items-center justify-between">
            <Badge tone="neutral">Demo/Test Data</Badge>
            {offer.badge && <Badge tone="green">{offer.badge}</Badge>}
          </div>
          <h1 className="text-h1 text-[var(--color-ink)]">{offer.title}</h1>
          <p className="text-[14px] text-[var(--color-muted)]">
            {offer.provider} · {offer.providerType}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Rating value={offer.rating} count={offer.reviewCount} />
            <span className="text-[14px] text-[var(--color-ink-2)]">⏱ {offer.duration}</span>
            <span className="text-[14px] capitalize text-[var(--color-ink-2)]">
              {offer.cancellation} cancellation
            </span>
            <span className="text-[14px] capitalize text-[var(--color-ink-2)]">
              {offer.availability}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {offer.amenities.map((a) => (
              <span
                key={a}
                className="rounded-[8px] bg-[var(--color-surface-2)] px-2.5 py-1.5 text-[13px] text-[var(--color-ink-2)]"
              >
                {a}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-end justify-between border-t border-[var(--color-line)] pt-5">
            <div>
              <div className="text-display text-[var(--color-ink)]">
                {money(offer.price, offer.currency)}
              </div>
              <div className="text-[12px] text-[var(--color-muted)]">
                {relativeChecked(offer.retrievedAt)} · not a guaranteed price
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <Button variant="secondary" size="lg" className="flex-1" onClick={() => saveOffer(offer)}>
              🔖 Save to trip
            </Button>
            <Button size="lg" className="flex-1" onClick={() => setRedirect(true)}>
              View Deal ↗
            </Button>
          </div>
        </div>
      </Card>

      {/* External redirect placeholder */}
      <Sheet open={redirect} onClose={() => setRedirect(false)} title="Leaving GeoJourney">
        <p className="text-[15px] text-[var(--color-ink-2)]">
          You'll complete this booking on{' '}
          <span className="font-semibold text-[var(--color-ink)]">{offer.provider}</span>. GeoJourney
          doesn't process payments — prices and availability are confirmed on the provider site.
        </p>
        <div
          className="mt-3 rounded-[10px] px-3 py-2 text-[13px]"
          style={{ background: '#F59E0B14', color: '#B45309' }}
        >
          Demo link — this prototype won't open an external site.
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={() => setRedirect(false)}>
            Stay here
          </Button>
          <Button className="flex-1" onClick={() => setRedirect(false)}>
            Continue to {offer.provider} ↗
          </Button>
        </div>
      </Sheet>
    </div>
  )
}
