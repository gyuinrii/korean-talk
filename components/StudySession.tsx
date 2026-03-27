'use client'

import { useState, useEffect, useMemo } from 'react'
import ModeSelector from '@/components/ModeSelector'
import FlashCard from '@/components/FlashCard'
import QuizCard from '@/components/QuizCard'
import TypingQuiz from '@/components/TypingQuiz'
import ArtistTabs from '@/components/ArtistTabs'
import type { StudyMode, VocabItem, LyricsPhrase, ArtistId } from '@/lib/types'
import { getLearned } from '@/lib/learned'

interface StudySessionProps {
  title: string
  items: VocabItem[] | LyricsPhrase[]
  showArtistTabs?: boolean
  selectedArtist?: ArtistId
  onArtistChange?: (id: ArtistId) => void
  onBack: () => void
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function StudySession({
  title,
  items,
  showArtistTabs,
  selectedArtist,
  onArtistChange,
  onBack,
}: StudySessionProps) {
  const [mode, setMode] = useState<StudyMode>('flashcard')
  const [completed, setCompleted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [learnedCount, setLearnedCount] = useState(0)

  useEffect(() => {
    const updateLearned = () => {
      const learned = getLearned()
      const count = items.filter(item => learned.has(item.korean)).length
      setLearnedCount(count)
    }
    updateLearned()
  }, [items])

  const displayItems = useMemo(() => {
    if (shuffle) return shuffleArray(items)
    return items
  }, [items, shuffle])

  const handleComplete = () => {
    const learned = getLearned()
    const count = items.filter(item => learned.has(item.korean)).length
    setLearnedCount(count)
    setCompleted(true)
  }
  const handleRestart = () => setCompleted(false)

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '24px 16px 80px' }}>

        {/* 戻るボタン + タイトル */}
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
              whiteSpace: 'nowrap',
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
            {title}
          </h2>
          {learnedCount > 0 && (
            <span style={{
              padding: '3px 10px',
              borderRadius: '20px',
              background: 'rgba(74,222,128,0.12)',
              border: '1px solid rgba(74,222,128,0.3)',
              color: '#4ade80',
              fontSize: '11px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}>
              ✓ {learnedCount}語学習済み
            </span>
          )}
          <span style={{
            marginLeft: 'auto',
            color: 'var(--muted)',
            fontSize: '12px',
          }}>
            {items.length}語
          </span>
        </div>

        {/* アーティストタブ（歌詞のみ） */}
        {showArtistTabs && selectedArtist && onArtistChange && (
          <ArtistTabs selected={selectedArtist} onChange={onArtistChange} />
        )}

        {/* シャッフルトグル */}
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => { setShuffle(s => !s); setCompleted(false) }}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${shuffle ? 'var(--accent)' : 'var(--border)'}`,
              background: shuffle ? 'rgba(192,132,252,0.12)' : 'transparent',
              color: shuffle ? 'var(--accent)' : 'var(--muted)',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: shuffle ? 700 : 400,
              transition: 'all 0.2s',
            }}
          >
            🔀 ランダム順
          </button>
        </div>

        {/* モード選択 */}
        <ModeSelector selected={mode} onChange={(m) => { setMode(m); setCompleted(false) }} />

        {/* 学習エリア */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '24px',
        }}>
          {completed ? (
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
              <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
                お疲れ様でした！
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px' }}>
                全{items.length}語を学習しました
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={handleRestart}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'var(--accent)',
                    color: '#08080f',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  もう一度
                </button>
                <button
                  onClick={onBack}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--text)',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  カテゴリに戻る
                </button>
              </div>
            </div>
          ) : mode === 'flashcard' ? (
            <FlashCard key={`flash-${selectedArtist}-${shuffle}`} items={displayItems} onComplete={handleComplete} />
          ) : mode === 'quiz' ? (
            <QuizCard key={`quiz-${selectedArtist}-${shuffle}`} items={displayItems} onComplete={handleComplete} />
          ) : (
            <TypingQuiz key={`typing-${selectedArtist}-${shuffle}`} items={displayItems} onComplete={handleComplete} />
          )}
        </div>
      </div>
    </div>
  )
}
