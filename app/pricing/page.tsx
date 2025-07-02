'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckIcon } from '@heroicons/react/24/outline'
import { createClientComponent } from '@/lib/supabase'
import { getStripe } from '@/lib/stripe'
import { User } from '@supabase/supabase-js'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with your first business plan',
    features: [
      '1 Business Plan',
      'Basic AI Generation',
      'PDF Export',
      'Community Support',
      'Basic Templates'
    ],
    limitations: [
      'Limited to 1 plan',
      'Standard AI responses',
      'No priority support'
    ],
    cta: 'Get Started',
    href: '/signup'
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'month',
    description: 'Everything you need to build and scale your startup',
    features: [
      'Unlimited Business Plans',
      'Advanced AI Generation',
      'Pitch Deck Builder',
      'Market Research Reports',
      'Brand Identity Kit',
      'Notion Integration',
      'PDF & PowerPoint Export',
      'Priority Support',
      'Premium Templates',
      'Financial Projections',
      'Competitor Analysis'
    ],
    popular: true,
    cta: 'Upgrade to Pro',
    href: '/api/stripe/checkout'
  }
]

export default function PricingPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [upgrading, setUpgrading] = useState(false)
  const supabase = createClientComponent()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleUpgrade = async () => {
    if (!user) {
      window.location.href = '/signup'
      return
    }

    setUpgrading(true)
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await getStripe()
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setUpgrading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Pricing Section */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Choose Your </span>
              <span className="text-gradient">Plan</span>
            </h1>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
              Start for free and upgrade when you're ready to unlock the full power of AI-driven business planning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`card-glass relative ${
                  plan.popular 
                    ? 'ring-2 ring-primary-purple scale-105' 
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-main px-4 py-2 rounded-full text-sm font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-textSecondary ml-2">/{plan.period}</span>
                    </div>
                    <p className="text-textSecondary">{plan.description}</p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-4">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-textSecondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations && (
                      <div className="mt-6">
                        <h4 className="text-white font-semibold mb-3">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation) => (
                            <li key={limitation} className="text-sm text-textSecondary opacity-75">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto">
                    {plan.name === 'Free' ? (
                      <Link href={plan.href} className="btn-secondary w-full text-center block">
                        {plan.cta}
                      </Link>
                    ) : (
                      <button
                        onClick={handleUpgrade}
                        disabled={upgrading}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {upgrading ? (
                          <div className="flex items-center justify-center">
                            <div className="spinner mr-2"></div>
                            Processing...
                          </div>
                        ) : (
                          plan.cta
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="card-glass">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Can I cancel anytime?
                </h3>
                <p className="text-textSecondary">
                  Yes, you can cancel your Pro subscription at any time. You'll continue to have access 
                  until the end of your billing period.
                </p>
              </div>

              <div className="card-glass">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Do you offer refunds?
                </h3>
                <p className="text-textSecondary">
                  We offer a 30-day money-back guarantee. If you're not satisfied with Foundify Pro, 
                  contact us for a full refund.
                </p>
              </div>

              <div className="card-glass">
                <h3 className="text-xl font-semibold text-white mb-3">
                  What's included in the free plan?
                </h3>
                <p className="text-textSecondary">
                  The free plan includes one business plan generation with basic AI features and PDF export. 
                  Perfect for testing our platform.
                </p>
              </div>

              <div className="card-glass">
                <h3 className="text-xl font-semibold text-white mb-3">
                  How does billing work?
                </h3>
                <p className="text-textSecondary">
                  Pro plans are billed monthly at $29/month. You can upgrade or downgrade your plan 
                  at any time from your dashboard.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}