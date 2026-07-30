import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import { Button, Input } from '../components/ui'
import { ArrowLeft, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <AuthLayout title="Check your email" subtitle="We've sent a reset link to your email address.">
        <div className="text-center space-y-4">
          <p className="text-sm text-white/55">
            Didn't receive it?{' '}
            <button onClick={() => setSent(false)} className="text-[#3054ff]/70 hover:text-[#3054ff] transition-colors">
              Resend
            </button>
          </p>
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white/80 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Forgot password" subtitle="Enter your email and we'll send you a reset link.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        <Button type="submit" loading={loading} className="w-full" icon={<Mail className="w-4 h-4" />}>
          Send Reset Link
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white/80 transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to login
        </Link>
      </div>
    </AuthLayout>
  )
}
