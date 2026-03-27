'use client'

import { useAppStore } from '@/store/appStore'
import VocabChip from './VocabChip'

interface Props {
  inputRef: React.RefObject<HTMLInputElement>
}

export default function VocabPanel({ inputRef }: Props) {
  const { vocab, scenario } = useAppStore()

  if (!scenario || vocab.length === 0) return null

  const handleInsert = (text: string) => {
    if (inputRef.current) {
      const prev = inputRef.current.value
      inputRef.current.value = prev + text
      inputRef.current.focus()
    }
  }

  return (
    <div
      className="animate-msg-in"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '13px',
        padding: '13px 14px',
        marginBottom: '14px',
      }}
    >
      <h3 style={{
        fontSize: '9px',
        letterSpacing: '3px',
        color: 'var(--muted)',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-space)',
        marginBottom: '9px',
      }}>
        📚 単語帳 — タップして入力に使う
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
        {vocab.map((item) => (
          <VocabChip key={item.korean} item={item} onInsert={handleInsert} />
        ))}
      </div>
    </div>
  )
}
