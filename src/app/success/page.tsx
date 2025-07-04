"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Crown, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const session = searchParams?.get("session_id")
    if (session) {
      setSessionId(session)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark to-accent/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <Card variant="glass" className="border-glass text-center overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-primary p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to Foundify Pro! 🎉
            </h1>
            <p className="text-white/90">
              Your subscription is now active and ready to use
            </p>
          </div>

          <CardContent className="p-8 space-y-6">
            {/* Pro Features Unlocked */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 justify-center text-accent">
                <Crown className="w-5 h-5" />
                <span className="font-semibold">Pro Features Unlocked</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                {[
                  "Unlimited Business Plans",
                  "AI Competitor Analysis",
                  "PDF & Notion Export",
                  "Pitch Deck Generator",
                  "Advanced Market Research",
                  "Priority Support",
                  "Financial Projections",
                  "Brand Identity Kits"
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-textSecondary">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 justify-center mb-4">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="font-semibold">Get Started</span>
              </div>
              <p className="text-textSecondary text-sm mb-6">
                Ready to create your first AI-powered business plan? Your Pro features are now available in the dashboard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/dashboard">
                  <Button variant="gradient" size="lg" className="group w-full sm:w-auto">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link href="/">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>

            {/* Receipt Info */}
            {sessionId && (
              <div className="text-xs text-textSecondary border-t border-glass pt-4">
                <p>Receipt ID: {sessionId}</p>
                <p>You&apos;ll receive a confirmation email shortly with your receipt and billing details.</p>
              </div>
            )}

            {/* Support */}
            <div className="text-center">
              <p className="text-sm text-textSecondary mb-2">
                Need help getting started?
              </p>
              <div className="flex items-center justify-center gap-4 text-xs">
                <a href="mailto:support@foundify.com" className="text-primary hover:text-accent transition-colors">
                  Email Support
                </a>
                <span className="text-textSecondary">•</span>
                <a href="/help" className="text-primary hover:text-accent transition-colors">
                  Help Center
                </a>
                <span className="text-textSecondary">•</span>
                <a href="/docs" className="text-primary hover:text-accent transition-colors">
                  Documentation
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}