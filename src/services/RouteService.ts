/**
 * RouteService — route options & intelligence.
 * Deterministic; distance/score arithmetic is data-driven, not AI.
 * Future: swap OSRM/GraphHopper behind this boundary.
 */
import type { RouteOption } from '../types'
import { MUMBAI_GOA_ROUTES } from '../mocks/mumbai-goa'

export const RouteService = {
  async getRoutes(_source: string, _destination: string): Promise<RouteOption[]> {
    // Level 1: canonical demo routes. Level 2/3: real routing engine.
    await delay(500)
    return MUMBAI_GOA_ROUTES
  },
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
