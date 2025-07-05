'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useAuth } from '@/lib/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { 
  Users, 
  Crown, 
  FileText, 
  TrendingUp,
  Loader2,
  Shield
} from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import toast from 'react-hot-toast'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface AnalyticsData {
  totalUsers: number
  proUsers: number
  totalPlans: number
  plansThisMonth: number
  mostActiveUsers: Array<{
    id: string
    email: string
    full_name: string
    plan_count: number
  }>
}

export default function AdminAnalyticsPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  // Check admin access
  const isAdmin = user?.email === 'admin@foundify.app'

  const fetchAnalyticsData = useCallback(async () => {
    try {
      // Fetch analytics using Supabase function
      const { data, error } = await supabase.rpc('get_analytics_data')
      
      if (error) {
        console.error('Analytics fetch error:', error)
        // Fallback to manual queries if RPC fails
        await fetchManualAnalytics()
      } else {
        setAnalyticsData(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      await fetchManualAnalytics()
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchManualAnalytics = useCallback(async () => {
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Get Pro users
      const { count: proUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_pro', true)

      // Get total plans
      const { count: totalPlans } = await supabase
        .from('plans')
        .select('*', { count: 'exact', head: true })

      // Get plans this month
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      const { count: plansThisMonth } = await supabase
        .from('plans')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfMonth.toISOString())

      // Get most active users
      const { data: mostActiveUsers, error: activeUsersError } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          full_name,
          plans!inner(id)
        `)
        .limit(5)

      if (activeUsersError) {
        console.error('Error fetching active users:', activeUsersError)
      }

      const processedActiveUsers = mostActiveUsers?.map(user => ({
        id: user.id,
        email: user.email,
        full_name: user.full_name || 'N/A',
        plan_count: user.plans?.length || 0
      })).sort((a, b) => b.plan_count - a.plan_count) || []

      setAnalyticsData({
        totalUsers: totalUsers || 0,
        proUsers: proUsers || 0,
        totalPlans: totalPlans || 0,
        plansThisMonth: plansThisMonth || 0,
        mostActiveUsers: processedActiveUsers
      })
    } catch (error) {
      console.error('Error in manual analytics fetch:', error)
      toast.error('Failed to load analytics data')
    }
  }, [])

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
        return
      }
      
      if (!isAdmin) {
        toast.error('Access denied. Admin privileges required.')
        router.push('/dashboard')
        return
      }

      fetchAnalyticsData()
    }
  }, [user, authLoading, isAdmin, router, fetchAnalyticsData])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-purple" />
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  const userDistributionData = {
    labels: ['Free Users', 'Pro Users'],
    datasets: [
      {
        data: [
          (analyticsData?.totalUsers || 0) - (analyticsData?.proUsers || 0),
          analyticsData?.proUsers || 0
        ],
        backgroundColor: [
          'rgba(139, 92, 246, 0.3)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(156, 163, 175)'
        }
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'rgb(156, 163, 175)'
        },
        grid: {
          color: 'rgba(139, 92, 246, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgb(156, 163, 175)'
        },
        grid: {
          color: 'rgba(139, 92, 246, 0.1)'
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary-purple" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Admin <span className="gradient-text">Analytics</span>
            </h1>
          </div>
          <p className="text-gray-400">
            Real-time insights into Foundify&apos;s growth and user engagement.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Users',
              value: analyticsData?.totalUsers || 0,
              icon: Users,
              color: 'text-blue-500',
              bgColor: 'bg-blue-500/10'
            },
            {
              title: 'Pro Users',
              value: analyticsData?.proUsers || 0,
              icon: Crown,
              color: 'text-primary-purple',
              bgColor: 'bg-primary-purple/10'
            },
            {
              title: 'Total Plans',
              value: analyticsData?.totalPlans || 0,
              icon: FileText,
              color: 'text-green-500',
              bgColor: 'bg-green-500/10'
            },
            {
              title: 'Plans This Month',
              value: analyticsData?.plansThisMonth || 0,
              icon: TrendingUp,
              color: 'text-orange-500',
              bgColor: 'bg-orange-500/10'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="glass">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-white">
                        {stat.value.toLocaleString()}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>
                  Free vs Pro user breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <Doughnut data={userDistributionData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Most Active Users */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Most Active Users</CardTitle>
                <CardDescription>
                  Users with the most business plans created
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.mostActiveUsers?.map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-xl bg-card/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {user.full_name || 'Anonymous'}
                          </p>
                          <p className="text-sm text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-purple">
                          {user.plan_count}
                        </p>
                        <p className="text-xs text-gray-400">plans</p>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8 text-gray-400">
                      No user data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}