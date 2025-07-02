'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  PresentationChartLineIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  LinkIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'AI Business Plan Generator',
    description: 'Generate comprehensive business plans tailored to your industry and market in minutes.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Brand Identity Kit',
    description: 'Create your startup\'s brand name, tagline, and core values with AI assistance.',
    icon: SparklesIcon,
  },
  {
    name: 'Pitch Deck Builder',
    description: 'Build investor-ready pitch decks with professional templates and AI-generated content.',
    icon: PresentationChartLineIcon,
  },
  {
    name: 'Market Research',
    description: 'Get detailed market analysis and competitive insights for your startup idea.',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'PDF Export',
    description: 'Export your business plans and pitch decks as professional PDF documents.',
    icon: ArrowDownTrayIcon,
  },
  {
    name: 'Notion Integration',
    description: 'Seamlessly sync your plans with Notion for easy collaboration and updates.',
    icon: LinkIcon,
  },
]

const testimonials = [
  {
    rating: 5,
    text: "Foundify helped me turn my vague idea into a solid business plan in just 30 minutes!",
    author: "Sarah Chen, Founder of TechFlow"
  },
  {
    rating: 5,
    text: "The AI-generated market research saved me weeks of work. Absolutely incredible.",
    author: "Marcus Rodriguez, CEO of GreenStart"
  },
  {
    rating: 5,
    text: "From idea to investor presentation in one day. This tool is a game-changer.",
    author: "Alex Kim, Founder of DataBridge"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Rating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center glass rounded-full px-6 py-2 mb-8"
            >
              <span className="text-yellow-400 mr-2">⭐⭐⭐⭐⭐</span>
              <span className="text-sm text-white">Trusted by 1,000+ founders</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Turn Your </span>
              <span className="text-gradient">Startup Idea</span>
              <br />
              <span className="text-white">Into Reality</span>
            </h1>
            
            <p className="text-xl text-textSecondary max-w-3xl mx-auto mb-8">
              Generate comprehensive business plans, pitch decks, and market research with AI. 
              From idea to investor-ready in minutes, not months.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/dashboard" className="btn-primary text-lg px-8 py-4">
                Start Building Now
              </Link>
              <Link href="/pricing" className="btn-secondary text-lg px-8 py-4">
                View Pricing
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-white">Everything You Need to </span>
              <span className="text-gradient">Launch Your Startup</span>
            </h2>
            <p className="text-xl text-textSecondary max-w-3xl mx-auto">
              From business planning to investor presentations, Foundify provides all the tools 
              you need to turn your idea into a fundable business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="card-glass hover:scale-105 transition-transform duration-200"
              >
                <div className="w-12 h-12 bg-gradient-main rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.name}</h3>
                <p className="text-textSecondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Loved by Founders</span>
            </h2>
            <p className="text-xl text-textSecondary">
              See what successful entrepreneurs are saying about Foundify
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="card-glass"
              >
                <div className="mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-white mb-4 italic">"{testimonial.text}"</p>
                <p className="text-textSecondary font-semibold">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card-glass text-center bg-gradient-main/10 border-primary-purple/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Ready to Build Your </span>
              <span className="text-gradient">Dream Startup?</span>
            </h2>
            <p className="text-xl text-textSecondary mb-8">
              Join thousands of founders who've transformed their ideas into successful businesses with Foundify.
            </p>
            <Link href="/dashboard" className="btn-primary text-lg px-8 py-4 animate-glow">
              Get Started for Free
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}