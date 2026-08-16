import { AppProvider } from './state/AppContext'
import { RouterProvider, useRouter, type RouteName } from './lib/router'
import { DesktopSidebar, MobileBottomNav, TopBar } from './components/nav/Navigation'
import { ToastHost } from './components/ui/overlays'

import Splash from './screens/Splash'
import Discover from './screens/onboarding/Discover'
import Persona from './screens/onboarding/Persona'
import Priorities from './screens/onboarding/Priorities'
import Home from './screens/Home'
import Explore from './screens/Explore'
import Planner from './screens/planner/Planner'
import Generating from './screens/planner/Generating'
import GeneratedTrip from './screens/planner/GeneratedTrip'
import RouteResults from './screens/route/RouteResults'
import ComparisonHub from './screens/compare/ComparisonHub'
import OfferDetail from './screens/compare/OfferDetail'
import TripWorkspace from './screens/trip/TripWorkspace'
import Trips from './screens/Trips'
import Profile from './screens/Profile'
import Expenses from './screens/Expenses'
import {
  Community,
  Journal,
  Notifications,
  Safety,
  Saved,
  Settings,
  Weather,
} from './screens/stubs/ComingSoon'

/** Screens that render full-bleed without the app shell (nav/sidebar). */
const FULLSCREEN: RouteName[] = [
  'splash',
  'onboarding-discover',
  'onboarding-persona',
  'onboarding-priorities',
]

const TITLES: Partial<Record<RouteName, string>> = {
  home: 'GeoJourney',
  explore: 'Explore',
  planner: 'Plan Trip',
  generating: 'AI Planner',
  'generated-trip': 'Your Trip',
  route: 'Route',
  compare: 'Compare',
  'offer-detail': 'Offer',
  trip: 'Trip',
  trips: 'Trips',
  community: 'Community',
  expenses: 'Expenses',
  journal: 'Journal',
  safety: 'Safety',
  weather: 'Weather',
  notifications: 'Notifications',
  saved: 'Saved',
  settings: 'Settings',
  profile: 'Profile',
}

function Screen() {
  const { route } = useRouter()
  switch (route.name) {
    case 'splash':
      return <Splash />
    case 'onboarding-discover':
      return <Discover />
    case 'onboarding-persona':
      return <Persona />
    case 'onboarding-priorities':
      return <Priorities />
    case 'home':
      return <Home />
    case 'explore':
      return <Explore />
    case 'planner':
      return <Planner />
    case 'generating':
      return <Generating />
    case 'generated-trip':
      return <GeneratedTrip />
    case 'route':
      return <RouteResults />
    case 'compare':
      return <ComparisonHub />
    case 'offer-detail':
      return <OfferDetail />
    case 'trip':
      return <TripWorkspace />
    case 'trips':
      return <Trips />
    case 'profile':
      return <Profile />
    case 'expenses':
      return <Expenses />
    case 'community':
      return <Community />
    case 'journal':
      return <Journal />
    case 'safety':
      return <Safety />
    case 'weather':
      return <Weather />
    case 'notifications':
      return <Notifications />
    case 'saved':
      return <Saved />
    case 'settings':
      return <Settings />
    default:
      return <Home />
  }
}

function Shell() {
  const { route } = useRouter()
  const full = FULLSCREEN.includes(route.name)
  const showBack = !['home', 'explore', 'trips', 'community', 'profile'].includes(route.name)

  if (full)
    return (
      <div key={route.name} className="animate-fade">
        <Screen />
      </div>
    )

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <DesktopSidebar />
      <div className="lg:pl-[248px]">
        <TopBar title={TITLES[route.name]} showBack={showBack} />
        <main key={route.name} className="animate-fade pb-24 pt-2 lg:pb-8 lg:pt-6">
          <Screen />
        </main>
      </div>
      <MobileBottomNav />
      <ToastHost />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <RouterProvider>
        <Shell />
      </RouterProvider>
    </AppProvider>
  )
}
