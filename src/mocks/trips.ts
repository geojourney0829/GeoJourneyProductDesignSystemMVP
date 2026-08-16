import type { Trip } from '../types'
import { HOTEL_OFFERS } from './offers'
import { buildMumbaiGoaPlan } from './mumbai-goa'

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=500&fit=crop&auto=format`

/** Recent trips shown on Home (demo data). */
export const RECENT_TRIPS: Trip[] = [
  {
    id: 'trip-goa',
    name: 'My Goa Ride',
    image: img('1512343879784-a960bf40e7f2'),
    source: 'Mumbai',
    destination: 'Goa',
    startDate: '2026-10-18',
    endDate: '2026-10-20',
    travelMode: 'bike',
    distanceKm: 590,
    budget: 15000,
    currency: '₹',
    progress: 100,
    plan: buildMumbaiGoaPlan(HOTEL_OFFERS),
    savedPlaces: [],
    savedOffers: [],
    expenses: [
      { id: 'e1', category: 'fuel', amount: 1980, date: '2026-10-18', description: 'Fuel — Panvel' },
      { id: 'e2', category: 'food', amount: 640, date: '2026-10-18', description: 'Konkan thali' },
      { id: 'e3', category: 'stay', amount: 3200, date: '2026-10-18', description: 'Ratnagiri stay' },
    ],
  },
  {
    id: 'trip-manali',
    name: 'Manali Family Trip',
    image: img('1626621341517-bbf3d9990a23'),
    source: 'Delhi',
    destination: 'Manali',
    startDate: '2026-06-05',
    endDate: '2026-06-09',
    travelMode: 'car',
    distanceKm: 537,
    budget: 42000,
    currency: '₹',
    progress: 100,
    savedPlaces: [],
    savedOffers: [],
    expenses: [],
  },
]
