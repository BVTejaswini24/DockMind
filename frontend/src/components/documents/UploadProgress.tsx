import { motion, AnimatePresence } from 'framer-motion'
import { FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import type { UploadFileItem } from '../../types'
import { cn } from '../../utils/cn'

const stageLabels: Record<string, { label: string; percent: number }> = {
  pending: { label: 'Waiting...', percent: 0 },
  uploading: { label: 'Uploading...', percent: 25 },
  chunking: { label: 'Chunking...', percent: 50 },
  embedding: { label: 'Embedding...', percent: 75 },
  ready: { label: 'Ready', percent: 100 },
  error: { label: 'Failed', percent: 0 },
}

interface UploadProgressProps {
  files: UploadFileItem[]
  onRemove?: (id: string) => void
}

export function UploadProgress({ files, onRemove }: UploadProgressProps) {
  if (files.length === 0) return null

  return (
    <div className="space-y-3">
      {files.map(file => {
        const stage = stageLabels[file.status]
        const isError = file.status === 'error'
        const isDone = file.status === 'ready'
        const isProcessing = file.status === 'uploading' || file.status === 'chunking' || file.status === 'embedding'

        return (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0B0B0B] border border-white/[0.08] rounded-xl p-5"
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                'w-9 h-9 rounded-lg border flex items-center justify-center shrink-0',
                isDone ? 'bg-green-500/10 border-green-500/20' :
                isError ? 'bg-red-500/10 border-red-500/20' :
                'bg-[#3054ff]/5 border-[#3054ff]/10'
              )}>
                {isDone ? <CheckCircle2 className="w-4 h-4 text-green-400" /> :
                 isError ? <AlertCircle className="w-4 h-4 text-red-400" /> :
                 isProcessing ? <Loader2 className="w-4 h-4 text-[#3054ff] animate-spin" /> :
                 <FileText className="w-4 h-4 text-white/40" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/80 truncate">{file.name}</p>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'text-xs',
                      isDone ? 'text-green-400' :
                      isError ? 'text-red-400' :
                      'text-[#3054ff]'
                    )}>
                      {stage.label}
                    </span>
                    {onRemove && !isDone && !isProcessing && (
                      <button
                        onClick={() => onRemove(file.id)}
                        className="p-0.5 text-white/40 hover:text-white/70 transition-colors"
                      >
                        <span className="text-lg leading-none">&times;</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-2 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${isError ? 0 : stage.percent}%` }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className={cn(
                      'h-full rounded-full',
                      isDone ? 'bg-green-400' :
                      isError ? 'bg-red-400' :
                      'bg-[#3054ff]'
                    )}
                  />
                </div>

                {isProcessing && (
                  <div className="flex items-center gap-3 mt-2">
                    {['uploading', 'chunking', 'embedding'].map(s => (
                      <div key={s} className="flex items-center gap-1.5">
                        <div className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          file.status === s ? 'bg-[#3054ff]' :
                          stageLabels[s].percent < stage.percent ? 'bg-green-400' :
                          'bg-white/[0.06]'
                        )} />
                        <span className={cn(
                          'text-xs',
                          file.status === s ? 'text-[#3054ff]' :
                          stageLabels[s].percent < stage.percent ? 'text-green-400' :
                          'text-white/40'
                        )}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {isError && file.error && (
                  <p className="text-sm text-red-400 mt-1">{file.error}</p>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
