'use client'

import Header from '@/components/Header'
import ScoreBar from '@/components/ScoreBar'
import GroupTabs from '@/components/GroupTabs'
import ModeBar from '@/components/ModeBar'
import ScenarioGrid from '@/components/ScenarioGrid'
import ChatContainer from '@/components/chat/ChatContainer'
import VocabPanel from '@/components/vocab/VocabPanel'
import { useChat } from '@/hooks/useChat'

export default function Home() {
  const { sendMessage, inputRef } = useChat()

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '0 16px 120px' }}>
        <Header />
        <ScoreBar />
        <GroupTabs />
        <ModeBar />
        <ScenarioGrid />
        <VocabPanel inputRef={inputRef} />
        <ChatContainer onSend={sendMessage} inputRef={inputRef} />
      </div>
    </div>
  )
}
