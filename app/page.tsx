'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { 
  Brain, 
  FileText, 
  Presentation, 
  Search, 
  Download, 
  Zap,
  Star
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Brain,
      title: 'AI Business Plan',
      description: 'Generate comprehensive business plans with AI-powered insights and market analysis.',
      delay: 0.1
    },
    {
      icon: Zap,
      title: 'Brand Identity',
      description: 'Create compelling brand names, taglines, and values that resonate with your audience.',
      delay: 0.2
    },
    {
      icon: Presentation,
      title: 'Pitch Deck',
      description: 'Professional investor-ready presentations that tell your startup story effectively.',
      delay: 0.3
    },
    {
      icon: Search,
      title: 'Market Research',
      description: 'Deep market analysis and competitive insights to validate your business idea.',
      delay: 0.4
    },
    {
      icon: Download,
      title: 'PDF Export',
      description: 'Export your complete business plan as professional PDF documents.',
      delay: 0.5
    },
    {
      icon: FileText,
      title: 'Notion Sync',
      description: 'Seamlessly sync and collaborate on your business plans in Notion.',
      delay: 0.6
    }
  ]

  const testimonials = [
    { rating: 5, text: 'Trusted by founders' },
    { rating: 5, text: '500+ startups launched' },
    { rating: 5, text: '$10M+ raised' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-conic from-primary-purple/20 via-primary-magenta/20 to-primary-purple/20 opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-purple/10 via-transparent to-transparent" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Turn Your{' '}
                  <span className="gradient-text">Startup Idea</span>
                  {' '}Into Reality
                </h1>
                
                <p className="text-xl md:text-2xl text-textSecondary max-w-3xl mx-auto">
                  AI-powered business planning assistant that helps founders create comprehensive business plans, 
                  pitch decks, and market research in minutes, not months.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto text-lg px-8 py-4 h-14"
                    >
                      Start Building Now
                    </Button>
                  </Link>
                  
                  <Link href="/pricing">
                    <Button
                      variant="glass"
                      size="lg"
                      className="w-full sm:w-auto text-lg px-8 py-4 h-14"
                    >
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4 pt-12"
              >
                {testimonials.map((item, index) => (
                  <div key={index} className="glass-card px-6 py-3 rounded-full">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-textSecondary">{item.text}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Everything You Need to{' '}
                <span className="gradient-text">Launch Your Startup</span>
              </h2>
              <p className="text-xl text-textSecondary max-w-3xl mx-auto">
                From initial idea to investor-ready presentation, Foundify provides all the tools 
                and insights you need to build a successful startup.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: feature.delay }}
                    viewport={{ once: true }}
                  >
                    <Card variant="glass" className="h-full hover:glow-purple transition-all duration-300">
                      <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-primary-purple/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Launch Your Startup in{' '}
                <span className="gradient-text">3 Simple Steps</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: '01',
                  title: 'Describe Your Idea',
                  description: 'Tell our AI about your startup idea, target market, and vision.'
                },
                {
                  step: '02',
                  title: 'AI Generates Plan',
                  description: 'Our advanced AI creates a comprehensive business plan, brand identity, and market research.'
                },
                {
                  step: '03',
                  title: 'Export & Launch',
                  description: 'Download your investor-ready materials and start building your startup.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 glow-purple">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-textSecondary">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-12 md:p-16 text-center rounded-3xl glow-purple"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Build Your{' '}
                <span className="gradient-text">Next Big Thing?</span>
              </h2>
              <p className="text-xl text-textSecondary mb-8 max-w-2xl mx-auto">
                Join thousands of founders who have turned their ideas into successful startups with Foundify.
              </p>
                             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Link href="/dashboard">
                   <Button size="lg" className="text-lg px-8 py-4 h-14">
                     Start Building Now
                   </Button>
                 </Link>
                 <Link href="/pricing">
                   <Button variant="glass" size="lg" className="text-lg px-8 py-4 h-14">
                     View Pricing Plans
                   </Button>
                 </Link>
               </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}