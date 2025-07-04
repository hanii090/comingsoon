import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Foundify',
  description: 'Terms of service and conditions for using Foundify',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 mb-4">
                By accessing and using Foundify (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p className="text-gray-300 mb-4">
                Foundify is an AI-powered platform that helps entrepreneurs create business plans, brand identity kits, and pitch decks. The Service includes both free and premium features.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
              <p className="text-gray-300 mb-4">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Payment and Subscriptions</h2>
              <p className="text-gray-300 mb-4">
                Pro subscriptions are billed monthly at $29/month. Subscriptions automatically renew unless cancelled. Refunds are provided within 7 days of purchase.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. AI-Generated Content</h2>
              <p className="text-gray-300 mb-4">
                All AI-generated content is provided as-is. While we strive for accuracy, you should review and customize all generated content before using it for business purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
              <p className="text-gray-300 mb-4">
                You retain ownership of content you create using the Service. Foundify retains rights to the platform technology and AI models.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-300 mb-4">
                Foundify shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Information</h2>
              <p className="text-gray-300 mb-4">
                For questions about these Terms of Service, please contact us at legal@foundify.app
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}