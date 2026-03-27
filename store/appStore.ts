'use client'

import { create } from 'zustand'
import type { GroupId, ModeId, Scenario, Message, VocabItem } from '@/lib/types'

interface AppStore {
  group: GroupId | null
  mode: ModeId
  scenario: Scenario | null
  messages: Message[]
  score: number
  turns: number
  streak: number
  learnedVocab: Set<string>
  isLoading: boolean
  vocab: VocabItem[]

  setGroup: (group: GroupId) => void
  setMode: (mode: ModeId) => void
  setScenario: (scenario: Scenario) => void
  addMessage: (message: Message) => void
  addGoodScore: () => void
  addTipScore: () => void
  addVocab: (items: VocabItem[]) => void
  learnWord: (korean: string) => void
  setLoading: (loading: boolean) => void
  resetChat: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  group: null,
  mode: 'convo',
  scenario: null,
  messages: [],
  score: 0,
  turns: 0,
  streak: 0,
  learnedVocab: new Set(),
  isLoading: false,
  vocab: [],

  setGroup: (group) =>
    set({
      group,
      scenario: null,
      messages: [],
      vocab: [],
    }),

  setMode: (mode) =>
    set({
      mode,
      scenario: null,
    }),

  setScenario: (scenario) =>
    set({
      scenario,
      messages: [],
      vocab: [...scenario.vocabSeed],
    }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      turns: state.turns + 1,
    })),

  addGoodScore: () =>
    set((state) => {
      const newStreak = state.streak + 1
      const bonus = newStreak > 2 ? 5 : 0
      return {
        score: state.score + 10 + bonus,
        streak: newStreak,
      }
    }),

  addTipScore: () =>
    set((state) => ({
      score: state.score + 5,
      streak: 0,
    })),

  addVocab: (items) =>
    set((state) => {
      const existing = new Set(state.vocab.map((v) => v.korean))
      const newItems = items.filter((v) => !existing.has(v.korean))
      return { vocab: [...state.vocab, ...newItems] }
    }),

  learnWord: (korean) =>
    set((state) => {
      const next = new Set(state.learnedVocab)
      next.add(korean)
      return { learnedVocab: next }
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  resetChat: () =>
    set({
      messages: [],
      vocab: [],
    }),
}))
