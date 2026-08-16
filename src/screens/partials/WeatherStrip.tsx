import type { WeatherPoint } from '../../types'

/** Structured mock weather (do not invent weather — Level 1 demo data). */
const WEATHER: WeatherPoint[] = [
  { location: 'Mumbai', tempC: 31, condition: 'clear', high: 33, low: 26 },
  { location: 'Ratnagiri', tempC: 28, condition: 'cloudy', high: 30, low: 24 },
  { location: 'Amboli Ghat', tempC: 23, condition: 'rain', high: 25, low: 20 },
  { location: 'North Goa', tempC: 30, condition: 'clear', high: 32, low: 25 },
]

const icon: Record<WeatherPoint['condition'], string> = {
  clear: '☀️',
  cloudy: '⛅',
  rain: '🌧️',
  storm: '⛈️',
}

export function WeatherStrip() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {WEATHER.map((w) => (
        <div
          key={w.location}
          className="min-w-[128px] flex-1 rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] p-3.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[var(--color-ink-2)]">{w.location}</span>
            <span className="text-lg">{icon[w.condition]}</span>
          </div>
          <div className="mt-1 text-h2 text-[var(--color-ink)]">{w.tempC}°</div>
          <div className="text-[12px] text-[var(--color-muted)]">
            H {w.high}° · L {w.low}°
            {w.condition === 'rain' && (
              <span className="ml-1" style={{ color: '#F59E0B' }}>
                · Rain alert
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
