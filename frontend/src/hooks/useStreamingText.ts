import { useState, useEffect, useRef } from 'react'

export function useStreamingText(fullText: string, speed: number = 20) {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!fullText) {
      setDisplayed('')
      return
    }

    indexRef.current = 0
    setDisplayed('')

    timerRef.current = setInterval(() => {
      indexRef.current += 1
      setDisplayed(fullText.slice(0, indexRef.current))
      if (indexRef.current >= fullText.length && timerRef.current) {
        clearInterval(timerRef.current)
      }
    }, speed)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [fullText, speed])

  const isComplete = displayed.length >= (fullText?.length || 0)

  return { displayedText: displayed, isComplete }
}
