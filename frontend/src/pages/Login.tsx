import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthLayout from '../components/auth/AuthLayout'
import { Button, Input } from '../components/ui'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const from = (location.state as any)?.from?.pathname || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await login(email, password)
    setLoading(false)
    navigate(from, { replace: true })
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your DocMind account">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <div>
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <div className="text-right mt-2">
            <Link to="/forgot-password" className="text-xs text-[#3054ff]/70 hover:text-[#3054ff] transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>
        <Button type="submit" loading={loading} className="w-full">
          Sign In
        </Button>
      </form>
      <p className="mt-8 text-center text-xs text-white/55">
        Don't have an account?{' '}
        <Link to="/signup" className="text-[#3054ff]/70 hover:text-[#3054ff] transition-colors">
          Create one
        </Link>
      </p>
    </AuthLayout>
  )
}
