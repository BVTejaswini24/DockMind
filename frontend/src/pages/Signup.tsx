import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthLayout from '../components/auth/AuthLayout'
import { Button, Input } from '../components/ui'

export default function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await signup(name, email, password)
    setLoading(false)
    navigate('/dashboard', { replace: true })
  }

  return (
    <AuthLayout title="Create an account" subtitle="Get started with DocMind AI">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" required />
        <Button type="submit" loading={loading} className="w-full">
          Create Account
        </Button>
      </form>
      <p className="mt-8 text-center text-xs text-white/55">
        Already have an account?{' '}
        <Link to="/login" className="text-[#3054ff]/70 hover:text-[#3054ff] transition-colors">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
