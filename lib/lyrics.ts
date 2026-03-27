import type { LyricsPhrase } from './types'

const enhPhrases: LyricsPhrase[] = [
  {
    korean: '독이 되는 걸 알아',
    romanji: 'dogi doeneun geol ara',
    japanese: '毒になることはわかってる',
    song: 'SWEET VENOM',
    artist: 'enh',
  },
  {
    korean: '열이 나 나 나',
    romanji: 'yeori na na na',
    japanese: '熱が出る',
    song: 'FEVER',
    artist: 'enh',
  },
  {
    korean: '주어진 것들은 빼앗겨도',
    romanji: 'jueoijn geotdeureun ppaeatgyeodo',
    japanese: '与えられたものは奪われても',
    song: 'Given-Taken',
    artist: 'enh',
  },
  {
    korean: '나를 봐줘 XO',
    romanji: 'nareul bwajwo XO',
    japanese: '僕を見てXO',
    song: 'XO (Only If You Say Yes)',
    artist: 'enh',
  },
  {
    korean: '헤롱헤롱 흔들흔들',
    romanji: 'herongheron heundeulheundeul',
    japanese: 'ふらふらゆらゆら',
    song: 'Drunk-Dazed',
    artist: 'enh',
  },
  {
    korean: '우린 멈추지 않아',
    romanji: 'urin meomchuji ana',
    japanese: '僕たちは止まらない',
    song: 'Future Perfect (Pass the MIC)',
    artist: 'enh',
  },
]

const zb1Phrases: LyricsPhrase[] = [
  {
    korean: '활짝 피어나',
    romanji: 'hwaljjak pieoな',
    japanese: '満開に咲いて',
    song: 'IN BLOOM',
    artist: 'zb1',
  },
  {
    korean: '크러시 크러시 날 봐줘',
    romanji: 'keurosi keurosi nal bwajwo',
    japanese: 'クラッシュ クラッシュ 僕を見て',
    song: 'CRUSH',
    artist: 'zb1',
  },
  {
    korean: '땀이 나도 괜찮아',
    romanji: 'ttami nado gwaenchana',
    japanese: '汗が出ても大丈夫',
    song: 'SWEAT',
    artist: 'zb1',
  },
  {
    korean: '녹아드는 이 감정',
    romanji: 'nogadeuneun i gamjeong',
    japanese: '溶けていくこの感情',
    song: 'MELTING POINT',
    artist: 'zb1',
  },
  {
    korean: '이 느낌을 느껴봐',
    romanji: 'i neukkimeul neukyeobwa',
    japanese: 'この感覚を感じてみて',
    song: 'Feel the POP',
    artist: 'zb1',
  },
  {
    korean: '나는 일곱 번째 감각',
    romanji: 'naneun ilgop beonjjae gamgak',
    japanese: '僕は7番目の感覚',
    song: 'Exhibition : 7 SENSE',
    artist: 'zb1',
  },
]

const twsPhrases: LyricsPhrase[] = [
  {
    korean: '내 심장이 뛰어',
    romanji: 'nae simjangi ttwieо',
    japanese: '僕の心臓が鳴ってる',
    song: 'Plot Twist',
    artist: 'tws',
  },
  {
    korean: '솔직히 말하면',
    romanji: 'soljikhi malhamyeon',
    japanese: '正直に言えば',
    song: 'If I\'m Being Honest',
    artist: 'tws',
  },
  {
    korean: '여기 봐줘 hey hey',
    romanji: 'yeogi bwajwo hey hey',
    japanese: 'こっちを見てhey hey',
    song: 'hey! hey!',
    artist: 'tws',
  },
  {
    korean: '나는 shy boy 수줍어',
    romanji: 'naneun shy boy sujubeo',
    japanese: '僕はshy boy 恥ずかしい',
    song: 'SHY BOY',
    artist: 'tws',
  },
  {
    korean: '누군가 나를 찾아줘',
    romanji: 'nugunga nareul chajajwo',
    japanese: '誰か僕を見つけて',
    song: 'Somebody',
    artist: 'tws',
  },
  {
    korean: '처음 만났을 때',
    romanji: 'cheoeum mannatseul ttae',
    japanese: '初めて会った時',
    song: '첫 만남 (First Meeting)',
    artist: 'tws',
  },
]

const bndPhrases: LyricsPhrase[] = [
  {
    korean: '하나뿐인 너',
    romanji: 'hana ppunin neo',
    japanese: 'たった一人の君',
    song: 'One and Only',
    artist: 'bnd',
  },
  {
    korean: '세레나데 불러줄게',
    romanji: 'serenade bulleojulge',
    japanese: 'セレナーデを歌ってあげる',
    song: 'Serenade',
    artist: 'bnd',
  },
  {
    korean: '눈물이 나',
    romanji: 'nunmuri na',
    japanese: '涙が出る',
    song: 'Crying',
    artist: 'bnd',
  },
  {
    korean: '그래도 좋아해',
    romanji: 'geuraedo joahae',
    japanese: 'それでも好きだよ',
    song: 'But I Like You',
    artist: 'bnd',
  },
  {
    korean: '아무 의미 없는',
    romanji: 'amu uimi eomneun',
    japanese: '何の意味もない',
    song: '의미없는 이야기 (Meaningless Story)',
    artist: 'bnd',
  },
  {
    korean: '별빛 아래서',
    romanji: 'byeolbit araeseo',
    japanese: '星の光の下で',
    song: '별의 별 (Star of Stars)',
    artist: 'bnd',
  },
]

export const lyricsByArtist: Record<string, LyricsPhrase[]> = {
  enh: enhPhrases,
  zb1: zb1Phrases,
  tws: twsPhrases,
  bnd: bndPhrases,
}
