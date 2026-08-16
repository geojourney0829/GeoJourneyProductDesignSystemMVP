/**
 * GeoJourney brand mark.
 * Concept: location pin + route line + compass needle.
 * Geometric, recognizable at 24px. No airplane, no globe.
 * Variants: symbol | wordmark | mono | inverse.
 */

interface LogoProps {
  variant?: 'symbol' | 'wordmark' | 'mono' | 'inverse'
  size?: number
  className?: string
}

function Symbol({ mono, inverse, size }: { mono?: boolean; inverse?: boolean; size: number }) {
  const blue = mono ? 'currentColor' : inverse ? '#ffffff' : '#0B5FFF'
  const cyan = mono ? 'currentColor' : inverse ? 'rgba(255,255,255,0.7)' : '#10BEEA'
  const green = mono ? 'currentColor' : inverse ? '#ffffff' : '#16B978'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* route line weaving through the pin */}
      <path
        d="M6 40 C 16 40, 16 26, 24 26 S 32 12, 42 12"
        stroke={cyan}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0.5 7"
        opacity={mono ? 0.55 : 1}
      />
      {/* pin body */}
      <path
        d="M24 4 C 15.16 4 8 11.16 8 20 C 8 31 24 44 24 44 C 24 44 40 31 40 20 C 40 11.16 32.84 4 24 4 Z"
        fill={blue}
      />
      {/* compass needle */}
      <path d="M24 11 L28.5 21 L24 18.4 Z" fill="#ffffff" />
      <path d="M24 27 L19.5 17 L24 19.6 Z" fill={green} />
      <circle cx="24" cy="19" r="1.7" fill="#ffffff" />
    </svg>
  )
}

export default function Logo({ variant = 'symbol', size = 32, className }: LogoProps) {
  const mono = variant === 'mono'
  const inverse = variant === 'inverse'

  if (variant === 'wordmark') {
    return (
      <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
        <Symbol size={size} />
        <span
          className="font-bold tracking-tight"
          style={{ fontSize: size * 0.62, color: 'var(--color-ink)' }}
        >
          Geo<span style={{ color: '#0B5FFF' }}>Journey</span>
        </span>
      </span>
    )
  }

  return (
    <span className={className} style={{ display: 'inline-flex', color: 'inherit' }}>
      <Symbol size={size} mono={mono} inverse={inverse} />
    </span>
  )
}
