'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClientComponent } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { 
  DocumentTextIcon, 
  ArrowLeftIcon, 
  ShareIcon,
  ArrowDownTrayIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline'

interface BusinessPlan {
  id: string
  title: string
  sections: {
    businessIdea: string
    industry: string
    targetMarket: string
    content: string
    generatedAt: string
  }
  created_at: string
  updated_at: string
}

export default function PlanPage() {
  const [user, setUser] = useState<User | null>(null)
  const [plan, setPlan] = useState<BusinessPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const params = useParams()
  const supabase = createClientComponent()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      await fetchPlan(user.id, params.id as string)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.push('/login')
      } else {
        setUser(session.user)
        fetchPlan(session.user.id, params.id as string)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth, router, params.id])

  const fetchPlan = async (userId: string, planId: string) => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('id', planId)
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching plan:', error)
        setError('Plan not found')
      } else {
        setPlan(data)
      }
    } catch (error) {
      console.error('Error fetching plan:', error)
      setError('Failed to load plan')
    } finally {
      setLoading(false)
    }
  }

  const formatPlanContent = (content: string) => {
    // Split content by sections and format for display
    const sections = content.split(/\n(?=\d+\.)/g).filter(section => section.trim())
    
    return sections.map((section, index) => {
      const lines = section.split('\n')
      const title = lines[0]
      const body = lines.slice(1).join('\n')
      
      return (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
          <div className="text-textSecondary whitespace-pre-line leading-relaxed">
            {body}
          </div>
        </div>
      )
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen">
        <Header />
        
        <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card-glass text-center"
            >
              <DocumentTextIcon className="h-16 w-16 text-textSecondary mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Plan Not Found</h1>
              <p className="text-textSecondary mb-6">
                {error || "The business plan you're looking for doesn't exist or you don't have access to it."}
              </p>
              <Link href="/dashboard" className="btn-primary">
                Back to Dashboard
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Link 
              href="/dashboard" 
              className="inline-flex items-center text-textSecondary hover:text-white transition-colors mb-6"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {plan.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-textSecondary">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Created {new Date(plan.created_at).toLocaleDateString()}
                  </div>
                  <div className="glass rounded-full px-3 py-1">
                    {plan.sections.industry}
                  </div>
                  <div className="glass rounded-full px-3 py-1">
                    {plan.sections.targetMarket}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="btn-secondary flex items-center">
                  <ShareIcon className="h-5 w-5 mr-2" />
                  Share
                </button>
                <button className="btn-primary flex items-center">
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  Export PDF
                </button>
              </div>
            </div>
          </motion.div>

          {/* Business Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="card-glass mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Business Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Business Idea</h3>
                <p className="text-textSecondary">{plan.sections.businessIdea}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Industry</h3>
                <p className="text-textSecondary">{plan.sections.industry}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Target Market</h3>
                <p className="text-textSecondary">{plan.sections.targetMarket}</p>
              </div>
            </div>
          </motion.div>

          {/* Business Plan Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="card-glass"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Business Plan</h2>
              <div className="text-sm text-textSecondary">
                Generated on {new Date(plan.sections.generatedAt).toLocaleDateString()}
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {formatPlanContent(plan.sections.content)}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="card-glass bg-gradient-main/10 border-primary-purple/20">
              <h3 className="text-xl font-bold text-white mb-4">Ready for the next step?</h3>
              <p className="text-textSecondary mb-6">
                Take your business plan further with our Pro features like pitch deck creation, 
                market research, and financial projections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing" className="btn-primary">
                  Upgrade to Pro
                </Link>
                <Link href="/dashboard" className="btn-secondary">
                  Create Another Plan
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}