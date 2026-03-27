'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import CategoryCard from '@/components/CategoryCard'
import StudySession from '@/components/StudySession'
import QuoteSession from '@/components/QuoteSession'
import FavoritesSession from '@/components/FavoritesSession'
import { fandomVocab } from '@/lib/fandom-vocab'
import { oshikatsuVocab } from '@/lib/oshikatsu-vocab'
import { lyricsByArtist } from '@/lib/lyrics'
import { quotes } from '@/lib/quotes'
import { recommended } from '@/lib/recommended'
import type { CategoryId, ArtistId } from '@/lib/types'

export default function Home() {
  const [category, setCategory] = useState<CategoryId | null>(null)
  const [artist, setArtist] = useState<ArtistId>('enh')

  if (category === 'fandom') {
    return <StudySession title="ファンダム用語" items={fandomVocab} onBack={() => setCategory(null)} />
  }
  if (category === 'oshikatsu') {
    return <StudySession title="推し活用語" items={oshikatsuVocab} onBack={() => setCategory(null)} />
  }
  if (category === 'lyrics') {
    return (
      <StudySession
        title="歌詞フレーズ"
        items={lyricsByArtist[artist]}
        showArtistTabs
        selectedArtist={artist}
        onArtistChange={setArtist}
        onBack={() => setCategory(null)}
      />
    )
  }
  if (category === 'quotes') {
    return <QuoteSession quotes={quotes} onBack={() => setCategory(null)} />
  }
  if (category === 'recommended') {
    return <StudySession title="推薦フレーズ" items={recommended} onBack={() => setCategory(null)} />
  }
  if (category === 'favorites') {
    return <FavoritesSession onBack={() => setCategory(null)} />
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '0 16px 80px' }}>
        <Header />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginTop: '8px',
        }}
          className="category-grid"
        >
          <CategoryCard
            id="fandom"
            emoji="💜"
            title="ファンダム用語"
            desc="ENGENEなどファンダム名 + 必須ファン用語"
            color="#c084fc"
            onClick={() => setCategory('fandom')}
          />
          <CategoryCard
            id="oshikatsu"
            emoji="⭐"
            title="推し活用語"
            desc="덕질・최애・포카など推し活に使う言葉"
            color="#f472b6"
            onClick={() => setCategory('oshikatsu')}
          />
          <CategoryCard
            id="lyrics"
            emoji="🎵"
            title="歌詞フレーズ"
            desc="ENH・ZB1・TWS・BNDの代表曲から学ぶ"
            color="#38bdf8"
            onClick={() => setCategory('lyrics')}
          />
          <CategoryCard
            id="quotes"
            emoji="💬"
            title="名言クイズ"
            desc="メンバーの心に残る言葉をエピソードと共に学ぶ"
            color="#4ade80"
            onClick={() => setCategory('quotes')}
          />
          <CategoryCard
            id="recommended"
            emoji="✨"
            title="推薦フレーズ"
            desc="推し活・日常で使えるおすすめ韓国語フレーズ"
            color="#fbbf24"
            onClick={() => setCategory('recommended')}
          />
          <CategoryCard
            id="favorites"
            emoji="❤️"
            title="お気に入り"
            desc="♡ボタンで保存した単語・フレーズ・名言"
            color="#fb923c"
            onClick={() => setCategory('favorites')}
          />
        </div>
      </div>
    </div>
  )
}
