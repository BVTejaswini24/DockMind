import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import { Button } from '../components/ui'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setDone(true)
  }

  if (done) {
    return (
      <AuthLayout title="Password reset" subtitle="Your password has been updated successfully.">
        <Link
          to="/login"
          className="inline-flex items-center justify-center w-full px-5 py-2.5 rounded-[10px] bg-[#3054ff]/10 border border-[#3054ff]/20 text-[#3054ff] text-sm hover:bg-[#3054ff]/15 transition-colors"
        >
          Sign in with new password
        </Link>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Set new password" subtitle="Enter your new password below.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-white/40 mb-1.5">New Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-[10px] bg-transparent border border-white/[0.08] text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#3054ff]/30 focus:ring-1 focus:ring-[#3054ff]/20 transition-all duration-200"
              placeholder="Enter new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/55 hover:text-white/80 transition-colors"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm text-white/40 mb-1.5">Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full px-4 py-3 rounded-[10px] bg-transparent border border-white/[0.08] text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#3054ff]/30 focus:ring-1 focus:ring-[#3054ff]/20 transition-all duration-200"
            placeholder="Confirm new password"
            required
          />
        </div>
        <Button type="submit" loading={loading} className="w-full">
          Reset Password
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
