'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { createClientComponent } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-main rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-gradient">Foundify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/pricing" className="text-textSecondary hover:text-white transition-colors">
              Pricing
            </Link>
            
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <Link href="/dashboard" className="text-textSecondary hover:text-white transition-colors">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-textSecondary hover:text-white transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link href="/login" className="text-textSecondary hover:text-white transition-colors">
                      Login
                    </Link>
                    <Link href="/signup" className="btn-primary">
                      Get Started
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-textSecondary hover:text-white"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-card/50 backdrop-blur-md rounded-lg mt-2 p-4 border border-white/10"
          >
            <div className="flex flex-col space-y-4">
              <Link 
                href="/pricing" 
                className="text-textSecondary hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Link 
                        href="/dashboard" 
                        className="text-textSecondary hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut()
                          setIsOpen(false)
                        }}
                        className="text-textSecondary hover:text-white transition-colors text-left"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/login" 
                        className="text-textSecondary hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                      <Link 
                        href="/signup" 
                        className="btn-primary inline-block text-center"
                        onClick={() => setIsOpen(false)}
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}