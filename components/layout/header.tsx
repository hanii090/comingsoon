'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/hooks/useAuth'
import { Crown } from 'lucide-react'

export function Header() {
  const router = useRouter()
  const { user, profile, signOut, isAuthenticated, isPro } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <header className="border-b border-primary-purple/20 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold gradient-text">Foundify</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/pricing" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Blog
            </Link>
            {isAuthenticated && (
              <Link 
                href="/dashboard" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-3">
                  <span className="text-sm text-gray-400">
                    {profile?.full_name || user?.email}
                  </span>
                  {isPro && (
                    <div className="flex items-center gap-1 bg-gradient-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                      <Crown className="w-3 h-3" />
                      Pro
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-gray-400 hover:text-white"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/login')}
                  className="text-gray-400 hover:text-white"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push('/signup')}
                  className="hover:scale-105 transition-transform"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}