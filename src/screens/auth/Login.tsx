import { useState } from 'react'
import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { AuthService } from '../../services'
import { Button, Input } from '../../components/ui/primitives'
import { AuthShell } from './AuthShell'

export default function Login() {
  const { navigate } = useRouter()
  const { signInUser } = useApp()
  const [email, setEmail] = useState('aarav@geojourney.app')
  const [password, setPassword] = useState('demo1234')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const user = await AuthService.signIn(email, password)
      signInUser(user)
      navigate('home')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue your journeys."
      footer={
        <>
          New to GeoJourney?{' '}
          <button className="font-semibold text-[#0B5FFF]" onClick={() => navigate('signup')}>
            Create account
          </button>
        </>
      }
    >
      <div className="space-y-3">
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon="✉️" />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="🔒"
        />
        {error && <p className="text-[13px]" style={{ color: '#EF4444' }}>{error}</p>}
        <button
          className="block w-full text-right text-[13px] font-semibold text-[#0B5FFF]"
          onClick={() => navigate('forgot-password')}
        >
          Forgot password?
        </button>
        <Button block size="lg" loading={loading} onClick={submit}>
          Sign in
        </Button>
        <Button
          block
          variant="secondary"
          size="lg"
          onClick={() => {
            signInUser(AuthService.guest())
            navigate('home')
          }}
        >
          Continue as guest
        </Button>
      </div>
    </AuthShell>
  )
}
