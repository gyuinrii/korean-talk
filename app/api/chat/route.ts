import { NextRequest, NextResponse } from 'next/server'
import { anthropic } from '@/lib/anthropic'

export async function POST(req: NextRequest) {
  try {
    const { systemPrompt, messages, userMessage } = await req.json()

    // 会話履歴を最大20件でスライス
    const history = messages.slice(-20)

    const apiMessages = [
      ...history.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: userMessage },
    ]

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: apiMessages,
    })

    const rawText = response.content[0].type === 'text' ? response.content[0].text : ''

    // markdown fence を除去してからパース
    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()

    const parsed = JSON.parse(cleaned)

    return NextResponse.json(parsed)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    )
  }
}
