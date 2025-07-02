import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Foundify – AI Startup Business Plan Generator',
  description: 'Generate a full business plan, brand kit, pitch deck and more with AI. Launch your startup idea with confidence.',
  keywords: ['startup', 'business plan', 'AI', 'pitch deck', 'entrepreneurship'],
  authors: [{ name: 'Foundify' }],
  openGraph: {
    title: 'Foundify – AI Startup Business Plan Generator',
    description: 'Generate a full business plan, brand kit, pitch deck and more with AI. Launch your startup idea with confidence.',
    url: 'https://foundify.com',
    siteName: 'Foundify',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Foundify - AI Business Plan Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foundify – AI Startup Business Plan Generator',
    description: 'Generate a full business plan, brand kit, pitch deck and more with AI. Launch your startup idea with confidence.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}