'use client'

import { useAppStore } from '@/store/appStore'
import { GROUPS } from '@/lib/scenarios'
import ScenarioCard from './ScenarioCard'

export default function ScenarioGrid() {
  const { group, mode } = useAppStore()

  if (!group) return null

  const scenarios = GROUPS[group].scenarios[mode]

  return (
    <div>
      <div style={{
        fontFamily: 'var(--font-space)',
        fontSize: '9px',
        letterSpacing: '3px',
        color: 'var(--muted)',
        textTransform: 'uppercase',
        marginBottom: '10px',
      }}>
        シナリオを選ぶ
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
        gap: '9px',
        marginBottom: '18px',
      }}>
        {scenarios.map((s) => (
          <ScenarioCard key={s.id} scenario={s} />
        ))}
      </div>
    </div>
  )
}
