import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://foundify.app'),
  title: {
    default: 'Foundify - AI-Powered Business Planning for Startup Founders',
    template: '%s | Foundify'
  },
  description: 'Turn your startup idea into reality with AI-powered business plans, pitch decks, and market research. Join 500+ founders who have raised $10M+ using Foundify.',
  keywords: ['ai business plan', 'startup planning', 'pitch deck generator', 'market research', 'business plan software', 'startup tools', 'entrepreneur'],
  authors: [{ name: 'Foundify' }],
  creator: 'Foundify',
  publisher: 'Foundify',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Foundify - AI-Powered Business Planning for Startup Founders',
    description: 'Turn your startup idea into reality with AI-powered business plans, pitch decks, and market research.',
    siteName: 'Foundify',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Foundify - AI-Powered Business Planning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foundify - AI-Powered Business Planning for Startup Founders',
    description: 'Turn your startup idea into reality with AI-powered business plans, pitch decks, and market research.',
    images: ['/og-image.jpg'],
    creator: '@foundify',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8b5cf6' },
    { media: '(prefers-color-scheme: dark)', color: '#8b5cf6' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--card)',
              color: 'var(--text)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#8b5cf6',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: 'white',
              },
            },
          }}
        />
      </body>
    </html>
  )
}