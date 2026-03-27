'use client'

import { useAppStore } from '@/store/appStore'
import { GROUPS } from '@/lib/scenarios'
import type { Scenario } from '@/lib/types'

interface Props {
  scenario: Scenario
}

export default function ScenarioCard({ scenario }: Props) {
  const { group, scenario: activeScenario, setScenario } = useAppStore()
  const isActive = activeScenario?.id === scenario.id
  const g = group ? GROUPS[group] : null

  return (
    <div
      onClick={() => setScenario(scenario)}
      style={{
        background: 'var(--card)',
        border: `1px solid ${isActive && g ? g.color : 'var(--border)'}`,
        borderRadius: '13px',
        padding: '14px',
        cursor: 'pointer',
        transition: 'all 0.18s',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isActive && g ? `0 0 0 1px ${g.color}44` : 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: isActive ? 0.10 : 0,
        background: g ? `linear-gradient(135deg, ${g.color}, transparent)` : 'none',
        transition: 'opacity 0.18s',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '20px', marginBottom: '7px' }}>{scenario.emoji}</div>
        <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '2px' }}>{scenario.title}</div>
        <div style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.4 }}>{scenario.desc}</div>
        <span style={{
          display: 'inline-block',
          fontSize: '9px',
          fontFamily: 'var(--font-space)',
          padding: '2px 6px',
          borderRadius: '4px',
          marginTop: '6px',
          letterSpacing: '0.5px',
          border: `1px solid ${g ? g.color + '60' : 'var(--border)'}`,
          color: g ? g.color : 'var(--muted)',
          background: g ? g.color + '15' : 'transparent',
        }}>{scenario.tag}</span>
      </div>
    </div>
  )
}
