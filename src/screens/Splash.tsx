import { useEffect } from 'react'
import { useRouter } from '../lib/router'
import Logo from '../brand/Logo'

export default function Splash() {
  const { navigate } = useRouter()
  useEffect(() => {
    const t = setTimeout(() => navigate('onboarding-discover'), 1900)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ background: 'linear-gradient(160deg,#0B5FFF 0%,#0849CC 55%,#4257D6 100%)' }}
    >
      <div className="animate-scale-in">
        <Logo variant="symbol" size={92} />
      </div>
      <h1 className="mt-6 animate-fade-up text-display text-white">GeoJourney</h1>
      <p className="mt-2 animate-fade text-body-lg text-white/80">
        Plan the journey, not just the destination.
      </p>
      <div className="mt-10 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full bg-white/80"
            style={{ animation: `gj-pulse 1s ${i * 0.15}s infinite` }}
          />
        ))}
      </div>
    </div>
  )
}
