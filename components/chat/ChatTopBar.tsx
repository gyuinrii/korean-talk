'use client'

import { useAppStore } from '@/store/appStore'

export default function ChatTopBar() {
  const { scenario } = useAppStore()

  const idol = scenario?.idol

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '13px 16px',
      background: 'var(--card)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '17px',
        flexShrink: 0,
        border: '1.5px solid var(--border)',
      }}>
        {idol?.emoji ?? '✦'}
      </div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 700 }}>
          {idol?.name ?? 'グループとシナリオを選んでね'}
        </div>
        <div style={{
          fontSize: '10px',
          fontFamily: 'var(--font-space)',
          color: idol ? 'var(--accent)' : 'var(--muted)',
        }}>
          {idol?.status ?? '● WAITING'}
        </div>
      </div>
    </div>
  )
}
