/**
 * Lightweight state router (zero deps).
 * Prototype navigation only — the full future product can swap this for
 * react-router with URL routes without touching screen components, since
 * screens navigate through the `useRouter()` hook, not URLs directly.
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export type RouteName =
  | 'splash'
  | 'onboarding-discover'
  | 'onboarding-persona'
  | 'onboarding-priorities'
  | 'home'
  | 'explore'
  | 'planner'
  | 'generating'
  | 'generated-trip'
  | 'route'
  | 'compare'
  | 'offer-detail'
  | 'trip'
  | 'trips'
  | 'community'
  | 'expenses'
  | 'journal'
  | 'safety'
  | 'weather'
  | 'notifications'
  | 'saved'
  | 'settings'
  | 'profile'

export interface RouteState {
  name: RouteName
  params?: Record<string, string>
}

interface RouterCtx {
  route: RouteState
  navigate: (name: RouteName, params?: Record<string, string>) => void
  back: () => void
  canGoBack: boolean
}

const Ctx = createContext<RouterCtx | null>(null)

export function RouterProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<RouteState[]>([{ name: 'splash' }])

  const navigate = useCallback((name: RouteName, params?: Record<string, string>) => {
    setStack((prev) => [...prev, { name, params }])
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 })
  }, [])

  const back = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
  }, [])

  const value = useMemo<RouterCtx>(
    () => ({
      route: stack[stack.length - 1],
      navigate,
      back,
      canGoBack: stack.length > 1,
    }),
    [stack, navigate, back],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useRouter(): RouterCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useRouter must be used inside RouterProvider')
  return ctx
}
