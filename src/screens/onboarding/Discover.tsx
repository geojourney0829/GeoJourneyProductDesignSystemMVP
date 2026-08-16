import { useRouter } from '../../lib/router'
import { Button } from '../../components/ui/primitives'
import Logo from '../../brand/Logo'

const SLIDES = [
  {
    title: 'Discover the whole journey',
    body: 'Not just the destination — find scenic stops, food gems and hidden places along your route.',
    image: '1469474968028-56623f02e42e',
  },
  {
    title: 'Compare every way to travel',
    body: 'Bike, car, flight, train or bus — see price, time, comfort and safety side by side.',
    image: '1436491865332-7a61a109cc05',
  },
]

export default function Discover() {
  const { navigate } = useRouter()
  const slide = SLIDES[0]
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      <div className="relative h-[46vh] w-full overflow-hidden bg-[var(--color-surface-2)]">
        <img
          src={`https://images.unsplash.com/photo-${slide.image}?w=1000&h=800&fit=crop&auto=format`}
          alt="Winding scenic road through mountains"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
        <div className="absolute left-5 top-5">
          <Logo variant="wordmark" size={28} />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-8">
        <div className="animate-fade-up">
          <h1 className="text-h1 text-[var(--color-ink)]">{slide.title}</h1>
          <p className="mt-3 text-body-lg text-[var(--color-ink-2)]">{slide.body}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { icon: '🧭', label: 'Discover' },
            { icon: '⚖️', label: 'Compare' },
            { icon: '🗺️', label: 'Plan' },
            { icon: '📔', label: 'Remember' },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3"
            >
              <span className="text-xl">{f.icon}</span>
              <span className="font-semibold text-[var(--color-ink)]">{f.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-8">
          <Button block size="lg" onClick={() => navigate('onboarding-persona')}>
            Get started
          </Button>
          <Button block variant="ghost" onClick={() => navigate('home')}>
            Skip · Continue as guest
          </Button>
        </div>
      </div>
    </div>
  )
}
