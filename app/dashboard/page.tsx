'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip } from '@/components/ui/tooltip'
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
  Loader2,
  Presentation,
  Search,
  Zap,
  TrendingUp
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

  const fetchPlans = useCallback(async () => {
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
  }, [user])

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
      return
    }

    if (user) {
      fetchPlans()
    }
  }, [user, authLoading, isAuthenticated, router, fetchPlans])

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
          <p className="text-gray-400">Loading...</p>
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
          <p className="text-gray-400">
            Ready to build something amazing? Let&apos;s turn your ideas into reality.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card variant="glass" className="p-6 hover:glow-purple transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Business Plans</p>
                <p className="text-2xl font-bold text-white">{plans.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary-purple" />
            </div>
          </Card>

          <Card variant="glass" className="p-6 hover:glow-purple transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Account Type</p>
                <p className="text-2xl font-bold text-white">{isPro ? 'Pro' : 'Free'}</p>
              </div>
              {isPro ? <Crown className="w-8 h-8 text-yellow-400" /> : <Zap className="w-8 h-8 text-blue-400" />}
            </div>
          </Card>

          <Card variant="glass" className="p-6 hover:glow-purple transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Plans Remaining</p>
                <p className="text-2xl font-bold text-white">{isPro ? '∞' : Math.max(0, 1 - plans.length)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </Card>
        </motion.div>

        {/* Upgrade Banner - Show only if not Pro */}
        {!isPro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card variant="glow" className="bg-gradient-primary/10 border-primary-purple/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Crown className="w-8 h-8 text-primary-purple" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Upgrade to Pro</h3>
                      <p className="text-gray-400">
                        Unlock unlimited plans, advanced AI, and premium features
                      </p>
                    </div>
                  </div>
                  <Link href="/pricing">
                    <Button className="shrink-0">
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
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card variant="glass" className="h-fit hover:glow-purple transition-all duration-300">
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
                    <p className="text-gray-400 mb-6">
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
                        className="w-full h-32 p-4 bg-card border border-primary-purple/20 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-purple/50 text-white placeholder-gray-400"
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
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card variant="glass" className="h-fit hover:glow-purple transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary-purple" />
                    <CardTitle className="text-xl">My Business Plans</CardTitle>
                  </div>
                  <span className="text-sm text-gray-400">
                    {plans.length} plan{plans.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                {plansLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-purple" />
                    <p className="text-gray-400">Loading your plans...</p>
                  </div>
                ) : plans.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">
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
                        <Card variant="default" className="p-4 hover:border-primary-purple/40 transition-colors group cursor-pointer hover:glow-purple">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1 group-hover:text-primary-purple transition-colors">
                                {plan.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(plan.created_at)}
                              </div>
                              <p className="text-sm text-gray-400 overflow-hidden" style={{
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

        {/* Tools & Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Startup Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Brand Identity',
                description: 'Create compelling brand names and values',
                icon: Sparkles,
                isDisabled: true,
                tooltip: 'Available in next update - Brand identity generator'
              },
              {
                title: 'Pitch Deck',
                description: 'Generate investor-ready presentations',
                icon: Presentation,
                isDisabled: true,
                tooltip: 'Available in next update - AI pitch deck creator'
              },
              {
                title: 'Market Research',
                description: 'Deep dive into your target market',
                icon: Search,
                isDisabled: true,
                tooltip: 'Available in next update - Comprehensive market analysis'
              }
            ].map((tool, index) => (
              <Tooltip key={index} content={tool.tooltip}>
                <Card 
                  variant="glass" 
                  className={`p-6 transition-all duration-300 ${
                    tool.isDisabled 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'hover:glow-purple cursor-pointer'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform ${
                      tool.isDisabled 
                        ? 'bg-gray-600' 
                        : 'bg-gradient-primary group-hover:scale-110'
                    }`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{tool.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
                    <div className="flex items-center justify-center gap-2 text-xs text-primary-purple font-medium">
                      <Sparkles className="w-3 h-3" />
                      Next Update
                    </div>
                  </div>
                </Card>
              </Tooltip>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}