import { NextRequest, NextResponse } from 'next/server'
import { geminiModel } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const { systemPrompt, messages, userMessage } = await req.json()

    // 会話履歴を最大20件でスライス
    const history = messages.slice(-20)

    // Gemini用の会話履歴フォーマット
    const chatHistory = history.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const chat = geminiModel.startChat({
      history: [
        // システムプロンプトを最初のユーザーメッセージとして注入
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'Understood. I will follow these instructions.' }] },
        ...chatHistory,
      ],
    })

    const result = await chat.sendMessage(userMessage)
    const rawText = result.response.text()

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
