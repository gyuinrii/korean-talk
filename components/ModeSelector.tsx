'use client'

import type { StudyMode } from '@/lib/types'

interface ModeSelectorProps {
  selected: StudyMode
  onChange: (mode: StudyMode) => void
}

const MODES: { id: StudyMode; label: string; emoji: string; desc: string }[] = [
  { id: 'flashcard', label: 'フラッシュカード', emoji: '🃏', desc: 'カードをめくって覚える' },
  { id: 'quiz', label: '4択クイズ', emoji: '🎯', desc: '4つから正解を選ぶ' },
  { id: 'typing', label: 'タイピング', emoji: '⌨️', desc: '韓国語を入力して覚える' },
]

export default function ModeSelector({ selected, onChange }: ModeSelectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
      <div style={{ color: 'var(--muted)', fontSize: '12px', letterSpacing: '1px', marginBottom: '4px' }}>
        学習モードを選択
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {MODES.map(m => {
          const isSelected = selected === m.id
          return (
            <button
              key={m.id}
              onClick={() => onChange(m.id)}
              style={{
                flex: '1 1 0',
                minWidth: '120px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                background: isSelected ? 'rgba(192,132,252,0.12)' : 'var(--card)',
                color: isSelected ? 'var(--accent)' : 'var(--muted)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>{m.emoji}</div>
              <div style={{ fontSize: '13px', fontWeight: isSelected ? 700 : 400 }}>{m.label}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
