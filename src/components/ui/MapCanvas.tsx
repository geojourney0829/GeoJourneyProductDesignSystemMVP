/**
 * Stylized SVG map surface. Consumes normalized 0..1 geometry from MapService.
 * This is the Level-1 mock map — the Route UI depends on MapService, not on
 * this component, so it can be replaced by MapLibre later without UI changes.
 */
import type { Place, RouteOption } from '../../types'

interface MapCanvasProps {
  route?: RouteOption
  pins?: { x: number; y: number; place: Place }[]
  onPinClick?: (place: Place) => void
  height?: number
  className?: string
}

const categoryPin: Record<string, string> = {
  start: '#0B5FFF',
  end: '#16B978',
  cafe: '#F59E0B',
  dhaba: '#F59E0B',
  restaurant: '#F59E0B',
  fuel: '#64748B',
  viewpoint: '#10BEEA',
  beach: '#10BEEA',
  waterfall: '#10BEEA',
  hidden: '#7C4DFF',
}

export function MapCanvas({ route, pins, onPinClick, height = 320, className = '' }: MapCanvasProps) {
  const W = 800
  const H = 800
  const px = (v: number) => v * W
  const py = (v: number) => v * H

  const path = route
    ? route.polyline.map((p, i) => `${i === 0 ? 'M' : 'L'} ${px(p.x)} ${py(p.y)}`).join(' ')
    : ''

  return (
    <div
      className={`relative overflow-hidden rounded-[20px] border border-[var(--color-line)] ${className}`}
      style={{ height }}
    >
      <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        {/* water / land ground */}
        <rect width="800" height="800" fill="#e8f3fb" className="dark:opacity-20" />
        <path d="M0 0 H520 Q560 220 470 400 Q400 560 520 800 H0 Z" fill="#eaf5ee" />
        <path d="M800 0 H620 Q580 260 690 470 Q760 620 640 800 H800 Z" fill="#eef3f9" />
        {/* subtle grid */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="800" stroke="#cfe0ee" strokeWidth="1" opacity="0.5" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="800" y2={i * 100} stroke="#cfe0ee" strokeWidth="1" opacity="0.5" />
        ))}

        {/* route line (cyan = route intelligence) */}
        {route && (
          <>
            <path d={path} stroke="#10BEEA" strokeWidth="26" fill="none" strokeLinecap="round" opacity="0.18" />
            <path d={path} stroke="#0B5FFF" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {route.waypoints.map((w, i) => (
              <g key={i}>
                <circle cx={px(w.x)} cy={py(w.y)} r="12" fill="#fff" stroke={categoryPin[w.kind] ?? '#0B5FFF'} strokeWidth="4" />
              </g>
            ))}
          </>
        )}

        {/* discovery pins */}
        {pins?.map(({ x, y, place }) => (
          <g
            key={place.id}
            transform={`translate(${px(x)}, ${py(y)})`}
            className="cursor-pointer"
            onClick={() => onPinClick?.(place)}
          >
            <path
              d="M0 -22 C -12 -22 -20 -13 -20 -2 C -20 12 0 26 0 26 C 0 26 20 12 20 -2 C 20 -13 12 -22 0 -22 Z"
              fill={categoryPin[place.category] ?? '#0B5FFF'}
            />
            <circle cx="0" cy="-2" r="6" fill="#fff" />
          </g>
        ))}
      </svg>
      <div className="pointer-events-none absolute bottom-2 right-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-[var(--color-muted)]">
        Demo map · OSM-compatible
      </div>
    </div>
  )
}
