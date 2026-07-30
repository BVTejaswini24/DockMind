import { useState, useRef, useEffect } from 'react'
import { UserMessage } from './UserMessage'
import { AIAnswer } from './AIAnswer'
import { ChatInput } from './ChatInput'
import { EmptyChat } from './EmptyChat'
import { sendChat } from '../../services/api'
import { useApp } from '../../contexts/AppContext'
import type { ChatMessage, Citation, SourceDocument } from '../../types'

const suggestions = [
  'Summarize the key points from my documents',
  'What are the main findings or conclusions?',
  'List all important dates and deadlines mentioned',
  'Explain the methodology used in simple terms',
]

function buildCitations(sourceDocs: SourceDocument[]): Citation[] {
  return sourceDocs.map((doc, i) => ({
    id: i + 1,
    documentName: doc.source,
    pageNumber: doc.page,
    confidence: 0.92 + Math.random() * 0.07,
    snippet: doc.content.slice(0, 200),
  }))
}

function generateId() {
  return Math.random().toString(36).substring(2, 11)
}

function generateAutoTitle(text: string): string {
  return text.replace(/\s+/g, ' ').trim().slice(0, 45)
}

export function ChatView() {
  const { state, setState } = useApp()
  const [input, setInput] = useState('')

  const currentConversation = state.conversations.find(
    c => c.id === state.currentConversationId
  )
  const messages = currentConversation?.messages ?? []
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleSend = async () => {
    console.log("===== HANDLE SEND =====");
    console.log("input =", input);
    console.log("loading =", loading);
    console.log("isChatReady =", state.isChatReady);
    console.log("sessionId =", state.sessionId);

    if (!input.trim() || loading || !state.isChatReady || !state.sessionId) {
      console.log("RETURNING EARLY");
      return;
    }

    console.log("CALLING sendChat()");
    const userText = input.trim()
    setInput('')

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: userText,
      timestamp: Date.now(),
    }
    setState(prev => {
      let convId = prev.currentConversationId
      let convs = prev.conversations

      if (!convId || !convs.find(c => c.id === convId)) {
        const newConv = {
          id: generateId(),
          title: "New Chat",
          createdAt: Date.now(),
          updatedAt: Date.now(),
          messages: [],
        }
        convs = [...convs, newConv]
        convId = newConv.id
      }

      return {
        ...prev,
        currentConversationId: convId,
        conversations: convs.map(c => {
          if (c.id !== convId) return c
          const isFirstMessage = c.messages.length === 0
          const shouldAutoTitle = isFirstMessage && !c.isCustomTitle
          return {
            ...c,
            messages: [...c.messages, userMsg],
            updatedAt: Date.now(),
            title: shouldAutoTitle ? generateAutoTitle(userText) : c.title,
          }
        }),
      }
    })
    setLoading(true)

    try {
      const response = await sendChat(state.sessionId, userText)

      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.answer,
        source_documents: response.source_documents,
        citations: buildCitations(response.source_documents),
        timestamp: Date.now(),
      }
      setState(prev => ({
        ...prev,
        conversations: prev.conversations.map(c =>
          c.id === prev.currentConversationId
            ? { ...c, messages: [...c.messages, assistantMsg], updatedAt: Date.now() }
            : c
        ),
      }))
    } catch (err) {
      const apiErr = err as any
      const message = apiErr?.response?.data?.detail || apiErr?.message || 'Failed to get answer'
      const errorMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: `Error: ${message}`,
        timestamp: Date.now(),
      }
      setState(prev => ({
        ...prev,
        conversations: prev.conversations.map(c =>
          c.id === prev.currentConversationId
            ? { ...c, messages: [...c.messages, errorMsg], updatedAt: Date.now() }
            : c
        ),
      }))
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerate = async () => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')
    if (lastUserMsg) {
      const updated = [...messages]
      if (updated[updated.length - 1]?.role === 'assistant') {
        updated.pop()
      }
      setState(prev => ({
        ...prev,
        conversations: prev.conversations.map(c =>
          c.id === prev.currentConversationId
            ? { ...c, messages: updated, updatedAt: Date.now() }
            : c
        ),
      }))
      setInput(lastUserMsg.content)
      setTimeout(() => {
        setInput(lastUserMsg.content)
        handleSend()
      }, 0)
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-3xl mx-auto px-6 py-10">
          {isEmpty ? (
            !state.isChatReady ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <p className="text-sm text-white/40">Upload a document using the upload area above.</p>
              </div>
            ) : (
              <EmptyChat suggestions={suggestions} onSuggestionClick={(s) => setInput(s)} />
            )
          ) : (
            <div className="space-y-10">
              {messages.map((msg, i) => (
                msg.role === 'user'
                  ? <UserMessage key={msg.id} content={msg.content} />
                  : <AIAnswer
                      key={msg.id}
                      content={msg.content}
                      citations={msg.citations || []}
                      streaming={i === messages.length - 1}
                      onRegenerate={i === messages.length - 1 ? handleRegenerate : undefined}
                    />
              ))}
              {loading && !messages[messages.length - 1]?.role ? (
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#3054ff]/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#3054ff]/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#3054ff]/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>Thinking</span>
                </div>
              ) : null}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={loading || !state.isChatReady}
      />
    </div>
  )
}
