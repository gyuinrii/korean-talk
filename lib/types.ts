export type ArtistId = 'enh' | 'zb1' | 'tws' | 'bnd'
export type CategoryId = 'fandom' | 'oshikatsu' | 'lyrics'
export type StudyMode = 'flashcard' | 'quiz' | 'typing'

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
