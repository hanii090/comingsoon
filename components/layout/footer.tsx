import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-primary-purple/20 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold gradient-text">Foundify</span>
            </Link>
            <p className="text-textSecondary text-sm max-w-xs">
              AI-powered business planning assistant for startup founders. Turn your idea into a comprehensive business plan.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-text font-semibold">Product</h3>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li><Link href="/pricing" className="hover:text-text transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-text transition-colors">Dashboard</Link></li>
              <li><Link href="/#features" className="hover:text-text transition-colors">Features</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-text font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li><Link href="/blog" className="hover:text-text transition-colors">Blog</Link></li>
              <li><Link href="/admin/analytics" className="hover:text-text transition-colors">Analytics</Link></li>
              <li><a href="mailto:support@foundify.app" className="hover:text-text transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-text font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li><Link href="/privacy" className="hover:text-text transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-text transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-text transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-purple/20 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-textSecondary text-sm">
            © 2024 Foundify. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a href="https://twitter.com/foundify" target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-text transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="https://github.com/foundify" target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-text transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}