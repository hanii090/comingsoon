"use client"

import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark">
      {/* Navigation Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold text-white">Foundify</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="#features" 
                className="text-textSecondary hover:text-white transition-colors text-sm font-medium"
              >
                Features
              </Link>
              <Link 
                href="#pricing" 
                className="text-textSecondary hover:text-white transition-colors text-sm font-medium"
              >
                Pricing
              </Link>
              <Link 
                href="/dashboard" 
                className="text-textSecondary hover:text-white transition-colors text-sm font-medium"
              >
                Dashboard
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Link 
                href="/login"
                className="text-textSecondary hover:text-white transition-colors text-sm font-medium"
              >
                Sign In
              </Link>
              <Link 
                href="/signup"
                className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section id="features">
        <Features />
      </section>
      
      {/* Pricing Section */}
      <section id="pricing">
        <Pricing />
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  )
}