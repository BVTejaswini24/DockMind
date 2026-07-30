import axios from 'axios'
import type {
  SessionCreateResponse,
  UploadResponse,
  ChatResponse,
  DeleteResponse,
  HealthResponse,
} from '../types'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
  timeout: 120000,
  headers: { 'Content-Type': 'application/json' },
})

export async function createSession(): Promise<SessionCreateResponse> {
  const { data } = await api.post<SessionCreateResponse>('/session/new')
  return data
}

export async function uploadDocuments(
  sessionId: string,
  formData: FormData,
  onProgress?: (pct: number) => void,
): Promise<UploadResponse> {
  const { data } = await api.post<UploadResponse>('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress && e.total) onProgress(Math.round((e.loaded / e.total) * 100))
    },
  })
  return data
}

export async function sendChat(
  sessionId: string,
  prompt: string,
  llmProvider: string = 'Google',
): Promise<ChatResponse> {
  console.log("POSTING TO:", api.defaults.baseURL + "/chat");
  console.log({
    session_id: sessionId,
    prompt,
    llm_provider: llmProvider,
  });
  const { data } = await api.post<ChatResponse>('/chat', {
    session_id: sessionId,
    prompt,
    llm_provider: llmProvider,
  })
  return data
}

export async function deleteSession(sessionId: string): Promise<DeleteResponse> {
  const { data } = await api.delete<DeleteResponse>(`/session/${sessionId}`)
  return data
}

export async function healthCheck(): Promise<HealthResponse> {
  const { data } = await api.get<HealthResponse>('/health')
  return data
}

export default api
