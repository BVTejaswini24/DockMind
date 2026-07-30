import { useState, useRef, type DragEvent } from 'react'
import { Upload } from 'lucide-react'
import { cn } from '../../utils/cn'

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void
  isUploading?: boolean
}

export function UploadZone({ onFilesSelected }: UploadZoneProps) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files).filter(f =>
      f.type === 'application/pdf' ||
      f.type === 'text/plain' ||
      f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      f.name.endsWith('.docx') || f.name.endsWith('.pdf') || f.name.endsWith('.txt')
    )
    if (files.length > 0) onFilesSelected(files)
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        'relative border border-dashed rounded-xl py-20 text-center cursor-pointer transition-all duration-300',
        dragging
          ? 'border-[#3054ff]/50 bg-[#3054ff]/5'
          : 'border-white/[0.08] hover:border-white/[0.15] bg-[#0B0B0B]'
      )}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.txt,.docx"
        className="hidden"
        onChange={e => {
          const files = Array.from(e.target.files || [])
          if (files.length > 0) onFilesSelected(files)
          e.target.value = ''
        }}
      />

      <div className="flex flex-col items-center gap-5">
        <div className={cn(
          'w-14 h-14 rounded-xl border flex items-center justify-center transition-all duration-300',
          dragging ? 'bg-[#3054ff]/10 border-[#3054ff]/20' : 'bg-[#0B0B0B] border-white/[0.08]'
        )}>
          <Upload className={cn('w-6 h-6 transition-colors duration-300', dragging ? 'text-[#3054ff]' : 'text-white/40')} />
        </div>
        <div className="space-y-2">
          <p className="text-base text-white/80">
            {dragging ? 'Drop files here' : 'Drop files here or click to browse'}
          </p>
          <p className="text-sm text-white/40">PDF, TXT, DOCX — up to 10MB each</p>
        </div>
      </div>
    </div>
  )
}
