import { Metadata } from 'next'
import { Pricing } from '@/components/pricing'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Pricing - Foundify',
  description: 'Choose the perfect plan for your business planning needs. Start free or upgrade to Pro for unlimited AI-powered features.',
  openGraph: {
    title: 'Pricing - Foundify',
    description: 'Choose the perfect plan for your business planning needs. Start free or upgrade to Pro for unlimited AI-powered features.',
  },
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-dark">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold">Foundify</span>
          </div>
          <nav className="flex items-center space-x-6">
            <a href="/" className="text-textSecondary hover:text-white transition-colors">
              Home
            </a>
            <a href="/dashboard" className="text-textSecondary hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="/login" className="bg-gradient-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Sign In
            </a>
          </nav>
        </div>
      </div>
      
      <Pricing />
      <Footer />
    </main>
  )
}