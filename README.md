# Foundify - AI-Powered Business Plan Generator

A complete, enterprise-grade SaaS platform that helps startup founders turn their ideas into comprehensive business plans using AI. Built with Next.js, Supabase, Stripe, and OpenAI.

![Foundify](https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=630&fit=crop&crop=center)

## 🚀 Features

### Core Features
- **AI Business Plan Generator** - Generate comprehensive business plans with OpenAI GPT-3.5
- **User Authentication** - Secure auth with Supabase (email/password)
- **Subscription Management** - Free & Pro tiers with Stripe integration
- **Plan Management** - Save, view, and manage business plans
- **Export to PDF** - Professional document export
- **Dark Glassmorphism UI** - Beautiful, modern interface

### Pro Features (Coming Soon)
- **Brand Identity Kit** - AI-generated brand names, taglines, and values
- **Pitch Deck Builder** - Investor-ready presentations
- **Market Research** - Detailed market analysis and competitor insights
- **Notion Integration** - Sync plans with Notion workspaces
- **Financial Projections** - Advanced financial modeling
- **Priority Support** - Dedicated support for Pro users

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **AI**: OpenAI GPT-3.5
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Deployment**: Vercel

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account
- OpenAI API key
- Stripe account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/foundify.git
cd foundify
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Set up environment variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Resend (Email)
RESEND_API_KEY=your_resend_api_key
```

### 4. Set up Supabase

1. Create a new Supabase project
2. Run the SQL schema in `supabase-schema.sql` in your Supabase SQL Editor
3. Enable Row Level Security
4. Configure authentication providers (Email/Password is enabled by default)

### 5. Set up Stripe

1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Set up webhooks for subscription events (optional)

### 6. Set up OpenAI

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com)
2. Add it to your environment variables

### 7. Run the development server

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
foundify/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── generate-plan/    # Business plan generation
│   │   └── stripe/           # Stripe integration
│   ├── dashboard/            # Protected dashboard
│   ├── login/                # Authentication pages
│   ├── pricing/              # Pricing page
│   ├── plan/[id]/           # Individual plan view
│   ├── signup/               # Registration
│   ├── success/              # Post-payment success
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/               # Reusable components
│   ├── Header.tsx           # Navigation header
│   └── Footer.tsx           # Site footer
├── lib/                     # Utility libraries
│   ├── supabase.ts          # Supabase client
│   ├── stripe.ts            # Stripe configuration
│   └── openai.ts            # OpenAI integration
├── types/                   # TypeScript type definitions
│   └── database.ts          # Database types
├── public/                  # Static assets
└── supabase-schema.sql      # Database schema
```

## 🎨 Design System

The app uses a custom dark glassmorphism design system with:

- **Primary Colors**: Purple (#8B5CF6) and Magenta (#EC4899)
- **Background**: Dark blue (#0F0F23)
- **Cards**: Semi-transparent with backdrop blur
- **Typography**: Inter font family
- **Animations**: Subtle Framer Motion animations

## 🔒 Authentication & Security

- **Supabase Auth** - Secure email/password authentication
- **Row Level Security** - Database-level security policies
- **Protected Routes** - Client and server-side route protection
- **CSRF Protection** - Built-in Next.js security
- **Environment Variables** - Secure API key management

## 💳 Subscription Tiers

### Free Tier
- 1 Business Plan
- Basic AI Generation
- PDF Export
- Community Support

### Pro Tier ($29/month)
- Unlimited Business Plans
- Advanced AI Generation
- Pitch Deck Builder
- Market Research Reports
- Brand Identity Kit
- Notion Integration
- PDF & PowerPoint Export
- Priority Support

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to update these in your production environment:

- Update `NEXT_PUBLIC_APP_URL` to your production URL
- Configure Stripe webhooks for your production domain
- Set up proper CORS settings in Supabase

## 📊 Database Schema

The app uses PostgreSQL with the following main tables:

- **users** - User profiles and subscription status
- **plans** - Business plans with AI-generated content
- **brands** - Brand identity kits (Pro feature)
- **pitch_decks** - Pitch presentations (Pro feature)
- **research** - Market research reports (Pro feature)

All tables include Row Level Security policies to ensure data privacy.

## 🔧 API Routes

- `POST /api/generate-plan` - Generate business plan with OpenAI
- `POST /api/stripe/checkout` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks (optional)

## 🎯 Performance

- **Next.js App Router** - Latest React features with SSR/SSG
- **Image Optimization** - Automatic WebP/AVIF conversion
- **Code Splitting** - Automatic route-based splitting
- **Caching** - Aggressive caching for static assets
- **Bundle Analysis** - Optimized bundle sizes

## 🧪 Testing

```bash
# Run type checking
yarn type-check

# Run linting
yarn lint

# Build for production
yarn build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Documentation: [Foundify Docs](https://docs.foundify.com)
- Support Email: support@foundify.com
- GitHub Issues: [Create an issue](https://github.com/your-username/foundify/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [OpenAI](https://openai.com/) - AI/ML Platform
- [Stripe](https://stripe.com/) - Payment processing
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

**Built with ❤️ for startup founders worldwide**

