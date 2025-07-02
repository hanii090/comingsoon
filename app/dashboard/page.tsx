'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClientComponent } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { 
  DocumentTextIcon, 
  PlusIcon, 
  SparklesIcon,
  StarIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline'

interface BusinessPlan {
  id: string
  title: string
  sections: any
  created_at: string
  updated_at: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [plans, setPlans] = useState<BusinessPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [showPlanForm, setShowPlanForm] = useState(false)
  const [businessIdea, setBusinessIdea] = useState('')
  const [industry, setIndustry] = useState('')
  const [targetMarket, setTargetMarket] = useState('')
  const router = useRouter()
  const supabase = createClientComponent()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      await fetchPlans(user.id)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.push('/login')
      } else {
        setUser(session.user)
        fetchPlans(session.user.id)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth, router])

  const fetchPlans = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching plans:', error)
      } else {
        setPlans(data || [])
      }
    } catch (error) {
      console.error('Error fetching plans:', error)
    }
  }

  const generateBusinessPlan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setGenerating(true)
    
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessIdea,
          industry,
          targetMarket,
          userId: user.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate plan')
      }

      const result = await response.json()
      
      if (result.success) {
        // Refresh plans list
        await fetchPlans(user.id)
        
        // Reset form
        setBusinessIdea('')
        setIndustry('')
        setTargetMarket('')
        setShowPlanForm(false)
        
        // Navigate to the new plan
        router.push(`/plan/${result.planId}`)
      } else {
        throw new Error(result.error || 'Failed to generate plan')
      }
    } catch (error) {
      console.error('Error generating plan:', error)
      alert('Failed to generate business plan. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Welcome back, </span>
              <span className="text-gradient">{user?.email?.split('@')[0]}</span>
            </h1>
            <p className="text-xl text-textSecondary">
              Ready to build the next big thing? Let's turn your idea into a comprehensive business plan.
            </p>
          </motion.div>

          {/* Upgrade Banner for Free Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <div className="card-glass bg-gradient-main/10 border-primary-purple/20 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-main rounded-lg flex items-center justify-center">
                    <StarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Upgrade to Pro</h3>
                    <p className="text-textSecondary">
                      Unlock unlimited plans, pitch decks, market research, and more!
                    </p>
                  </div>
                </div>
                <Link href="/pricing" className="btn-primary">
                  Upgrade Now
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button
                onClick={() => setShowPlanForm(true)}
                className="card-glass hover:scale-105 transition-transform duration-200 text-left"
              >
                <div className="w-12 h-12 bg-gradient-main rounded-lg flex items-center justify-center mb-4">
                  <PlusIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">New Business Plan</h3>
                <p className="text-textSecondary text-sm">
                  Generate a comprehensive business plan with AI
                </p>
              </button>

              <div className="card-glass opacity-50 cursor-not-allowed">
                <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center mb-4">
                  <SparklesIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Brand Kit</h3>
                <p className="text-textSecondary text-sm">
                  Create brand identity and values
                </p>
                <span className="text-xs text-primary-purple font-semibold">Pro Feature</span>
              </div>

              <div className="card-glass opacity-50 cursor-not-allowed">
                <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center mb-4">
                  <DocumentTextIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Pitch Deck</h3>
                <p className="text-textSecondary text-sm">
                  Build investor-ready presentations
                </p>
                <span className="text-xs text-primary-purple font-semibold">Pro Feature</span>
              </div>

              <div className="card-glass opacity-50 cursor-not-allowed">
                <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center mb-4">
                  <DocumentTextIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Market Research</h3>
                <p className="text-textSecondary text-sm">
                  Analyze your market and competitors
                </p>
                <span className="text-xs text-primary-purple font-semibold">Pro Feature</span>
              </div>
            </div>
          </motion.div>

          {/* My Business Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">My Business Plans</h2>
              {plans.length > 0 && (
                <button
                  onClick={() => setShowPlanForm(true)}
                  className="btn-secondary"
                >
                  Create New Plan
                </button>
              )}
            </div>

            {plans.length === 0 ? (
              <div className="card-glass text-center py-12">
                <DocumentTextIcon className="h-16 w-16 text-textSecondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Business Plans Yet</h3>
                <p className="text-textSecondary mb-6">
                  Create your first business plan to get started on your entrepreneurial journey.
                </p>
                <button
                  onClick={() => setShowPlanForm(true)}
                  className="btn-primary"
                >
                  Create Your First Plan
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Link
                    key={plan.id}
                    href={`/plan/${plan.id}`}
                    className="card-glass hover:scale-105 transition-transform duration-200 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-main rounded-lg flex items-center justify-center">
                        <DocumentTextIcon className="h-6 w-6 text-white" />
                      </div>
                      <ArrowRightIcon className="h-5 w-5 text-textSecondary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{plan.title}</h3>
                    <p className="text-textSecondary text-sm mb-4">
                      Created {new Date(plan.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex items-center text-primary-purple text-sm">
                      View Plan <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Business Plan Generation Modal */}
      {showPlanForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card-glass max-w-md w-full"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Generate Business Plan</h3>
              <p className="text-textSecondary">
                Tell us about your startup idea and we'll create a comprehensive business plan for you.
              </p>
            </div>

            <form onSubmit={generateBusinessPlan} className="space-y-6">
              <div>
                <label htmlFor="businessIdea" className="block text-sm font-medium text-white mb-2">
                  Business Idea *
                </label>
                <textarea
                  id="businessIdea"
                  required
                  value={businessIdea}
                  onChange={(e) => setBusinessIdea(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-card/50 border border-white/10 rounded-lg text-white placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
                  placeholder="Describe your startup idea in detail..."
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-white mb-2">
                  Industry *
                </label>
                <input
                  id="industry"
                  type="text"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 bg-card/50 border border-white/10 rounded-lg text-white placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  placeholder="e.g., SaaS, E-commerce, Healthcare"
                />
              </div>

              <div>
                <label htmlFor="targetMarket" className="block text-sm font-medium text-white mb-2">
                  Target Market *
                </label>
                <input
                  id="targetMarket"
                  type="text"
                  required
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  className="w-full px-4 py-3 bg-card/50 border border-white/10 rounded-lg text-white placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  placeholder="e.g., Small businesses, Millennials, Enterprise"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowPlanForm(false)}
                  className="flex-1 btn-secondary"
                  disabled={generating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={generating}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner mr-2"></div>
                      Generating...
                    </div>
                  ) : (
                    'Generate Plan'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  )
}