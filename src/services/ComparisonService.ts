/**
 * ComparisonService — deterministic ranking of normalized Offers.
 * Level 1 uses MOCK offers; Level 2/3 swap the data source behind this
 * boundary without changing the ranking logic or UI.
 */
import type { Offer, RankMode, TravelProfile } from '../types'
import { TRANSPORT_OFFERS, HOTEL_OFFERS } from '../mocks/offers'

const cancellationScore: Record<Offer['cancellation'], number> = {
  free: 1,
  partial: 0.5,
  'non-refundable': 0,
}

function valueScore(o: Offer): number {
  // higher rating, lower price, shorter duration -> better value
  const priceFactor = 1 / (o.price || 1)
  const durFactor = o.durationMinutes > 0 ? 1 / o.durationMinutes : 1
  return o.rating * 20 + priceFactor * 4000 + durFactor * 200
}

function personaScore(o: Offer, profile?: TravelProfile): number {
  if (!profile) return valueScore(o)
  let s = valueScore(o)
  const p = profile.priorities
  if (p.includes('lower-cost')) s += (1 / (o.price || 1)) * 6000
  if (p.includes('save-time') && o.durationMinutes > 0) s += (1 / o.durationMinutes) * 400
  if (p.includes('comfort')) s += o.amenities.length * 6
  if (p.includes('flexible')) s += cancellationScore[o.cancellation] * 40
  if (p.includes('safety')) s += o.rating * 6
  if (profile.personas.includes('biker') && o.mode === 'bike') s += 60
  if (profile.personas.includes('budget')) s += (1 / (o.price || 1)) * 4000
  if (profile.personas.includes('luxury')) s += o.rating * 12 + o.price * 0.002
  return s
}

export const ComparisonService = {
  getTransportOffers(): Promise<Offer[]> {
    return Promise.resolve(TRANSPORT_OFFERS)
  },
  getHotelOffers(): Promise<Offer[]> {
    return Promise.resolve(HOTEL_OFFERS)
  },
  rank(offers: Offer[], mode: RankMode, profile?: TravelProfile): Offer[] {
    const list = [...offers]
    switch (mode) {
      case 'CHEAPEST':
        return list.sort((a, b) => a.price - b.price)
      case 'FASTEST':
        return list.sort((a, b) => a.durationMinutes - b.durationMinutes)
      case 'BEST_RATED':
        return list.sort((a, b) => b.rating - a.rating)
      case 'BEST_FLEXIBLE':
        return list.sort(
          (a, b) => cancellationScore[b.cancellation] - cancellationScore[a.cancellation],
        )
      case 'BEST_FOR_USER':
        return list.sort((a, b) => personaScore(b, profile) - personaScore(a, profile))
      case 'BEST_VALUE':
      default:
        return list.sort((a, b) => valueScore(b) - valueScore(a))
    }
  },
}

export const RANK_MODES: { id: RankMode; label: string }[] = [
  { id: 'BEST_FOR_USER', label: 'Best for Me' },
  { id: 'BEST_VALUE', label: 'Best Value' },
  { id: 'CHEAPEST', label: 'Cheapest' },
  { id: 'FASTEST', label: 'Fastest' },
  { id: 'BEST_RATED', label: 'Best Rated' },
  { id: 'BEST_FLEXIBLE', label: 'Best Flexible' },
]
