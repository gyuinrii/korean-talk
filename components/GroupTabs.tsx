'use client'

import { useAppStore } from '@/store/appStore'
import { GROUPS } from '@/lib/scenarios'
import type { GroupId } from '@/lib/types'

const TABS: { id: GroupId; label: string }[] = [
  { id: 'enh', label: 'ENHYPEN' },
  { id: 'zb1', label: 'ZEROBASEONE' },
  { id: 'svt', label: 'SEVENTEEN' },
]

export default function GroupTabs() {
  const { group, setGroup } = useAppStore()

  const handleSetGroup = (id: GroupId) => {
    setGroup(id)
    document.documentElement.style.setProperty('--accent', GROUPS[id].color)
  }

  return (
    <div style={{
      display: 'flex',
      margin: '24px 0 0',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      overflow: 'hidden',
      background: 'var(--surface)',
    }}>
      {TABS.map(({ id, label }) => {
        const isActive = group === id
        const g = GROUPS[id]
        return (
          <button
            key={id}
            onClick={() => handleSetGroup(id)}
            style={{
              flex: 1,
              padding: '13px 8px',
              border: 'none',
              background: isActive ? `${g.color}14` : 'transparent',
              color: isActive ? g.color : 'var(--muted)',
              fontFamily: 'var(--font-bebas)',
              fontSize: '16px',
              letterSpacing: '2px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s',
            }}
          >
            {label}
            {isActive && (
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: '20%',
                right: '20%',
                height: '2px',
                borderRadius: '2px',
                background: g.color,
              }} />
            )}
          </button>
        )
      })}
    </div>
  )
}
