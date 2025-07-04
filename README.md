# 🚀 Foundify - AI-Powered Business Plan Generator

**Foundify** is a complete, production-ready SaaS platform that helps founders transform startup ideas into investor-ready business plans using AI. Built with Next.js, Supabase, OpenAI, and Stripe.

## ✨ Features

- 🤖 **AI Business Plan Generation** - Comprehensive plans with GPT-3.5
- 🎨 **Brand Identity Kits** - Automated brand guidelines and tone
- 📊 **Pitch Deck Builder** - Investor-ready presentations
- 🔍 **Market Research & Analysis** - SWOT, TAM, competitor analysis
- � **Stripe Payments** - Free & Pro tiers with subscription management
- 📧 **Email Onboarding** - Welcome emails via Resend
- 📱 **Mobile-First Design** - Glassmorphism UI with dark theme
- 🔒 **Secure Authentication** - Supabase Auth with RLS
- 📄 **PDF Export** - Professional document generation
- 🌐 **SEO Optimized** - Dynamic meta tags and sitemap

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: OpenAI GPT-3.5 Turbo
- **Payments**: Stripe Subscriptions
- **Email**: Resend
- **Animation**: Framer Motion
- **UI**: Custom components with glassmorphism
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- OpenAI API key
- Stripe account
- Resend account
- Vercel account (for deployment)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd foundify
npm install
```

### 2. Environment Setup

Create `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Resend
RESEND_API_KEY=your_resend_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL schema in the Supabase SQL editor:

```sql
-- Copy contents from supabase-schema.sql
```

3. Enable authentication providers in Supabase Auth settings

### 4. API Keys Setup

#### OpenAI
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create API key
3. Add to `OPENAI_API_KEY`

#### Stripe
1. Create [Stripe account](https://stripe.com/)
2. Get API keys from dashboard
3. Set up webhook endpoint: `your-domain.com/api/stripe-webhook`
4. Add webhook events: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`

#### Resend
1. Create [Resend account](https://resend.com/)
2. Get API key
3. Verify your domain for production emails

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 🏗️ Project Structure

```
foundify/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   │   ├── generate-plan/  # Business plan generation
│   │   │   ├── competitor-analysis/ # AI competitor analysis
│   │   │   ├── create-checkout-session/ # Stripe checkout
│   │   │   ├── stripe-webhook/ # Payment webhooks
│   │   │   └── send-welcome/   # Email notifications
│   │   ├── dashboard/          # User dashboard
│   │   ├── pricing/            # Pricing page
│   │   └── page.tsx            # Homepage
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── hero.tsx            # Landing hero
│   │   ├── features.tsx        # Feature showcase
│   │   ├── pricing.tsx         # Pricing section
│   │   └── footer.tsx          # Site footer
│   └── lib/                    # Utilities
│       ├── supabase.ts         # Database client
│       └── utils.ts            # Helper functions
├── supabase-schema.sql         # Database schema
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: `#8B5CF6` (Purple)
- **Accent**: `#EC4899` (Pink)
- **Background**: `#0F0F23` (Dark Navy)
- **Card**: `#16213E` (Dark Blue)
- **Text**: `#FFFFFF` (White)
- **Text Secondary**: `#9CA3AF` (Gray)

### Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## 🔐 Security Features

- **Row Level Security (RLS)** - Database access control
- **Authentication** - Supabase Auth with JWT
- **API Protection** - Server-side validation
- **Stripe Webhooks** - Secure payment processing
- **Environment Variables** - Sensitive data protection

## � Pricing Strategy

### Free Tier
- 1 Business Plan
- Basic Branding Kit
- Market Research Overview
- Community Support

### Pro Tier ($29/month)
- Unlimited Business Plans
- AI Competitor Analysis
- PDF & Notion Export
- Pitch Deck Generator
- Priority Support

## � Email Templates

Automated emails include:
- Welcome onboarding for new users
- Pro upgrade congratulations
- Feature introduction and tips
- Responsive HTML design matching brand

## 🚀 Deployment

### Vercel Deployment

1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Environment Variables for Production

Update `NEXT_PUBLIC_APP_URL` to your production domain and ensure all API keys are production-ready.

### Stripe Webhook Setup

1. Add webhook endpoint in Stripe dashboard
2. Point to: `https://your-domain.com/api/stripe-webhook`
3. Add webhook secret to environment variables

## 🔧 Development

### Adding New Features

1. **API Routes**: Add to `src/app/api/`
2. **Components**: Add to `src/components/`
3. **Database**: Update schema and types
4. **Styling**: Use Tailwind classes with glassmorphism utilities

### Database Migrations

Run SQL migrations in Supabase dashboard or use CLI:

```bash
supabase db push
```

## � Analytics & Monitoring

Consider adding:
- **Vercel Analytics** - Performance monitoring
- **Sentry** - Error tracking
- **PostHog** - User analytics
- **Stripe Dashboard** - Payment analytics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- **Documentation**: Check this README
- **Issues**: Create GitHub issue
- **Email**: hello@foundify.com

## 🎯 Roadmap

- [ ] Notion integration for plan export
- [ ] Advanced financial modeling
- [ ] Team collaboration features
- [ ] API for third-party integrations
- [ ] Mobile app development

---

**Built with ❤️ for founders**

Transform your startup idea into an investor-ready business plan with the power of AI.

[Get Started](https://foundify.com) | [Documentation](https://docs.foundify.com) | [Support](mailto:hello@foundify.com)

