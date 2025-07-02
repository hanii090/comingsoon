import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Foundify – AI Startup Business Plan Generator',
  description: 'Generate a full business plan, brand kit, pitch deck and more with AI. Launch your startup idea with confidence.',
  keywords: 'AI, business plan, startup, entrepreneur, pitch deck, market research',
  authors: [{ name: 'Foundify' }],
  openGraph: {
    title: 'Foundify – AI Startup Business Plan Generator',
    description: 'Generate a full business plan, brand kit, pitch deck and more with AI. Launch your startup idea with confidence.',
    type: 'website',
    url: 'https://foundify.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foundify – AI Startup Business Plan Generator',
    description: 'Generate a full business plan, brand kit, pitch deck and more with AI. Launch your startup idea with confidence.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-text antialiased`}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'bg-card border border-primary-purple/20 text-text',
            duration: 4000,
          }}
        />
      </body>
    </html>
  )
}