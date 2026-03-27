'use client'

import { useState, useEffect } from 'react'
import type { VocabItem, LyricsPhrase } from '@/lib/types'

interface FlashCardProps {
  items: VocabItem[] | LyricsPhrase[]
  onComplete: () => void
}

function isLyricsPhrase(item: VocabItem | LyricsPhrase): item is LyricsPhrase {
  return 'song' in item
}

export default function FlashCard({ items, onComplete }: FlashCardProps) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
  }, [index, items])

  const item = items[index]
  const total = items.length

  const handleNext = () => {
    if (index + 1 >= total) {
      onComplete()
    } else {
      setIndex(i => i + 1)
    }
  }

  const handlePrev = () => {
    if (index > 0) setIndex(i => i - 1)
  }

  return (
    <div className="animate-fade-in">
      {/* 進捗 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        color: 'var(--muted)',
        fontSize: '13px',
      }}>
        <span>{index + 1} / {total}</span>
        {isLyricsPhrase(item) && (
          <span style={{ fontSize: '12px', opacity: 0.8 }}>{item.song}</span>
        )}
      </div>

      {/* プログレスバー */}
      <div style={{
        height: '3px',
        background: 'var(--border)',
        borderRadius: '2px',
        marginBottom: '24px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${((index + 1) / total) * 100}%`,
          background: 'var(--accent)',
          borderRadius: '2px',
          transition: 'width 0.3s ease',
        }} />
      </div>

      {/* カード */}
      <div
        className="flip-card"
        onClick={() => setFlipped(f => !f)}
        style={{ cursor: 'pointer', minHeight: '220px', marginBottom: '24px' }}
      >
        <div className={`flip-card-inner${flipped ? ' flipped' : ''}`} style={{ minHeight: '220px' }}>
          {/* 表面: 日本語 */}
          <div
            className="flip-card-front"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 24px',
              gap: '12px',
            }}
          >
            <div style={{ color: 'var(--muted)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              日本語
            </div>
            <div style={{
              fontSize: 'clamp(1.4rem, 5vw, 2rem)',
              fontWeight: 700,
              color: 'var(--text)',
              textAlign: 'center',
              lineHeight: 1.4,
            }}>
              {item.japanese}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '8px' }}>
              タップして韓国語を確認
            </div>
          </div>

          {/* 裏面: 韓国語 + ローマ字 */}
          <div
            className="flip-card-back"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--card)',
              border: '1px solid rgba(192,132,252,0.3)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 24px',
              gap: '12px',
            }}
          >
            <div style={{ color: 'var(--accent)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              한국어
            </div>
            <div style={{
              fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
              fontWeight: 900,
              color: 'var(--text)',
              textAlign: 'center',
              lineHeight: 1.3,
            }}>
              {item.korean}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px', fontFamily: 'var(--font-space)' }}>
              {item.romanji}
            </div>
          </div>
        </div>
      </div>

      {/* ボタン */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={handlePrev}
          disabled={index === 0}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: index === 0 ? 'var(--muted)' : 'var(--text)',
            cursor: index === 0 ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            opacity: index === 0 ? 0.4 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          ← 前へ
        </button>
        <button
          onClick={handleNext}
          style={{
            flex: 2,
            padding: '12px',
            borderRadius: '12px',
            border: 'none',
            background: 'var(--accent)',
            color: '#08080f',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 700,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          {index + 1 >= total ? '完了 ✓' : '次へ →'}
        </button>
      </div>
    </div>
  )
}
