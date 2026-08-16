/**
 * MapService — abstraction the Route/Map UI depends on instead of the SVG
 * implementation. Future path: Mock SVG -> MapLibre -> real map/routing provider.
 * All coordinates are normalized 0..1 for the stylized canvas; a real adapter
 * would translate lat/lng to screen space here.
 */
import type { Place, RouteOption } from '../types'

export interface MapGeometry {
  polyline: { x: number; y: number }[]
  waypoints: RouteOption['waypoints']
}

export const MapService = {
  getRouteGeometry(route: RouteOption): MapGeometry {
    return { polyline: route.polyline, waypoints: route.waypoints }
  },
  toPins(places: Place[]): { x: number; y: number; place: Place }[] {
    return places.map((p) => ({ x: p.lng, y: p.lat, place: p }))
  },
}
