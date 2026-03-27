'use client'

import type { Message } from '@/lib/types'
import FeedbackBadge from './FeedbackBadge'

interface Props {
  message: Message
  idolEmoji?: string
}

export default function MessageBubble({ message, idolEmoji }: Props) {
  const isIdol = message.role === 'idol'
  const ai = message.aiResponse

  return (
    <div
      className="animate-msg-in"
      style={{
        display: 'flex',
        gap: '9px',
        flexDirection: isIdol ? 'row' : 'row-reverse',
      }}
    >
      <div style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        border: '1px solid var(--border)',
      }}>
        {isIdol ? (idolEmoji ?? '✦') : '🫶'}
      </div>

      <div style={{ maxWidth: '80%' }}>
        <div style={{
          padding: '10px 13px',
          borderRadius: '15px',
          fontSize: '13.5px',
          lineHeight: 1.6,
          border: '1px solid var(--border)',
          background: isIdol ? 'var(--card)' : 'rgba(255,255,255,0.05)',
          borderTopLeftRadius: isIdol ? '4px' : '15px',
          borderTopRightRadius: isIdol ? '15px' : '4px',
          textAlign: isIdol ? 'left' : 'right',
        }}>
          {isIdol && ai ? (
            <>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>{ai.korean}</div>
              {ai.romanji && (
                <div style={{ fontSize: '11px', marginTop: '2px', fontFamily: 'var(--font-space)', color: 'var(--muted)' }}>
                  {ai.romanji}
                </div>
              )}
              {ai.japanese && (
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '3px' }}>
                  {ai.japanese}
                </div>
              )}
            </>
          ) : (
            <span>{message.content}</span>
          )}
        </div>

        {isIdol && ai?.feedback && (
          <FeedbackBadge feedback={ai.feedback} feedbackType={ai.feedbackType} />
        )}

        <div style={{
          fontSize: '10px',
          color: 'var(--muted)',
          marginTop: '4px',
          fontFamily: 'var(--font-space)',
          textAlign: isIdol ? 'left' : 'right',
        }}>
          {message.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}
