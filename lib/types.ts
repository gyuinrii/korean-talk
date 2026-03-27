export type ArtistId = 'enh' | 'zb1' | 'tws' | 'bnd'
export type CategoryId = 'fandom' | 'oshikatsu' | 'lyrics' | 'quotes' | 'recommended' | 'favorites'
export type StudyMode = 'flashcard' | 'quiz' | 'typing'

export interface Quote {
  korean: string
  romanji: string
  japanese: string
  member: string
  group: string
  event: string
  episode: string
}

export interface VocabItem {
  korean: string
  romanji: string
  japanese: string
  category?: string
}

export interface LyricsPhrase {
  korean: string
  romanji: string
  japanese: string
  song: string
  artist: ArtistId
}
