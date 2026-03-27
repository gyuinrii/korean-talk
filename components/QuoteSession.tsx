'use client'

import { useState } from 'react'
import type { Quote, StudyMode } from '@/lib/types'
import ModeSelector from '@/components/ModeSelector'

interface QuoteSessionProps {
  quotes: Quote[]
  onBack: () => void
}

// ── フラッシュカード ──────────────────────────────────────
function QuoteFlashCard({ quotes, onComplete }: { quotes: Quote[]; onComplete: () => void }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [showEpisode, setShowEpisode] = useState(false)

  const q = quotes[index]
  const total = quotes.length

  const handleNext = () => {
    if (index + 1 >= total) { onComplete(); return }
    setIndex(i => i + 1)
    setFlipped(false)
    setShowEpisode(false)
  }
  const handlePrev = () => {
    if (index > 0) { setIndex(i => i - 1); setFlipped(false); setShowEpisode(false) }
  }

  return (
    <div className="animate-fade-in">
      {/* 進捗 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '13px', marginBottom: '12px' }}>
        <span>{index + 1} / {total}</span>
        <span style={{ fontSize: '12px' }}>{q.member} — {q.group}</span>
      </div>
      <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', marginBottom: '24px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${((index + 1) / total) * 100}%`, background: 'var(--accent)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
      </div>

      {/* カード */}
      <div className="flip-card" onClick={() => setFlipped(f => !f)} style={{ cursor: 'pointer', minHeight: '200px', marginBottom: '16px' }}>
        <div className={`flip-card-inner${flipped ? ' flipped' : ''}`} style={{ minHeight: '200px' }}>
          {/* 表: 日本語 */}
          <div className="flip-card-front" style={{
            position: 'absolute', inset: 0,
            background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 24px', gap: '12px',
          }}>
            <div style={{ color: 'var(--muted)', fontSize: '11px', letterSpacing: '2px' }}>日本語</div>
            <div style={{ fontSize: 'clamp(1rem,3.5vw,1.3rem)', fontWeight: 700, color: 'var(--text)', textAlign: 'center', lineHeight: 1.7 }}>
              「{q.japanese}」
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '4px' }}>タップして韓国語を確認</div>
          </div>
          {/* 裏: 韓国語 */}
          <div className="flip-card-back" style={{
            position: 'absolute', inset: 0,
            background: 'var(--card)', border: '1px solid rgba(192,132,252,0.3)', borderRadius: '20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 24px', gap: '12px',
          }}>
            <div style={{ color: 'var(--accent)', fontSize: '11px', letterSpacing: '2px' }}>한국어</div>
            <div style={{ fontSize: 'clamp(1rem,3.5vw,1.25rem)', fontWeight: 700, color: 'var(--text)', textAlign: 'center', lineHeight: 1.8 }}>
              「{q.korean}」
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-space)', textAlign: 'center', lineHeight: 1.6 }}>
              {q.romanji}
            </div>
          </div>
        </div>
      </div>

      {/* イベント */}
      <div style={{
        background: 'rgba(192,132,252,0.06)', border: '1px solid rgba(192,132,252,0.15)',
        borderRadius: '10px', padding: '10px 16px', marginBottom: '12px',
        color: 'var(--muted)', fontSize: '12px', textAlign: 'center',
      }}>
        📅 {q.event}
      </div>

      {/* エピソード */}
      {flipped && (
        <button onClick={() => setShowEpisode(s => !s)} style={{
          width: '100%', padding: '8px', background: 'transparent',
          border: '1px dashed var(--border)', borderRadius: '10px',
          color: 'var(--muted)', fontSize: '12px', cursor: 'pointer', marginBottom: '12px',
        }}>
          {showEpisode ? '▲ エピソードを閉じる' : '▼ エピソードを読む'}
        </button>
      )}
      {showEpisode && (
        <div className="animate-fade-in" style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
          padding: '16px', marginBottom: '12px', color: 'var(--text)', fontSize: '13px', lineHeight: 1.8,
        }}>
          {q.episode}
        </div>
      )}

      {/* ボタン */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={handlePrev} disabled={index === 0} style={{
          flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--border)',
          background: 'transparent', color: index === 0 ? 'var(--muted)' : 'var(--text)',
          cursor: index === 0 ? 'not-allowed' : 'pointer', fontSize: '14px', opacity: index === 0 ? 0.4 : 1,
        }}>← 前へ</button>
        <button onClick={handleNext} style={{
          flex: 2, padding: '12px', borderRadius: '12px', border: 'none',
          background: 'var(--accent)', color: '#08080f', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
        }}>
          {index + 1 >= total ? '完了 ✓' : '次へ →'}
        </button>
      </div>
    </div>
  )
}

