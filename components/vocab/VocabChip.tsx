'use client'

import { useAppStore } from '@/store/appStore'
import type { VocabItem } from '@/lib/types'

interface Props {
  item: VocabItem
  onInsert: (text: string) => void
}

export default function VocabChip({ item, onInsert }: Props) {
  const { learnWord, learnedVocab } = useAppStore()
  const learned = learnedVocab.has(item.korean)

  const handleClick = () => {
    learnWord(item.korean)
    onInsert(item.korean + ' ')
  }

  return (
    <div
      onClick={handleClick}
      style={{
        background: learned ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
        border: '1px solid var(--border)',
        borderRadius: '9px',
        padding: '6px 10px',
        cursor: 'pointer',
        transition: 'all 0.14s',
        opacity: learned ? 0.7 : 1,
      }}
    >
      <div style={{ fontSize: '13px', fontWeight: 700 }}>{item.korean}</div>
      <div style={{ fontSize: '10px', fontFamily: 'var(--font-space)', color: 'var(--muted)' }}>{item.romanji}</div>
      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{item.japanese}</div>
    </div>
  )
}
