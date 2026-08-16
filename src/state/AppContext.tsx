/**
 * AppContext — session state for the vertical slice.
 * Holds the onboarding travel profile, the working trip (with saved items and
 * expenses), toasts and theme. Persists for the session so a user can complete
 * the full flow and return to the Trip Workspace with selections intact.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  AuthStatus,
  Comment,
  CommunityLocation,
  Expense,
  Offer,
  Place,
  PersonaId,
  PriorityId,
  Review,
  Trip,
  TravelProfile,
  TripPlan,
  User,
} from '../types'
import { RECENT_TRIPS } from '../mocks/trips'
import {
  COMMUNITY_COMMENTS,
  COMMUNITY_LOCATIONS,
  COMMUNITY_REVIEWS,
} from '../mocks/community'

let idSeq = 100
const nextId = () => `x-${idSeq++}`

interface Toast {
  id: string
  message: string
  tone: 'success' | 'info' | 'danger'
}

interface AppCtx {
  profile: TravelProfile
  setPersonas: (p: PersonaId[]) => void
  setPriorities: (p: PriorityId[]) => void
  setName: (name: string) => void

  trips: Trip[]
  currentTrip: Trip | null
  createTripFromPlan: (plan: TripPlan) => Trip
  openTrip: (id: string) => void

  savePlace: (place: Place) => void
  saveOffer: (offer: Offer) => void
  addExpense: (expense: Omit<Expense, 'id'>) => void

  toasts: Toast[]
  toast: (message: string, tone?: Toast['tone']) => void
  dismissToast: (id: string) => void

  dark: boolean
  toggleDark: () => void

  /* ---- M2: auth ---- */
  user: User | null
  authStatus: AuthStatus
  signInUser: (user: User) => void
  logout: () => void
  updateUser: (patch: Partial<User>) => void

  /* ---- M2: global wishlist (saved places across trips) ---- */
  wishlist: Place[]
  toggleWishlist: (place: Place) => void
  isWishlisted: (id: string) => boolean
  addWishlistToTrip: (place: Place) => void

  /* ---- M2: community ---- */
  communityLocations: CommunityLocation[]
  addCommunityLocation: (loc: CommunityLocation) => void
  reviews: Review[]
  comments: Comment[]
  addReview: (review: Omit<Review, 'id' | 'helpful'>) => void
  toggleHelpful: (reviewId: string) => void
  addComment: (comment: Omit<Comment, 'id'>) => void
  report: (label: string) => void
}

