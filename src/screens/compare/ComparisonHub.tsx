import { useEffect, useMemo, useState } from 'react'
import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { ComparisonService, RANK_MODES } from '../../services'
import { Chip } from '../../components/ui/primitives'
import { Tabs } from '../../components/ui/Tabs'
import { OfferCard } from '../../components/cards'
import { CardSkeleton } from '../../components/ui/states'
import type { Offer, RankMode } from '../../types'

type Category = 'transport' | 'hotels'

export default function ComparisonHub() {
  const { navigate } = useRouter()
  const { profile, saveOffer } = useApp()
  const [category, setCategory] = useState<Category>('transport')
  const [rank, setRank] = useState<RankMode>('BEST_FOR_USER')
  const [transport, setTransport] = useState<Offer[] | null>(null)
  const [hotels, setHotels] = useState<Offer[] | null>(null)

  useEffect(() => {
    setTransport(null)
    setHotels(null)
    const t = setTimeout(() => {
      ComparisonService.getTransportOffers().then(setTransport)
      ComparisonService.getHotelOffers().then(setHotels)
    }, 450)
    return () => clearTimeout(t)
  }, [])

  const source = category === 'transport' ? transport : hotels
  const ranked = useMemo(
    () => (source ? ComparisonService.rank(source, rank, profile) : null),
    [source, rank, profile],
  )

  const openDeal = (offer: Offer) => navigate('offer-detail', { id: offer.id })

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-8 lg:px-8 lg:pt-6">
      <h1 className="mb-1 text-h1 text-[var(--color-ink)]">Compare · Mumbai → Goa</h1>
      <p className="mb-4 text-[15px] text-[var(--color-muted)]">
        One place to weigh every way to travel and every stay.
      </p>

      <div className="mb-4 max-w-md">
        <Tabs
          tabs={[
            { id: 'transport', label: 'Ways to travel', icon: '🧭' },
            { id: 'hotels', label: 'Stays', icon: '🏨' },
          ]}
          active={category}
          onChange={(c) => setCategory(c as Category)}
        />
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {RANK_MODES.map((m) => (
          <Chip
            key={m.id}
            active={rank === m.id}
            color={m.id === 'BEST_FOR_USER' ? '#7C4DFF' : '#0B5FFF'}
            onClick={() => setRank(m.id)}
          >
            {m.id === 'BEST_FOR_USER' ? '✨ ' : ''}
            {m.label}
          </Chip>
        ))}
      </div>

      {rank === 'BEST_FOR_USER' && (
        <div
          className="mb-4 rounded-[12px] px-4 py-3 text-[14px]"
          style={{ background: 'var(--color-ai-soft)', color: '#7C4DFF' }}
        >
          ✨ Ranked around your priorities:{' '}
          {profile.priorities.length ? profile.priorities.join(', ').replace(/-/g, ' ') : 'best value'}.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ranked
          ? ranked.map((offer, i) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                highlight={i === 0}
                onView={openDeal}
                onSave={saveOffer}
              />
            ))
          : [0, 1, 2, 3].map((i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  )
}
