/**
 * GeoJourney domain models.
 * These are the shared contracts used across services, mock data and UI.
 * They are intentionally provider-agnostic so Level 2/3 sources can plug in
 * without changing screens.
 */

export type TravelMode = 'car' | 'bike' | 'train' | 'flight' | 'bus' | 'walking' | 'ev' | 'local'

export type PersonaId =
  | 'budget'
  | 'luxury'
  | 'biker'
  | 'family'
  | 'solo'
  | 'adventure'
  | 'photographer'
  | 'food'

export type PriorityId =
  | 'lower-cost'
  | 'save-time'
  | 'scenic'
  | 'food'
  | 'comfort'
  | 'safety'
  | 'hidden-gems'
  | 'photography'
  | 'local'
  | 'flexible'

/* ---------- Comparison / Offers ---------- */

export type SourceType = 'MOCK' | 'PUBLIC' | 'API' | 'AFFILIATE' | 'WIDGET' | 'MANUAL'

export type ProductType = 'transport' | 'hotel' | 'hostel' | 'activity'

export interface Offer {
  id: string
  provider: string
  providerType: string // e.g. "Airline", "OTA", "Rail operator"
  productType: ProductType
  mode?: TravelMode
  title: string
  price: number
  currency: string
  duration: string // human readable, e.g. "11h 30m"
  durationMinutes: number // for deterministic sorting
  rating: number
  reviewCount: number
  cancellation: 'free' | 'partial' | 'non-refundable'
  amenities: string[]
  availability: 'available' | 'limited' | 'sold-out'
  bookingUrl: string
  sourceType: SourceType
  retrievedAt: string // ISO
  image?: string
  badge?: string
}

export type RankMode =
  | 'CHEAPEST'
  | 'FASTEST'
  | 'BEST_VALUE'
  | 'BEST_RATED'
  | 'BEST_FLEXIBLE'
  | 'BEST_FOR_USER'

/* ---------- Places / discovery ---------- */

export type PlaceCategory =
  | 'restaurant'
  | 'cafe'
  | 'dhaba'
  | 'hotel'
  | 'fuel'
  | 'ev'
  | 'hospital'
  | 'viewpoint'
  | 'beach'
  | 'waterfall'
  | 'temple'
  | 'historical'
  | 'hidden-gem'

export interface Place {
  id: string
  name: string
  category: PlaceCategory
  rating: number
  reviewCount: number
  distanceKm: number
  priceLevel?: 1 | 2 | 3
  tags: string[]
  image: string
  lat: number // normalized 0..1 for the stylized map
  lng: number
  description?: string
  openNow?: boolean
}

/* ---------- Routes ---------- */

export interface RouteScore {
  overall: number
  safety: number
  roadQuality: number
  weather: number
  traffic: number
}

export type AlertType =
  | 'road-closure'
  | 'flood'
  | 'landslide'
  | 'construction'
  | 'accident'
  | 'dangerous-turn'

export interface RouteAlert {
  id: string
  type: AlertType
  label: string
  location: string
  severity: 'low' | 'medium' | 'high'
}

export type RouteFlavor =
  | 'fastest'
  | 'cheapest'
  | 'scenic'
  | 'adventure'
  | 'family'
  | 'bike-friendly'

export interface RouteOption {
  id: string
  flavor: RouteFlavor
  label: string
  distanceKm: number
  durationLabel: string
  fuelCost: number
  tollCost: number
  score: RouteScore
  alerts: RouteAlert[]
  polyline: { x: number; y: number }[] // normalized 0..1 for stylized map
  waypoints: { x: number; y: number; label: string; kind: PlaceCategory | 'start' | 'end' }[]
}

/* ---------- AI structured plan ---------- */

export interface TripDay {
  day: number
  title: string
  from: string
  to: string
  distanceKm: number
  stops: { time: string; label: string; kind: PlaceCategory | 'travel' | 'meal' | 'rest' }[]
}

export interface EstimatedExpense {
  category: ExpenseCategory
  amount: number
}

export interface TripPlan {
  id: string
  summary: string
  source: string
  destination: string
  startDate: string
  endDate: string
  travelMode: TravelMode
  budget: number
  currency: string
  distanceKm: number
  routeSummary: string
  routeScore: number
  days: TripDay[]
  restaurants: Place[]
  attractions: Place[]
  hotelSuggestions: Offer[]
  estimatedExpenses: EstimatedExpense[]
  packingSuggestions: string[]
  weatherNotes: string[]
  safetyNotes: string[]
}

export type AIState =
  | 'idle'
  | 'generating'
  | 'analyzing'
  | 'finding-routes'
  | 'finding-places'
  | 'optimizing-budget'
  | 'result'
  | 'error'

/* ---------- Expenses ---------- */

export type ExpenseCategory = 'fuel' | 'food' | 'stay' | 'toll' | 'shopping' | 'misc'

export interface Expense {
  id: string
  category: ExpenseCategory
  amount: number
  date: string
  description: string
}

/* ---------- Trips ---------- */

export interface Trip {
  id: string
  name: string
  image: string
  source: string
  destination: string
  startDate: string
  endDate: string
  travelMode: TravelMode
  distanceKm: number
  budget: number
  currency: string
  progress: number // 0..100
  plan?: TripPlan
  savedPlaces: Place[]
  savedOffers: Offer[]
  expenses: Expense[]
}

/* ---------- Onboarding profile ---------- */

export interface TravelProfile {
  personas: PersonaId[]
  priorities: PriorityId[]
  name: string
}

/* ---------- Weather (structured mock) ---------- */

export interface WeatherPoint {
  location: string
  tempC: number
  condition: 'clear' | 'cloudy' | 'rain' | 'storm'
  high: number
  low: number
}