const Ctx = createContext<AppCtx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<TravelProfile>({
    personas: [],
    priorities: [],
    name: 'Traveler',
  })
  const [trips, setTrips] = useState<Trip[]>(RECENT_TRIPS)
  const [currentTripId, setCurrentTripId] = useState<string | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [dark, setDark] = useState(false)

  const [user, setUser] = useState<User | null>(null)
  const [wishlist, setWishlist] = useState<Place[]>([])
  const [communityLocations, setCommunityLocations] = useState<CommunityLocation[]>(
    COMMUNITY_LOCATIONS.filter((l) => l.status === 'published'),
  )
  const [reviews, setReviews] = useState<Review[]>(COMMUNITY_REVIEWS)
  const [comments, setComments] = useState<Comment[]>(COMMUNITY_COMMENTS)
  const [helpfulVoted, setHelpfulVoted] = useState<Set<string>>(new Set())

  const currentTrip = useMemo(
    () => trips.find((t) => t.id === currentTripId) ?? null,
    [trips, currentTripId],
  )

  const toast = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    const id = nextId()
    setToasts((prev) => [...prev, { id, message, tone }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const setPersonas = useCallback(
    (personas: PersonaId[]) => setProfile((p) => ({ ...p, personas })),
    [],
  )
  const setPriorities = useCallback(
    (priorities: PriorityId[]) => setProfile((p) => ({ ...p, priorities })),
    [],
  )
  const setName = useCallback((name: string) => setProfile((p) => ({ ...p, name })), [])

  const createTripFromPlan = useCallback(
    (plan: TripPlan): Trip => {
      const trip: Trip = {
        id: nextId(),
        name: `${plan.source} → ${plan.destination}`,
        image:
          'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=500&fit=crop&auto=format',
        source: plan.source,
        destination: plan.destination,
        startDate: plan.startDate,
        endDate: plan.endDate,
        travelMode: plan.travelMode,
        distanceKm: plan.distanceKm,
        budget: plan.budget,
        currency: plan.currency,
        progress: 0,
        plan,
        savedPlaces: [],
        savedOffers: [],
        expenses: [],
      }
      setTrips((prev) => [trip, ...prev.filter((t) => t.id !== trip.id)])
      setCurrentTripId(trip.id)
      return trip
    },
    [],
  )

  const openTrip = useCallback((id: string) => setCurrentTripId(id), [])

  const ensureTrip = useCallback((): string => {
    if (currentTripId) return currentTripId
    // fall back to the first trip so saving always has a home
    const fallback = trips[0]?.id ?? null
    setCurrentTripId(fallback)
    return fallback as string
  }, [currentTripId, trips])

  const savePlace = useCallback(
    (place: Place) => {
      const id = ensureTrip()
      setTrips((prev) =>
        prev.map((t) =>
          t.id === id && !t.savedPlaces.some((p) => p.id === place.id)
            ? { ...t, savedPlaces: [...t.savedPlaces, place] }
            : t,
        ),
      )
      toast(`Saved "${place.name}" to your trip`)
    },
    [ensureTrip, toast],
  )

  const saveOffer = useCallback(
    (offer: Offer) => {
      const id = ensureTrip()
      setTrips((prev) =>
        prev.map((t) =>
          t.id === id && !t.savedOffers.some((o) => o.id === offer.id)
            ? { ...t, savedOffers: [...t.savedOffers, offer] }
            : t,
        ),
      )
      toast(`Saved "${offer.title}" to your trip`)
    },
    [ensureTrip, toast],
  )

  const addExpense = useCallback(
    (expense: Omit<Expense, 'id'>) => {
      const id = ensureTrip()
      setTrips((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, expenses: [{ ...expense, id: nextId() }, ...t.expenses] }
            : t,
        ),
      )
      toast('Expense added')
    },
    [ensureTrip, toast],
  )

  const toggleDark = useCallback(() => {
    setDark((d) => {
      const next = !d
      if (typeof document !== 'undefined')
        document.documentElement.classList.toggle('dark', next)
      return next
    })
  }, [])

  /* ---- M2: auth ---- */
  const authStatus: AuthStatus = user ? (user.guest ? 'guest' : 'authenticated') : 'signed-out'

  const signInUser = useCallback((u: User) => {
    setUser(u)
    setProfile((p) => ({
      ...p,
      name: u.name,
      personas: u.personas.length ? u.personas : p.personas,
      priorities: u.priorities.length ? u.priorities : p.priorities,
    }))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    toast('Signed out', 'info')
  }, [toast])

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((u) => (u ? { ...u, ...patch } : u))
    if (patch.name) setProfile((p) => ({ ...p, name: patch.name as string }))
    if (patch.personas) setProfile((p) => ({ ...p, personas: patch.personas as PersonaId[] }))
    if (patch.priorities)
      setProfile((p) => ({ ...p, priorities: patch.priorities as PriorityId[] }))
  }, [])

  /* ---- M2: wishlist ---- */
  const isWishlisted = useCallback((id: string) => wishlist.some((p) => p.id === id), [wishlist])

  const toggleWishlist = useCallback(
    (place: Place) => {
      setWishlist((prev) => {
        if (prev.some((p) => p.id === place.id)) {
          toast(`Removed "${place.name}" from Saved`, 'info')
          return prev.filter((p) => p.id !== place.id)
        }
        toast(`Saved "${place.name}"`)
        return [place, ...prev]
      })
    },
    [toast],
  )

  const addWishlistToTrip = useCallback(
    (place: Place) => {
      savePlace(place)
    },
    [savePlace],
  )

  /* ---- M2: community ---- */
  const addCommunityLocation = useCallback(
    (loc: CommunityLocation) => {
      setCommunityLocations((prev) => (loc.status === 'published' ? [loc, ...prev] : prev))
      toast(loc.status === 'published' ? 'Location published to community' : 'Draft saved')
    },
    [toast],
  )

  const addReview = useCallback(
    (review: Omit<Review, 'id' | 'helpful'>) => {
      setReviews((prev) => [{ ...review, id: nextId(), helpful: 0 }, ...prev])
      toast('Review posted')
    },
    [toast],
  )

  const toggleHelpful = useCallback((reviewId: string) => {
    setHelpfulVoted((voted) => {
      const next = new Set(voted)
      const delta = next.has(reviewId) ? -1 : 1
      if (next.has(reviewId)) next.delete(reviewId)
      else next.add(reviewId)
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + delta } : r)),
      )
      return next
    })
  }, [])

  const addComment = useCallback(
    (comment: Omit<Comment, 'id'>) => {
      setComments((prev) => [...prev, { ...comment, id: nextId() }])
    },
    [],
  )

  const report = useCallback(
    (label: string) => {
      toast(`Reported: ${label}. Thanks for keeping GeoJourney safe.`, 'info')
    },
    [toast],
  )

  const value = useMemo<AppCtx>(
    () => ({
      profile,
      setPersonas,
      setPriorities,
      setName,
      trips,
      currentTrip,
      createTripFromPlan,
      openTrip,
      savePlace,
      saveOffer,
      addExpense,
      toasts,
      toast,
      dismissToast,
      dark,
      toggleDark,
      user,
      authStatus,
      signInUser,
      logout,
      updateUser,
      wishlist,
      toggleWishlist,
      isWishlisted,
      addWishlistToTrip,
      communityLocations,
      addCommunityLocation,
      reviews,
      comments,
      addReview,
      toggleHelpful,
      addComment,
      report,
    }),
    [
      profile,
      setPersonas,
      setPriorities,
      setName,
      trips,
      currentTrip,
      createTripFromPlan,
      openTrip,
      savePlace,
      saveOffer,
      addExpense,
      toasts,
      toast,
      dismissToast,
      dark,
      toggleDark,
      user,
      authStatus,
      signInUser,
      logout,
      updateUser,
      wishlist,
      toggleWishlist,
      isWishlisted,
      addWishlistToTrip,
      communityLocations,
      addCommunityLocation,
      reviews,
      comments,
      addReview,
      toggleHelpful,
      addComment,
      report,
    ],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp(): AppCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
