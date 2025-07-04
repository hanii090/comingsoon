"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  FileText, 
  Palette, 
  PresentationChart, 
  TrendingUp,
  Users,
  Crown,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { createSupabaseBrowserClient } from "@/lib/supabase"
import { formatDateShort } from "@/lib/utils"

interface Plan {
  id: string
  title: string
  created_at: string
  content: any
}

interface Brand {
  id: string
  name: string
  tone: string
  created_at: string
}

interface User {
  id: string
  email: string
  is_pro: boolean
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [plans, setPlans] = useState<Plan[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    async function fetchData() {
      try {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          window.location.href = '/login'
          return
        }

        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            is_pro: profile.is_pro
          })
        }

        // Get user's business plans
        const { data: plansData } = await supabase
          .from('plans')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })

        if (plansData) {
          setPlans(plansData)
        }

        // Get user's brands
        const { data: brandsData } = await supabase
          .from('brands')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })

        if (brandsData) {
          setBrands(brandsData)
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const quickActions = [
    {
      title: "Generate Business Plan",
      description: "Create a comprehensive AI-generated business plan",
      icon: FileText,
      href: "/create/plan",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Build Brand Kit",
      description: "Generate brand identity and guidelines",
      icon: Palette,
      href: "/create/brand",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Create Pitch Deck",
      description: "Build an investor-ready presentation",
      icon: PresentationChart,
      href: "/create/pitch-deck",
      color: "from-orange-500 to-red-500",
      isPro: true
    },
    {
      title: "Market Research",
      description: "Analyze market and competitors",
      icon: TrendingUp,
      href: "/create/research",
      color: "from-green-500 to-emerald-500",
      isPro: true
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textSecondary">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-textSecondary">
                {user?.email} {user?.is_pro && <span className="inline-flex items-center gap-1 ml-2 text-accent"><Crown className="w-4 h-4" /> Pro</span>}
              </p>
            </div>
            
            {!user?.is_pro && (
              <Link href="/pricing">
                <Button variant="gradient" size="lg" className="group">
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade to Pro
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card variant="glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-textSecondary">Business Plans</p>
                    <p className="text-2xl font-bold">{plans.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card variant="glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-textSecondary">Brand Kits</p>
                    <p className="text-2xl font-bold">{brands.length}</p>
                  </div>
                  <Palette className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card variant="glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-textSecondary">Account Type</p>
                    <p className="text-2xl font-bold">{user?.is_pro ? 'Pro' : 'Free'}</p>
                  </div>
                  {user?.is_pro ? <Crown className="w-8 h-8 text-accent" /> : <Users className="w-8 h-8 text-textSecondary" />}
                </div>
              </CardContent>
            </Card>
            
            <Card variant="glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-textSecondary">This Month</p>
                    <p className="text-2xl font-bold">
                      {plans.filter(plan => 
                        new Date(plan.created_at).getMonth() === new Date().getMonth()
                      ).length}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <Link href={action.isPro && !user?.is_pro ? '/pricing' : action.href}>
                  <Card variant="glass" className="h-full hover:shadow-glass-lg transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {action.title}
                        {action.isPro && !user?.is_pro && <Crown className="w-4 h-4 text-accent" />}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-textSecondary">
                        {action.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Business Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Recent Business Plans</h2>
              <Link href="/create/plan">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </Button>
              </Link>
            </div>
            
            <div className="space-y-3">
              {plans.length === 0 ? (
                <Card variant="glass">
                  <CardContent className="p-6 text-center">
                    <FileText className="w-12 h-12 text-textSecondary mx-auto mb-3" />
                    <p className="text-textSecondary mb-3">No business plans yet</p>
                    <Link href="/create/plan">
                      <Button variant="gradient">Create Your First Plan</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                plans.slice(0, 3).map((plan) => (
                  <Card key={plan.id} variant="glass" className="hover:shadow-glass-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white truncate">{plan.title}</h3>
                          <p className="text-sm text-textSecondary">
                            Created {formatDateShort(plan.created_at)}
                          </p>
                        </div>
                        <Link href={`/plan/${plan.id}`}>
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </motion.div>

          {/* Recent Brand Kits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Recent Brand Kits</h2>
              <Link href="/create/brand">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </Button>
              </Link>
            </div>
            
            <div className="space-y-3">
              {brands.length === 0 ? (
                <Card variant="glass">
                  <CardContent className="p-6 text-center">
                    <Palette className="w-12 h-12 text-textSecondary mx-auto mb-3" />
                    <p className="text-textSecondary mb-3">No brand kits yet</p>
                    <Link href="/create/brand">
                      <Button variant="gradient">Create Your First Brand</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                brands.slice(0, 3).map((brand) => (
                  <Card key={brand.id} variant="glass" className="hover:shadow-glass-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white truncate">{brand.name}</h3>
                          <p className="text-sm text-textSecondary">
                            {brand.tone} • {formatDateShort(brand.created_at)}
                          </p>
                        </div>
                        <Link href={`/brand/${brand.id}`}>
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}