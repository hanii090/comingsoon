import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-card/30 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-main rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-gradient">Foundify</span>
            </Link>
            <p className="text-textSecondary max-w-md mb-4">
              Transform your startup idea into a comprehensive business plan with AI-powered tools. 
              From planning to pitching, we've got you covered.
            </p>
            <div className="flex space-x-4">
              <div className="glass rounded-lg px-3 py-1">
                <span className="text-sm text-white">⭐⭐⭐⭐⭐</span>
              </div>
              <span className="text-sm text-textSecondary">Trusted by 1000+ founders</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-textSecondary hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-textSecondary hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <span className="text-textSecondary">Features</span>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-textSecondary">Help Center</span>
              </li>
              <li>
                <span className="text-textSecondary">Contact</span>
              </li>
              <li>
                <span className="text-textSecondary">Privacy Policy</span>
              </li>
              <li>
                <span className="text-textSecondary">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-textSecondary text-sm">
            © 2024 Foundify. All rights reserved.
          </p>
          <p className="text-textSecondary text-sm mt-4 md:mt-0">
            Built with ❤️ for startup founders
          </p>
        </div>
      </div>
    </footer>
  )
}