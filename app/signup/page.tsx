'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (!supabase) {
      toast.error('Authentication service is not available')
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Account created! Check your email to verify your account.')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    if (!supabase) {
      toast.error('Authentication service is not available')
      return
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (error) {
        toast.error(error.message)
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-conic from-primary-purple/20 via-primary-magenta/20 to-primary-purple/20 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-purple/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        {/* Back to Home */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-textSecondary hover:text-text transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Foundify</span>
          </Link>
        </div>

        <Card variant="glass" className="glow-purple">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
            <CardDescription>
              Join thousands of founders building the next big thing
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-card border border-primary-purple/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple/50 text-text placeholder-textSecondary"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-card border border-primary-purple/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple/50 text-text placeholder-textSecondary"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-card border border-primary-purple/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple/50 text-text placeholder-textSecondary"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textSecondary hover:text-text"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-card border border-primary-purple/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-purple/50 text-text placeholder-textSecondary"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textSecondary hover:text-text"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms and Privacy */}
              <div className="text-sm text-textSecondary">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-primary-purple hover:text-primary-magenta transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary-purple hover:text-primary-magenta transition-colors">
                  Privacy Policy
                </Link>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary-purple/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-textSecondary">Or continue with</span>
              </div>
            </div>

            {/* Google Sign Up */}
            <Button
              variant="glass"
              size="lg"
              className="w-full"
              onClick={handleGoogleSignUp}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Sign In Link */}
            <div className="text-center">
              <span className="text-textSecondary">Already have an account? </span>
              <Link 
                href="/login" 
                className="text-primary-purple hover:text-primary-magenta transition-colors font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}