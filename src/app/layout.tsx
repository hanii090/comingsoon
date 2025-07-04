import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Foundify - AI Business Plan Generator",
    template: "%s | Foundify"
  },
  description: "Transform your startup idea into an investor-ready business plan with AI. Generate comprehensive business plans, brand kits, and pitch decks in minutes.",
  keywords: [
    "business plan generator",
    "AI business plan",
    "startup planning",
    "investor pitch",
    "business planning tool",
    "entrepreneurship",
    "startup founder",
    "business plan template"
  ],
  authors: [{ name: "Foundify" }],
  creator: "Foundify",
  publisher: "Foundify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://foundify.com"),
  alternates: {
    canonical: "https://foundify.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://foundify.com",
    siteName: "Foundify",
    title: "Foundify - AI Business Plan Generator",
    description: "Transform your startup idea into an investor-ready business plan with AI. Generate comprehensive business plans, brand kits, and pitch decks in minutes.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Foundify - AI Business Plan Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foundify - AI Business Plan Generator",
    description: "Transform your startup idea into an investor-ready business plan with AI. Generate comprehensive business plans, brand kits, and pitch decks in minutes.",
    images: ["/og.png"],
    creator: "@foundifyapp",
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
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="relative min-h-screen bg-dark text-white">
          {children}
        </div>
      </body>
    </html>
  )
}