import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Calendar, User, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Foundify - Startup Insights & Business Planning Tips',
  description: 'Expert insights on startup fundraising, business planning, and entrepreneurship. Learn from successful founders and industry experts.',
  openGraph: {
    title: 'Blog | Foundify',
    description: 'Expert insights on startup fundraising, business planning, and entrepreneurship.',
    type: 'website',
  },
}

// Sample blog posts - in real app, these would come from CMS or markdown files
const blogPosts = [
  {
    slug: 'top-5-startup-funding-mistakes',
    title: 'Top 5 Startup Funding Mistakes That Kill Your Chances',
    description: 'Learn about the most common mistakes founders make when seeking investment and how to avoid them.',
    author: 'Sarah Chen',
    publishedAt: '2024-01-15',
    featuredImage: '/blog/funding-mistakes.jpg',
    tags: ['Fundraising', 'Startup Tips', 'Investment'],
    readTime: '8 min read'
  },
  {
    slug: 'using-ai-to-create-business-plan',
    title: 'Using AI to Create a Winning Business Plan',
    description: 'Discover how artificial intelligence can help you create comprehensive, investor-ready business plans faster than ever.',
    author: 'Michael Rodriguez',
    publishedAt: '2024-01-10',
    featuredImage: '/blog/ai-business-plan.jpg',
    tags: ['AI', 'Business Planning', 'Technology'],
    readTime: '12 min read'
  },
  {
    slug: 'pitch-deck-essentials',
    title: 'Pitch Deck Essentials: What Investors Really Want to See',
    description: 'A comprehensive guide to creating pitch decks that capture investor attention and secure funding.',
    author: 'Emily Watson',
    publishedAt: '2024-01-05',
    featuredImage: '/blog/pitch-deck.jpg',
    tags: ['Pitch Deck', 'Fundraising', 'Presentation'],
    readTime: '10 min read'
  },
  {
    slug: 'market-research-strategies',
    title: 'Market Research Strategies for Early-Stage Startups',
    description: 'Essential market research techniques to validate your startup idea and understand your target audience.',
    author: 'David Park',
    publishedAt: '2024-01-01',
    featuredImage: '/blog/market-research.jpg',
    tags: ['Market Research', 'Validation', 'Strategy'],
    readTime: '15 min read'
  }
]

const tagColors: { [key: string]: string } = {
  'Fundraising': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'AI': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Business Planning': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Startup Tips': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'Investment': 'bg-red-500/20 text-red-300 border-red-500/30',
  'Technology': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Pitch Deck': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'Presentation': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'Market Research': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  'Validation': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Strategy': 'bg-violet-500/20 text-violet-300 border-violet-500/30'
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Startup <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert insights, practical tips, and proven strategies to help you build and scale your startup successfully.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Article</h2>
          <Link href={`/blog/${blogPosts[0].slug}`}>
            <Card variant="glass" className="hover:glow-purple transition-all duration-300 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {blogPosts[0].author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(blogPosts[0].publishedAt).toLocaleDateString()}
                    </div>
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl text-white hover:text-primary-purple transition-colors">
                      {blogPosts[0].title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-base mt-2">
                      {blogPosts[0].description}
                    </CardDescription>
                  </CardHeader>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blogPosts[0].tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline"
                        className={tagColors[tag] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-primary-purple font-medium">
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
                
                <div className="md:w-1/2 bg-gradient-to-br from-primary-purple/20 to-primary-magenta/20 flex items-center justify-center p-8">
                  <div className="text-6xl opacity-20">📈</div>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* All Posts Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card variant="glass" className="h-full hover:glow-purple transition-all duration-300 group">
                  {/* Featured Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary-purple/20 to-primary-magenta/20 flex items-center justify-center">
                    <div className="text-4xl opacity-30">
                      {post.tags.includes('AI') ? '🤖' : 
                       post.tags.includes('Fundraising') ? '💰' :
                       post.tags.includes('Pitch Deck') ? '📊' : '📈'}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <CardHeader className="p-0 mb-3">
                      <CardTitle className="text-lg text-white group-hover:text-primary-purple transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-sm line-clamp-3">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline"
                          className={`text-xs ${tagColors[tag] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                          +{post.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{post.readTime}</span>
                      <div className="flex items-center text-primary-purple text-sm font-medium group-hover:translate-x-1 transition-transform">
                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="glass-card p-8 rounded-3xl text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Updated with Startup Insights
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest articles, tips, and resources delivered to your inbox weekly. 
            Join thousands of founders who trust our insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
            <button className="px-6 py-3 bg-gradient-primary rounded-lg text-white font-medium hover:scale-105 transition-transform">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}