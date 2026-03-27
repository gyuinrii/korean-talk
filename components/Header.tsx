'use client'

export default function Header() {
  return (
    <header style={{ textAlign: 'center', padding: '36px 0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: '13px',
          letterSpacing: '2px',
          padding: '4px 12px',
          borderRadius: '6px',
          border: '1px solid rgba(192,132,252,0.35)',
          color: 'var(--accent-enh)',
          background: 'rgba(192,132,252,0.07)',
        }}>ENHYPEN</span>
        <span style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: '13px',
          letterSpacing: '2px',
          padding: '4px 12px',
          borderRadius: '6px',
          border: '1px solid rgba(56,189,248,0.35)',
          color: 'var(--accent-zb1)',
          background: 'rgba(56,189,248,0.07)',
        }}>ZEROBASEONE</span>
        <span style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: '13px',
          letterSpacing: '2px',
          padding: '4px 12px',
          borderRadius: '6px',
          border: '1px solid rgba(251,146,60,0.35)',
          color: 'var(--accent-svt)',
          background: 'rgba(251,146,60,0.07)',
        }}>SEVENTEEN</span>
      </div>
      <h1 style={{
        fontFamily: 'var(--font-bebas)',
        fontSize: 'clamp(2.6rem,8vw,4.2rem)',
        letterSpacing: '6px',
        background: 'linear-gradient(100deg, var(--accent-enh), var(--accent-zb1), var(--accent-svt))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
        marginBottom: '8px',
      }}>한국어 TALK</h1>
      <p style={{ color: 'var(--muted)', fontSize: '12px', letterSpacing: '1px' }}>
        推しのグループで韓国語を話そう ✦
      </p>
    </header>
  )
}
