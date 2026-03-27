'use client'

export default function Header() {
  // 固定値: fandomVocab(35) + oshikatsuVocab(35) + lyrics(4×9=36) + quotes(5) + recommended(20) = 131
  const totalWords = 131

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
          border: '1px solid rgba(74,222,128,0.35)',
          color: 'var(--accent-tws)',
          background: 'rgba(74,222,128,0.07)',
        }}>TWS</span>
        <span style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: '13px',
          letterSpacing: '2px',
          padding: '4px 12px',
          borderRadius: '6px',
          border: '1px solid rgba(244,114,182,0.35)',
          color: 'var(--accent-bnd)',
          background: 'rgba(244,114,182,0.07)',
        }}>BOYNEXT DOOR</span>
      </div>
      <h1 style={{
        fontFamily: 'var(--font-bebas)',
        fontSize: 'clamp(2.6rem,8vw,4.2rem)',
        letterSpacing: '6px',
        background: 'linear-gradient(100deg, var(--accent-enh), var(--accent-zb1), var(--accent-tws), var(--accent-bnd))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
        marginBottom: '8px',
      }}>한국어 KPOP</h1>
      <p style={{ color: 'var(--muted)', fontSize: '12px', letterSpacing: '1px', marginBottom: '10px' }}>
        K-POPで韓国語を学ぼう ✦
      </p>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '5px 14px',
        borderRadius: '20px',
        background: 'rgba(192,132,252,0.08)',
        border: '1px solid rgba(192,132,252,0.2)',
        color: 'var(--accent)',
        fontSize: '12px',
        fontWeight: 700,
      }}>
        💜 {totalWords}語 収録
      </div>
    </header>
  )
}
