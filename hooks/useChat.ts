'use client'

import { useCallback, useRef } from 'react'
import { useAppStore } from '@/store/appStore'
import type { Message, AIResponse } from '@/lib/types'

export function useChat() {
  const {
    scenario,
    messages,
    addMessage,
    addGoodScore,
    addTipScore,
    addVocab,
    setLoading,
    isLoading,
  } = useAppStore()

  const inputRef = useRef<HTMLInputElement>(null)

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !scenario || isLoading) return

      const userMessage: Message = {
        role: 'user',
        content: text,
        timestamp: new Date(),
      }
      addMessage(userMessage)
      setLoading(true)

      if (inputRef.current) inputRef.current.value = ''

      try {
        const history = messages.slice(-20).map((m) => ({
          role: m.role === 'idol' ? 'assistant' : 'user',
          content: m.role === 'idol' ? (m.aiResponse?.korean ?? m.content) : m.content,
        }))

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemPrompt: scenario.systemPrompt,
            messages: history,
            userMessage: text,
          }),
        })

        if (!res.ok) throw new Error('API error')

        const aiResponse: AIResponse = await res.json()

        const idolMessage: Message = {
          role: 'idol',
          content: aiResponse.korean,
          aiResponse,
          timestamp: new Date(),
        }
        addMessage(idolMessage)

        if (aiResponse.feedbackType === 'good') {
          addGoodScore()
        } else {
          addTipScore()
        }

        if (aiResponse.vocab?.length) {
          addVocab(aiResponse.vocab)
        }
      } catch (err) {
        console.error('Chat error:', err)
        const errorMsg: Message = {
          role: 'idol',
          content: 'ごめん、もう一度試してみて...',
          aiResponse: {
            korean: 'ごめん、もう一度試してみて...',
            romanji: '',
            japanese: '',
            feedback: 'エラーが発生しました',
            feedbackType: 'tip',
            vocab: [],
          },
          timestamp: new Date(),
        }
        addMessage(errorMsg)
      } finally {
        setLoading(false)
      }
    },
    [scenario, messages, isLoading, addMessage, addGoodScore, addTipScore, addVocab, setLoading]
  )

  return { sendMessage, isLoading, inputRef }
}
