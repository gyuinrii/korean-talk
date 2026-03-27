export type GroupId = 'enh' | 'zb1' | 'svt'
export type ModeId = 'convo' | 'lyrics' | 'fandom'
export type FeedbackType = 'good' | 'tip'

export interface VocabItem {
  korean: string
  romanji: string
  japanese: string
}

export interface AIResponse {
  korean: string
  romanji: string
  japanese: string
  feedback: string
  feedbackType: FeedbackType
  vocab: VocabItem[]
}

export interface IdolConfig {
  name: string
  emoji: string
  status: string
}

export interface Scenario {
  id: string
  emoji: string
  title: string
  desc: string
  tag: string
  idol: IdolConfig
  systemPrompt: string
  quickReplies: string[]
  vocabSeed: VocabItem[]
}

export interface GroupConfig {
  color: string
  grad: string
  emoji: string
  fandom: string
  scenarios: {
    convo: Scenario[]
    lyrics: Scenario[]
    fandom: Scenario[]
  }
}

export interface Message {
  role: 'user' | 'idol'
  content: string
  aiResponse?: AIResponse
  timestamp: Date
}

export interface AppState {
  group: GroupId | null
  mode: ModeId
  scenario: Scenario | null
  messages: Message[]
  score: number
  turns: number
  streak: number
  learnedVocab: Set<string>
  isLoading: boolean
}
