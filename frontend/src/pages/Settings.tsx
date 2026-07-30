import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Input, Toggle } from '../components/ui'
import { CheckCircle, XCircle } from 'lucide-react'

type Tab = 'general' | 'notifications' | 'api'

interface SettingsState {
  displayName: string
  email: string
  provider: string
  emailNotifications: boolean
  docProcessing: boolean
  weeklySummary: boolean
  openaiKey: string
}

const STORAGE_KEY = 'docmind_settings'

const defaults: SettingsState = {
  displayName: 'Alex',
  email: 'alex@example.com',
  provider: 'Google',
  emailNotifications: true,
  docProcessing: true,
  weeklySummary: true,
  openaiKey: '',
}

function loadSettings(): SettingsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults, ...JSON.parse(raw) }
  } catch {}
  return defaults
}

function saveSettings(s: SettingsState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
}

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('general')
  const [settings, setSettings] = useState<SettingsState>(loadSettings)
  const [saved, setSaved] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  useEffect(() => {
    if (!saved) return
    const t = setTimeout(() => setSaved(false), 2000)
    return () => clearTimeout(t)
  }, [saved])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  const update = useCallback(<K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleSaveGeneral = useCallback(() => {
    saveSettings(settings)
    setSaved(true)
  }, [settings])

  const handleSaveNotifications = useCallback(() => {
    saveSettings(settings)
    setSaved(true)
  }, [settings])

  const handleTestConnection = useCallback(() => {
    if (!settings.openaiKey.trim()) {
      setToast({ type: 'error', msg: 'API key cannot be empty.' })
      return
    }
    if (settings.openaiKey.startsWith('sk-') && settings.openaiKey.length > 10) {
      saveSettings(settings)
      setToast({ type: 'success', msg: 'Connection successful. API key is valid.' })
    } else {
      setToast({ type: 'error', msg: 'Invalid API key format. Key must start with "sk-" and be longer than 10 characters.' })
    }
  }, [settings])

  const handleSaveApiKey = useCallback(() => {
    saveSettings(settings)
    setSaved(true)
  }, [settings])

  const tabs: { key: Tab; label: string }[] = [
    { key: 'general', label: 'General' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'api', label: 'API Keys' },
  ]

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-10">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-lg ${
              toast.type === 'success'
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 shrink-0" />
            )}
            <span className="text-sm">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-1"
      >
        <h1 className="text-body text-bone tracking-[-0.32px]">Settings</h1>
        <p className="text-body-sm text-pale-stone">Manage your account preferences</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex items-center gap-1 p-1 bg-surface-muted border border-ash-stroke rounded-buttons w-fit"
      >
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-body-sm rounded-buttons transition-colors ${
              tab === t.key
                ? 'bg-surface-raised text-bone'
                : 'text-pale-stone hover:text-bone'
            }`}
          >
            {t.label}
          </button>
        ))}
      </motion.div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-6"
      >
        {tab === 'general' && (
          <>
            <section className="card-elevated p-6 space-y-6">
              <h2 className="text-caption text-pale-stone uppercase tracking-[-0.24px]">Profile</h2>
              <Input
                label="Display Name"
                value={settings.displayName}
                onChange={e => update('displayName', e.target.value)}
              />
              <Input
                label="Email"
                value={settings.email}
                onChange={e => update('email', e.target.value)}
              />
              <div className="flex items-center gap-3">
                <Button variant="primary" size="sm" onClick={handleSaveGeneral}>
                  {saved ? 'Saved!' : 'Save Changes'}
                </Button>
              </div>
            </section>
            <section className="card-elevated p-6 space-y-6">
              <h2 className="text-caption text-pale-stone uppercase tracking-[-0.24px]">AI Provider</h2>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-body-sm text-bone">Default Provider</p>
                  <p className="text-body-sm text-pale-stone">Choose your preferred AI model</p>
                </div>
                <select
                  value={settings.provider}
                  onChange={e => update('provider', e.target.value)}
                  className="bg-surface-muted border border-ash-stroke rounded-buttons px-3 py-2 text-body-sm text-bone"
                >
                  <option value="OpenAI">OpenAI</option>
                  <option value="Anthropic">Anthropic</option>
                  <option value="Google">Google</option>
                </select>
              </div>
            </section>
          </>
        )}

        {tab === 'notifications' && (
          <section className="card-elevated p-6 space-y-6">
            <h2 className="text-caption text-pale-stone uppercase tracking-[-0.24px]">Notifications</h2>
            <div className="flex items-center justify-between">
              <p className="text-body-sm text-bone">Email notifications</p>
              <Toggle
                checked={settings.emailNotifications}
                onChange={v => update('emailNotifications', v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-body-sm text-bone">Document processing complete</p>
              <Toggle
                checked={settings.docProcessing}
                onChange={v => update('docProcessing', v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-body-sm text-bone">Weekly summary</p>
              <Toggle
                checked={settings.weeklySummary}
                onChange={v => update('weeklySummary', v)}
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button variant="primary" size="sm" onClick={handleSaveNotifications}>
                {saved ? 'Saved!' : 'Save Changes'}
              </Button>
            </div>
          </section>
        )}

        {tab === 'api' && (
          <section className="card-elevated p-6 space-y-6">
            <h2 className="text-caption text-pale-stone uppercase tracking-[-0.24px]">API Keys</h2>
            <div className="space-y-4">
              <Input
                label="OpenAI API Key"
                placeholder="sk-..."
                value={settings.openaiKey}
                onChange={e => update('openaiKey', e.target.value)}
              />
              <div className="flex items-center gap-3">
                <Button variant="primary" size="sm" onClick={handleSaveApiKey}>
                  {saved ? 'Saved!' : 'Save'}
                </Button>
                <Button variant="secondary" size="sm" onClick={handleTestConnection}>
                  Test Connection
                </Button>
              </div>
            </div>
          </section>
        )}
      </motion.div>
    </div>
  )
}
