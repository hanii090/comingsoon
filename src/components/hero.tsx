"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark to-accent/20" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>AI-Powered Business Planning</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
          >
            Turn Your{" "}
            <span className="gradient-text">
              Ideas
            </span>{" "}
            Into{" "}
            <span className="gradient-text">
              Investor-Ready
            </span>{" "}
            Business Plans
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg sm:text-xl text-textSecondary max-w-2xl mx-auto leading-relaxed"
          >
            Foundify uses cutting-edge AI to transform your startup concept into a comprehensive business plan, 
            complete with market research, financial projections, and pitch deck—all in minutes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/signup">
              <Button variant="gradient" size="lg" className="group">
                Start Building Your Plan
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8"
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-textSecondary">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>1000+ Plans Generated</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-textSecondary">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>$10M+ Funding Raised</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-textSecondary">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span>500+ Founders</span>
              </div>
            </div>
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="glass rounded-2xl p-1">
              <div className="bg-dark/50 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1 text-center text-textSecondary text-sm">
                    foundify.com/dashboard
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">🤖</span>
                    </div>
                    <div className="flex-1 glass rounded-lg p-3">
                      <p className="text-sm text-white">Generate my business plan for a sustainable food delivery startup targeting millennials...</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">✨</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="glass rounded-lg p-3">
                        <p className="text-sm text-white font-medium">Executive Summary</p>
                        <p className="text-xs text-textSecondary mt-1">EcoEats revolutionizes food delivery by connecting eco-conscious millennials...</p>
                      </div>
                      <div className="glass rounded-lg p-3">
                        <p className="text-sm text-white font-medium">Market Analysis</p>
                        <p className="text-xs text-textSecondary mt-1">The sustainable food delivery market is projected to reach $18.6B by 2027...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}