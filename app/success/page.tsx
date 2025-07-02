'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

function SuccessContent() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      // Here you could verify the session with Stripe and update user status
      // For now, we'll just show success
      setLoading(false)
    } else {
      setError('No session found')
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error) {
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
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-red-400 text-2xl">✗</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
              <p className="text-textSecondary mb-6">
                We couldn't find your payment session. Please try again or contact support.
              </p>
              <Link href="/pricing" className="btn-primary">
                Back to Pricing
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
      
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card-glass text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircleIcon className="h-10 w-10 text-green-400" />
            </motion.div>

            <h1 className="text-3xl font-bold text-white mb-4">Welcome to Pro! 🎉</h1>
            <p className="text-textSecondary mb-6">
              Your subscription has been activated successfully. You now have access to all Pro features including:
            </p>

            <div className="text-left mb-8 space-y-2">
              <div className="flex items-center text-textSecondary">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Unlimited Business Plans
              </div>
              <div className="flex items-center text-textSecondary">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Advanced AI Generation
              </div>
              <div className="flex items-center text-textSecondary">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Pitch Deck Builder
              </div>
              <div className="flex items-center text-textSecondary">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Market Research Reports
              </div>
              <div className="flex items-center text-textSecondary">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Brand Identity Kit
              </div>
              <div className="flex items-center text-textSecondary">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Priority Support
              </div>
            </div>

            <Link href="/dashboard" className="btn-primary w-full mb-4">
              Go to Dashboard
            </Link>

            <p className="text-xs text-textSecondary">
              Questions? <span className="text-primary-purple cursor-pointer">Contact our support team</span>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}