'use client'

import { useState } from 'react'
import ModeSelector from '@/components/ModeSelector'
import FlashCard from '@/components/FlashCard'
import QuizCard from '@/components/QuizCard'
import TypingQuiz from '@/components/TypingQuiz'
import ArtistTabs from '@/components/ArtistTabs'
import type { StudyMode, VocabItem, LyricsPhrase, ArtistId } from '@/lib/types'

interface StudySessionProps {
  title: string
  items: VocabItem[] | LyricsPhrase[]
  showArtistTabs?: boolean
  selectedArtist?: ArtistId
  onArtistChange?: (id: ArtistId) => void
  onBack: () => void
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

  const handleComplete = () => setCompleted(true)
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
            <FlashCard key={`flash-${selectedArtist}`} items={items} onComplete={handleComplete} />
          ) : mode === 'quiz' ? (
            <QuizCard key={`quiz-${selectedArtist}`} items={items} onComplete={handleComplete} />
          ) : (
            <TypingQuiz key={`typing-${selectedArtist}`} items={items} onComplete={handleComplete} />
          )}
        </div>
      </div>
    </div>
  )
}
