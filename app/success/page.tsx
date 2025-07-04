'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CheckCircle, Crown, Sparkles, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, profile } = useAuth()
  const [isUpdating, setIsUpdating] = useState(false)
  const [paymentVerified, setPaymentVerified] = useState(false)

  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId && user && !paymentVerified) {
      verifyPayment()
    }
  }, [sessionId, user, paymentVerified])

  const verifyPayment = async () => {
    if (!sessionId || !user) return

    setIsUpdating(true)
    try {
      // Verify the payment with Stripe and update user's Pro status
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, userId: user.id })
      })

      if (response.ok) {
        // Update local profile status
        const { error } = await supabase
          .from('profiles')
          .update({ is_pro: true })
          .eq('id', user.id)

        if (!error) {
          setPaymentVerified(true)
          toast.success('Welcome to Foundify Pro!')
          
          // Send Pro upgrade email
          await fetch('/api/send-onboarding', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              name: user.user_metadata?.full_name || user.email,
              type: 'pro_upgrade'
            })
          })
        }
      }
    } catch (error) {
      console.error('Error verifying payment:', error)
      toast.error('There was an issue verifying your payment. Please contact support.')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to{' '}
              <span className="gradient-text">Foundify Pro</span>!
            </h1>
            <p className="text-xl text-textSecondary">
              Your payment was successful. You now have access to all Pro features!
            </p>
          </div>

          <Card variant="glass" className="mb-8 glow-purple">
            <CardHeader>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-primary-purple" />
                <CardTitle className="text-2xl">Pro Features Unlocked</CardTitle>
              </div>
              <CardDescription>
                Here&apos;s what you can now do with your Pro account:
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {[
                  'Unlimited Business Plans',
                  'Advanced AI Insights',
                  'Premium Templates',
                  'Pitch Deck Generation',
                  'Market Research Tools',
                  'Brand Identity Creator',
                  'Export to Multiple Formats',
                  'Priority Support'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-primary-purple flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 h-14">
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <div className="text-sm text-textSecondary">
              Questions? Contact us at{' '}
              <a 
                href="mailto:support@foundify.app" 
                className="text-primary-purple hover:text-primary-magenta transition-colors"
              >
                support@foundify.app
              </a>
            </div>
          </div>
        </motion.div>

        {/* Pro Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Pro Tips to Get Started
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Create Your First Plan',
                description: 'Use the AI Business Plan Generator to create comprehensive business plans in minutes.',
                icon: '📝'
              },
              {
                title: 'Export & Share',
                description: 'Download your plans as PDFs or sync with Notion for easy collaboration.',
                icon: '📤'
              },
              {
                title: 'Explore Tools',
                description: 'Try our brand identity creator and pitch deck generator for complete startup packages.',
                icon: '🚀'
              }
            ].map((tip, index) => (
              <Card key={index} variant="glass" className="p-6 text-center">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-textSecondary text-sm">{tip.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-purple" />
          <p className="text-textSecondary">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}