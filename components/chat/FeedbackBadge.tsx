'use client'

import type { FeedbackType } from '@/lib/types'

interface Props {
  feedback: string
  feedbackType: FeedbackType
}

export default function FeedbackBadge({ feedback, feedbackType }: Props) {
  const isGood = feedbackType === 'good'
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '10px',
      padding: '3px 9px',
      borderRadius: '20px',
      marginTop: '5px',
      fontFamily: 'var(--font-space)',
      border: `1px solid ${isGood ? 'rgba(134,239,172,0.25)' : 'rgba(252,211,77,0.25)'}`,
      color: isGood ? '#86efac' : '#fcd34d',
      background: isGood ? 'rgba(134,239,172,0.07)' : 'rgba(252,211,77,0.07)',
    }}>
      {isGood ? '✓' : '💡'} {feedback}
    </span>
  )
}
