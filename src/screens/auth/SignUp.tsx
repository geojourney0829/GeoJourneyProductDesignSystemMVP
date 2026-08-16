import { useState } from 'react'
import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { AuthService } from '../../services'
import { Button, Input } from '../../components/ui/primitives'
import { AuthShell } from './AuthShell'

export default function SignUp() {
  const { navigate } = useRouter()
  const { signInUser } = useApp()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const user = await AuthService.signUp(name, email, password)
      signInUser(user)
      navigate('onboarding-persona')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start planning smarter journeys."
      footer={
        <>
          Already have an account?{' '}
          <button className="font-semibold text-[#0B5FFF]" onClick={() => navigate('login')}>
            Sign in
          </button>
        </>
      }
    >
      <div className="space-y-3">
        <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} icon="👤" />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon="✉️" />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="🔒"
        />
        {error && <p className="text-[13px]" style={{ color: '#EF4444' }}>{error}</p>}
        <Button block size="lg" loading={loading} onClick={submit}>
          Create account
        </Button>
        <p className="text-center text-[12px] text-[var(--color-muted)]">
          By continuing you agree to GeoJourney's Terms & Privacy (demo).
        </p>
      </div>
    </AuthShell>
  )
}
