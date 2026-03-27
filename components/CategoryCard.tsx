'use client'

interface CategoryCardProps {
  id: string
  emoji: string
  title: string
  desc: string
  color: string
  onClick: () => void
}

export default function CategoryCard({ emoji, title, desc, color, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="animate-fade-in"
      style={{
        width: '100%',
        background: 'var(--card)',
        border: `1px solid var(--border)`,
        borderRadius: '16px',
        padding: '20px 24px',
        cursor: 'pointer',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: `0 0 0 0 ${color}00`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-2px)'
        el.style.borderColor = `${color}55`
        el.style.boxShadow = `0 4px 24px ${color}22`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.borderColor = 'var(--border)'
        el.style.boxShadow = `0 0 0 0 ${color}00`
      }}
    >
      {/* グラデーションボーダー装飾 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, ${color}88, transparent)`,
        borderRadius: '16px 16px 0 0',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: `${color}18`,
          border: `1px solid ${color}33`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          flexShrink: 0,
        }}>
          {emoji}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            color: 'var(--text)',
            fontWeight: 700,
            fontSize: '16px',
            marginBottom: '4px',
          }}>
            {title}
          </div>
          <div style={{
            color: 'var(--muted)',
            fontSize: '13px',
            lineHeight: 1.5,
          }}>
            {desc}
          </div>
        </div>
        <div style={{
          color: color,
          fontSize: '20px',
          opacity: 0.7,
          flexShrink: 0,
        }}>
          →
        </div>
      </div>
    </button>
  )
}
