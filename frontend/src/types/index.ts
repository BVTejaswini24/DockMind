export interface SourceDocument {
  content: string
  source: string
  page: number | null
}

export interface Citation {
  id: number
  documentName: string
  pageNumber: number | null
  confidence: number
  snippet: string
}

export interface ChatResponse {
  answer: string
  source_documents: SourceDocument[]
}

export interface UploadResponse {
  status: string
  vector_store_name: string
  num_documents: number
}

export interface SessionCreateResponse {
  session_id: string
}

export interface HealthResponse {
  status: string
}

export interface DeleteResponse {
  status: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  source_documents?: SourceDocument[]
  citations?: Citation[]
  timestamp: number
}

export interface Conversation {
  id: string
  title: string
  createdAt: number
  updatedAt: number
  messages: ChatMessage[]
  isCustomTitle?: boolean
}

export interface ConversationsState {
  currentConversationId: string | null
  conversations: Conversation[]
}

export interface UploadFileItem {
  id: string
  file: File
  name: string
  size: number
  progress: number
  status: 'pending' | 'uploading' | 'chunking' | 'embedding' | 'ready' | 'error'
  error?: string
}

export interface DocumentItem {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: number
  status: 'processing' | 'ready' | 'error'
  favorite: boolean
}

export interface ChatSession {
  id: string
  title: string
  updatedAt: number
  messageCount: number
}
