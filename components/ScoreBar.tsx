'use client'

import { useAppStore } from '@/store/appStore'

export default function ScoreBar() {
  const { score, turns, streak, learnedVocab } = useAppStore()

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      padding: '11px 16px',
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '13px',
      marginBottom: '18px',
    }}>
      <ScoreItem value={score} label="スコア" color="var(--accent-enh)" />
      <Divider />
      <ScoreItem value={turns} label="やり取り" color="var(--accent-zb1)" />
      <Divider />
      <ScoreItem value={streak} label="🔥連続" color="var(--accent-svt)" />
      <div style={{ flex: 1 }} />
      <ScoreItem value={learnedVocab.size} label="単語習得" color="var(--accent)" />
    </div>
  )
}

function ScoreItem({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', letterSpacing: '1px', color }}>{value}</div>
      <div style={{ fontSize: '9px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-space)' }}>{label}</div>
    </div>
  )
}

function Divider() {
  return <div style={{ width: '1px', height: '30px', background: 'var(--border)' }} />
}
