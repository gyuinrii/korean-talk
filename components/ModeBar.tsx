'use client'

import { useAppStore } from '@/store/appStore'
import { GROUPS } from '@/lib/scenarios'
import type { ModeId } from '@/lib/types'

const MODES: { id: ModeId; label: string }[] = [
  { id: 'convo', label: '💬 会話練習' },
  { id: 'lyrics', label: '🎵 歌詞フレーズ' },
  { id: 'fandom', label: '💜 ファンダム用語' },
]

export default function ModeBar() {
  const { group, mode, setMode } = useAppStore()

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      margin: '14px 0 20px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '5px',
    }}>
      {MODES.map(({ id, label }) => {
        const isActive = mode === id && group
        const g = group ? GROUPS[group] : null
        return (
          <button
            key={id}
            onClick={() => setMode(id)}
            style={{
              flex: 1,
              padding: '9px 6px',
              border: 'none',
              borderRadius: '9px',
              background: isActive && g ? g.grad : 'transparent',
              color: isActive ? 'white' : 'var(--muted)',
              fontFamily: 'var(--font-noto)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              boxShadow: isActive && g ? `0 3px 16px ${g.color}55` : 'none',
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
