import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadZone, UploadProgress } from '../components/documents'
import { Button, Badge } from '../components/ui'
import { FileText, Search, Grid3X3, List, Star, Trash2 } from 'lucide-react'
import type { DocumentItem, UploadFileItem } from '../types'
import { createSession, uploadDocuments } from '../services/api'
import { useApp } from '../contexts/AppContext'
import { ChatView } from '../components/chat/ChatView'

function generateId() {
  return Math.random().toString(36).substring(2, 11)
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatTime(ts: number): string {
  const diff = Date.now() - ts
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
}

function deriveConversationTitle(filename: string): string {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')
  return nameWithoutExt.replace(/[_-]+/g, ' ')
}

export default function DocumentsPage() {
  const { state, setState, setSessionId, setInitialized, setUploading, setVectorStoreName, setChatReady, setDocuments } = useApp()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const documents = state.documents
  const [uploads, setUploads] = useState<UploadFileItem[]>([])

  const handleFilesSelected = useCallback(async (files: File[]) => {
    const newUploads: UploadFileItem[] = files.map(f => ({
      id: generateId(),
      file: f,
      name: f.name,
      size: f.size,
      progress: 0,
      status: 'pending' as const,
    }))
    setUploads(prev => [...prev, ...newUploads])

    try {
      let currentSessionId = state.sessionId
      if (!currentSessionId) {
        const session = await createSession()
        currentSessionId = session.session_id
        setSessionId(currentSessionId)
      }

      setInitialized(true)
      setUploading(true)

      setUploads(prev => prev.map(f =>
        newUploads.some(nu => nu.id === f.id)
          ? { ...f, status: 'uploading' as const }
          : f
      ))

      const formData = new FormData()
      formData.append('session_id', currentSessionId)
      files.forEach(f => formData.append('files', f))
      formData.append('vector_store_name', `docmind_${Date.now()}`)
      formData.append('llm_provider', 'Google')
      formData.append('api_key_google', '')
      formData.append('selected_model', 'gemini-2.5-flash')
      formData.append('retriever_type', 'Contextual compression')
      formData.append('assistant_language', 'english')

      const response = await uploadDocuments(currentSessionId, formData, (pct) => {
        setUploads(prev => prev.map(f =>
          newUploads.some(nu => nu.id === f.id)
            ? { ...f, progress: pct }
            : f
        ))
      })

      setVectorStoreName(response.vector_store_name)

      setUploads(prev => prev.map(f =>
        newUploads.some(nu => nu.id === f.id)
          ? { ...f, status: 'chunking' as const, progress: 50 }
          : f
      ))
      await new Promise(r => setTimeout(r, 300))

      setUploads(prev => prev.map(f =>
        newUploads.some(nu => nu.id === f.id)
          ? { ...f, status: 'embedding' as const, progress: 75 }
          : f
      ))
      await new Promise(r => setTimeout(r, 300))

      setUploads(prev => prev.map(f =>
        newUploads.some(nu => nu.id === f.id)
          ? { ...f, status: 'ready' as const, progress: 100 }
          : f
      ))

      setDocuments(prev => [...prev, ...files.map(f => ({
        id: generateId(),
        name: f.name,
        type: f.name.endsWith('.pdf') ? 'PDF' as const : f.name.endsWith('.docx') ? 'DOCX' as const : 'TXT' as const,
        size: f.size,
        uploadedAt: Date.now(),
        status: 'ready' as const,
        favorite: false,
      }))])

      setChatReady(true)
      setUploading(false)

      const newConversationId = generateId()
      setState(prev => ({
        ...prev,
        currentConversationId: newConversationId,
        conversations: [
          ...prev.conversations,
          {
            id: newConversationId,
            title: deriveConversationTitle(files[0].name),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messages: [],
          },
        ],
      }))
    } catch (err) {
      setUploading(false)
      const apiErr = err as any
      const message = apiErr?.response?.data?.detail || apiErr?.message || 'Upload failed'
      setUploads(prev => prev.map(f =>
        newUploads.some(nu => nu.id === f.id)
          ? { ...f, status: 'error' as const, error: message, progress: 0 }
          : f
      ))
    }
  }, [
    state.sessionId,
    setState,
    setSessionId,
    setInitialized,
    setUploading,
    setVectorStoreName,
    setChatReady,
    setDocuments,
  ])

  const removeUpload = useCallback((id: string) => {
    setUploads(prev => prev.filter(f => f.id !== id))
  }, [])

  const filtered = documents.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-1"
      >
        <h1 className="text-body text-bone tracking-[-0.32px]">Chat</h1>
        <p className="text-body-sm text-pale-stone">Upload documents and start chatting</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <UploadZone onFilesSelected={handleFilesSelected} isUploading={uploads.some(f => f.status !== 'ready' && f.status !== 'error' && f.status !== 'pending')} />
      </motion.div>

      <AnimatePresence>
        {uploads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <UploadProgress files={uploads} onRemove={removeUpload} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center gap-4"
      >
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pale-stone" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-4 py-2.5 text-body-sm bg-surface-muted border border-ash-stroke rounded-buttons text-bone placeholder:text-pale-stone focus:outline-none focus:border-accent/30 transition-colors"
          />
        </div>
        <div className="flex items-center border border-ash-stroke rounded-buttons overflow-hidden">
          <button
            onClick={() => setView('grid')}
            className={`p-2 transition-colors ${view === 'grid' ? 'text-accent' : 'text-pale-stone hover:text-bone'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 transition-colors ${view === 'list' ? 'text-accent' : 'text-pale-stone hover:text-bone'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {filtered.length === 0 && documents.length > 0 && (
        <div className="text-center py-16">
          <p className="text-body-sm text-pale-stone">No documents match your search.</p>
        </div>
      )}
      {documents.length === 0 && uploads.length === 0 && (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-buttons bg-surface-muted border border-ash-stroke flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-pale-stone" />
          </div>
          <h3 className="text-body-sm text-bone">No documents yet</h3>
          <p className="text-body-sm text-pale-stone mt-1">Upload a PDF, DOCX, or TXT file to get started.</p>
        </div>
      )}

      {filtered.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className={view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-3'
          }
        >
          {filtered.map(doc => (
            <div key={doc.id} className="card-elevated p-6 group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-buttons bg-accent/5 border border-accent/10 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body-sm text-bone truncate tracking-[-0.16px]">{doc.name}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-caption text-pale-stone">{formatSize(doc.size)}</span>
                    <span className="text-caption text-graphite-mid">·</span>
                    <span className="text-caption text-pale-stone">{formatTime(doc.uploadedAt)}</span>
                    <Badge variant="success">ready</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-fast">
                  <button className="p-1.5 rounded-buttons text-pale-stone hover:text-accent hover:bg-surface-muted">
                    <Star className={`w-3.5 h-3.5 ${doc.favorite ? 'fill-accent text-accent' : ''}`} />
                  </button>
                  <button className="p-1.5 rounded-buttons text-pale-stone hover:text-status-error hover:bg-surface-muted">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-body text-bone tracking-[-0.32px]">Chat</h2>
        <p className="text-body-sm text-pale-stone mb-4">Ask questions about your uploaded documents</p>
        <div className="h-[600px] bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl overflow-hidden">
          <ChatView />
        </div>
      </motion.div>
    </div>
  )
}
