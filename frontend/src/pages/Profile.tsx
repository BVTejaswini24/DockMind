import { motion } from 'framer-motion'
import { User, Camera, Shield, Calendar, Trash2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Button, Input } from '../components/ui'

const stats = [
  { label: 'Documents', value: '12' },
  { label: 'Chats', value: '48' },
  { label: 'Queries', value: '1,247' },
]

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-1"
      >
        <h1 className="text-body text-bone tracking-[-0.32px] flex items-center gap-3">
          <User className="w-5 h-5 text-accent/60" />
          Profile
        </h1>
        <p className="text-body-sm text-pale-stone">Manage your personal information and preferences.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="space-y-6"
        >
          <div className="card-elevated p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-buttons bg-carbon-lift flex items-center justify-center text-body text-accent">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-buttons bg-accent/15 border border-accent/25 flex items-center justify-center hover:bg-accent/20 transition-colors">
                <Camera className="w-3.5 h-3.5 text-accent" />
              </button>
            </div>
            <h2 className="text-body-sm text-bone">{user?.name || 'User'}</h2>
            <p className="text-body-sm text-pale-stone mt-0.5">{user?.email || ''}</p>
          </div>

          <div className="card-elevated p-6 grid grid-cols-3 gap-4 text-center">
            {stats.map(stat => (
              <div key={stat.label}>
                <div className="text-body text-bone mt-0.5">{stat.value}</div>
                <div className="text-caption text-pale-stone mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="card-elevated p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-4 h-4 text-accent/60" />
              <h3 className="text-caption text-pale-stone uppercase tracking-[-0.24px]">Account Info</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-ash-stroke/50">
                <span className="text-body-sm text-pale-stone">Status</span>
                <span className="text-body-sm text-metric-green flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-metric-green" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-ash-stroke/50">
                <span className="text-body-sm text-pale-stone">Plan</span>
                <span className="text-body-sm text-bone">Pro</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-body-sm text-pale-stone flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined</span>
                <span className="text-body-sm text-bone">Jan 2025</span>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="text-body-sm text-bone mb-6">Personal Information</h3>
            <div className="space-y-5">
              <Input label="Full Name" defaultValue={user?.name || ''} />
              <Input label="Email" defaultValue={user?.email || ''} />
              <Button variant="primary" size="sm">Save Changes</Button>
            </div>
          </div>

          <div className="card-elevated p-6 border-status-error/10">
            <h3 className="text-body-sm text-bone mb-3">Danger Zone</h3>
            <p className="text-body-sm text-pale-stone mb-4">Once you delete your account, there is no going back.</p>
            <Button variant="danger" size="sm" icon={<Trash2 className="w-3.5 h-3.5" />}>
              Delete Account
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
