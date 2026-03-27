'use client'

import ChatTopBar from './ChatTopBar'
import ChatMessages from './ChatMessages'
import QuickReplies from './QuickReplies'
import ChatInput from './ChatInput'

interface Props {
  onSend: (text: string) => void
  inputRef: React.RefObject<HTMLInputElement>
}

export default function ChatContainer({ onSend, inputRef }: Props) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '18px',
      overflow: 'hidden',
      marginBottom: '14px',
    }}>
      <ChatTopBar />
      <ChatMessages />
      <QuickReplies onSend={onSend} />
      <ChatInput onSend={onSend} inputRef={inputRef} />
    </div>
  )
}
