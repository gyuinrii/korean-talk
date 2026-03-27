'use client'

import { useState, useEffect } from 'react'
import { getFavorites } from '@/lib/favorites'
import { fandomVocab } from '@/lib/fandom-vocab'
import { oshikatsuVocab } from '@/lib/oshikatsu-vocab'
import { lyricsByArtist } from '@/lib/lyrics'
import { quotes } from '@/lib/quotes'
import { recommended } from '@/lib/recommended'
import StudySession from '@/components/StudySession'
import QuoteSession from '@/components/QuoteSession'
import type { VocabItem, LyricsPhrase, Quote } from '@/lib/types'

interface FavoritesSessionProps {
  onBack: () => void
}

type Tab = 'vocab' | 'quotes'

export default function FavoritesSession({ onBack }: FavoritesSessionProps) {
  const [favVocab, setFavVocab] = useState<(VocabItem | LyricsPhrase)[]>([])
  const [favQuotes, setFavQuotes] = useState<Quote[]>([])
  const [loaded, setLoaded] = useState(false)
  const [tab, setTab] = useState<Tab>('vocab')
  const [showStudy, setShowStudy] = useState(false)
  const [showQuoteStudy, setShowQuoteStudy] = useState(false)

  useEffect(() => {
    const favs = getFavorites()

    // VocabItem / LyricsPhrase のお気に入りを収集
    const allVocab: (VocabItem | LyricsPhrase)[] = [
      ...fandomVocab,
      ...oshikatsuVocab,
      ...recommended,
      ...Object.values(lyricsByArtist).flat(),
    ]
    const filteredVocab = allVocab.filter(item => favs.has(item.korean))

    // Quote のお気に入りを収集
    const filteredQuotes = quotes.filter(q => favs.has(q.korean))

    setFavVocab(filteredVocab)
    setFavQuotes(filteredQuotes)
    setLoaded(true)

    // デフォルトタブの決定
    if (filteredVocab.length === 0 && filteredQuotes.length > 0) {
      setTab('quotes')
    }
  }, [])

  if (!loaded) {
    return (
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '740px', margin: '0 auto', padding: '24px 16px 80px' }}>
          <div style={{ color: 'var(--muted)', textAlign: 'center', padding: '60px 0' }}>読み込み中...</div>
        </div>
      </div>
    )
  }

  const hasVocab = favVocab.length > 0
  const hasQuotes = favQuotes.length > 0
  const hasBoth = hasVocab && hasQuotes

  // StudySession表示
  if (showStudy && hasVocab) {
    return (
      <StudySession
        title="⭐ お気に入り - 単語・フレーズ"
        items={favVocab}
        onBack={() => setShowStudy(false)}
      />
    )
  }

  // QuoteSession表示
  if (showQuoteStudy && hasQuotes) {
    return (
      <QuoteSession
        quotes={favQuotes}
        onBack={() => setShowQuoteStudy(false)}
      />
    )
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '24px 16px 80px' }}>

        {/* ヘッダー */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <button
            onClick={onBack}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--muted)',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)' }}
          >
            ← 戻る
          </button>
          <h2 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '1.5rem',
            letterSpacing: '2px',
            color: 'var(--text)',
          }}>
            ⭐ お気に入り
          </h2>
        </div>

        {/* お気に入りが0件の場合 */}
        {!hasVocab && !hasQuotes && (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '48px 24px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>♡</div>
            <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>
              まだありません
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6 }}>
              フラッシュカードの ♡ ボタンをタップして<br />お気に入りに追加できます
            </div>
          </div>
        )}

        {/* タブ（両方ある場合） */}
        {hasBoth && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <button
              onClick={() => setTab('vocab')}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '10px',
                border: `1px solid ${tab === 'vocab' ? 'var(--accent)' : 'var(--border)'}`,
                background: tab === 'vocab' ? 'rgba(192,132,252,0.12)' : 'var(--card)',
                color: tab === 'vocab' ? 'var(--accent)' : 'var(--muted)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: tab === 'vocab' ? 700 : 400,
                transition: 'all 0.2s',
              }}
            >
              単語・フレーズ ({favVocab.length})
            </button>
            <button
              onClick={() => setTab('quotes')}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '10px',
                border: `1px solid ${tab === 'quotes' ? 'var(--accent)' : 'var(--border)'}`,
                background: tab === 'quotes' ? 'rgba(192,132,252,0.12)' : 'var(--card)',
                color: tab === 'quotes' ? 'var(--accent)' : 'var(--muted)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: tab === 'quotes' ? 700 : 400,
                transition: 'all 0.2s',
              }}
            >
              名言 ({favQuotes.length})
            </button>
          </div>
        )}

        {/* 単語・フレーズ一覧 */}
        {(tab === 'vocab' || !hasBoth) && hasVocab && (
          <div>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{favVocab.length}件のお気に入り</span>
              <button
                onClick={() => setShowStudy(true)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'var(--accent)',
                  color: '#08080f',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                学習を始める →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {favVocab.map(item => (
                <div key={item.korean} style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <div>
                    <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: '16px' }}>{item.korean}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '2px' }}>{item.romanji}</div>
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px', textAlign: 'right' }}>{item.japanese}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 名言一覧 */}
        {(tab === 'quotes' || !hasBoth) && hasQuotes && (
          <div>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{favQuotes.length}件のお気に入り</span>
              <button
                onClick={() => setShowQuoteStudy(true)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'var(--accent)',
                  color: '#08080f',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                学習を始める →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {favQuotes.map(q => (
                <div key={q.korean} style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                }}>
                  <div style={{ color: 'var(--muted)', fontSize: '11px', marginBottom: '6px' }}>
                    {q.member} — {q.group}
                  </div>
                  <div style={{ color: 'var(--text)', fontSize: '13px', lineHeight: 1.7, marginBottom: '4px' }}>
                    「{q.japanese}」
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.6 }}>
                    {q.korean}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
