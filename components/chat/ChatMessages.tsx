'use client'

import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/appStore'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

export default function ChatMessages() {
  const { messages, scenario, isLoading } = useAppStore()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div style={{
      minHeight: '300px',
      maxHeight: '380px',
      overflowY: 'auto',
      padding: '18px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      scrollBehavior: 'smooth',
    }}>
      {messages.length === 0 && (
        <div style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--muted)' }}>
          <div style={{ fontSize: '44px', marginBottom: '10px' }}>✦</div>
          <p style={{ fontSize: '13px', lineHeight: 1.8 }}>
            ENHYPEN・ZEROBASEONE・SEVENTEENから<br />
            好きなグループを選んで<br />
            <strong style={{ color: 'var(--accent-enh)' }}>韓国語で会話練習</strong>をスタートしよう！
          </p>
        </div>
      )}

      {messages.map((msg, i) => (
        <MessageBubble
          key={i}
          message={msg}
          idolEmoji={scenario?.idol.emoji}
        />
      ))}

      {isLoading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  )
}
