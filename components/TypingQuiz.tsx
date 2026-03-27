'use client'

import { useState, useEffect, useRef } from 'react'
import type { VocabItem, LyricsPhrase } from '@/lib/types'

interface TypingQuizProps {
  items: VocabItem[] | LyricsPhrase[]
  onComplete: () => void
}

function isLyricsPhrase(item: VocabItem | LyricsPhrase): item is LyricsPhrase {
  return 'song' in item
}

export default function TypingQuiz({ items, onComplete }: TypingQuizProps) {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const item = items[index]

  useEffect(() => {
    setIndex(0)
    setInput('')
    setResult(null)
    setShowHint(false)
    setScore(0)
    setDone(false)
  }, [items])

  useEffect(() => {
    setInput('')
    setResult(null)
    setShowHint(false)
    if (inputRef.current) inputRef.current.focus()
  }, [index])

  const handleCheck = () => {
    if (!input.trim()) return
    const isCorrect =
      input.trim().toLowerCase() === item.korean.trim().toLowerCase()
    if (isCorrect) {
      setResult('correct')
      setScore(s => s + 1)
    } else {
      setResult('wrong')
      setShake(true)
      setTimeout(() => setShake(false), 400)
    }
  }

  const handleNext = () => {
    if (index + 1 >= items.length) {
      setDone(true)
    } else {
      setIndex(i => i + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (result) handleNext()
      else handleCheck()
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
            setInput('')
            setResult(null)
            setScore(0)
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
          韓国語で入力
        </div>
        <div style={{ fontSize: 'clamp(1.2rem,4vw,1.6rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.4 }}>
          {questionLabel}
        </div>
      </div>

      {/* ヒント */}
      {showHint && (
        <div className="animate-fade-in" style={{
          background: 'rgba(192,132,252,0.08)',
          border: '1px solid rgba(192,132,252,0.25)',
          borderRadius: '10px',
          padding: '10px 16px',
          marginBottom: '12px',
          color: 'var(--accent)',
          fontSize: '14px',
          fontFamily: 'var(--font-space)',
          textAlign: 'center',
        }}>
          {item.romanji}
        </div>
      )}

      {/* 入力欄 */}
      <div className={shake ? 'animate-shake' : ''} style={{ marginBottom: '12px' }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={result !== null}
          placeholder="여기에 입력하세요..."
          style={{
            width: '100%',
            padding: '14px 18px',
            borderRadius: '12px',
            border: `1px solid ${
              result === 'correct' ? '#4ade80' :
              result === 'wrong' ? '#f87171' :
              'var(--border)'
            }`,
            background: result === 'correct'
              ? 'rgba(74,222,128,0.08)'
              : result === 'wrong'
              ? 'rgba(248,113,113,0.08)'
              : 'var(--card)',
            color: 'var(--text)',
            fontSize: '18px',
            outline: 'none',
            textAlign: 'center',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s',
          }}
        />
      </div>

      {/* 結果フィードバック */}
      {result === 'correct' && (
        <div className="animate-fade-in" style={{
          color: '#4ade80',
          fontSize: '14px',
          textAlign: 'center',
          marginBottom: '12px',
        }}>
          ✓ 正解！
        </div>
      )}
      {result === 'wrong' && (
        <div className="animate-fade-in" style={{
          textAlign: 'center',
          marginBottom: '12px',
        }}>
          <span style={{ color: '#f87171', fontSize: '14px' }}>✗ 不正解</span>
          <span style={{ color: 'var(--muted)', fontSize: '13px' }}> — 正解: </span>
          <span style={{ color: 'var(--text)', fontSize: '14px', fontWeight: 700 }}>{item.korean}</span>
        </div>
      )}

      {/* ボタン */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {!result && (
          <button
            onClick={() => setShowHint(h => !h)}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--muted)',
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            ヒント
          </button>
        )}
        {!result ? (
          <button
            onClick={handleCheck}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              background: 'var(--accent)',
              color: '#08080f',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            答えを確認
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="animate-fade-in"
            style={{
              flex: 1,
              padding: '12px',
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
    </div>
  )
}
