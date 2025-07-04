'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useAuth } from '@/lib/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { 
  Brain, 
  FileText, 
  Plus, 
  Crown, 
  Sparkles,
  Calendar,
  Download,
  ExternalLink,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface BusinessPlan {
  id: string
  title: string
  content: any
  created_at: string
  updated_at: string
}

export default function DashboardPage() {
  const { user, profile, loading: authLoading, signOut, isAuthenticated, isPro } = useAuth()
  const router = useRouter()
  const [plans, setPlans] = useState<BusinessPlan[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [businessIdea, setBusinessIdea] = useState('')
  const [showIdeaForm, setShowIdeaForm] = useState(false)
  const [plansLoading, setPlansLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
      return
    }

    if (user) {
      fetchPlans()
    }
  }, [user, authLoading, isAuthenticated, router])

  const fetchPlans = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPlans(data || [])
    } catch (error) {
      console.error('Error fetching plans:', error)
      toast.error('Failed to load your business plans')
    } finally {
      setPlansLoading(false)
    }
  }

  const handleGeneratePlan = async () => {
    if (!businessIdea.trim() || !user) {
      toast.error('Please describe your business idea')
      return
    }

    // Check plan limits for free users
    if (!isPro && plans.length >= 1) {
      toast.error('Free users can create 1 plan per month. Upgrade to Pro for unlimited plans!')
      router.push('/pricing')
      return
    }

    setIsGenerating(true)
    
    try {
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

      const data = await response.json()

      if (response.ok) {
        toast.success('Business plan generated successfully!')
        setBusinessIdea('')
        setShowIdeaForm(false)
        fetchPlans() // Refresh the plans list
      } else {
        toast.error(data.error || 'Failed to generate plan')
      }
    } catch (error) {
      console.error('Error generating plan:', error)
      toast.error('An unexpected error occurred')
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

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-purple" />
          <p className="text-textSecondary">Loading...</p>
        </div>
      </div>
    )
  }

  // This should not render if useEffect redirects unauthenticated users
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{profile?.full_name || 'Founder'}</span>!
          </h1>
          <p className="text-textSecondary">
            Ready to build something amazing? Let&apos;s turn your ideas into reality.
          </p>
        </motion.div>

        {/* Upgrade Banner - Show only if not Pro */}
        {!isPro && (
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
                      Tell us about your business idea and we&apos;ll generate a complete plan
                    </p>
                    {!isPro && plans.length >= 1 ? (
                      <div className="space-y-4">
                        <p className="text-yellow-400 text-sm">
                          You&apos;ve used your free plan. Upgrade to Pro for unlimited plans!
                        </p>
                        <Link href="/pricing">
                          <Button size="lg" className="gap-2">
                            <Crown className="w-5 h-5" />
                            Upgrade to Pro
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <Button 
                        size="lg" 
                        onClick={() => setShowIdeaForm(true)}
                        className="gap-2"
                      >
                        <Plus className="w-5 h-5" />
                        Create New Plan
                      </Button>
                    )}
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
                    {plans.length} plan{plans.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                {plansLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-purple" />
                    <p className="text-textSecondary">Loading your plans...</p>
                  </div>
                ) : plans.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-textSecondary mx-auto mb-4" />
                    <p className="text-textSecondary">
                      No business plans yet. Create your first one to get started!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {plans.map((plan, index) => (
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
                              <p className="text-sm text-textSecondary overflow-hidden" style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                              }}>
                                {plan.content?.executive_summary || 'Business plan generated by AI'}
                              </p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              {isPro && (
                                <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Download className="w-4 h-4" />
                                </Button>
                              )}
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