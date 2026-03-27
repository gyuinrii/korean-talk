'use client'

import { useState, useEffect, useCallback } from 'react'
import type { VocabItem, LyricsPhrase } from '@/lib/types'

interface QuizCardProps {
  items: VocabItem[] | LyricsPhrase[]
  onComplete: () => void
}

function isLyricsPhrase(item: VocabItem | LyricsPhrase): item is LyricsPhrase {
  return 'song' in item
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildChoices(items: (VocabItem | LyricsPhrase)[], correct: VocabItem | LyricsPhrase): string[] {
  const others = items.filter(it => it.korean !== correct.korean)
  const dummies = shuffle(others).slice(0, 3).map(it => it.korean)
  return shuffle([correct.korean, ...dummies])
}

export default function QuizCard({ items, onComplete }: QuizCardProps) {
  const [index, setIndex] = useState(0)
  const [choices, setChoices] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const item = items[index]

  const buildNextChoices = useCallback(() => {
    setChoices(buildChoices(items, items[index]))
    setSelected(null)
  }, [items, index])

  useEffect(() => {
    buildNextChoices()
  }, [buildNextChoices])

  // items変更時にindexリセット
  useEffect(() => {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }, [items])

  const handleSelect = (choice: string) => {
    if (selected) return
    setSelected(choice)
    if (choice === item.korean) {
      setScore(s => s + 1)
    }
  }

  const handleNext = () => {
    if (index + 1 >= items.length) {
      setDone(true)
    } else {
      setIndex(i => i + 1)
    }
  }

  if (done) {
    const pct = Math.round((score / items.length) * 100)
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          {pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📚'}
        </div>
        <div style={{
          fontSize: 'clamp(1.8rem,6vw,2.4rem)',
          fontWeight: 900,
          color: 'var(--accent)',
          marginBottom: '8px',
        }}>
          {score} / {items.length}
        </div>
        <div style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '32px' }}>
          正解率 {pct}%
        </div>
        <button
          onClick={() => {
            setIndex(0)
            setScore(0)
            setSelected(null)
            setDone(false)
          }}
          style={{
            padding: '12px 32px',
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
          onClick={onComplete}
          style={{
            padding: '12px 32px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text)',
            fontSize: '14px',
            cursor: 'pointer',
            marginLeft: '12px',
          }}
        >
          終わる
        </button>
      </div>
    )
  }

  const questionLabel = isLyricsPhrase(item)
    ? `${item.japanese}（${item.song}）`
    : item.japanese

  return (
    <div className="animate-fade-in">
      {/* スコア・進捗 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        color: 'var(--muted)',
        fontSize: '13px',
      }}>
        <span>{index + 1} / {items.length}</span>
        <span style={{ color: 'var(--accent)' }}>{score}問正解</span>
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
          width: `${((index + 1) / items.length) * 100}%`,
          background: 'var(--accent)',
          borderRadius: '2px',
          transition: 'width 0.3s ease',
        }} />
      </div>

      {/* 問題 */}
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        <div style={{ color: 'var(--muted)', fontSize: '11px', letterSpacing: '2px', marginBottom: '12px' }}>
          韓国語は？
        </div>
        <div style={{ fontSize: 'clamp(1.2rem,4vw,1.6rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.4 }}>
          {questionLabel}
        </div>
      </div>

      {/* 選択肢 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        {choices.map(choice => {
          const isCorrect = choice === item.korean
          const isSelected = selected === choice
          let bg = 'var(--card)'
          let borderColor = 'var(--border)'
          let color = 'var(--text)'

          if (selected) {
            if (isCorrect) {
              bg = 'rgba(74,222,128,0.12)'
              borderColor = '#4ade80'
              color = '#4ade80'
            } else if (isSelected) {
              bg = 'rgba(248,113,113,0.12)'
              borderColor = '#f87171'
              color = '#f87171'
            }
          }

          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              style={{
                padding: '14px 20px',
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                background: bg,
                color,
                fontSize: '16px',
                fontWeight: selected && isCorrect ? 700 : 400,
                cursor: selected ? 'default' : 'pointer',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{choice}</span>
              {selected && isCorrect && <span>✓</span>}
              {selected && isSelected && !isCorrect && <span>✗</span>}
            </button>
          )
        })}
      </div>

      {/* 次へボタン */}
      {selected && (
        <button
          onClick={handleNext}
          className="animate-fade-in"
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: 'var(--accent)',
            color: '#08080f',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          {index + 1 >= items.length ? '結果を見る →' : '次へ →'}
        </button>
      )}
    </div>
  )
}
