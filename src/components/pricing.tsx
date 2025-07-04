"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for testing and small projects",
    features: [
      "1 Business Plan",
      "Basic Branding Kit",
      "Market Research Overview",
      "Community Support",
      "Basic Templates"
    ],
    limitations: [
      "No PDF Export",
      "No Competitor Analysis",
      "Limited AI Features"
    ],
    cta: "Get Started Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Everything you need to launch and scale",
    features: [
      "Unlimited Business Plans",
      "Advanced Branding Kits",
      "Comprehensive Market Research",
      "AI Competitor Analysis",
      "PDF & Notion Export",
      "Pitch Deck Generator",
      "Financial Projections",
      "Priority Support",
      "Advanced Templates",
      "API Access"
    ],
    cta: "Upgrade to Pro",
    popular: true
  }
]

export function Pricing() {
  const handleUpgrade = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error creating checkout session:', error)
    }
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-textSecondary max-w-2xl mx-auto">
            Start free and upgrade when you're ready to unlock the full potential of AI-powered business planning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <Card 
                variant="glass" 
                className={`h-full ${plan.popular ? 'ring-2 ring-primary/50 shadow-glass-lg' : ''}`}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-textSecondary">{plan.period}</span>}
                  </div>
                  <CardDescription className="text-textSecondary">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations && plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-start gap-3 opacity-60">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-textSecondary rounded-full" />
                        </div>
                        <span className="text-sm line-through">{limitation}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    size="lg"
                    className="w-full"
                    onClick={plan.name === "Pro" ? handleUpgrade : () => window.location.href = "/signup"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ or additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Why Choose Foundify Pro?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">AI</span>
                </div>
                <h4 className="font-semibold mb-2">Advanced AI</h4>
                <p className="text-sm text-textSecondary">GPT-powered analysis and generation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">∞</span>
                </div>
                <h4 className="font-semibold mb-2">Unlimited Use</h4>
                <p className="text-sm text-textSecondary">Create as many plans as you need</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">24/7</span>
                </div>
                <h4 className="font-semibold mb-2">Priority Support</h4>
                <p className="text-sm text-textSecondary">Get help when you need it</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}