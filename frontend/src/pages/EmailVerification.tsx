import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'

export default function EmailVerificationPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) { setStatus('error'); return }
    const timer = setTimeout(() => setStatus('success'), 2000)
    return () => clearTimeout(timer)
  }, [searchParams])

  return (
    <AuthLayout title="Email Verification" subtitle="Verifying your email address.">
      <div className="flex flex-col items-center gap-4">
        {status === 'loading' && (
          <>
            <Loader2 className="w-6 h-6 text-[#3054ff] animate-spin" />
            <p className="text-sm text-white/55">Verifying...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle2 className="w-8 h-8 text-[#3054ff]" />
            <p className="text-sm text-white/80">Email verified successfully!</p>
            <Link
              to="/login"
              className="inline-flex px-5 py-2.5 rounded-[10px] bg-[#3054ff]/10 border border-[#3054ff]/20 text-[#3054ff] text-sm hover:bg-[#3054ff]/15 transition-colors"
            >
              Sign in
            </Link>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="w-8 h-8 text-red-500/80" />
            <p className="text-sm text-white/55">Invalid or expired verification link.</p>
            <Link
              to="/login"
              className="inline-flex px-5 py-2.5 rounded-[10px] bg-[#3054ff]/10 border border-[#3054ff]/20 text-[#3054ff] text-sm hover:bg-[#3054ff]/15 transition-colors"
            >
              Back to login
            </Link>
          </>
        )}
      </div>
    </AuthLayout>
  )
}