// ── 4択クイズ ────────────────────────────────────────────
function QuoteQuiz({ quotes, onComplete }: { quotes: Quote[]; onComplete: () => void }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [showEpisode, setShowEpisode] = useState(false)

  const q = quotes[index]
  const [choices] = useState(() => {
    const dummies = [...quotes].sort(() => Math.random() - 0.5).filter(x => x.korean !== q.korean).slice(0, 3)
    return [...dummies, q].sort(() => Math.random() - 0.5)
  })

  const handleSelect = (korean: string) => {
    if (selected) return
    setSelected(korean)
    if (korean === q.korean) setScore(s => s + 1)
  }

  const handleNext = () => {
    setShowEpisode(false)
    if (index + 1 >= quotes.length) { setDone(true); return }
    setIndex(i => i + 1)
    setSelected(null)
  }

  if (done) {
    const pct = Math.round((score / quotes.length) * 100)
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📚'}</div>
        <div style={{ fontSize: 'clamp(1.8rem,6vw,2.4rem)', fontWeight: 900, color: 'var(--accent)', marginBottom: '8px' }}>{score} / {quotes.length}</div>
        <div style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '32px' }}>正解率 {pct}%</div>
        <button onClick={() => { setIndex(0); setScore(0); setSelected(null); setDone(false) }} style={{
          padding: '12px 32px', borderRadius: '12px', border: 'none',
          background: 'var(--accent)', color: '#08080f', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
        }}>もう一度</button>
        <button onClick={onComplete} style={{
          padding: '12px 32px', borderRadius: '12px', border: '1px solid var(--border)',
          background: 'transparent', color: 'var(--text)', fontSize: '14px', cursor: 'pointer', marginLeft: '12px',
        }}>終わる</button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '13px', marginBottom: '12px' }}>
        <span>{index + 1} / {quotes.length}</span>
        <span style={{ color: 'var(--accent)' }}>{score}問正解</span>
      </div>
      <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', marginBottom: '20px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${((index + 1) / quotes.length) * 100}%`, background: 'var(--accent)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
      </div>

      {/* 問題 */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px 24px', marginBottom: '16px' }}>
        <div style={{ color: 'var(--muted)', fontSize: '11px', letterSpacing: '2px', marginBottom: '8px' }}>韓国語は？</div>
        <div style={{ fontSize: 'clamp(1rem,3.5vw,1.2rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.7 }}>
          「{q.japanese}」
        </div>
        <div style={{ color: 'var(--muted)', fontSize: '11px', marginTop: '10px' }}>— {q.member} / {q.event}</div>
      </div>

      {/* 選択肢 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        {choices.map(choice => {
          const isCorrect = choice.korean === q.korean
          const isSelected = selected === choice.korean
          const bg = selected ? (isCorrect ? 'rgba(74,222,128,0.12)' : isSelected ? 'rgba(248,113,113,0.12)' : 'var(--card)') : 'var(--card)'
          const border = selected ? (isCorrect ? '#4ade80' : isSelected ? '#f87171' : 'var(--border)') : 'var(--border)'
          const color = selected ? (isCorrect ? '#4ade80' : isSelected ? '#f87171' : 'var(--muted)') : 'var(--text)'
          return (
            <button key={choice.korean} onClick={() => handleSelect(choice.korean)} style={{
              padding: '12px 16px', borderRadius: '12px', border: `1px solid ${border}`,
              background: bg, color, fontSize: '13px', cursor: selected ? 'default' : 'pointer',
              textAlign: 'left', lineHeight: 1.6, transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px',
            }}>
              <span>「{choice.korean}」</span>
              {selected && isCorrect && <span style={{ flexShrink: 0 }}>✓</span>}
              {selected && isSelected && !isCorrect && <span style={{ flexShrink: 0 }}>✗</span>}
            </button>
          )
        })}
      </div>

      {/* エピソード（正解後） */}
      {selected && (
        <>
          <button onClick={() => setShowEpisode(s => !s)} style={{
            width: '100%', padding: '8px', background: 'transparent',
            border: '1px dashed var(--border)', borderRadius: '10px',
            color: 'var(--muted)', fontSize: '12px', cursor: 'pointer', marginBottom: '10px',
          }}>
            {showEpisode ? '▲ エピソードを閉じる' : '▼ エピソードを読む'}
          </button>
          {showEpisode && (
            <div className="animate-fade-in" style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
              padding: '14px', marginBottom: '10px', color: 'var(--text)', fontSize: '13px', lineHeight: 1.8,
            }}>
              {q.episode}
            </div>
          )}
          <button onClick={handleNext} className="animate-fade-in" style={{
            width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
            background: 'var(--accent)', color: '#08080f', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
          }}>
            {index + 1 >= quotes.length ? '結果を見る →' : '次へ →'}
          </button>
        </>
      )}
    </div>
  )
}

// ── タイピング ────────────────────────────────────────────
function QuoteTyping({ quotes, onComplete }: { quotes: Quote[]; onComplete: () => void }) {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [showEpisode, setShowEpisode] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [shake, setShake] = useState(false)

  const q = quotes[index]

  const handleCheck = () => {
    if (!input.trim()) return
    const correct = input.trim() === q.korean.trim()
    if (correct) { setResult('correct'); setScore(s => s + 1) }
    else { setResult('wrong'); setShake(true); setTimeout(() => setShake(false), 400) }
  }

  const handleNext = () => {
    setShowEpisode(false)
    if (index + 1 >= quotes.length) { setDone(true); return }
    setIndex(i => i + 1)
    setInput('')
    setResult(null)
    setShowHint(false)
  }

  if (done) {
    const pct = Math.round((score / quotes.length) * 100)
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📚'}</div>
        <div style={{ fontSize: 'clamp(1.8rem,6vw,2.4rem)', fontWeight: 900, color: 'var(--accent)', marginBottom: '8px' }}>{score} / {quotes.length}</div>
        <div style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '32px' }}>正解率 {pct}%</div>
        <button onClick={() => { setIndex(0); setInput(''); setResult(null); setScore(0); setDone(false) }} style={{
          padding: '12px 32px', borderRadius: '12px', border: 'none',
          background: 'var(--accent)', color: '#08080f', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
        }}>もう一度</button>
        <button onClick={onComplete} style={{
          padding: '12px 32px', borderRadius: '12px', border: '1px solid var(--border)',
          background: 'transparent', color: 'var(--text)', fontSize: '14px', cursor: 'pointer', marginLeft: '12px',
        }}>終わる</button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '13px', marginBottom: '12px' }}>
        <span>{index + 1} / {quotes.length}</span>
        <span style={{ color: 'var(--accent)' }}>{score}問正解</span>
      </div>
      <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', marginBottom: '20px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${((index + 1) / quotes.length) * 100}%`, background: 'var(--accent)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px 24px', marginBottom: '16px' }}>
        <div style={{ color: 'var(--muted)', fontSize: '11px', letterSpacing: '2px', marginBottom: '8px' }}>韓国語で入力</div>
        <div style={{ fontSize: 'clamp(1rem,3.5vw,1.2rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.7 }}>
          「{q.japanese}」
        </div>
        <div style={{ color: 'var(--muted)', fontSize: '11px', marginTop: '10px' }}>— {q.member} / {q.event}</div>
      </div>

      {showHint && (
        <div className="animate-fade-in" style={{
          background: 'rgba(192,132,252,0.08)', border: '1px solid rgba(192,132,252,0.25)',
          borderRadius: '10px', padding: '10px 16px', marginBottom: '12px',
          color: 'var(--accent)', fontSize: '13px', fontFamily: 'var(--font-space)', textAlign: 'center',
        }}>
          {q.romanji}
        </div>
      )}

      <div className={shake ? 'animate-shake' : ''} style={{ marginBottom: '10px' }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={result !== null}
          placeholder="여기에 입력하세요..."
          rows={3}
          style={{
            width: '100%', padding: '14px 18px', borderRadius: '12px',
            border: `1px solid ${result === 'correct' ? '#4ade80' : result === 'wrong' ? '#f87171' : 'var(--border)'}`,
            background: result === 'correct' ? 'rgba(74,222,128,0.08)' : result === 'wrong' ? 'rgba(248,113,113,0.08)' : 'var(--card)',
            color: 'var(--text)', fontSize: '15px', outline: 'none',
            fontFamily: 'inherit', resize: 'none', lineHeight: 1.7, transition: 'border-color 0.2s',
          }}
        />
      </div>

      {result === 'correct' && <div className="animate-fade-in" style={{ color: '#4ade80', fontSize: '14px', textAlign: 'center', marginBottom: '10px' }}>✓ 正解！</div>}
      {result === 'wrong' && (
        <div className="animate-fade-in" style={{ marginBottom: '10px' }}>
          <div style={{ color: '#f87171', fontSize: '14px', textAlign: 'center', marginBottom: '6px' }}>✗ 不正解</div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', color: 'var(--text)', fontSize: '13px', lineHeight: 1.7 }}>
            正解: 「{q.korean}」
          </div>
        </div>
      )}

      {result && (
        <>
          <button onClick={() => setShowEpisode(s => !s)} style={{
            width: '100%', padding: '8px', background: 'transparent',
            border: '1px dashed var(--border)', borderRadius: '10px',
            color: 'var(--muted)', fontSize: '12px', cursor: 'pointer', marginBottom: '10px',
          }}>
            {showEpisode ? '▲ エピソードを閉じる' : '▼ エピソードを読む'}
          </button>
          {showEpisode && (
            <div className="animate-fade-in" style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
              padding: '14px', marginBottom: '10px', color: 'var(--text)', fontSize: '13px', lineHeight: 1.8,
            }}>
              {q.episode}
            </div>
          )}
        </>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        {!result && (
          <button onClick={() => setShowHint(h => !h)} style={{
            padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--muted)', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>ヒント</button>
        )}
        {!result ? (
          <button onClick={handleCheck} style={{
            flex: 1, padding: '12px', borderRadius: '12px', border: 'none',
            background: 'var(--accent)', color: '#08080f', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
          }}>答えを確認</button>
        ) : (
          <button onClick={handleNext} className="animate-fade-in" style={{
            flex: 1, padding: '12px', borderRadius: '12px', border: 'none',
            background: 'var(--accent)', color: '#08080f', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
          }}>
            {index + 1 >= quotes.length ? '結果を見る →' : '次へ →'}
          </button>
        )}
      </div>
    </div>
  )
}

// ── メインコンポーネント ──────────────────────────────────
export default function QuoteSession({ quotes, onBack }: QuoteSessionProps) {
  const [mode, setMode] = useState<StudyMode>('flashcard')
  const [completed, setCompleted] = useState(false)

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '24px 16px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <button onClick={onBack} style={{
            padding: '8px 16px', borderRadius: '10px', border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--muted)', fontSize: '13px', cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)' }}
          >← 戻る</button>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', letterSpacing: '2px', color: 'var(--text)' }}>
            💬 名言クイズ
          </h2>
          <span style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: '12px' }}>{quotes.length}フレーズ</span>
        </div>

        <ModeSelector selected={mode} onChange={(m) => { setMode(m); setCompleted(false) }} />

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px' }}>
          {completed ? (
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
              <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>お疲れ様でした！</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px' }}>全{quotes.length}フレーズを学習しました</div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={() => setCompleted(false)} style={{
                  padding: '12px 28px', borderRadius: '12px', border: 'none',
                  background: 'var(--accent)', color: '#08080f', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                }}>もう一度</button>
                <button onClick={onBack} style={{
                  padding: '12px 28px', borderRadius: '12px', border: '1px solid var(--border)',
                  background: 'transparent', color: 'var(--text)', fontSize: '14px', cursor: 'pointer',
                }}>カテゴリに戻る</button>
              </div>
            </div>
          ) : mode === 'flashcard' ? (
            <QuoteFlashCard quotes={quotes} onComplete={() => setCompleted(true)} />
          ) : mode === 'quiz' ? (
            <QuoteQuiz quotes={quotes} onComplete={() => setCompleted(true)} />
          ) : (
            <QuoteTyping quotes={quotes} onComplete={() => setCompleted(true)} />
          )}
        </div>
      </div>
    </div>
  )
}
