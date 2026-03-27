import type { Metadata } from 'next'
import { Noto_Sans_KR, Bebas_Neue, Space_Mono } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '한국어 TALK — ENH × ZB1 × SVT',
  description: '推しのグループで韓国語を話そう',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansKR.variable} ${bebasNeue.variable} ${spaceMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
