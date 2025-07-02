'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CheckCircle, Crown, Sparkles, ArrowRight } from 'lucide-react'

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    // Get session ID from URL params
    const urlParams = new URLSearchParams(window.location.search)
    const session = urlParams.get('session_id')
    setSessionId(session)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 glow-purple">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Main Content */}
          <Card variant="glass" className="p-8 md:p-12">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Crown className="w-8 h-8 text-primary-purple" />
                  <CardTitle className="text-3xl md:text-4xl font-bold gradient-text">
                    Welcome to Pro!
                  </CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Your payment was successful and your Pro subscription is now active.
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* What's Next */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-text">What&apos;s unlocked for you:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Unlimited Business Plans',
                    'Advanced AI Insights',
                    'Premium Templates',
                    'Pitch Deck Generation',
                    'Market Research Tools',
                    'Brand Identity Creator',
                    'Notion Integration',
                    'Priority Support'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-primary-purple/10 border border-primary-purple/20"
                    >
                      <Sparkles className="w-5 h-5 text-primary-purple flex-shrink-0" />
                      <span className="text-text">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Receipt Info */}
              {sessionId && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="p-4 bg-card/50 rounded-xl border border-primary-purple/20"
                >
                  <div className="text-sm text-textSecondary">
                    <p>Session ID: <span className="font-mono text-text">{sessionId}</span></p>
                    <p className="mt-1">A receipt has been sent to your email address.</p>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link href="/dashboard" className="flex-1">
                  <Button size="lg" className="w-full gap-2">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                
                <Link href="/pricing" className="flex-1">
                  <Button variant="glass" size="lg" className="w-full">
                    View All Features
                  </Button>
                </Link>
              </motion.div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 text-center"
          >
            <p className="text-textSecondary mb-4">
              Questions about your subscription? We&apos;re here to help!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="text-primary-purple hover:text-primary-magenta transition-colors text-sm"
              >
                Contact Support
              </Link>
              <span className="text-textSecondary">•</span>
              <Link 
                href="/help" 
                className="text-primary-purple hover:text-primary-magenta transition-colors text-sm"
              >
                Help Center
              </Link>
              <span className="text-textSecondary">•</span>
              <Link 
                href="/billing" 
                className="text-primary-purple hover:text-primary-magenta transition-colors text-sm"
              >
                Manage Billing
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}