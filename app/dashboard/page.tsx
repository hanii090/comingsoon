'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  Brain, 
  FileText, 
  Plus, 
  Crown, 
  Sparkles,
  Calendar,
  Download,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

// Mock user data - in real app this would come from Supabase
const mockUser = {
  id: '1',
  email: 'user@example.com',
  isPro: false,
  plans: [
    {
      id: '1',
      title: 'AI-Powered SaaS Platform',
      created_at: '2024-01-15T10:00:00Z',
      sections: {
        executive_summary: 'A revolutionary AI platform...',
        market_analysis: 'The market for AI tools...',
        business_model: 'Subscription-based SaaS...'
      }
    },
    {
      id: '2',
      title: 'E-commerce Marketplace',
      created_at: '2024-01-10T14:30:00Z',
      sections: {
        executive_summary: 'Connecting buyers and sellers...',
        market_analysis: 'The e-commerce market...',
        business_model: 'Commission-based model...'
      }
    }
  ]
}

export default function DashboardPage() {
  const [user, setUser] = useState<typeof mockUser | null>(mockUser)
  const [isGenerating, setIsGenerating] = useState(false)
  const [businessIdea, setBusinessIdea] = useState('')
  const [showIdeaForm, setShowIdeaForm] = useState(false)

  const handleGeneratePlan = async () => {
    if (!businessIdea.trim()) {
      return
    }

    setIsGenerating(true)
    
    try {
      // Call the AI generation API
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessIdea: businessIdea.trim(),
          userId: user.id,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Refresh the plans list
        // In real app, this would refetch from Supabase
        console.log('Generated plan:', data)
        setBusinessIdea('')
        setShowIdeaForm(false)
      } else {
        console.error('Failed to generate plan')
      }
    } catch (error) {
      console.error('Error generating plan:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Redirect to login if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-textSecondary mb-6">You need to be signed in to access the dashboard.</p>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onSignOut={() => setUser(null)} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">Founder</span>!
          </h1>
          <p className="text-textSecondary">
            Ready to build something amazing? Let's turn your ideas into reality.
          </p>
        </motion.div>

        {/* Upgrade Banner - Show only if not Pro */}
        {!user.isPro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Card variant="glow" className="bg-gradient-primary/10 border-primary-purple/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Crown className="w-8 h-8 text-primary-purple" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Upgrade to Pro</h3>
                      <p className="text-textSecondary">
                        Unlock unlimited plans, advanced AI, and premium features
                      </p>
                    </div>
                  </div>
                  <Link href="/pricing">
                    <Button variant="primary" className="shrink-0">
                      Upgrade Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Business Plan Generator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card variant="glass" className="h-fit">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">AI Business Plan Generator</CardTitle>
                    <CardDescription>
                      Describe your idea and let AI create a comprehensive business plan
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {!showIdeaForm ? (
                  <div className="text-center py-8">
                    <Sparkles className="w-16 h-16 text-primary-purple mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Get Started?</h3>
                    <p className="text-textSecondary mb-6">
                      Tell us about your business idea and we'll generate a complete plan
                    </p>
                    <Button 
                      size="lg" 
                      onClick={() => setShowIdeaForm(true)}
                      className="gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Create New Plan
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Describe your business idea
                      </label>
                      <textarea
                        value={businessIdea}
                        onChange={(e) => setBusinessIdea(e.target.value)}
                        placeholder="E.g., A mobile app that connects dog owners with local pet sitters, offering real-time tracking and secure payments..."
                        className="w-full h-32 p-4 bg-card border border-primary-purple/20 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-purple/50 text-text placeholder-textSecondary"
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={handleGeneratePlan}
                        disabled={!businessIdea.trim() || isGenerating}
                        isLoading={isGenerating}
                        className="flex-1"
                      >
                        {isGenerating ? 'Generating...' : 'Generate Business Plan'}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setShowIdeaForm(false)
                          setBusinessIdea('')
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* My Plans */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card variant="glass" className="h-fit">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary-purple" />
                    <CardTitle className="text-xl">My Business Plans</CardTitle>
                  </div>
                  <span className="text-sm text-textSecondary">
                    {user.plans.length} plan{user.plans.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                {user.plans.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-textSecondary mx-auto mb-4" />
                    <p className="text-textSecondary">
                      No business plans yet. Create your first one to get started!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.plans.map((plan, index) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card variant="default" className="p-4 hover:border-primary-purple/40 transition-colors group cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1 group-hover:text-primary-purple transition-colors">
                                {plan.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-textSecondary mb-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(plan.created_at)}
                              </div>
                              <p className="text-sm text-textSecondary line-clamp-2">
                                {plan.sections.executive_summary}
                              </p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Link href={`/plan/${plan.id}`}>
                                <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Brand Identity',
                description: 'Create compelling brand names and values',
                icon: Sparkles,
                href: '/brand',
                comingSoon: true
              },
              {
                title: 'Pitch Deck',
                description: 'Generate investor-ready presentations',
                icon: FileText,
                href: '/pitch-deck',
                comingSoon: true
              },
              {
                title: 'Market Research',
                description: 'Deep dive into your target market',
                icon: Brain,
                href: '/research',
                comingSoon: true
              }
            ].map((action, index) => (
              <Card key={index} variant="glass" className="p-6 hover:glow-purple transition-all duration-300 group cursor-pointer">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-textSecondary text-sm mb-4">{action.description}</p>
                  {action.comingSoon ? (
                    <span className="text-xs text-primary-purple font-medium">Coming Soon</span>
                  ) : (
                    <Button variant="ghost" size="sm">Learn More</Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}