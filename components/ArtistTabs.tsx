'use client'

import type { ArtistId } from '@/lib/types'

interface ArtistTabsProps {
  selected: ArtistId
  onChange: (id: ArtistId) => void
}

const ARTISTS: { id: ArtistId; label: string; color: string }[] = [
  { id: 'enh', label: 'ENHYPEN', color: 'var(--accent-enh)' },
  { id: 'zb1', label: 'ZB1', color: 'var(--accent-zb1)' },
  { id: 'tws', label: 'TWS', color: 'var(--accent-tws)' },
  { id: 'bnd', label: 'BND', color: 'var(--accent-bnd)' },
]

export default function ArtistTabs({ selected, onChange }: ArtistTabsProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    }}>
      {ARTISTS.map(a => {
        const isSelected = selected === a.id
        return (
          <button
            key={a.id}
            onClick={() => onChange(a.id)}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: `1px solid ${isSelected ? a.color : 'var(--border)'}`,
              background: isSelected ? `${a.color}22` : 'transparent',
              color: isSelected ? a.color : 'var(--muted)',
              fontFamily: 'var(--font-bebas)',
              fontSize: '14px',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {a.label}
          </button>
        )
      })}
    </div>
  )
}
