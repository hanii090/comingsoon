'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
import { Users, Crown, FileText, Zap, ArrowLeft, TrendingUp } from 'lucide-react'

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
  total_users: number
  pro_users: number
  total_plans: number
  total_brands: number
  total_pitch_decks: number
  total_referrals: number
  users_this_month: number
  plans_this_month: number
  most_active_users: {
    email: string
    plan_count: number
    brand_count: number
  }[]
}

export default function AdminAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', user.id)
        .single()

      if (profile?.email !== 'admin@foundify.app') {
        router.push('/dashboard')
        return
      }

      setIsAdmin(true)
      await fetchAnalyticsData()
    } catch (error) {
      console.error('Error checking admin access:', error)
      router.push('/dashboard')
    }
  }

  const fetchAnalyticsData = async () => {
    try {
      const { data, error } = await supabase.rpc('get_analytics_data')
      
      if (error) throw error
      
      setAnalyticsData(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAdmin || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="glass rounded-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple mx-auto"></div>
          <p className="text-white mt-4 text-center">Loading...</p>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="glass rounded-2xl p-8">
          <p className="text-white text-center">Failed to load analytics data</p>
        </div>
      </div>
    )
  }

  // Chart data
  const userGrowthData = {
    labels: ['Total Users', 'Pro Users', 'Free Users'],
    datasets: [
      {
        label: 'Users',
        data: [
          analyticsData.total_users,
          analyticsData.pro_users,
          analyticsData.total_users - analyticsData.pro_users
        ],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(59, 130, 246, 0.8)'
        ],
        borderColor: [
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(59, 130, 246, 1)'
        ],
        borderWidth: 1,
      },
    ],
  }

  const contentData = {
    labels: ['Business Plans', 'Brand Kits', 'Pitch Decks'],
    datasets: [
      {
        data: [
          analyticsData.total_plans,
          analyticsData.total_brands,
          analyticsData.total_pitch_decks
        ],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(16, 185, 129, 0.8)'
        ],
        borderColor: [
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(16, 185, 129, 1)'
        ],
        borderWidth: 2,
      },
    ],
  }

  const stats = [
    {
      title: 'Total Users',
      value: analyticsData.total_users.toLocaleString(),
      icon: Users,
      change: `+${analyticsData.users_this_month} this month`,
      color: 'text-blue-400'
    },
    {
      title: 'Pro Users',
      value: analyticsData.pro_users.toLocaleString(),
      icon: Crown,
      change: `${((analyticsData.pro_users / analyticsData.total_users) * 100).toFixed(1)}% conversion`,
      color: 'text-yellow-400'
    },
    {
      title: 'Business Plans',
      value: analyticsData.total_plans.toLocaleString(),
      icon: FileText,
      change: `+${analyticsData.plans_this_month} this month`,
      color: 'text-green-400'
    },
    {
      title: 'Referrals',
      value: analyticsData.total_referrals.toLocaleString(),
      icon: Zap,
      change: 'Word-of-mouth growth',
      color: 'text-purple-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="glass"
              onClick={() => router.push('/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-4xl font-bold text-white">Admin Analytics</h1>
            <p className="text-gray-300 mt-2">Real-time insights into Foundify usage and growth</p>
          </div>
          <div className="glass rounded-lg p-4">
            <TrendingUp className="w-8 h-8 text-primary-purple" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} variant="glass" className="hover:glow-purple transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card variant="glass" className="p-6">
            <CardHeader>
              <CardTitle className="text-white">User Distribution</CardTitle>
              <CardDescription className="text-gray-300">
                Breakdown of user types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Bar
                  data={userGrowthData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          color: 'white'
                        }
                      }
                    },
                    scales: {
                      x: {
                        ticks: {
                          color: 'white'
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        }
                      },
                      y: {
                        ticks: {
                          color: 'white'
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        }
                      }
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" className="p-6">
            <CardHeader>
              <CardTitle className="text-white">Content Created</CardTitle>
              <CardDescription className="text-gray-300">
                Distribution of content types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Doughnut
                  data={contentData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: 'white',
                          padding: 20
                        }
                      }
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Most Active Users */}
        <Card variant="glass" className="p-6">
          <CardHeader>
            <CardTitle className="text-white">Most Active Users</CardTitle>
            <CardDescription className="text-gray-300">
              Users with the most content created
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.most_active_users?.slice(0, 10).map((user, index) => (
                <div key={index} className="flex items-center justify-between p-4 glass-card rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <span className="text-white font-medium">{user.email}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm">
                      {user.plan_count} plans, {user.brand_count} brands
                    </div>
                    <div className="text-gray-400 text-xs">
                      Total: {user.plan_count + user.brand_count} items
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}