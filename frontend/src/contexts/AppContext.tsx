import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import type { DocumentItem, Conversation } from '../types'

const STORAGE_KEY = "docmind_conversations"

function loadPersistedState(): { conversations: Conversation[]; currentConversationId: string | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as { conversations?: Conversation[]; currentConversationId?: string | null }
      return {
        conversations: Array.isArray(parsed.conversations) ? parsed.conversations : [],
        currentConversationId: parsed.currentConversationId ?? null,
      }
    }
  } catch {
    // localStorage unavailable or data corrupt — fall through to defaults
  }
  return { conversations: [], currentConversationId: null }
}

interface AppState {
  sessionId: string | null
  isInitialized: boolean
  isUploading: boolean
  isChatReady: boolean
  vectorStoreName: string | null
  documents: DocumentItem[]
  conversations: Conversation[]
  currentConversationId: string | null
}

interface AppContextValue {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
  setSessionId: (id: string) => void
  setInitialized: (v: boolean) => void
  setUploading: (v: boolean) => void
  setChatReady: (v: boolean) => void
  setVectorStoreName: (name: string | null) => void
  setDocuments: React.Dispatch<React.SetStateAction<DocumentItem[]>>
  reset: () => void
}

const persisted = loadPersistedState()

const initialState: AppState = {
  sessionId: null,
  isInitialized: false,
  isUploading: false,
  isChatReady: false,
  vectorStoreName: null,
  documents: [],
  conversations: persisted.conversations,
  currentConversationId: persisted.currentConversationId,
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState)

  const setSessionId = useCallback((sessionId: string) =>
    setState(prev => ({ ...prev, sessionId })), [])

  const setInitialized = useCallback((isInitialized: boolean) =>
    setState(prev => ({ ...prev, isInitialized })), [])

  const setUploading = useCallback((isUploading: boolean) =>
    setState(prev => ({ ...prev, isUploading })), [])

  const setChatReady = useCallback((isChatReady: boolean) =>
    setState(prev => ({ ...prev, isChatReady })), [])

  const setVectorStoreName = useCallback((vectorStoreName: string | null) =>
    setState(prev => ({ ...prev, vectorStoreName })), [])

  const setDocuments = useCallback(
    (value: DocumentItem[] | ((prev: DocumentItem[]) => DocumentItem[])) =>
      setState(prev => ({
        ...prev,
        documents: typeof value === 'function' ? value(prev.documents) : value,
      })),
    [],
  )

  const reset = useCallback(() => setState(initialState), [])

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          conversations: state.conversations,
          currentConversationId: state.currentConversationId,
        }),
      )
    } catch {
      // localStorage unavailable — silently ignore
    }
  }, [state.conversations, state.currentConversationId])

  return (
    <AppContext.Provider value={{
      state, setState, setSessionId, setInitialized, setUploading,
      setChatReady, setVectorStoreName, setDocuments, reset,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
