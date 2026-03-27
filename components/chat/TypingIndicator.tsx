'use client'

export default function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '9px' }}>
      <div style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        border: '1px solid var(--border)',
      }}>✦</div>
      <div style={{
        display: 'flex',
        gap: '4px',
        padding: '11px 13px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '15px',
        borderTopLeftRadius: '4px',
        width: 'fit-content',
        alignItems: 'center',
      }}>
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  )
}
