'use client'

import { useAppStore } from '@/store/appStore'
import { GROUPS } from '@/lib/scenarios'

interface Props {
  onSend: (text: string) => void
}

export default function QuickReplies({ onSend }: Props) {
  const { scenario, group } = useAppStore()

  if (!scenario || !group) return null

  const g = GROUPS[group]

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '7px',
      padding: '0 14px 12px',
      background: 'var(--card)',
    }}>
      {scenario.quickReplies.map((reply) => (
        <button
          key={reply}
          onClick={() => onSend(reply)}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '18px',
            padding: '6px 11px',
            color: 'var(--text)',
            fontFamily: 'var(--font-noto)',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.14s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = g.color
            e.currentTarget.style.color = g.color
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text)'
          }}
        >
          {reply}
        </button>
      ))}
    </div>
  )
}
