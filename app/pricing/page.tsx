'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Check, Star, Zap } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with your first business idea',
      features: [
        '1 Business Plan per month',
        'Basic AI insights',
        'PDF export',
        'Email support',
        'Standard templates'
      ],
      cta: 'Get Started Free',
      popular: false,
      variant: 'secondary' as const
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For serious entrepreneurs who want unlimited access',
      features: [
        'Unlimited Business Plans',
        'Advanced AI insights',
        'Premium templates',
        'Pitch deck generation',
        'Market research tools',
        'Brand identity creator',
        'Notion integration',
        'Priority support',
        'Export to multiple formats',
        'Team collaboration (coming soon)'
      ],
      cta: 'Upgrade to Pro',
      popular: true,
      variant: 'primary' as const
    }
  ]

  const handleUpgrade = async (planType: string) => {
    if (planType === 'free') {
      // Redirect to signup
      window.location.href = '/signup'
      return
    }

    // For Pro plan, integrate with Stripe
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error creating checkout session:', error)
      // Fallback to signup for now
      window.location.href = '/signup'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Choose Your{' '}
                <span className="gradient-text">Plan</span>
              </h1>
              <p className="text-xl text-textSecondary">
                Start for free and upgrade when you're ready to scale your startup dreams into reality.
              </p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">Most Popular</span>
                      </div>
                    </div>
                  )}
                  
                  <Card 
                    variant={plan.popular ? 'glow' : 'glass'} 
                    className={`h-full p-8 ${plan.popular ? 'border-primary-purple/40' : ''}`}
                  >
                    <CardHeader className="pb-8 text-center">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        {plan.popular && <Zap className="w-6 h-6 text-primary-purple" />}
                      </div>
                      <div className="mb-4">
                        <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                        <span className="text-textSecondary ml-2">/{plan.period}</span>
                      </div>
                      <CardDescription className="text-base">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <ul className="space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary-purple mt-0.5 flex-shrink-0" />
                            <span className="text-text">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        variant={plan.variant}
                        size="lg"
                        className="w-full text-lg py-4 h-14"
                        onClick={() => handleUpgrade(plan.name.toLowerCase())}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <h2 className="text-3xl font-bold text-center mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    question: 'Can I switch plans anytime?',
                    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
                  },
                  {
                    question: 'What happens to my data if I downgrade?',
                    answer: 'Your data is always safe. You\'ll keep access to all previously created plans, but new features will be limited.'
                  },
                  {
                    question: 'Do you offer refunds?',
                    answer: 'We offer a 30-day money-back guarantee for all Pro subscriptions. No questions asked.'
                  },
                  {
                    question: 'Is there a team plan?',
                    answer: 'Team collaboration features are coming soon! Contact us if you\'re interested in early access.'
                  }
                ].map((faq, index) => (
                  <Card key={index} variant="glass" className="p-6">
                    <h3 className="font-semibold mb-3 text-text">{faq.question}</h3>
                    <p className="text-textSecondary">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}