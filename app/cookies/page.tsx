import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Foundify',
  description: 'Cookie policy and tracking information for Foundify',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Cookie Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies</h2>
              <p className="text-gray-300 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-300 mb-4">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Authentication:</strong> To keep you logged in to your account</li>
                <li><strong>Preferences:</strong> To remember your settings and preferences</li>
                <li><strong>Analytics:</strong> To understand how visitors use our website</li>
                <li><strong>Performance:</strong> To improve our website&apos;s performance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Types of Cookies We Use</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Essential Cookies</h3>
                <p className="text-gray-300 mb-2">
                  These cookies are necessary for the website to function and cannot be switched off.
                </p>
                <ul className="list-disc pl-6 text-gray-300">
                  <li>Session management</li>
                  <li>Security tokens</li>
                  <li>Load balancing</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Analytics Cookies</h3>
                <p className="text-gray-300 mb-2">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <ul className="list-disc pl-6 text-gray-300">
                  <li>Google Analytics</li>
                  <li>Usage statistics</li>
                  <li>Performance monitoring</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Functional Cookies</h3>
                <p className="text-gray-300 mb-2">
                  These cookies enhance the functionality of our website.
                </p>
                <ul className="list-disc pl-6 text-gray-300">
                  <li>User preferences</li>
                  <li>Language settings</li>
                  <li>Theme preferences</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-300 mb-4">
                Some cookies are placed by third-party services that appear on our pages:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li><strong>Stripe:</strong> For payment processing</li>
                <li><strong>Supabase:</strong> For authentication and database services</li>
                <li><strong>Vercel:</strong> For hosting and performance optimization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Managing Cookies</h2>
              <p className="text-gray-300 mb-4">
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
              </p>
              <p className="text-gray-300 mb-4">
                However, if you do this, you may have to manually adjust some preferences every time you visit our site and some services and functionality may not work.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Cookie Consent</h2>
              <p className="text-gray-300 mb-4">
                By continuing to use our website, you consent to our use of cookies as described in this policy. If you do not agree to our use of cookies, please set your browser to reject cookies or stop using our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Updates to This Policy</h2>
              <p className="text-gray-300 mb-4">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about our use of cookies, please contact us at privacy@foundify.app
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}