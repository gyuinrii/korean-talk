'use client'

import { useRef } from 'react'
import { useAppStore } from '@/store/appStore'
import { GROUPS } from '@/lib/scenarios'

interface Props {
  onSend: (text: string) => void
  inputRef?: React.RefObject<HTMLInputElement>
}

export default function ChatInput({ onSend, inputRef: externalRef }: Props) {
  const internalRef = useRef<HTMLInputElement>(null)
  const inputRef = externalRef ?? internalRef
  const { scenario, group, isLoading } = useAppStore()

  const disabled = !scenario || isLoading
  const g = group ? GROUPS[group] : null

  const handleSend = () => {
    const val = inputRef.current?.value.trim()
    if (val) {
      onSend(val)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{
      display: 'flex',
      gap: '9px',
      padding: '12px 14px',
      background: 'var(--card)',
      borderTop: '1px solid var(--border)',
    }}>
      <input
        ref={inputRef}
        type="text"
        placeholder={scenario ? '韓国語で入力しよう...' : 'グループを選んでね...'}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '11px',
          padding: '10px 13px',
          color: 'var(--text)',
          fontFamily: 'var(--font-noto)',
          fontSize: '13px',
          outline: 'none',
          transition: 'border-color 0.18s',
          opacity: disabled ? 0.6 : 1,
        }}
        onFocus={(e) => {
          if (g) e.target.style.borderColor = g.color
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border)'
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '11px',
          border: 'none',
          background: g ? g.grad : 'linear-gradient(135deg,var(--accent-enh),var(--accent-zb1))',
          color: 'white',
          fontSize: '17px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.18s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          opacity: disabled ? 0.35 : 1,
        }}
      >
        ↑
      </button>
    </div>
  )
}
