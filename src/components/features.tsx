"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Brain, 
  FileText, 
  Target, 
  TrendingUp, 
  Users, 
  Download,
  Palette,
  BarChart3
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Business Plan Generator",
    description: "Transform your idea into a comprehensive business plan with market analysis, financial projections, and competitive landscape in minutes."
  },
  {
    icon: Palette,
    title: "Brand Identity Kit",
    description: "Generate a complete brand identity including taglines, brand values, tone of voice, and visual guidelines tailored to your business."
  },
  {
    icon: FileText,
    title: "Pitch Deck Builder",
    description: "Create investor-ready pitch decks with AI-generated content, optimized structure, and professional design templates."
  },
  {
    icon: Target,
    title: "Market Research",
    description: "Get detailed SWOT analysis, TAM calculations, and market sizing to understand your business opportunity and positioning."
  },
  {
    icon: Users,
    title: "Competitor Analysis",
    description: "Discover and analyze your top competitors with detailed insights into their strategies, strengths, and market positioning."
  },
  {
    icon: BarChart3,
    title: "Financial Projections",
    description: "Generate realistic financial forecasts including revenue projections, cost analysis, and funding requirements."
  },
  {
    icon: Download,
    title: "Export & Share",
    description: "Export your business plans as PDF or sync with Notion. Share with investors and collaborators seamlessly."
  },
  {
    icon: TrendingUp,
    title: "Growth Strategies",
    description: "Get actionable growth strategies and go-to-market plans tailored to your industry and target market."
  }
]

export function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Launch Your Startup</span>
          </h2>
          <p className="text-lg text-textSecondary max-w-2xl mx-auto">
            From initial concept to investor presentation, Foundify provides all the tools 
            you need to turn your startup idea into a fundable business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" className="h-full hover:shadow-glass-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-textSecondary leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Build Your Business Plan?
            </h3>
            <p className="text-textSecondary mb-6">
              Join thousands of founders who have successfully launched their startups with Foundify.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-primary text-white rounded-lg font-medium hover:shadow-xl transition-all"
              >
                Get Started Free
              </motion.a>
              <motion.a
                href="/pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 border border-glass text-white rounded-lg font-medium hover:bg-glass transition-all"
              >
                View Pricing
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}